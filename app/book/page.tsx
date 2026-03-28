import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookFunnel } from '@/components/booking/BookFunnel'

export const metadata: Metadata = {
  title: 'Book Transportation | Miami White Trolley',
  description:
    'Get a free quote for wedding trolley rentals, sprinter vans, mini coaches, and more in Miami and South Florida. Tell us about your event and receive pricing in minutes.',
  alternates: { canonical: 'https://miamiwhitetrolley.com/book' },
  openGraph: {
    title: 'Book Transportation | Miami White Trolley',
    description: 'Get a free quote for wedding trolley rentals and group transportation in Miami.',
    url: 'https://miamiwhitetrolley.com/book',
    siteName: 'Miami White Trolley',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Book Transportation | Miami White Trolley',
    description: 'Get a free quote for wedding trolley rentals and group transportation in Miami.',
  },
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 py-12 flex items-center justify-center min-h-64">
          <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
        </div>
      }
    >
      <BookFunnel />
    </Suspense>
  )
}
