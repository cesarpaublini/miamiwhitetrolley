import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { LifestyleGallerySection } from "@/components/sections/LifestyleGallerySection";
import { LuxuryFleetSection } from "@/components/sections/LuxuryFleetSection";
import { ServiceAreasShowcaseSection } from "@/components/sections/ServiceAreasShowcaseSection";
import { ServiceShowcaseSection } from "@/components/sections/ServiceShowcaseSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustSection } from "@/components/sections/TrustSection";
import { WhyChooseMiamiSection } from "@/components/sections/WhyChooseMiamiSection";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <LifestyleGallerySection />
      <TrustSection />
      <LuxuryFleetSection />
      <ServiceShowcaseSection />
      <WhyChooseMiamiSection />
      <ServiceAreasShowcaseSection />
      <Testimonials />
      <FAQSection />
    </main>
  );
}
