'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { BookingDraft, VehicleRecommendation } from '@/lib/booking/types'
import { recommendVehicles, isTooLargeForSelfServe } from '@/lib/booking/engine'
import { classicCarOptions } from '@/lib/booking/vehicles'
import { validateStep } from '@/lib/booking/engine'

interface StepVehicleSelectProps {
  draft: BookingDraft
  onChange: (updates: Partial<BookingDraft>) => void
  onNext: () => void
  onBack: () => void
}

export function StepVehicleSelect({ draft, onChange, onNext, onBack }: StepVehicleSelectProps) {
  const validation = validateStep(4, draft)
  const errors = validation.errors

  const guestCount = draft.guestCount ?? 0
  const tooLarge = isTooLargeForSelfServe(guestCount)

  const recommendations: VehicleRecommendation[] = draft.serviceType
    ? recommendVehicles(guestCount, draft.serviceType, draft.occasion, draft.hours)
    : []

  if (tooLarge) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Let&apos;s talk directly</h2>
          <p className="text-zinc-500 mt-1">
            For groups over 55, we coordinate custom multi-vehicle solutions.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm text-amber-800 font-medium mb-1">Large group detected</p>
          <p className="text-sm text-amber-700">
            With {guestCount} guests, we&apos;ll need to put together a custom quote with multiple vehicles.
            Our team responds within a few hours.
          </p>
        </div>
        <a
          href="tel:+17865651088"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900 text-white rounded-xl font-semibold text-sm hover:bg-zinc-700 transition-colors"
        >
          Call (786) 565-1088 →
        </a>
        <button
          type="button"
          onClick={onBack}
          className="block text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          ← Change guest count
        </button>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Choose your vehicle</h2>
          <p className="text-zinc-500 mt-1">No exact matches found — please go back and adjust your details.</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-zinc-200 text-zinc-700 rounded-xl font-medium text-sm hover:border-zinc-400 transition-colors"
        >
          ← Back
        </button>
      </div>
    )
  }

  function formatPriceTeaser(rec: VehicleRecommendation): string {
    const gratuityPct = Math.round(rec.vehicle.gratuityRate * 100)
    if (rec.vehicle.pricingModel === 'flat-rate') {
      return `$${rec.vehicle.flatRatePrice} flat · ${rec.vehicle.flatRateHours} hrs · incl. champagne`
    }
    if (draft.serviceType === 'one-way') {
      return `From $${rec.vehicle.oneWayPrice.toLocaleString('en-US')} · ${gratuityPct}% gratuity`
    }
    const rate = rec.vehicle.hourlyRate * rec.units
    return `From $${rate.toLocaleString('en-US')}/hr · ${gratuityPct}% gratuity`
  }

  const isClassicSelected = draft.vehicleId === 'classic-car'

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Choose your vehicle</h2>
        <p className="text-zinc-500 mt-1">
          Matched for {guestCount} guest{guestCount !== 1 ? 's' : ''} · prices include gratuity estimate
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const isSelected = draft.vehicleId === rec.vehicle.id

          return (
            <button
              key={rec.vehicle.id}
              type="button"
              onClick={() =>
                onChange({
                  vehicleId: rec.vehicle.id,
                  vehicleName: rec.vehicle.name,
                  vehicleUnits: rec.units,
                  estimatedRange: rec.priceRange ?? undefined,
                  classicCarModel: rec.vehicle.id !== 'classic-car' ? undefined : draft.classicCarModel,
                })
              }
              className={[
                'w-full flex gap-4 p-4 rounded-xl border text-left transition-all',
                isSelected
                  ? 'border-zinc-900 ring-2 ring-zinc-900 bg-white'
                  : 'border-zinc-200 bg-white hover:border-zinc-400',
              ].join(' ')}
            >
              {/* Vehicle image */}
              <div className="relative w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-100">
                <Image
                  src={rec.vehicle.image}
                  alt={rec.vehicle.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    {rec.rank === 1 && (
                      <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 mb-1">
                        Best Match
                      </span>
                    )}
                    {rec.vehicle.badge && rec.rank !== 1 && (
                      <span className="inline-block text-xs font-medium text-zinc-600 bg-zinc-100 rounded-full px-2 py-0.5 mb-1">
                        {rec.vehicle.badge}
                      </span>
                    )}
                    <p className="font-semibold text-zinc-900">
                      {rec.units > 1 ? `${rec.units}× ${rec.vehicle.name}` : rec.vehicle.name}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-zinc-500">{formatPriceTeaser(rec)}</p>
                  </div>
                </div>

                {/* Reason tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {rec.reasonTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-full px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Fleet page link */}
                {rec.vehicle.fleetSlug && (
                  <Link
                    href={`/fleet/${rec.vehicle.fleetSlug}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2 mt-2 inline-block transition-colors"
                  >
                    View photos & details ↗
                  </Link>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Classic car model picker */}
      {isClassicSelected && (
        <div>
          <p className="text-sm font-semibold text-zinc-700 mb-3">Which model? (optional — team confirms availability)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {classicCarOptions.map((opt) => {
              const isSelected = draft.classicCarModel === opt.model
              return (
                <button
                  key={opt.model}
                  type="button"
                  onClick={() => onChange({ classicCarModel: opt.model })}
                  className={[
                    'px-3 py-2.5 rounded-xl border text-sm font-medium text-left transition-all',
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400',
                  ].join(' ')}
                >
                  {opt.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {errors.vehicleId && (
        <p className="text-sm text-red-500">{errors.vehicleId}</p>
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
          Continue to Contact →
        </button>
      </div>
    </div>
  )
}
