// ─── Booking Funnel — Vehicle Data ───────────────────────────────────────────
//
// Confirmed pricing (last updated: 2026-03-27):
//
//  White / Green Trolley   $350/hr   One-way $1,375   Gratuity 15%   Min 5h
//  Mini Coach              $250/hr   One-way $840      Gratuity 20%   Min 5h
//  Motorcoach              $210/hr   One-way $800      Gratuity 20%   Min 5h
//  Sprinter Van            $200/hr   One-way $525      Gratuity 20%   Min 5h
//  Classic Cars            $870 flat / 3h              Gratuity 20%   Includes champagne
//
// Classic cars (Lincoln Continental, Ford Model A, White Bentley,
//   White Rolls Royce, Black Rolls Royce) all share the same pricing.
//   They are surfaced as a single 'classic-car' vehicle in the funnel.
//   The specific model is chosen by the user in Step 4.

import type { BookingVehicle, ClassicCarOption } from './types'

// ─── Global booking constants ─────────────────────────────────────────────────

export const BOOKING_CONSTANTS = {
  DEFAULT_MIN_HOURS: 5,
  CLASSIC_CAR_MIN_HOURS: 3,
  // Warn (but don't block) if the event is sooner than this many days out
  RUSH_BOOKING_DAYS: 14,
  // Above this guest count, show "contact us" instead of vehicle recommendations
  // 125 covers 4 trolleys (120) and fits within 3 motorcoaches (165)
  MAX_GUESTS_SELF_SERVE: 125,
} as const

// ─── Vehicle definitions ──────────────────────────────────────────────────────

export const bookingVehicles: BookingVehicle[] = [
  // ── Trolleys ────────────────────────────────────────────────────────────────
  {
    id: 'white-trolley',
    name: 'White Trolley',
    capacityMin: 10,
    capacityMax: 30,
    gratuityRate: 0.15,
    pricingModel: 'hourly',
    hourlyRate: 350,
    oneWayPrice: 1375,
    flatRatePrice: 0,
    flatRateHours: 0,
    minHours: 5,
    image: '/images/white-trolley-transportation-miami.jpg',
    features: [
      'Up to 30 guests',
      'Open-air sides — ideal for Miami weather',
      'Most iconic vehicle for wedding photos',
      '5-hour minimum',
    ],
    badge: 'Most Popular',
    bestFor: ['hourly', 'shuttle'],
    occasions: ['wedding', 'prom', 'birthday'],
    available: true,
    fleetSlug: 'white-trolley',
  },
  {
    id: 'green-trolley',
    name: 'Green Trolley',
    capacityMin: 10,
    capacityMax: 30,
    gratuityRate: 0.15,
    pricingModel: 'hourly',
    hourlyRate: 350,
    oneWayPrice: 1375,
    flatRatePrice: 0,
    flatRateHours: 0,
    minHours: 5,
    image: '/images/trolley-rental-miami.jpg',
    features: [
      'Up to 30 guests',
      'Fully enclosed with A/C',
      'Vintage character — stands out at any event',
      '5-hour minimum',
    ],
    badge: null,
    bestFor: ['hourly', 'shuttle'],
    occasions: ['wedding', 'corporate', 'birthday', 'other'],
    available: true,
    fleetSlug: 'green-trolley',
  },

  // ── Sprinter Van ─────────────────────────────────────────────────────────────
  {
    id: 'sprinter-van',
    name: 'Sprinter Van',
    capacityMin: 1,
    capacityMax: 14,
    gratuityRate: 0.20,
    pricingModel: 'hourly',
    hourlyRate: 200,
    oneWayPrice: 525,
    flatRatePrice: 0,
    flatRateHours: 0,
    minHours: 5,
    image: '/images/sprinter-van-rental-miami.jpg',
    features: [
      'Up to 14 guests',
      'Climate-controlled luxury interior',
      'Flexible for small groups and VIP runs',
      '5-hour minimum',
    ],
    badge: null,
    bestFor: ['hourly', 'one-way'],
    occasions: ['wedding', 'corporate', 'birthday', 'other'],
    available: true,
    fleetSlug: 'sprinter-van',
  },

  // ── Mini Coach ───────────────────────────────────────────────────────────────
  {
    id: 'mini-coach',
    name: 'Mini Coach',
    capacityMin: 15,
    capacityMax: 36,
    gratuityRate: 0.20,
    pricingModel: 'hourly',
    hourlyRate: 250,
    oneWayPrice: 840,
    flatRatePrice: 0,
    flatRateHours: 0,
    minHours: 5,
    image: '/images/Minibus-south-florida-transportation.jpg',
    features: [
      'Up to 36 guests',
      'Premium seating with A/C',
      'Ideal for hotel loops and multi-stop runs',
      '5-hour minimum',
    ],
    badge: null,
    bestFor: ['hourly', 'shuttle'],
    occasions: ['wedding', 'corporate', 'birthday', 'other'],
    available: true,
    fleetSlug: 'mini-coach',
  },

  // ── Motorcoach ───────────────────────────────────────────────────────────────
  {
    id: 'motorcoach',
    name: 'Motorcoach',
    capacityMin: 25,
    capacityMax: 55,
    gratuityRate: 0.20,
    pricingModel: 'hourly',
    hourlyRate: 210,
    oneWayPrice: 800,
    flatRatePrice: 0,
    flatRateHours: 0,
    minHours: 5,
    image: '/images/motorcoach-rental-miami.jpg',
    features: [
      'Up to 55 guests',
      'Convention-grade comfort',
      'Reclining seats and full climate control',
      '5-hour minimum',
    ],
    badge: 'Best for Large Groups',
    bestFor: ['hourly', 'shuttle'],
    occasions: ['wedding', 'corporate', 'birthday', 'other'],
    available: true,
    fleetSlug: 'motorcoach',
  },

  // ── Classic Cars ─────────────────────────────────────────────────────────────
  // Single funnel entry representing all 5 models (same price, same purpose).
  // Specific model chosen in Step 4 via classicCarModel field.
  {
    id: 'classic-car',
    name: 'Classic Car',
    capacityMin: 1,
    capacityMax: 4,
    gratuityRate: 0.20,
    pricingModel: 'flat-rate',
    hourlyRate: 0,            // Not used — flat rate only
    oneWayPrice: 0,           // Not applicable for classic cars
    flatRatePrice: 870,       // $870 for 3 hours
    flatRateHours: 3,
    minHours: 3,
    image: '/images/lincoln-continental-classic-car-rental-miami.jpg',
    features: [
      '2–4 guests',
      '$870 flat rate — 3 hours included',
      'Champagne service included',
      'Choose from 5 iconic models',
    ],
    badge: 'Includes Champagne',
    bestFor: ['hourly'],      // Treated as hourly in funnel flow, but flat-rate priced
    occasions: ['wedding', 'birthday'],
    available: true,
    fleetSlug: 'classic-lincoln', // Links to Lincoln page by default
  },
]

// ─── Classic car individual models ───────────────────────────────────────────
// Shown in Step 4 when the user selects 'classic-car'.

export const classicCarOptions: ClassicCarOption[] = [
  {
    model: 'lincoln-continental',
    name: '1966 Lincoln Continental',
    image: '/images/lincoln-continental-classic-car-rental-miami.jpg',
    fleetSlug: 'classic-lincoln',
  },
  {
    model: 'ford-model-a',
    name: 'Ford Model A',
    image: '/images/lincoln-continental-classic-car-rental-miami.jpg', // TODO: replace with Ford Model A image
    fleetSlug: null,
  },
  {
    model: 'white-bentley',
    name: 'White Bentley',
    image: '/images/lincoln-continental-classic-car-rental-miami.jpg', // TODO: replace with Bentley image
    fleetSlug: null,
  },
  {
    model: 'white-rolls-royce',
    name: 'White Rolls Royce',
    image: '/images/lincoln-continental-classic-car-rental-miami.jpg', // TODO: replace with Rolls Royce image
    fleetSlug: null,
  },
  {
    model: 'black-rolls-royce',
    name: 'Black Rolls Royce',
    image: '/images/lincoln-continental-classic-car-rental-miami.jpg', // TODO: replace with Rolls Royce image
    fleetSlug: null,
  },
]

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getBookingVehicleById(id: string): BookingVehicle | undefined {
  return bookingVehicles.find((v) => v.id === id)
}

export function getAvailableBookingVehicles(): BookingVehicle[] {
  return bookingVehicles.filter((v) => v.available)
}
