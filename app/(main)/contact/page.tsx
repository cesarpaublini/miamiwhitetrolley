import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactSidebar } from '@/components/contact/ContactSidebar'

export const metadata: Metadata = {
  title: 'Contact Miami White Trolley | Get a Quote',
  description:
    'Get in touch with Miami White Trolley. Ask a question, request a custom quote, or tell us about your event in Miami or South Florida.',
  alternates: { canonical: 'https://miamiwhitetrolley.com/contact' },
  openGraph: {
    title: 'Contact Miami White Trolley | Get a Quote',
    description: 'Ask a question or request a custom quote for your Miami wedding or event transportation.',
    url: 'https://miamiwhitetrolley.com/contact',
    siteName: 'Miami White Trolley',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Miami White Trolley | Get a Quote',
    description: 'Ask a question or request a custom quote for your Miami wedding or event transportation.',
  },
}

export default function ContactPage() {
  return (
    <main className="bg-white">
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <p className="text-sm font-semibold tracking-widest text-zinc-400 uppercase mb-3">
              Contact
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
              Have a question, a custom request, or just want to talk through your event? Send us a message and we&apos;ll get back to you within a few hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
            <ContactForm />
            <ContactSidebar />
          </div>
        </div>
      </section>
    </main>
  )
}
