'use client'

import { useState } from 'react'
import { validateEmail, validatePhone } from '@/lib/validation'
import { trackContactFormSubmitted } from '@/lib/analytics'

type Status = 'idle' | 'loading' | 'success' | 'error'

type FormFields = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState<FormFields>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  function set(field: keyof FormFields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      // Clear error on change
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(): FormErrors {
    const e: FormErrors = {}

    if (!form.name.trim() || form.name.trim().length < 2) {
      e.name = 'Please enter your name'
    }

    const emailError = validateEmail(form.email)
    if (emailError) e.email = emailError

    if (form.phone.trim()) {
      const phoneError = validatePhone(form.phone)
      if (phoneError) e.phone = phoneError
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      e.message = 'Please enter a message (at least 10 characters)'
    }

    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const fieldErrors = validate()
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) trackContactFormSubmitted()
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field: keyof FormFields) =>
    [
      'w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors placeholder:text-zinc-400',
      errors[field]
        ? 'border-red-400 focus:ring-red-400'
        : 'border-zinc-200 focus:ring-zinc-900',
    ].join(' ')

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 mb-2">Message sent!</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          We got your message and will reply within a few hours. If it&apos;s urgent, call us at{' '}
          <a href="tel:+17865651088" className="font-semibold text-zinc-900 underline underline-offset-2">
            (786) 565-1088
          </a>.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setForm({ name: '', email: '', phone: '', subject: '', message: '' })
            setErrors({})
          }}
          className="mt-6 text-sm font-semibold text-zinc-500 hover:text-zinc-900 underline underline-offset-2 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Maria Rodriguez"
            value={form.name}
            onChange={set('name')}
            className={inputClass('name')}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1.5">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-zinc-700 mb-1.5">
            Phone <span className="font-normal text-zinc-400">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(786) 555-0100"
            value={form.phone}
            onChange={set('phone')}
            className={inputClass('phone')}
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1.5">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="maria@gmail.com"
          value={form.email}
          onChange={set('email')}
          className={inputClass('email')}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1.5">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-zinc-700 mb-1.5">
          Subject
        </label>
        <select
          id="subject"
          value={form.subject}
          onChange={set('subject')}
          className={`${inputClass('subject')} bg-white`}
        >
          <option value="">Select a topic</option>
          <option>General question</option>
          <option>Custom quote</option>
          <option>Existing booking</option>
          <option>Partnership / Vendor</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-zinc-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your event, question, or request..."
          value={form.message}
          onChange={set('message')}
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p className="text-sm text-red-500 mt-1.5">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          Something went wrong. Please try again or call us at (786) 565-1088.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 bg-zinc-900 text-white rounded-xl font-semibold text-sm hover:bg-zinc-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
