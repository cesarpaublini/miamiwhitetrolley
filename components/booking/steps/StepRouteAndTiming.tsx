'use client'

import type { BookingDraft, ServiceType } from '@/lib/booking/types'
import { validateStep, SERVICE_TYPE_LABELS, SERVICE_TYPE_DESCRIPTIONS, estimateHourlyPrice } from '@/lib/booking/engine'
import { bookingVehicles, BOOKING_CONSTANTS } from '@/lib/booking/vehicles'
import { trackServiceTypeSelected } from '@/lib/analytics'

interface StepRouteAndTimingProps {
  draft: BookingDraft
  onChange: (updates: Partial<BookingDraft>) => void
  onNext: () => void
  onBack: () => void
}

const HOUR_PRESETS = [5, 6, 7, 8]

const SERVICES: { id: ServiceType; label: string; description: string }[] = [
  { id: 'hourly', label: SERVICE_TYPE_LABELS['hourly'], description: SERVICE_TYPE_DESCRIPTIONS['hourly'] },
  { id: 'shuttle', label: SERVICE_TYPE_LABELS['shuttle'], description: SERVICE_TYPE_DESCRIPTIONS['shuttle'] },
  { id: 'one-way', label: SERVICE_TYPE_LABELS['one-way'], description: SERVICE_TYPE_DESCRIPTIONS['one-way'] },
]

function formatPrice(amount: number) {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function StepRouteAndTiming({ draft, onChange, onNext, onBack }: StepRouteAndTimingProps) {
  const validation = validateStep(3, draft)
  const errors = validation.errors

  const isWedding = draft.occasion === 'wedding'
  const isOneWay = draft.serviceType === 'one-way'
  const isShuttle = draft.serviceType === 'shuttle'

  // Price teaser: show trolley estimate when hours are set for hourly/shuttle
  const whiteTrolley = bookingVehicles.find((v) => v.id === 'white-trolley')
  const showPriceTeaser =
    draft.hours &&
    draft.hours >= BOOKING_CONSTANTS.DEFAULT_MIN_HOURS &&
    draft.serviceType !== 'one-way' &&
    whiteTrolley

  const priceTeaser = showPriceTeaser && whiteTrolley
    ? estimateHourlyPrice(whiteTrolley, draft.hours!)
    : null

  const inputClass = (hasError: boolean) =>
    [
      'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
      hasError ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
    ].join(' ')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Route &amp; timing</h2>
        <p className="text-zinc-500 mt-1">Where are you starting and where are you headed?</p>
      </div>

      {/* Service type — only shown for non-wedding occasions */}
      {!isWedding && (
        <fieldset>
          <legend className="text-sm font-semibold text-zinc-700 mb-3">
            How do you need the vehicle? <span className="text-red-500">*</span>
          </legend>
          <div className="grid gap-3">
            {SERVICES.map(({ id, label, description }) => {
              const isSelected = draft.serviceType === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onChange({ serviceType: id })
                    trackServiceTypeSelected(id)
                  }}
                  className={[
                    'flex items-start gap-4 p-4 rounded-xl border text-left transition-all',
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400',
                  ].join(' ')}
                >
                  <div>
                    <p className={['font-semibold text-sm', isSelected ? 'text-white' : 'text-zinc-900'].join(' ')}>
                      {label}
                    </p>
                    <p className={['text-sm mt-0.5', isSelected ? 'text-zinc-300' : 'text-zinc-500'].join(' ')}>
                      {description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
          {errors.serviceType && <p className="text-sm text-red-500 mt-2">{errors.serviceType}</p>}
        </fieldset>
      )}

      {/* Pickup */}
      <div>
        <label htmlFor="pickup" className="block text-sm font-semibold text-zinc-700 mb-1.5">
          {isShuttle ? 'First location' : 'Pickup location'}{' '}
          <span className="text-red-500">*</span>
        </label>
        <input
          id="pickup"
          type="text"
          placeholder="Hotel, venue, or neighborhood — e.g. Biltmore Hotel"
          value={draft.pickupAddress ?? ''}
          onChange={(e) => onChange({ pickupAddress: e.target.value })}
          className={inputClass(!!errors.pickupAddress)}
        />
        <p className="text-xs text-zinc-400 mt-1.5">Exact address confirmed by our team</p>
        {errors.pickupAddress && <p className="text-sm text-red-500 mt-1">{errors.pickupAddress}</p>}
      </div>

      {/* Drop-off (not for shuttle) */}
      {!isShuttle && (
        <div>
          <label htmlFor="dropoff" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            {isOneWay ? 'Drop-off location' : 'Final drop-off location'}{' '}
            <span className="text-red-500">*</span>
          </label>
          <input
            id="dropoff"
            type="text"
            placeholder="Venue, hotel, or neighborhood — e.g. Pérez Art Museum"
            value={draft.dropoffAddress ?? ''}
            onChange={(e) => onChange({ dropoffAddress: e.target.value })}
            className={inputClass(!!errors.dropoffAddress)}
          />
          {errors.dropoffAddress && <p className="text-sm text-red-500 mt-1">{errors.dropoffAddress}</p>}
        </div>
      )}

      {/* Return trip for one-way */}
      {isOneWay && (
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={draft.returnTrip ?? false}
            onChange={(e) => onChange({ returnTrip: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
          />
          <span className="text-sm text-zinc-700">We also need a return trip</span>
        </label>
      )}

      {/* Start time + hours */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="start-time" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Start time <span className="text-red-500">*</span>
          </label>
          <input
            id="start-time"
            type="time"
            value={draft.startTime ?? ''}
            onChange={(e) => onChange({ startTime: e.target.value })}
            className={inputClass(!!errors.startTime)}
          />
          {errors.startTime && <p className="text-sm text-red-500 mt-1.5">{errors.startTime}</p>}
        </div>

        {!isOneWay && (
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Hours needed <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {HOUR_PRESETS.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => onChange({ hours: h })}
                  className={[
                    'px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all',
                    draft.hours === h
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400',
                  ].join(' ')}
                >
                  {h}h
                </button>
              ))}
              <button
                type="button"
                onClick={() => onChange({ hours: undefined })}
                className={[
                  'px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all',
                  draft.hours !== undefined && !HOUR_PRESETS.includes(draft.hours)
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400',
                ].join(' ')}
              >
                Other
              </button>
            </div>
            {/* Custom input when "Other" selected */}
            {draft.hours !== undefined && !HOUR_PRESETS.includes(draft.hours) && (
              <input
                type="number"
                min={5}
                max={16}
                placeholder="Enter hours"
                value={draft.hours ?? ''}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10)
                  onChange({ hours: isNaN(n) ? undefined : n })
                }}
                className="mt-2 w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 transition-colors"
              />
            )}
            {errors.hours && <p className="text-sm text-red-500 mt-1.5">{errors.hours}</p>}
            <p className="text-xs text-zinc-400 mt-1.5">5-hour minimum · Vehicle stays with you the full time</p>
          </div>
        )}
      </div>

      {/* Price teaser */}
      {priceTeaser && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 flex items-center gap-3">
          <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
          </svg>
          <p className="text-sm text-emerald-800">
            <span className="font-semibold">Trolley estimate: {formatPrice(priceTeaser.lowWithGratuity)}–{formatPrice(priceTeaser.highWithGratuity)}</span>
            {' '}· includes gratuity · final price confirmed by our team
          </p>
        </div>
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
          See Vehicle Options →
        </button>
      </div>
    </div>
  )
}
