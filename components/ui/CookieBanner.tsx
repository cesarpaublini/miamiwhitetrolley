'use client'

import { useState, useEffect } from 'react'

const CONSENT_KEY = 'mwt_cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-5 pointer-events-none">
      <div className="max-w-2xl mx-auto bg-white border border-zinc-200 rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 pointer-events-auto">
        <p className="text-sm text-zinc-600 flex-1 leading-relaxed">
          We use cookies to improve your experience and analyze site traffic.{' '}
          <a
            href="https://www.privacypolicies.com/live/placeholder"
            className="underline underline-offset-2 hover:text-zinc-900 transition-colors"
          >
            Privacy Policy
          </a>
        </p>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={decline}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-zinc-600 border border-zinc-200 rounded-xl hover:border-zinc-400 transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="flex-1 sm:flex-none px-5 py-2 text-sm font-semibold text-white bg-zinc-900 rounded-xl hover:bg-zinc-700 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
