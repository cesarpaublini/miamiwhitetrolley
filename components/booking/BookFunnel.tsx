'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { BookingDraft, StepId, VehicleId } from '@/lib/booking/types'
import { validateStep, draftToSubmission } from '@/lib/booking/engine'
import { getBookingVehicleById } from '@/lib/booking/vehicles'
import { BookingProgress } from './BookingProgress'
import { BookingSummary } from './BookingSummary'
import { StepEventDetails } from './steps/StepEventDetails'
import { StepServiceType } from './steps/StepServiceType'
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

export function BookFunnel() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const rawStep = parseInt(searchParams.get('step') ?? '1', 10)
  const currentStep = (
    rawStep >= 1 && rawStep <= TOTAL_STEPS ? rawStep : 1
  ) as StepId

  const [draft, setDraft] = useState<BookingDraft>({})
  const [hydrated, setHydrated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Hydrate from sessionStorage on mount, then apply vehicle param if present
  useEffect(() => {
    const saved = loadDraft()
    const vehicleParam = searchParams.get('vehicle')
    if (vehicleParam) {
      const vehicle = getBookingVehicleById(vehicleParam)
      if (vehicle) {
        // Pre-select vehicle but don't overwrite if user already picked one in this session
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
      router.push(`/book?step=${step}`, { scroll: false })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [router],
  )

  const handleNext = useCallback(
    (step: StepId) => {
      const result = validateStep(step, draft)
      if (!result.valid) {
        // Trigger re-render so errors show — draft already has the values
        setDraft((d) => ({ ...d }))
        return
      }
      goToStep((step + 1) as StepId)
    },
    [draft, goToStep],
  )

  const handleBack = useCallback(
    (step: StepId) => {
      goToStep((step - 1) as StepId)
    },
    [goToStep],
  )

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
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? `Request failed (${res.status})`)
      }

      clearDraft()
      router.push('/book/confirmation')
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again or call us.',
      )
      setIsSubmitting(false)
    }
  }, [draft, router])

  // Don't render until hydrated to avoid SSR mismatch
  if (!hydrated) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 flex items-center justify-center min-h-64">
        <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Progress indicator */}
      <div className="mb-8 sm:mb-12">
        <BookingProgress currentStep={currentStep} />
      </div>

      {/* Two-column layout: form + sidebar */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
        {/* Step content */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8">
          {currentStep === 1 && (
            <StepEventDetails
              draft={draft}
              onChange={updateDraft}
              onNext={() => handleNext(1)}
            />
          )}
          {currentStep === 2 && (
            <StepServiceType
              draft={draft}
              onChange={updateDraft}
              onNext={() => handleNext(2)}
              onBack={() => handleBack(2)}
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
              onNext={() => handleNext(4)}
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
                    <a href="tel:+17865651088" className="font-medium underline">
                      (786) 565-1088
                    </a>
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Booking summary sidebar */}
        <div className="lg:sticky lg:top-6">
          <BookingSummary draft={draft} />
        </div>
      </div>
    </div>
  )
}
