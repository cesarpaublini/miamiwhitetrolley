'use client'

import { useState } from 'react'
import type { BookingDraft } from '@/lib/booking/types'
import { validateStep } from '@/lib/booking/engine'
import { getBookingVehicleById } from '@/lib/booking/vehicles'
import { BOOKING_CONSTANTS } from '@/lib/booking/vehicles'

interface StepRouteAndTimingProps {
  draft: BookingDraft
  onChange: (updates: Partial<BookingDraft>) => void
  onNext: () => void
  onBack: () => void
}

export function StepRouteAndTiming({ draft, onChange, onNext, onBack }: StepRouteAndTimingProps) {
  const [stopInput, setStopInput] = useState('')
  const validation = validateStep(3, draft)
  const errors = validation.errors

  const isOneWay = draft.serviceType === 'one-way'
  const isShuttle = draft.serviceType === 'shuttle'

  const selectedVehicle = draft.vehicleId ? getBookingVehicleById(draft.vehicleId) : null
  const minHours = selectedVehicle?.minHours ?? BOOKING_CONSTANTS.DEFAULT_MIN_HOURS

  const stops = draft.additionalStops ?? []

  function addStop() {
    const trimmed = stopInput.trim()
    if (!trimmed || stops.length >= 3) return
    onChange({ additionalStops: [...stops, trimmed] })
    setStopInput('')
  }

  function removeStop(i: number) {
    onChange({ additionalStops: stops.filter((_, idx) => idx !== i) })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Route & timing</h2>
        <p className="text-zinc-500 mt-1">
          {isShuttle
            ? 'Enter the loop locations your guests will travel between.'
            : 'Where are you starting and where are you headed?'}
        </p>
      </div>

      {/* Pickup */}
      <div>
        <label htmlFor="pickup" className="block text-sm font-semibold text-zinc-700 mb-1.5">
          {isShuttle ? 'First location (start of loop)' : 'Pickup address'}{' '}
          <span className="text-red-500">*</span>
        </label>
        <input
          id="pickup"
          type="text"
          placeholder="e.g. The Biltmore Hotel, Coral Gables"
          value={draft.pickupAddress ?? ''}
          onChange={(e) => onChange({ pickupAddress: e.target.value })}
          className={[
            'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
            errors.pickupAddress ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
          ].join(' ')}
        />
        {errors.pickupAddress && (
          <p className="text-sm text-red-500 mt-1.5">{errors.pickupAddress}</p>
        )}
      </div>

      {/* Additional stops */}
      {stops.length > 0 && (
        <div className="space-y-2">
          {stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-2 bg-zinc-50 rounded-xl px-3.5 py-2.5 border border-zinc-200">
              <span className="text-sm text-zinc-700 flex-1">{stop}</span>
              <button
                type="button"
                onClick={() => removeStop(i)}
                className="text-zinc-400 hover:text-red-500 transition-colors"
                aria-label="Remove stop"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {stops.length < 3 && (
        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Add a stop{' '}
            <span className="font-normal text-zinc-400">(optional, up to 3)</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Wynwood Walls"
              value={stopInput}
              onChange={(e) => setStopInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addStop()}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 transition-colors"
            />
            <button
              type="button"
              onClick={addStop}
              className="px-4 py-2.5 bg-zinc-100 text-zinc-700 rounded-xl text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Drop-off (not for shuttle) */}
      {!isShuttle && (
        <div>
          <label htmlFor="dropoff" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            {isOneWay ? 'Drop-off address' : 'Final drop-off address'}{' '}
            <span className="text-red-500">*</span>
          </label>
          <input
            id="dropoff"
            type="text"
            placeholder="e.g. Perez Art Museum Miami"
            value={draft.dropoffAddress ?? ''}
            onChange={(e) => onChange({ dropoffAddress: e.target.value })}
            className={[
              'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
              errors.dropoffAddress ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
            ].join(' ')}
          />
          {errors.dropoffAddress && (
            <p className="text-sm text-red-500 mt-1.5">{errors.dropoffAddress}</p>
          )}
        </div>
      )}

      {/* Return trip toggle for one-way */}
      {isOneWay && (
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={draft.returnTrip ?? false}
            onChange={(e) => onChange({ returnTrip: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
          />
          <span className="text-sm text-zinc-700">
            We also need a return trip (vehicle comes back)
          </span>
        </label>
      )}

      {/* Time + hours */}
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
            className={[
              'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
              errors.startTime ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
            ].join(' ')}
          />
          {errors.startTime && (
            <p className="text-sm text-red-500 mt-1.5">{errors.startTime}</p>
          )}
        </div>

        {!isOneWay && (
          <div>
            <label htmlFor="hours" className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Number of hours <span className="text-red-500">*</span>
            </label>
            <input
              id="hours"
              type="number"
              min={minHours}
              max={16}
              placeholder={`Min. ${minHours} hours`}
              value={draft.hours ?? ''}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10)
                onChange({ hours: isNaN(n) ? undefined : n })
              }}
              className={[
                'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white text-zinc-900 transition-colors',
                errors.hours ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 focus:ring-zinc-900',
                'focus:outline-none focus:ring-2 focus:ring-offset-1',
              ].join(' ')}
            />
            {errors.hours && (
              <p className="text-sm text-red-500 mt-1.5">{errors.hours}</p>
            )}
            <p className="text-xs text-zinc-400 mt-1.5">
              Minimum {minHours} hours · Vehicle stays with you the full time
            </p>
          </div>
        )}
      </div>

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
