// ─── Booking Funnel — Engine ──────────────────────────────────────────────────
// All business logic: price estimation, vehicle recommendations, step validation.
// Pure functions — no side effects, no API calls. Safe on client or server.

import { validateEmail, validatePhone } from '@/lib/validation'
import type {
  BookingDraft,
  BookingVehicle,
  ClassicCarModel,
  OccasionType,
  PriceRange,
  ServiceType,
  StepId,
  StepValidationResult,
  VehicleId,
  VehicleRecommendation,
} from './types'
import {
  BOOKING_CONSTANTS,
  bookingVehicles,
  getAvailableBookingVehicles,
} from './vehicles'

// ─── Price Estimation ─────────────────────────────────────────────────────────

/**
 * Estimate price for an hourly/shuttle booking.
 * Each vehicle has its own gratuityRate (0.15 for trolleys, 0.20 for all others).
 * The "high" adds 20% to the base to account for route complexity and peak dates.
 */
export function estimateHourlyPrice(
  vehicle: BookingVehicle,
  hours: number,
): PriceRange {
  const base = vehicle.hourlyRate * hours
  const high = base * 1.2

  return buildPriceRange(base, high, vehicle.gratuityRate)
}

/**
 * Price for a flat-rate vehicle (classic cars: $870 for 3 hours).
 * No range — price is fixed. Gratuity still applies.
 */
export function estimateFlatRatePrice(vehicle: BookingVehicle): PriceRange {
  const base = vehicle.flatRatePrice
  return buildPriceRange(base, base, vehicle.gratuityRate)
}

/**
 * One-way price — flat starting price + gratuity. No range.
 */
export function estimateOneWayPrice(vehicle: BookingVehicle): PriceRange {
  const base = vehicle.oneWayPrice
  return buildPriceRange(base, base, vehicle.gratuityRate)
}

function buildPriceRange(base: number, high: number, gratuityRate: number): PriceRange {
  return {
    low: Math.round(base),
    high: Math.round(high),
    gratuityRate,
    lowWithGratuity: Math.round(base * (1 + gratuityRate)),
    highWithGratuity: Math.round(high * (1 + gratuityRate)),
    isEstimate: true,
  }
}

/**
 * Get the right price estimate for a vehicle based on service type and hours.
 * Returns null if required inputs are missing.
 */
export function getPriceEstimate(
  vehicle: BookingVehicle,
  serviceType: ServiceType,
  hours?: number,
): PriceRange | null {
  if (vehicle.pricingModel === 'flat-rate') {
    return estimateFlatRatePrice(vehicle)
  }
  if (serviceType === 'one-way') {
    return estimateOneWayPrice(vehicle)
  }
  if (hours && hours >= vehicle.minHours) {
    return estimateHourlyPrice(vehicle, hours)
  }
  return null
}

// ─── Price Formatting ─────────────────────────────────────────────────────────

const usd = (n: number) => `$${n.toLocaleString('en-US')}`

/** "Est. $2,025 – $2,430 incl. gratuity" */
export function formatPriceRange(range: PriceRange): string {
  const gratuityPct = Math.round(range.gratuityRate * 100)
  if (range.lowWithGratuity === range.highWithGratuity) {
    return `${usd(range.lowWithGratuity)} incl. ${gratuityPct}% gratuity`
  }
  return `Est. ${usd(range.lowWithGratuity)} – ${usd(range.highWithGratuity)} incl. ${gratuityPct}% gratuity`
}

/** "Starting from $1,581" (one-way with gratuity) */
export function formatOneWayPrice(vehicle: BookingVehicle): string {
  const total = Math.round(vehicle.oneWayPrice * (1 + vehicle.gratuityRate))
  return `Starting from ${usd(total)} incl. gratuity`
}

/** "$870 flat rate · 3 hours · Champagne included" */
export function formatFlatRatePrice(vehicle: BookingVehicle): string {
  const total = Math.round(vehicle.flatRatePrice * (1 + vehicle.gratuityRate))
  return `${usd(total)} · ${vehicle.flatRateHours} hours incl. gratuity`
}

// ─── Vehicle Recommendation ───────────────────────────────────────────────────

/**
 * Returns up to 3 recommended vehicles ranked by fit.
 *
 * Scoring:
 *   +4  capacity fits well (guest count 60–100% of vehicle max)
 *   +3  capacity fits acceptably (guest count within range but under 60%)
 *   -99 vehicle cannot fit the group (hard disqualifier)
 *   +2  vehicle.bestFor includes the requested serviceType
 *   +2  vehicle.occasions includes the occasion
 *   +1  vehicle has a badge
 *
 * Classic cars (capacity 1–4) are only surfaced for small parties (≤4 guests)
 * AND wedding/quinceañera/birthday occasions, since they serve a different purpose.
 */
export function recommendVehicles(
  guestCount: number,
  serviceType: ServiceType,
  occasion?: OccasionType,
  hours?: number,
): VehicleRecommendation[] {
  const available = getAvailableBookingVehicles()

  // Vehicles that can be booked as multiple units, and their caps
  const MULTI_UNIT: Partial<Record<VehicleId, number>> = {
    'white-trolley': 4,
    'green-trolley': 4,
    'motorcoach': 3,
  }

  const scored = available.map((vehicle) => {
    let score = 0
    const reasonTags: string[] = []
    let units = 1

    // Classic car special rule: only show for very small groups on right occasions
    if (vehicle.id === 'classic-car') {
      const classicOccasions: OccasionType[] = ['wedding', 'birthday']
      if (
        guestCount > 4 ||
        (occasion && !classicOccasions.includes(occasion)) ||
        serviceType === 'shuttle'
      ) {
        return null
      }
    }

    // Multi-unit vehicles: calculate units needed instead of hard-filtering
    const maxUnits = MULTI_UNIT[vehicle.id]
    if (guestCount > vehicle.capacityMax) {
      if (maxUnits) {
        units = Math.ceil(guestCount / vehicle.capacityMax)
        if (units > maxUnits) return null
      } else {
        return null
      }
    }

    const effectiveCapacity = vehicle.capacityMax * units

    // Capacity scoring (based on effective capacity across all units)
    const fillPct = effectiveCapacity > 0 ? (guestCount / effectiveCapacity) * 100 : 0
    if (fillPct >= 60) {
      score += 4
      if (units > 1) {
        reasonTags.push(`${units}× ${vehicle.name} · up to ${effectiveCapacity} guests`)
      } else {
        reasonTags.push(`Right-sized for ${guestCount} guest${guestCount !== 1 ? 's' : ''}`)
      }
    } else if (guestCount >= vehicle.capacityMin) {
      score += 3
      reasonTags.push(`Fits up to ${effectiveCapacity} guests`)
    } else {
      score += 1
      reasonTags.push(`Fits up to ${effectiveCapacity} guests`)
    }

    // Service type fit
    if (vehicle.bestFor.includes(serviceType)) {
      score += 2
      const label: Record<ServiceType, string> = {
        hourly: 'hourly charters',
        shuttle: 'shuttle services',
        'one-way': 'one-way transfers',
      }
      reasonTags.push(`Great for ${label[serviceType]}`)
    }

    // Occasion fit
    if (occasion && vehicle.occasions.includes(occasion)) {
      score += 2
      const label: Record<OccasionType, string> = {
        wedding: 'weddings',
        corporate: 'corporate events',
        prom: 'proms',
        birthday: 'birthdays',
        other: 'your event',
      }
      reasonTags.push(`Popular for ${label[occasion]}`)
    }

    // Badge bonus
    if (vehicle.badge) score += 1

    // Price estimate — multiply by units for multi-trolley
    let priceRange = getPriceEstimate(vehicle, serviceType, hours)
    if (priceRange && units > 1) {
      priceRange = {
        low: priceRange.low * units,
        high: priceRange.high * units,
        gratuityRate: priceRange.gratuityRate,
        lowWithGratuity: priceRange.lowWithGratuity * units,
        highWithGratuity: priceRange.highWithGratuity * units,
        isEstimate: true,
      }
    }

    return { vehicle, score, reasonTags, priceRange, units }
  })

  return (scored.filter(Boolean) as NonNullable<(typeof scored)[number]>[])
    .sort((a, b) => b.score - a.score || b.vehicle.hourlyRate - a.vehicle.hourlyRate)
    .slice(0, 3)
    .map((r, i) => ({ ...r, rank: i + 1 }) as VehicleRecommendation)
}

/**
 * True when guestCount exceeds every available vehicle's max capacity.
 * Show a "contact us directly" message in this case.
 */
const MULTI_UNIT_MAX_CAPACITY: Partial<Record<VehicleId, number>> = {
  'white-trolley': 30 * 4,   // 4 trolleys = 120
  'green-trolley': 30 * 4,   // 4 trolleys = 120
  'motorcoach': 55 * 3,      // 3 motorcoaches = 165
}

export function isTooLargeForSelfServe(guestCount: number): boolean {
  if (guestCount > BOOKING_CONSTANTS.MAX_GUESTS_SELF_SERVE) return true
  return getAvailableBookingVehicles().every((v) => {
    const maxCapacity = MULTI_UNIT_MAX_CAPACITY[v.id] ?? v.capacityMax
    return guestCount > maxCapacity
  })
}

// ─── Step Validation ──────────────────────────────────────────────────────────

export function validateStep(step: StepId, draft: BookingDraft): StepValidationResult {
  const errors: StepValidationResult['errors'] = {}

  if (step === 1) {
    if (!draft.occasion) errors.occasion = 'Please select an occasion'
    if (!draft.date) {
      errors.date = 'Please select your event date'
    } else {
      const eventDate = new Date(draft.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (eventDate < today) errors.date = 'Event date cannot be in the past'
    }
    if (!draft.guestCount || draft.guestCount < 1) {
      errors.guestCount = 'Please enter your guest count'
    }
  }

  // Step 2 no longer used as a standalone screen — service type is handled in step 3

  if (step === 3) {
    // For non-wedding occasions, service type must be selected (shown inline)
    if (draft.occasion !== 'wedding' && !draft.serviceType) {
      errors.serviceType = 'Please select a service type'
    }
    if (!draft.pickupAddress || draft.pickupAddress.trim().length < 3) {
      errors.pickupAddress = 'Please enter a pickup location'
    }
    // Shuttles loop between locations — drop-off is optional
    if (
      draft.serviceType !== 'shuttle' &&
      (!draft.dropoffAddress || draft.dropoffAddress.trim().length < 3)
    ) {
      errors.dropoffAddress = 'Please enter a drop-off location'
    }
    if (!draft.startTime) {
      errors.startTime = 'Please enter a start time'
    }
    if (draft.serviceType !== 'one-way') {
      const minHours = BOOKING_CONSTANTS.DEFAULT_MIN_HOURS
      if (!draft.hours) {
        errors.hours = 'Please select the number of hours'
      } else if (draft.hours < minHours) {
        errors.hours = `Minimum booking is ${minHours} hours`
      }
    }
  }

  if (step === 4) {
    if (!draft.vehicleId) errors.vehicleId = 'Please select a vehicle'
    // classicCarModel is optional — team confirms specific model availability
  }

  if (step === 5) {
    if (!draft.firstName?.trim()) errors.firstName = 'Please enter your first name'
    if (!draft.lastName?.trim()) errors.lastName = 'Please enter your last name'
    const emailError = validateEmail(draft.email ?? '')
    if (emailError) errors.email = emailError

    const phoneError = validatePhone(draft.phone ?? '')
    if (phoneError) errors.phone = phoneError
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

// ─── Draft → Submission ───────────────────────────────────────────────────────

export function draftToSubmission(draft: BookingDraft) {
  return {
    occasion: draft.occasion!,
    date: draft.date!,
    guestCount: draft.guestCount!,
    city: draft.city!,
    serviceType: draft.serviceType!,
    pickupAddress: draft.pickupAddress!,
    dropoffAddress: draft.dropoffAddress ?? '',
    additionalStops: draft.additionalStops ?? [],
    startTime: draft.startTime!,
    hours: draft.serviceType === 'one-way' ? null : (draft.hours ?? null),
    returnTrip: draft.returnTrip ?? false,
    vehicleId: draft.vehicleId as VehicleId,
    vehicleName: draft.vehicleUnits && draft.vehicleUnits > 1
      ? `${draft.vehicleUnits}× ${draft.vehicleName ?? ''}`
      : (draft.vehicleName ?? ''),
    classicCarModel: (draft.classicCarModel ?? null) as ClassicCarModel | null,
    estimatedRange: draft.estimatedRange ?? null,
    firstName: draft.firstName!,
    lastName: draft.lastName!,
    email: draft.email!,
    phone: draft.phone!,
    notes: draft.notes ?? '',
    submittedAt: new Date().toISOString(),
    source: 'booking-funnel' as const,
  }
}

// ─── Utility flags ────────────────────────────────────────────────────────────

export function isRushBooking(date: string): boolean {
  const eventDate = new Date(date)
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() + BOOKING_CONSTANTS.RUSH_BOOKING_DAYS)
  return eventDate <= cutoff
}

// ─── Display labels ───────────────────────────────────────────────────────────

export const OCCASION_LABELS: Record<OccasionType, string> = {
  wedding: 'Wedding',
  corporate: 'Corporate',
  prom: 'Prom',
  birthday: 'Birthday',
  other: 'Other',
}

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  hourly: 'Hourly Charter',
  shuttle: 'Shuttle Service',
  'one-way': 'One-Way Transfer',
}

export const SERVICE_TYPE_DESCRIPTIONS: Record<ServiceType, string> = {
  hourly:
    'The vehicle is yours for a set number of hours. Flexible and on-demand — ideal for weddings, celebrations, and events where you need transportation throughout the day.',
  shuttle:
    'Continuous loops between two or more locations, keeping guests moving between hotel, ceremony, and reception without waiting.',
  'one-way':
    'A single trip from point A to point B. Great for airport arrivals, venue transfers, or any moment that only needs one direction.',
}
