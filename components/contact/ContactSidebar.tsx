'use client'

import { trackPhoneClick, trackWhatsAppClick, trackCtaClick } from '@/lib/analytics'

const CONTACT_METHODS = [
  {
    label: 'Phone',
    value: '(786) 565-1088',
    href: 'tel:+17865651088',
    onClick: () => trackPhoneClick('contact-page'),
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'reservations@rumbatoursmiami.com',
    href: 'mailto:reservations@rumbatoursmiami.com',
    onClick: () => trackCtaClick('Email', 'contact-page'),
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: 'Message us directly',
    href: 'https://wa.me/17548005079',
    onClick: () => trackWhatsAppClick(),
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.527 5.853L.057 23.215a.75.75 0 0 0 .921.921l5.44-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.203-1.381l-.374-.214-3.875 1.057 1.032-3.768-.234-.389A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
]

export function ContactSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 space-y-5">
        <h2 className="text-sm font-semibold text-zinc-900">Prefer to reach us directly?</h2>
        {CONTACT_METHODS.map((method) => (
          <a
            key={method.label}
            href={method.href}
            onClick={method.onClick}
            target={method.href.startsWith('http') ? '_blank' : undefined}
            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-4 group"
          >
            <span className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:text-zinc-900 group-hover:border-zinc-400 transition-colors shrink-0">
              {method.icon}
            </span>
            <div>
              <p className="text-xs text-zinc-400 font-medium">{method.label}</p>
              <p className="text-sm font-semibold text-zinc-900 group-hover:underline underline-offset-2">
                {method.value}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6">
        <h2 className="text-sm font-semibold text-zinc-900 mb-1">Ready to book?</h2>
        <p className="text-sm text-zinc-500 mb-4">
          Skip the message and go straight to our booking funnel — get a price estimate in 2 minutes.
        </p>
        <a
          href="?book=1"
          onClick={() => trackCtaClick('Start Booking', 'contact-page')}
          className="block w-full text-center px-5 py-3 bg-zinc-900 text-white rounded-xl text-sm font-semibold hover:bg-zinc-700 transition-colors"
        >
          Start Booking →
        </a>
      </div>
    </div>
  )
}
