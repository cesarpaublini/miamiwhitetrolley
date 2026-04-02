'use client'

import { useState, useEffect } from 'react'
import { getCurrentPromotion, getPromoVariant, getDiscount } from '@/lib/promotions'

export function PromoHeroBadge() {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    const promo = getCurrentPromotion()
    if (!promo) return
    const variant = getPromoVariant()
    const amount = getDiscount(promo, variant)
    setText(`April Special — $${amount} off · trolley rentals · 5-hour minimum`)
  }, [])

  if (!text) return null

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
      <p className="text-xs font-semibold text-emerald-800">{text}</p>
    </div>
  )
}
