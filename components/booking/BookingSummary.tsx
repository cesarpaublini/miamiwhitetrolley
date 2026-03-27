'use client'

import { OCCASION_LABELS, SERVICE_TYPE_LABELS } from '@/lib/booking/engine'
import { getBookingVehicleById } from '@/lib/booking/vehicles'
import type { BookingDraft } from '@/lib/booking/types'

interface BookingSummaryProps {
  draft: BookingDraft
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs text-zinc-500 uppercase tracking-wide">{label}</dt>
      <dd className="text-sm font-medium text-zinc-900">{value}</dd>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTime(hhmm: string) {
  const [hStr, mStr] = hhmm.split(':')
  const h = parseInt(hStr, 10)
  const m = mStr
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${m} ${ampm}`
}

export function BookingSummary({ draft }: BookingSummaryProps) {
  const vehicle = draft.vehicleId ? getBookingVehicleById(draft.vehicleId) : null

  const hasAnything = draft.occasion || draft.date || draft.guestCount || draft.serviceType || draft.vehicleId

  if (!hasAnything) {
    return (
      <aside className="bg-white rounded-xl border border-zinc-200 p-5">
        <h2 className="text-sm font-semibold text-zinc-900 mb-3">Your Booking</h2>
        <p className="text-sm text-zinc-400 italic">
          Fill in your event details and we&apos;ll build your quote as you go.
        </p>
      </aside>
    )
  }

  return (
    <aside className="bg-white rounded-xl border border-zinc-200 p-5">
      <h2 className="text-sm font-semibold text-zinc-900 mb-4">Your Booking</h2>
      <dl className="flex flex-col gap-4">
        {draft.occasion && (
          <Row label="Occasion" value={OCCASION_LABELS[draft.occasion]} />
        )}
        {draft.date && (
          <Row label="Date" value={formatDate(draft.date)} />
        )}
        {draft.guestCount && (
          <Row label="Guests" value={`${draft.guestCount} guests`} />
        )}
        {draft.city && (
          <Row label="City" value={draft.city} />
        )}
        {draft.serviceType && (
          <Row label="Service" value={SERVICE_TYPE_LABELS[draft.serviceType]} />
        )}
        {draft.hours && draft.serviceType !== 'one-way' && (
          <Row label="Duration" value={`${draft.hours} hours`} />
        )}
        {draft.startTime && (
          <Row label="Start Time" value={formatTime(draft.startTime)} />
        )}
        {vehicle && (
          <Row
            label="Vehicle"
            value={
              draft.vehicleUnits && draft.vehicleUnits > 1
                ? `${draft.vehicleUnits}× ${vehicle.name}`
                : vehicle.name
            }
          />
        )}
        {draft.classicCarModel && (
          <Row
            label="Model"
            value={draft.classicCarModel
              .split('-')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')}
          />
        )}
      </dl>

      {draft.vehicleId && (
        <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
          </svg>
          <p className="text-xs text-zinc-500">
            Your full quote will be in your confirmation email.
          </p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center gap-2">
        <svg className="w-4 h-4 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <p className="text-xs text-zinc-400">
          No payment required — we&apos;ll confirm availability and finalize pricing.
        </p>
      </div>
    </aside>
  )
}
