import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { BookingModal } from '@/components/booking/BookingModal'
import { CookieBanner } from '@/components/ui/CookieBanner'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      <BookingModal />
      <CookieBanner />
    </>
  )
}
