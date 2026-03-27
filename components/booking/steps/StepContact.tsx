'use client'

import type { BookingDraft } from '@/lib/booking/types'
import { validateStep, isRushBooking } from '@/lib/booking/engine'

interface StepContactProps {
  draft: BookingDraft
  onChange: (updates: Partial<BookingDraft>) => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export function StepContact({ draft, onChange, onBack, onSubmit, isSubmitting }: StepContactProps) {
  const validation = validateStep(5, draft)
  const errors = validation.errors
  const isRush = draft.date ? isRushBooking(draft.date) : false

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Your contact details</h2>
        <p className="text-zinc-500 mt-1">
          We&apos;ll reach out within 24 hours to confirm your booking — no payment required now.
        </p>
      </div>

      {isRush && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">Short notice booking</p>
            <p className="text-sm text-amber-700 mt-0.5">
              Your event is within 14 days. We&apos;ll prioritize your request and contact you as soon as possible.
            </p>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="first-name" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            id="first-name"
            type="text"
            autoComplete="given-name"
            placeholder="Maria"
            value={draft.firstName ?? ''}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className={[
              'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
              errors.firstName ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
            ].join(' ')}
          />
          {errors.firstName && <p className="text-sm text-red-500 mt-1.5">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="last-name" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            id="last-name"
            type="text"
            autoComplete="family-name"
            placeholder="Rodriguez"
            value={draft.lastName ?? ''}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className={[
              'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
              errors.lastName ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
            ].join(' ')}
          />
          {errors.lastName && <p className="text-sm text-red-500 mt-1.5">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="maria@example.com"
            value={draft.email ?? ''}
            onChange={(e) => onChange({ email: e.target.value })}
            className={[
              'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
              errors.email ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
            ].join(' ')}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1.5">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(305) 555-0100"
            value={draft.phone ?? ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            className={[
              'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
              errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
            ].join(' ')}
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1.5">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-semibold text-zinc-700 mb-1.5">
          Special requests or notes{' '}
          <span className="font-normal text-zinc-400">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="e.g. We need champagne service, decorations on the vehicle, specific music..."
          value={draft.notes ?? ''}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 transition-colors resize-none"
        />
      </div>

      {/* Trust signals */}
      <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 flex flex-col gap-2">
        {[
          'No payment required — just a booking request',
          'We respond within 24 hours (usually same day)',
          'Your info is never shared or sold',
        ].map((text) => (
          <div key={text} className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-zinc-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 border border-zinc-200 text-zinc-700 rounded-xl font-medium text-sm hover:border-zinc-400 transition-colors disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 sm:flex-none px-8 py-3.5 bg-zinc-900 text-white rounded-xl font-semibold text-sm hover:bg-zinc-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending request…' : 'Send Booking Request →'}
        </button>
      </div>
    </div>
  )
}
