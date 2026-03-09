import type { Metadata } from "next";
import Link from "next/link";
import { OccasionSection } from "@/components/services/OccasionSection";
import { ServicesOccasionStickyNav } from "@/components/services/ServicesOccasionStickyNav";
import { OCCASIONS } from "@/components/services/servicesData";

export const metadata: Metadata = {
  title: "Services | Miami White Trolley",
  description: "Premium trolley services for weddings, events, and private transportation.",
};

const IMGS = {
  wedding: "/images/miami-white-trolley-coral-gables-wedding-transportation.jpg",
};

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <section className="w-full pt-6">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ height: "clamp(260px, 34vw, 440px)" }}
          >
            <img src={IMGS.wedding} alt="Outdoor Florida wedding ceremony" className="absolute inset-0 h-full w-full object-cover" />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.15) 100%)",
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
              <p
                className="mb-3 uppercase tracking-widest text-white/70"
                style={{ fontSize: "0.72rem", fontWeight: 600 }}
              >
                Miami White Trolley
              </p>

              <h1
                className="mb-4 max-w-xl text-white"
                style={{
                  fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                Transportation for every occasion
              </h1>

              <p
                className="mb-8 max-w-md text-white/80"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", lineHeight: 1.7 }}
              >
                From weddings and quinceaneras to corporate events and airport pickups - we've got the
                right vehicle and experience for your event.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF385C] px-7 py-3 text-white transition-colors duration-200 hover:bg-[#E00B41]"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    boxShadow: "0 2px 16px rgba(255,56,92,0.4)",
                  }}
                >
                  Get a Free Quote
                </a>
                <Link
                  href="/fleet"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-7 py-3 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  View Our Fleet
                </Link>
              </div>
            </div>

            <div className="absolute bottom-5 right-5 flex flex-wrap justify-end gap-2">
              <StatChip value="500+" label="Events" />
              <StatChip value="5★" label="Rated" />
              <StatChip value="8" label="Occasions" />
            </div>
          </div>
        </div>
      </section>
      <ServicesOccasionStickyNav />
      {OCCASIONS.map((occasion, index) => (
        <OccasionSection key={occasion.id} occasion={occasion} reverse={index % 2 !== 0} />
      ))}
    </main>
  );
}

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/90 px-4 py-2.5 text-center shadow-sm backdrop-blur-sm">
      <div style={{ color: "#FF385C", fontSize: "1rem", fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ color: "#717171", fontSize: "0.65rem", fontWeight: 600, marginTop: "2px" }}>{label}</div>
    </div>
  );
}
