'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  getCurrentPromotion,
  getPromoEndDate,
  getPromoVariant,
  getDiscount,
} from '@/lib/promotions'
import { trackCtaClick, trackPromoView } from '@/lib/analytics'

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number } | null

function calcTimeLeft(endDate: Date): TimeLeft {
  const diff = endDate.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [promoId, setPromoId] = useState('')
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null)

  // Hydrate on mount — reads localStorage, sets up promo state
  useEffect(() => {
    const promo = getCurrentPromotion()
    if (!promo) return

    const dismissKey = `mwt_bar_${promo.id}`
    if (localStorage.getItem(dismissKey) === '1') return

    const variant = getPromoVariant()
    const amount = getDiscount(promo, variant)
    const end = getPromoEndDate(promo)

    setDiscount(amount)
    setPromoId(promo.id)
    setEndDate(end)
    setTimeLeft(calcTimeLeft(end))
    setVisible(true)

    trackPromoView(promo.id, variant, amount)
  }, [])

  // Tick every second once mounted
  useEffect(() => {
    if (!endDate || !visible) return
    const timer = setInterval(() => {
      const left = calcTimeLeft(endDate)
      setTimeLeft(left)
      if (!left) setVisible(false)
    }, 1_000)
    return () => clearInterval(timer)
  }, [endDate, visible])

  function dismiss() {
    if (promoId) localStorage.setItem(`mwt_bar_${promoId}`, '1')
    setVisible(false)
  }

  if (!visible || !timeLeft) return null

  const { days, hours, minutes, seconds } = timeLeft
  const countdown =
    days > 0
      ? `${days}d ${pad(hours)}h ${pad(minutes)}m left`
      : `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s left`

  return (
    <div className="relative bg-zinc-900 text-white text-sm py-2.5 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 pr-8">
        <span aria-hidden="true">🎉</span>

        <p className="text-center leading-snug">
          <span className="font-bold">${discount} off trolley rentals</span>
          <span className="text-zinc-400 mx-2 hidden sm:inline">·</span>
          <span className="text-zinc-300 hidden sm:inline">5+ hours · trolleys only · </span>
          <Link
            href="?book=1"
            onClick={() => trackCtaClick(`Claim $${discount} off`, 'announcement-bar')}
            className="font-semibold underline underline-offset-2 hover:text-zinc-300 transition-colors"
          >
            Claim offer →
          </Link>
        </p>

        {/* Countdown pill */}
        <span className="hidden sm:flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-white">
          <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
          </svg>
          {countdown}
        </span>
      </div>

      {/* Dismiss */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss promotion"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
