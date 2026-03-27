import { Suspense } from 'react'
import { BookFunnel } from '@/components/booking/BookFunnel'

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
