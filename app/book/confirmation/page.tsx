import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Received | Miami White Trolley',
  robots: { index: false },
}

function buildCalendarUrl(dateStr: string, vehicleName: string) {
  // dateStr is ISO YYYY-MM-DD — Google Calendar wants YYYYMMDD
  const compact = dateStr.replace(/-/g, '')
  const title = encodeURIComponent(`Miami White Trolley — ${vehicleName}`)
  const details = encodeURIComponent(
    'Your transportation booking with Miami White Trolley. Our team will confirm details within 24 hours.\n\nQuestions? Call (786) 565-1088 or WhatsApp wa.me/17548005079',
  )
  const location = encodeURIComponent('Miami, FL')
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${compact}/${compact}&details=${details}&location=${location}`
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; vehicle?: string }>
}) {
  const { date, vehicle } = await searchParams
  const vehicleName = vehicle ?? 'your vehicle'
  const calendarUrl = date ? buildCalendarUrl(date, vehicleName) : null

  // Format date for display: "Saturday, June 14, 2026"
  let displayDate: string | null = null
  if (date) {
    try {
      // Parse as local date (not UTC) to avoid off-by-one
      const [y, m, d] = date.split('-').map(Number)
      displayDate = new Date(y, m - 1, d).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      // ignore — date param may be malformed
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 sm:py-24">
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

      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">You&apos;re on our radar!</h1>
        {displayDate ? (
          <p className="text-zinc-500 mt-3 text-base leading-relaxed">
            Request received for <span className="font-semibold text-zinc-700">{vehicleName}</span> on{' '}
            <span className="font-semibold text-zinc-700">{displayDate}</span>. We&apos;ll be in touch within 24 hours.
          </p>
        ) : (
          <p className="text-zinc-500 mt-3 text-base leading-relaxed">
            We&apos;ll review your details and reach out within 24 hours to confirm availability and finalize pricing.
          </p>
        )}
      </div>

      {/* What happens next */}
      <div className="mt-8 bg-zinc-50 rounded-2xl border border-zinc-200 p-6 space-y-4">
        <h2 className="font-semibold text-zinc-900 text-sm">What happens next</h2>
        {[
          { icon: '🔍', text: 'Our team reviews your request and checks vehicle availability.' },
          { icon: '📞', text: 'We contact you by phone or email within 24 hours — usually the same day.' },
          { icon: '✍️', text: 'Once confirmed, we send a formal quote and collect a deposit to hold your date.' },
        ].map(({ icon, text }, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-lg leading-none mt-0.5">{icon}</span>
            <p className="text-sm text-zinc-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-3">
        {/* WhatsApp — primary soft CTA */}
        <a
          href="https://wa.me/17548005079"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-colors"
          style={{ backgroundColor: '#25d366' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.527 5.853L.057 23.215a.75.75 0 0 0 .921.921l5.44-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.203-1.381l-.374-.214-3.875 1.057 1.032-3.768-.234-.389A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Message us on WhatsApp
        </a>

        <div className="grid grid-cols-2 gap-3">
          {/* Call */}
          <a
            href="tel:+17865651088"
            className="flex items-center justify-center gap-2 py-3 border border-zinc-200 text-zinc-700 rounded-xl font-medium text-sm hover:border-zinc-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            Call us
          </a>

          {/* Add to Google Calendar */}
          {calendarUrl ? (
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 border border-zinc-200 text-zinc-700 rounded-xl font-medium text-sm hover:border-zinc-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Save the date
            </a>
          ) : (
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-3 border border-zinc-200 text-zinc-700 rounded-xl font-medium text-sm hover:border-zinc-400 transition-colors"
            >
              ← Back to Home
            </Link>
          )}
        </div>

        {calendarUrl && (
          <Link
            href="/"
            className="text-center text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            ← Back to Home
          </Link>
        )}
      </div>
    </div>
  )
}
