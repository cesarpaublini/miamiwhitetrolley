// ─── Promotion System ─────────────────────────────────────────────────────────
// Rolling weekly promotions with A/B variant support.
// Add new promotions to the PROMOTIONS array — no other changes needed.

export type PromoVariant = 'A' | 'B'

export interface Promotion {
  id: string
  label: string
  startDate: string    // YYYY-MM-DD — inclusive
  endDate: string      // YYYY-MM-DD — inclusive (expires 23:59:59)
  vehicleIds: string[]
  minHours: number
  discountA: number    // Variant A — shown to ~50% of visitors
  discountB: number    // Variant B — shown to other ~50% (set equal to A to disable A/B)
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
// Week 1: A/B test — Variant A = $120, Variant B = $100
// Week 2: $75 off (no A/B)
// Week 3–4: $50 off (no A/B)

export const PROMOTIONS: Promotion[] = [
  {
    id: 'apr-w1',
    label: 'April Special',
    startDate: '2026-04-02',
    endDate: '2026-04-08',
    vehicleIds: ['white-trolley', 'green-trolley'],
    minHours: 5,
    discountA: 120,
    discountB: 100,
  },
  {
    id: 'apr-w2',
    label: 'April Special',
    startDate: '2026-04-09',
    endDate: '2026-04-15',
    vehicleIds: ['white-trolley', 'green-trolley'],
    minHours: 5,
    discountA: 75,
    discountB: 75,
  },
  {
    id: 'apr-w3',
    label: 'April Special',
    startDate: '2026-04-16',
    endDate: '2026-04-22',
    vehicleIds: ['white-trolley', 'green-trolley'],
    minHours: 5,
    discountA: 50,
    discountB: 50,
  },
  {
    id: 'apr-w4',
    label: 'April Special',
    startDate: '2026-04-23',
    endDate: '2026-04-30',
    vehicleIds: ['white-trolley', 'green-trolley'],
    minHours: 5,
    discountA: 50,
    discountB: 50,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCurrentPromotion(): Promotion | null {
  const now = new Date()
  return (
    PROMOTIONS.find((p) => {
      const start = new Date(`${p.startDate}T00:00:00`)
      const end = new Date(`${p.endDate}T23:59:59`)
      return now >= start && now <= end
    }) ?? null
  )
}

export function getPromoEndDate(promo: Promotion): Date {
  return new Date(`${promo.endDate}T23:59:59`)
}

/**
 * Assigns and persists a variant for the lifetime of the visitor.
 * Client-side only — always returns 'B' during SSR.
 */
export function getPromoVariant(): PromoVariant {
  if (typeof window === 'undefined') return 'B'
  const stored = localStorage.getItem('mwt_promo_variant')
  if (stored === 'A' || stored === 'B') return stored
  const variant: PromoVariant = Math.random() < 0.5 ? 'A' : 'B'
  localStorage.setItem('mwt_promo_variant', variant)
  return variant
}

export function getDiscount(promo: Promotion, variant: PromoVariant): number {
  return variant === 'A' ? promo.discountA : promo.discountB
}

export function qualifiesForPromo(
  promo: Promotion,
  vehicleId: string | undefined,
  hours: number | undefined,
): boolean {
  if (!vehicleId || !hours) return false
  return promo.vehicleIds.includes(vehicleId) && hours >= promo.minHours
}

/** True when the two variants show different amounts (real A/B test week). */
export function isAbTest(promo: Promotion): boolean {
  return promo.discountA !== promo.discountB
}
