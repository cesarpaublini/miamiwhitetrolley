'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { BookingDraft, StepId, VehicleId } from '@/lib/booking/types'
import { validateStep, draftToSubmission } from '@/lib/booking/engine'
import { trackFunnelStepComplete, trackFunnelStepViewed, trackBookingSubmitted, trackPhoneClick } from '@/lib/analytics'
import { getCurrentPromotion, getPromoVariant, getDiscount, qualifiesForPromo } from '@/lib/promotions'
import { getBookingVehicleById } from '@/lib/booking/vehicles'
import { BookingProgress } from './BookingProgress'
import { BookingSummary } from './BookingSummary'
import { StepEventDetails } from './steps/StepEventDetails'
import { StepRouteAndTiming } from './steps/StepRouteAndTiming'
import { StepVehicleSelect } from './steps/StepVehicleSelect'
import { StepContact } from './steps/StepContact'

const STORAGE_KEY = 'mwt_booking_draft'
const TOTAL_STEPS = 5

function loadDraft(): BookingDraft {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as BookingDraft) : {}
  } catch {
    return {}
  }
}

function saveDraft(draft: BookingDraft) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
  } catch {
    // ignore quota errors
  }
}

function clearDraft() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

// Step 2 (service type) is eliminated as a standalone screen.
// Wedding always uses 'hourly' — auto-set on leaving step 1.
// Non-wedding service type is selected inline on step 3.
// Visible flow: 1 → 3 → 4 → 5
function nextStep(current: StepId): StepId {
  if (current === 1) return 3
  if (current === 3) return 4
  if (current === 4) return 5
  return 5
}

function prevStep(current: StepId): StepId {
  if (current === 3) return 1
  if (current === 4) return 3
  if (current === 5) return 4
  return 1
}

export function BookFunnel({ modalMode = false, onStepChange }: { modalMode?: boolean; onStepChange?: (step: StepId) => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const rawStep = parseInt(searchParams.get('step') ?? '1', 10)
  const urlStep = (rawStep >= 1 && rawStep <= TOTAL_STEPS ? rawStep : 1) as StepId

  const [modalStep, setModalStep] = useState<StepId>(1)
  const currentStep = modalMode ? modalStep : urlStep

  const [draft, setDraft] = useState<BookingDraft>({})
  const [hydrated, setHydrated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Track when user reaches the contact step
  useEffect(() => {
    if (currentStep === 5) {
      trackFunnelStepViewed(5, 'contact')
    }
  }, [currentStep])

  useEffect(() => {
    const saved = loadDraft()
    const vehicleParam = searchParams.get('vehicle')
    if (vehicleParam) {
      const vehicle = getBookingVehicleById(vehicleParam)
      if (vehicle) {
        const preSelected: Partial<BookingDraft> =
          saved.vehicleId
            ? {}
            : { vehicleId: vehicle.id as VehicleId, vehicleName: vehicle.name, vehicleUnits: 1 }
        setDraft({ ...saved, ...preSelected })
      } else {
        setDraft(saved)
      }
    } else {
      setDraft(saved)
    }
    setHydrated(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateDraft = useCallback((updates: Partial<BookingDraft>) => {
    setDraft((prev) => {
      const next = { ...prev, ...updates }
      saveDraft(next)
      return next
    })
  }, [])

  const goToStep = useCallback(
    (step: StepId) => {
      if (modalMode) {
        setModalStep(step)
        onStepChange?.(step)
      } else {
        router.push(`/book?step=${step}`, { scroll: false })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [router, modalMode, onStepChange],
  )

  const handleNext = useCallback(
    (step: StepId) => {
      const result = validateStep(step, draft)
      if (!result.valid) {
        setDraft((d) => ({ ...d }))
        return
      }
      // Auto-set hourly for weddings when leaving step 1
      if (step === 1 && draft.occasion === 'wedding') {
        updateDraft({ serviceType: 'hourly' })
      }
      const stepNames: Record<number, string> = {
        1: 'event_details',
        3: 'route_and_timing',
        4: 'vehicle_select',
      }
      trackFunnelStepComplete(step, stepNames[step] ?? `step_${step}`)
      goToStep(nextStep(step))
    },
    [draft, goToStep, updateDraft],
  )

  const handleBack = useCallback(
    (step: StepId) => {
      goToStep(prevStep(step))
    },
    [goToStep],
  )

  // Called from StepVehicleSelect after auto-advance
  const handleVehicleNext = useCallback(() => {
    goToStep(5)
  }, [goToStep])

  const handleSubmit = useCallback(async () => {
    const result = validateStep(5, draft)
    if (!result.valid) {
      setDraft((d) => ({ ...d }))
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const payload = draftToSubmission(draft)

      // Attach promo data if this booking qualifies
      const promo = getCurrentPromotion()
      if (promo && qualifiesForPromo(promo, draft.vehicleId, draft.hours)) {
        const variant = getPromoVariant()
        const amount = getDiscount(promo, variant)
        Object.assign(payload, {
          promoId: promo.id,
          promoLabel: promo.label,
          promoVariant: variant,
          promoDiscount: amount,
        })
      }

      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? `Request failed (${res.status})`)
      }

      trackBookingSubmitted({
        occasion: payload.occasion,
        vehicleId: payload.vehicleId,
        vehicleName: payload.vehicleName,
        serviceType: payload.serviceType,
      })
      clearDraft()
      const confirmParams = new URLSearchParams({
        date: payload.date,
        vehicle: payload.vehicleName,
      })
      router.push(`/book/confirmation?${confirmParams.toString()}`)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again or call us.',
      )
      setIsSubmitting(false)
    }
  }, [draft, router])

  if (!hydrated) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 flex items-center justify-center min-h-64">
        <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8 sm:mb-12">
        <BookingProgress currentStep={currentStep} />
      </div>

      <div className={`grid gap-8 items-start ${modalMode ? '' : 'lg:grid-cols-[1fr_320px] lg:gap-12'}`}>
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8">
          {currentStep === 1 && (
            <StepEventDetails
              draft={draft}
              onChange={updateDraft}
              onNext={() => handleNext(1)}
            />
          )}
          {currentStep === 3 && (
            <StepRouteAndTiming
              draft={draft}
              onChange={updateDraft}
              onNext={() => handleNext(3)}
              onBack={() => handleBack(3)}
            />
          )}
          {currentStep === 4 && (
            <StepVehicleSelect
              draft={draft}
              onChange={updateDraft}
              onNext={handleVehicleNext}
              onBack={() => handleBack(4)}
            />
          )}
          {currentStep === 5 && (
            <>
              <StepContact
                draft={draft}
                onChange={updateDraft}
                onBack={() => handleBack(5)}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
              {submitError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-700">{submitError}</p>
                  <p className="text-sm text-red-600 mt-1">
                    Or call us directly:{' '}
                    <a href="tel:+17865651088" onClick={() => trackPhoneClick('funnel-error')} className="font-medium underline">
                      (786) 565-1088
                    </a>
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {!modalMode && (
          <div className="lg:sticky lg:top-6">
            <BookingSummary draft={draft} />
          </div>
        )}
      </div>
    </div>
  )
}
