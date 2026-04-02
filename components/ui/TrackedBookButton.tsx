'use client'

import Link from 'next/link'
import { trackCtaClick } from '@/lib/analytics'

interface TrackedBookButtonProps {
  label: string
  location: string
  size?: 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-sm',
}

export function TrackedBookButton({ label, location, size = 'lg', className = '' }: TrackedBookButtonProps) {
  return (
    <Link
      href="?book=1"
      onClick={() => trackCtaClick(label, location)}
      className={[
        'inline-flex items-center justify-center rounded-full font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'bg-[#222222] text-white hover:bg-[#000000] focus-visible:ring-[#222222] border border-transparent',
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {label}
    </Link>
  )
}
