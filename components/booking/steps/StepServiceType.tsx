'use client'

import type { BookingDraft, ServiceType } from '@/lib/booking/types'
import { SERVICE_TYPE_LABELS, SERVICE_TYPE_DESCRIPTIONS } from '@/lib/booking/engine'
import { validateStep } from '@/lib/booking/engine'

interface StepServiceTypeProps {
  draft: BookingDraft
  onChange: (updates: Partial<BookingDraft>) => void
  onNext: () => void
  onBack: () => void
}

const SERVICES: { id: ServiceType; icon: React.ReactNode }[] = [
  {
    id: 'hourly',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    id: 'shuttle',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    id: 'one-way',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    ),
  },
]

export function StepServiceType({ draft, onChange, onNext, onBack }: StepServiceTypeProps) {
  const validation = validateStep(2, draft)
  const errors = validation.errors

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">How do you need the vehicle?</h2>
        <p className="text-zinc-500 mt-1">This determines pricing and route planning.</p>
      </div>

      <div className="grid gap-4">
        {SERVICES.map(({ id, icon }) => {
          const isSelected = draft.serviceType === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange({ serviceType: id })}
              className={[
                'flex items-start gap-4 p-5 rounded-xl border text-left transition-all',
                isSelected
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400',
              ].join(' ')}
            >
              <span className={['mt-0.5 shrink-0', isSelected ? 'text-white' : 'text-zinc-500'].join(' ')}>
                {icon}
              </span>
              <div>
                <p className={['font-semibold text-sm', isSelected ? 'text-white' : 'text-zinc-900'].join(' ')}>
                  {SERVICE_TYPE_LABELS[id]}
                </p>
                <p className={['text-sm mt-0.5', isSelected ? 'text-zinc-300' : 'text-zinc-500'].join(' ')}>
                  {SERVICE_TYPE_DESCRIPTIONS[id]}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {errors.serviceType && (
        <p className="text-sm text-red-500">{errors.serviceType}</p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-zinc-200 text-zinc-700 rounded-xl font-medium text-sm hover:border-zinc-400 transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 sm:flex-none px-8 py-3 bg-zinc-900 text-white rounded-xl font-semibold text-sm hover:bg-zinc-700 transition-colors"
        >
          Continue to Route →
        </button>
      </div>
    </div>
  )
}
