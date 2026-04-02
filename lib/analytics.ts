// ─── Analytics — typed GA4 event helpers ──────────────────────────────────────
// Safe to call any time: no-ops if gtag hasn't loaded yet.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
  }
}

function track(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params ?? {})
  }
}

function fbtrack(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params ?? {})
  }
}

// ─── Booking funnel ───────────────────────────────────────────────────────────

export function trackBookModalOpen() {
  track('book_modal_open')
  fbtrack('InitiateCheckout')
}

export function trackFunnelStepComplete(step: number, stepName: string) {
  track('funnel_step_complete', { step_number: step, step_name: stepName })
}

export function trackOccasionSelected(occasion: string) {
  track('occasion_selected', { occasion })
}

export function trackVehicleSelected(vehicleId: string, vehicleName: string, units: number) {
  track('vehicle_selected', { vehicle_id: vehicleId, vehicle_name: vehicleName, units })
}

export function trackBookingSubmitted(params: {
  occasion: string
  vehicleId: string
  vehicleName: string
  serviceType: string
}) {
  track('booking_submitted', params)
  fbtrack('Lead', { content_name: params.vehicleName, content_category: params.occasion })
}

// ─── Contact form ─────────────────────────────────────────────────────────────

export function trackContactFormSubmitted() {
  track('contact_form_submitted')
  fbtrack('Contact')
}

// ─── CTAs / engagement ───────────────────────────────────────────────────────

export function trackWhatsAppClick() {
  track('whatsapp_click')
}

export function trackCtaClick(label: string, location: string) {
  track('cta_click', { label, location })
  fbtrack('ViewContent', { content_name: label, content_category: location })
}

export function trackPhoneClick(location: string) {
  track('phone_click', { location })
}

export function trackServiceTypeSelected(serviceType: string) {
  track('service_type_selected', { service_type: serviceType })
}

export function trackFAQOpen(question: string) {
  track('faq_open', { question })
}

export function trackFunnelAbandoned(lastStep: number) {
  track('funnel_abandoned', { last_step: lastStep })
}

export function trackFunnelStepViewed(step: number, stepName: string) {
  track('funnel_step_viewed', { step_number: step, step_name: stepName })
}

export function trackFleetLinkClick(vehicleId: string) {
  track('fleet_link_click', { vehicle_id: vehicleId })
}
