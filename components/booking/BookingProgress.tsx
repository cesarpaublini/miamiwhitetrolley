'use client'

import type { StepId } from '@/lib/booking/types'

// Real step IDs used in the funnel (step 2 is skipped)
const STEP_MAP: { id: StepId; label: string }[] = [
  { id: 1, label: 'Event' },
  { id: 3, label: 'Route' },
  { id: 4, label: 'Vehicle' },
  { id: 5, label: 'Contact' },
]

interface BookingProgressProps {
  currentStep: StepId
}

export function BookingProgress({ currentStep }: BookingProgressProps) {
  const displayIndex = STEP_MAP.findIndex((s) => s.id === currentStep)
  const displayStep = displayIndex >= 0 ? displayIndex + 1 : 1
  const total = STEP_MAP.length
  const currentLabel = STEP_MAP[displayIndex]?.label ?? ''

  return (
    <div className="w-full">
      {/* Mobile */}
      <p className="sm:hidden text-sm text-zinc-500 text-center mb-4">
        Step {displayStep} of {total} —{' '}
        <span className="font-medium text-zinc-800">{currentLabel}</span>
      </p>

      {/* Desktop */}
      <nav className="hidden sm:flex items-center justify-center" aria-label="Booking steps">
        {STEP_MAP.map((step, i) => {
          const isCompleted = step.id < currentStep && currentStep !== step.id
          const isCurrent = step.id === currentStep

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    isCompleted
                      ? 'bg-zinc-900 text-white'
                      : isCurrent
                        ? 'bg-white border-2 border-zinc-900 text-zinc-900'
                        : 'bg-zinc-100 text-zinc-400 border-2 border-zinc-200',
                  ].join(' ')}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={[
                    'text-xs font-medium',
                    isCurrent ? 'text-zinc-900' : isCompleted ? 'text-zinc-600' : 'text-zinc-400',
                  ].join(' ')}
                >
                  {step.label}
                </span>
              </div>

              {i < STEP_MAP.length - 1 && (
                <div
                  className={[
                    'h-px w-12 mx-2 mb-5 transition-colors',
                    isCompleted ? 'bg-zinc-900' : 'bg-zinc-200',
                  ].join(' ')}
                />
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
