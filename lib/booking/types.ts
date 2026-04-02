// ─── Booking Funnel — Shared Types ───────────────────────────────────────────

// ─── Enums / Unions ──────────────────────────────────────────────────────────

export type OccasionType =
  | 'wedding'
  | 'corporate'
  | 'prom'
  | 'birthday'
  | 'other'

export type ServiceType =
  | 'hourly'     // Vehicle is yours for N hours — most common
  | 'shuttle'    // Continuous loops between locations for guests
  | 'one-way'   // Single trip from A → B, flat rate

export type VehicleId =
  | 'white-trolley'
  | 'green-trolley'
  | 'sprinter-van'
  | 'mini-coach'
  | 'motorcoach'
  | 'classic-car'   // Represents all classic cars — specific model chosen in step 4

// Specific model chosen when vehicleId === 'classic-car'
export type ClassicCarModel =
  | 'lincoln-continental'
  | 'ford-model-a'
  | 'white-bentley'
  | 'white-rolls-royce'
  | 'black-rolls-royce'

// How a vehicle is priced
export type PricingModel =
  | 'hourly'      // rate × hours, subject to minHours
  | 'flat-rate'   // fixed price that includes a set number of hours

// ─── Price ───────────────────────────────────────────────────────────────────

export interface PriceRange {
  low: number              // Base estimated low (before gratuity)
  high: number             // Base estimated high (before gratuity)
  gratuityRate: number     // Vehicle-specific: 0.15 for trolleys, 0.20 for all others
  lowWithGratuity: number
  highWithGratuity: number
  isEstimate: true         // Always true — final price confirmed by team
}

// ─── Vehicle (booking context) ───────────────────────────────────────────────

export interface BookingVehicle {
  id: VehicleId
  name: string
  capacityMin: number
  capacityMax: number
  gratuityRate: number        // 0.15 or 0.20 — varies per vehicle group

  // Pricing — depends on pricingModel
  pricingModel: PricingModel
  hourlyRate: number          // Used when pricingModel === 'hourly'
  oneWayPrice: number         // Flat price for one-way transfers
  flatRatePrice: number       // Used when pricingModel === 'flat-rate'
  flatRateHours: number       // Hours included in the flat rate (e.g. 3 for classic cars)
  minHours: number            // Minimum booking hours (5 for most, 3 for classic cars)

  image: string
  features: string[]          // 3–4 short selling points shown in funnel
  badge: string | null
  bestFor: ServiceType[]
  occasions: OccasionType[]
  available: boolean
  fleetSlug: string | null    // Links to /fleet/[slug] detail page
}

// ─── Classic car sub-model ───────────────────────────────────────────────────

export interface ClassicCarOption {
  model: ClassicCarModel
  name: string
  image: string
  fleetSlug: string | null
}

// ─── Booking Draft (funnel state) ────────────────────────────────────────────
// All fields optional — filled progressively as user moves through steps.

export interface BookingDraft {
  // Step 1 — Event basics
  occasion?: OccasionType
  date?: string            // ISO: YYYY-MM-DD
  guestCount?: number
  city?: string

  // Step 2 — Service type
  serviceType?: ServiceType

  // Step 3 — Route & timing
  pickupAddress?: string
  dropoffAddress?: string
  additionalStops?: string[]   // Up to 3 extra stops
  startTime?: string           // HH:MM (24h)
  hours?: number               // For hourly + shuttle
  returnTrip?: boolean         // For one-way: does vehicle need to come back?

  // Step 4 — Vehicle selection
  vehicleId?: VehicleId
  vehicleName?: string
  vehicleUnits?: number              // >1 for multi-trolley bookings
  classicCarModel?: ClassicCarModel  // Only set when vehicleId === 'classic-car'
  estimatedRange?: PriceRange

  // Step 5 — Contact
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  notes?: string
}

// ─── Booking Submission (final payload → API) ─────────────────────────────────

export interface BookingSubmission {
  occasion: OccasionType
  date: string
  guestCount: number
  city: string
  serviceType: ServiceType
  pickupAddress: string
  dropoffAddress: string
  additionalStops: string[]
  startTime: string
  hours: number | null          // null for one-way and classic car flat rate
  returnTrip: boolean
  vehicleId: VehicleId
  vehicleName: string
  classicCarModel: ClassicCarModel | null
  estimatedRange: PriceRange | null
  firstName: string
  lastName: string
  email: string
  phone: string
  notes: string
  submittedAt: string
  source: 'booking-funnel'
}

// ─── Step validation ──────────────────────────────────────────────────────────

export type StepId = 1 | 2 | 3 | 4 | 5

export interface StepValidationResult {
  valid: boolean
  errors: Partial<Record<keyof BookingDraft, string>>
}

// ─── Vehicle Recommendation ───────────────────────────────────────────────────

export interface VehicleRecommendation {
  vehicle: BookingVehicle
  rank: number
  reasonTags: string[]
  priceRange: PriceRange | null  // null for one-way (show flat price instead)
  units: number                  // >1 for multi-trolley bookings
}
