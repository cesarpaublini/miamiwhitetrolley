// Shared form field validators — used by booking funnel and contact form.

const FAKE_EMAIL_DOMAINS = new Set([
  'test.com', 'example.com', 'fake.com', 'sample.com',
  'mailinator.com', 'guerrillamail.com', 'guerrillamailblock.com',
  'temp-mail.org', 'throwam.com', 'fakeinbox.com',
  'yopmail.com', 'sharklasers.com', 'spam4.me',
  'trashmail.com', 'dispostable.com', 'mailnull.com',
  'spamgourmet.com', 'trashmail.me', 'getairmail.com',
  'tempmail.com', 'tempr.email', 'discard.email',
])

export function validateEmail(email: string): string | null {
  const trimmed = email.trim()
  if (!trimmed) return 'Please enter your email address'

  // Require: 2+ chars before @, valid domain, TLD of 2+ letters
  if (!/^[^\s@]{2,}@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
    return 'Please enter a valid email address'
  }

  const parts = trimmed.toLowerCase().split('@')
  const local = parts[0]
  const domain = parts[1]

  // Block known disposable / fake domains
  if (FAKE_EMAIL_DOMAINS.has(domain)) {
    return 'Please use a real email address'
  }

  // Block local parts that are 4+ of the same character (e.g. aaaa@gmail.com)
  if (/^(.)\1{3,}$/.test(local)) {
    return 'Please use a real email address'
  }

  return null
}

export function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '')

  // Strip leading US country code if present
  const normalized =
    digits.startsWith('1') && digits.length === 11 ? digits.slice(1) : digits

  if (normalized.length !== 10) {
    return 'Please enter a valid 10-digit phone number'
  }

  // NANP: area code and exchange code cannot start with 0 or 1
  if (normalized[0] === '0' || normalized[0] === '1') {
    return 'Please enter a valid phone number'
  }
  if (normalized[3] === '0' || normalized[3] === '1') {
    return 'Please enter a valid phone number'
  }

  // Reject all-same digit (e.g. 5555555555)
  if (/^(\d)\1{9}$/.test(normalized)) {
    return 'Please enter a real phone number'
  }

  // Reject obvious sequential fillers
  if (normalized === '1234567890' || normalized === '0987654321' || normalized === '9876543210') {
    return 'Please enter a real phone number'
  }

  return null
}
