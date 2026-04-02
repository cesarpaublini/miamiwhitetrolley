'use client'

import { useEffect, useCallback, Suspense, useState, useRef } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import type { StepId } from '@/lib/booking/types'
import { trackBookModalOpen, trackFunnelAbandoned } from '@/lib/analytics'
import { BookFunnel } from './BookFunnel'

const STEP_TITLES: Record<StepId, string> = {
  1: 'Tell us about your event',
  2: 'Tell us about your event',
  3: 'Route & timing',
  4: 'Choose your vehicle',
  5: 'Almost done',
}

function ModalInner() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<StepId>(1)

  const isOpen = searchParams.get('book') === '1'
  const trackedOpen = useRef(false)

  useEffect(() => {
    if (isOpen && !trackedOpen.current) {
      trackedOpen.current = true
      trackBookModalOpen()
    }
    if (!isOpen) trackedOpen.current = false
  }, [isOpen])

  const close = useCallback(() => {
    // Track abandonment if user got past step 1
    if (currentStep > 1) {
      trackFunnelAbandoned(currentStep)
    }
    router.replace(pathname, { scroll: false })
  }, [router, pathname, currentStep])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer (mobile) / Modal (desktop) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Reserve your date"
        className="relative z-10 w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88vh]"
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-zinc-200 px-6 py-4 rounded-t-3xl sm:rounded-t-2xl shrink-0">
          {/* Mobile drag handle */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-10 h-1 rounded-full bg-zinc-200 sm:hidden" aria-hidden="true" />
          <span className="text-sm font-semibold text-zinc-900 mt-1 sm:mt-0">{STEP_TITLES[currentStep]}</span>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable funnel content */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
              </div>
            }
          >
            <BookFunnel modalMode onStepChange={setCurrentStep} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export function BookingModal() {
  return (
    <Suspense fallback={null}>
      <ModalInner />
    </Suspense>
  )
}
