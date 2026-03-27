import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Book Your Transportation | Miami White Trolley',
  description:
    'Get an instant price estimate and book Miami White Trolley for your wedding, quinceañera, or event.',
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Minimal booking header */}
      <header className="bg-white border-b border-zinc-200 shrink-0">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-base font-bold tracking-tight text-zinc-900">
            Miami White Trolley
          </Link>
          <a
            href="tel:+17865651088"
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Questions?{' '}
            <span className="font-medium text-zinc-900">(786) 565-1088</span>
          </a>
        </div>
      </header>

      {/* Funnel content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
