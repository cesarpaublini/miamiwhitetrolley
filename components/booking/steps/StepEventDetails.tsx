'use client'

import { useEffect, useRef } from 'react'
import type { BookingDraft, OccasionType } from '@/lib/booking/types'
import { OCCASION_LABELS, validateStep } from '@/lib/booking/engine'
import { trackOccasionSelected } from '@/lib/analytics'

interface StepEventDetailsProps {
  draft: BookingDraft
  onChange: (updates: Partial<BookingDraft>) => void
  onNext: () => void
}

const OCCASIONS = Object.entries(OCCASION_LABELS) as [OccasionType, string][]

const OCCASION_ICONS: Record<OccasionType, string> = {
  wedding: '💍',
  corporate: '🏢',
  prom: '🎓',
  birthday: '🎂',
  other: '✨',
}

export function StepEventDetails({ draft, onChange, onNext }: StepEventDetailsProps) {
  const validation = validateStep(1, draft)
  const errors = validation.errors
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const today = new Date().toISOString().split('T')[0]

  function selectOccasion(value: OccasionType) {
    onChange({ occasion: value })
    trackOccasionSelected(value)
    // Auto-advance after a short delay so user sees their selection
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current)
    autoAdvanceTimer.current = setTimeout(() => {
      // Only auto-advance if date + guests are already filled
      const updatedDraft = { ...draft, occasion: value }
      const result = validateStep(1, updatedDraft)
      if (result.valid) onNext()
    }, 300)
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current)
    }
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Tell us about your event</h2>
        <p className="text-zinc-500 mt-1">We&apos;ll match you with the right vehicle for the occasion.</p>
      </div>

      {/* Occasion */}
      <fieldset>
        <legend className="text-sm font-semibold text-zinc-700 mb-3">
          What&apos;s the occasion? <span className="text-red-500">*</span>
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {OCCASIONS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => selectOccasion(value)}
              className={[
                'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left',
                draft.occasion === value
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400',
              ].join(' ')}
            >
              <span className="text-lg leading-none">{OCCASION_ICONS[value]}</span>
              {label}
            </button>
          ))}
        </div>
        {errors.occasion && (
          <p className="text-sm text-red-500 mt-2">{errors.occasion}</p>
        )}
      </fieldset>

      {/* Date + Guest Count */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="event-date" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Event date <span className="text-red-500">*</span>
          </label>
          <input
            id="event-date"
            type="date"
            min={today}
            value={draft.date ?? ''}
            onChange={(e) => onChange({ date: e.target.value })}
            className={[
              'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
              errors.date ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
            ].join(' ')}
          />
          {errors.date && <p className="text-sm text-red-500 mt-1.5">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="guest-count" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Guest count <span className="text-red-500">*</span>
          </label>
          <input
            id="guest-count"
            type="number"
            min={1}
            max={200}
            placeholder="e.g. 25"
            value={draft.guestCount ?? ''}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10)
              onChange({ guestCount: isNaN(n) ? undefined : n })
            }}
            className={[
              'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
              errors.guestCount ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
            ].join(' ')}
          />
          {errors.guestCount && <p className="text-sm text-red-500 mt-1.5">{errors.guestCount}</p>}
        </div>
      </div>

      {/* Optional: name + phone to capture early */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="first-name-early" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            First name <span className="font-normal text-zinc-400">(optional)</span>
          </label>
          <input
            id="first-name-early"
            type="text"
            autoComplete="given-name"
            placeholder="Maria"
            value={draft.firstName ?? ''}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="phone-early" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Phone <span className="font-normal text-zinc-400">(optional)</span>
          </label>
          <input
            id="phone-early"
            type="tel"
            autoComplete="tel"
            placeholder="(786) 555-0100"
            value={draft.phone ?? ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 transition-colors"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 text-white rounded-xl font-semibold text-sm hover:bg-zinc-700 transition-colors"
      >
        Continue to Route &amp; Timing →
      </button>
    </div>
  )
}
