import type { Metadata } from 'next'
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { LifestyleGallerySection } from "@/components/sections/LifestyleGallerySection";
import { LuxuryFleetSection } from "@/components/sections/LuxuryFleetSection";
import { ServiceAreasShowcaseSection } from "@/components/sections/ServiceAreasShowcaseSection";
import { ServiceShowcaseSection } from "@/components/sections/ServiceShowcaseSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustSection } from "@/components/sections/TrustSection";
import { WhyChooseMiamiSection } from "@/components/sections/WhyChooseMiamiSection";

const BASE = 'https://miamiwhitetrolley.com'

export const metadata: Metadata = {
  title: 'Miami White Trolley | Wedding & Event Transportation Miami',
  description:
    'Premium white trolley rentals and luxury group transportation for weddings, quinceañeras, corporate events, and private charters in Miami and South Florida. 5-star rated · 200+ events.',
  alternates: { canonical: BASE },
  openGraph: {
    title: 'Miami White Trolley | Wedding & Event Transportation Miami',
    description: 'Elegant white trolleys, sprinter vans, and coaches for weddings and events across Miami and South Florida.',
    url: BASE,
    siteName: 'Miami White Trolley',
    locale: 'en_US',
    type: 'website',
    images: [{ url: `${BASE}/images/white-wedding-trolley-rental-south-florida.jpg`, width: 1200, height: 630, alt: 'Miami White Trolley wedding transportation' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miami White Trolley | Wedding & Event Transportation Miami',
    description: 'Elegant white trolleys and luxury group transport for weddings and events in Miami.',
    images: [`${BASE}/images/white-wedding-trolley-rental-south-florida.jpg`],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE}/#business`,
  name: 'Miami White Trolley',
  description: 'Premium white trolley transportation for weddings, quinceañeras, corporate events, and private charters in Miami and South Florida.',
  url: BASE,
  telephone: '+17865651088',
  email: 'reservations@rumbatoursmiami.com',
  image: `${BASE}/images/white-wedding-trolley-rental-south-florida.jpg`,
  logo: `${BASE}/icon.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.7617,
    longitude: -80.1918,
  },
  areaServed: [
    'Miami', 'Miami Beach', 'Coral Gables', 'Brickell', 'Wynwood',
    'Downtown Miami', 'Coconut Grove', 'Fort Lauderdale', 'West Palm Beach',
    'Naples', 'Tampa', 'Clearwater',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '200',
    bestRating: '5',
    worstRating: '1',
  },
}

export default function Home() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Hero />
      <LifestyleGallerySection />
      <TrustSection />
      <Testimonials />
      <LuxuryFleetSection />
      <ServiceShowcaseSection />
      <WhyChooseMiamiSection />
      <ServiceAreasShowcaseSection />
      <FAQSection />
    </main>
  );
}
