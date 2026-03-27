import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Received | Miami White Trolley',
}

export default function ConfirmationPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      {/* Checkmark */}
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Request received!</h1>
      <p className="text-zinc-500 mt-3 text-lg">
        We&apos;ll review your details and reach out within 24 hours to confirm availability and
        finalize pricing.
      </p>

      <div className="mt-8 bg-zinc-50 rounded-2xl border border-zinc-200 p-6 text-left space-y-3">
        <h2 className="font-semibold text-zinc-900 text-sm">What happens next?</h2>
        {[
          'Our team reviews your request and checks vehicle availability.',
          'We contact you by phone or email within 24 hours — usually the same day.',
          'Once confirmed, we send a formal quote and collect a deposit to hold your date.',
        ].map((step, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-zinc-600">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="tel:+17865651088"
          className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-semibold text-sm hover:bg-zinc-700 transition-colors"
        >
          Call (786) 565-1088
        </a>
        <Link
          href="/"
          className="px-6 py-3 border border-zinc-200 text-zinc-700 rounded-xl font-medium text-sm hover:border-zinc-400 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
