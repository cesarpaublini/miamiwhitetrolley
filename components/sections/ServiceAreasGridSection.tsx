"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { FAQAccordionSection } from "@/components/sections/FAQAccordionSection";

const AREAS = [
  {
    name: "Coral Gables",
    slug: "/service-areas/coral-gables",
    hasDetailPage: true,
    region: "Miami-Dade",
    tag: "Most Popular",
    tagColor: "#FF385C",
    distance: "12 mi from Downtown",
    image: "/images/Areas/coral-gables-miami-white-trolley-transportation.jpg",
    description:
      "Elegant transportation coverage for weddings, private estates, and upscale venues throughout Coral Gables.",
    events: ["Weddings", "Private Events", "Corporate"],
    venues: ["The Biltmore Hotel", "Coral Gables Country Club", "Fairchild Tropical Garden"],
  },
  {
    name: "Fort Lauderdale",
    slug: "/service-areas/fort-lauderdale",
    hasDetailPage: true,
    region: "Broward",
    tag: null,
    tagColor: "#FF385C",
    distance: "30 mi from Downtown",
    image: "/images/Areas/fort-lauderdale-miami-white-trolley-transportation.jpg",
    description:
      "Group charter transportation for waterfront weddings, conventions, and large private gatherings in Fort Lauderdale.",
    events: ["Corporate", "Large Weddings", "Conventions"],
    venues: ["B Ocean Resort", "Riverside Hotel", "Broward County Convention Center"],
  },
  {
    name: "Coconut Grove",
    slug: "/service-areas/coconut-grove",
    hasDetailPage: true,
    region: "Miami-Dade",
    tag: null,
    tagColor: "#FF385C",
    distance: "8 mi from Downtown",
    image: "/images/Areas/coconut-grove-miami-white-trolley-transportation.jpg",
    description:
      "Upscale event transportation throughout Coconut Grove for waterfront venues, estates, and private celebrations.",
    events: ["Weddings", "Private Events", "VIP"],
    venues: ["The Barnacle", "Mr. C Miami", "The Kampong"],
  },
  {
    name: "Brickell",
    slug: "/service-areas/brickell",
    hasDetailPage: true,
    region: "Miami-Dade",
    tag: "Business Hub",
    tagColor: "#222222",
    distance: "2 mi from Downtown",
    image: "/images/Areas/brickell-miami-white-trolley-transportation.jpg",
    description:
      "Premium group transportation for corporate events, hotel pickups, and private gatherings in Brickell.",
    events: ["Corporate", "Private Events", "VIP"],
    venues: ["EAST Miami", "JW Marriott Miami", "Brickell City Centre"],
  },
  {
    name: "Wynwood",
    slug: "/service-areas/wynwood",
    hasDetailPage: true,
    region: "Miami-Dade",
    tag: null,
    tagColor: "#FF385C",
    distance: "4 mi from Downtown",
    image: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg",
    description:
      "Stylish event transportation for creative weddings, nightlife events, and private charters in Wynwood.",
    events: ["Weddings", "Events", "Nightlife"],
    venues: ["Wynwood Walls", "Mana Wynwood", "Arlo Wynwood"],
  },
  {
    name: "Miami",
    slug: "/service-areas/miami",
    hasDetailPage: true,
    region: "Miami-Dade",
    tag: "Core Coverage",
    tagColor: "#FF385C",
    distance: "Local coverage",
    image: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
    description:
      "Full citywide transportation coverage for weddings, corporate events, and private charters across Miami.",
    events: ["Weddings", "Corporate", "Private Charter"],
    venues: ["Perez Art Museum", "Vizcaya Museum", "Miami Design District"],
  },
  {
    name: "Downtown Miami",
    slug: "/service-areas/downtown-miami",
    hasDetailPage: true,
    region: "Miami-Dade",
    tag: null,
    tagColor: "#FF385C",
    distance: "Central district",
    image: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg",
    description:
      "Reliable transportation around Downtown Miami for conventions, business groups, and city weddings.",
    events: ["Conventions", "Corporate", "Weddings"],
    venues: ["InterContinental Miami", "Kaseya Center", "Bayfront Park"],
  },
  {
    name: "West Palm Beach",
    slug: "/service-areas/west-palm-beach",
    hasDetailPage: true,
    region: "Palm Beach",
    tag: null,
    tagColor: "#FF385C",
    distance: "72 mi from Downtown",
    image: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg",
    description:
      "Long-distance group transportation to and from West Palm Beach for destination weddings and events.",
    events: ["Destination Weddings", "Corporate", "Private Events"],
    venues: ["The Breakers", "Palm Beach County Convention Center", "Hilton West Palm Beach"],
  },
  {
    name: "Islamorada",
    slug: "/service-areas/islamorada",
    hasDetailPage: true,
    region: "Florida Keys",
    tag: "Destination",
    tagColor: "#222222",
    distance: "84 mi from Downtown",
    image: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
    description:
      "Private transportation support for destination events and weddings in Islamorada and the Upper Keys.",
    events: ["Destination Weddings", "Private Charter", "Weekend Events"],
    venues: ["Cheeca Lodge", "Islander Resort", "Pierre's Restaurant"],
  },
  {
    name: "Naples",
    slug: "/service-areas/naples",
    hasDetailPage: true,
    region: "Gulf Coast",
    tag: null,
    tagColor: "#FF385C",
    distance: "126 mi from Downtown",
    image: "/images/Areas/Naples-miami-white-trolley-transportation.jpg",
    description:
      "Coast-to-coast charter transportation for destination weddings, executive events, and private groups in Naples.",
    events: ["Destination Weddings", "Corporate", "Private Events"],
    venues: ["The Ritz-Carlton Naples", "Naples Grande", "Arthrex One"],
  },
  {
    name: "Tampa",
    slug: "/service-areas/tampa",
    hasDetailPage: true,
    region: "Tampa Bay",
    tag: null,
    tagColor: "#FF385C",
    distance: "279 mi from Downtown",
    image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
    description:
      "Large-scale charter options for Tampa events, conferences, and destination wedding transportation.",
    events: ["Conventions", "Corporate", "Destination Weddings"],
    venues: ["Tampa Convention Center", "JW Marriott Tampa", "Armature Works"],
  },
  {
    name: "Clearwater",
    slug: "/service-areas/clearwater",
    hasDetailPage: true,
    region: "Tampa Bay",
    tag: "Beach Events",
    tagColor: "#222222",
    distance: "292 mi from Downtown",
    image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
    description:
      "Transportation support for Clearwater beach weddings, group events, and destination charters.",
    events: ["Beach Weddings", "Private Events", "Corporate"],
    venues: ["Sandpearl Resort", "Hyatt Regency Clearwater", "Clearwater Marine Aquarium"],
  },
] as const;

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do you provide transportation outside Miami-Dade?",
    a: "Yes. We serve multiple South Florida and destination areas, including Broward, Palm Beach, the Florida Keys, and select long-distance city requests based on availability.",
  },
  {
    q: "Can you coordinate multi-stop routes for guests?",
    a: "Absolutely. We can build custom transportation plans with hotel pickups, ceremony transfers, reception shuttles, and return trips tailored to your event timeline.",
  },
  {
    q: "How far in advance should we reserve service areas?",
    a: "For weddings and peak season dates, we recommend booking as early as possible. Our team can also help with short-notice requests when fleet availability allows.",
  },
];

export function ServiceAreasGridSection() {
  const [activeRegion, setActiveRegion] = useState("All");
  const regions = ["All", ...new Set(AREAS.map((area) => area.region))];
  const filteredAreas =
    activeRegion === "All" ? AREAS : AREAS.filter((area) => area.region === activeRegion);

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container className="space-y-8">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF385C]">Service Areas</p>
            <h1 className="text-4xl font-bold tracking-tight text-[#222222] sm:text-5xl">
              Explore our top service areas
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[#717171]">
              Find city-specific transportation coverage and popular venue destinations across South Florida.
            </p>
          </header>

          <div className="flex flex-wrap gap-3">
            {regions.map((region) => {
              const isActive = region === activeRegion;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className="rounded-full px-5 py-2 font-semibold transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
                  style={{
                    backgroundColor: isActive ? "#222222" : "#F5F5F5",
                    color: isActive ? "#FFFFFF" : "#484848",
                    fontSize: "0.85rem",
                  }}
                >
                  {region}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredAreas.map((area) => (
              <AreaCard key={area.name} area={area} />
            ))}
          </div>

          <section className="pt-4">
            <FAQAccordionSection title="Service Areas FAQ" items={FAQS} />
          </section>
        </Container>
      </section>

      <section id="book" className="border-t border-[#EBEBEB]">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-col gap-10 lg:flex-row xl:gap-16">
            <div className="flex-1 max-w-lg">
              <p
                className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#FF385C]"
              >
                Ready to book?
              </p>
              <h2
                className="mb-4 font-bold text-[#222222]"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
              >
                Tell us where you&apos;re headed
              </h2>
              <p className="mb-8 text-[0.9375rem] leading-[1.75] text-[#717171]">
                Fill in a few details and our team will confirm availability and provide a custom quote - usually
                within 2 hours.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-[#EBEBEB] p-4">
                  <span className="text-2xl leading-none" aria-hidden="true">
                    📞
                  </span>
                  <div>
                    <p className="text-[0.875rem] font-bold text-[#222222]">Call us</p>
                    <p className="mt-0.5 text-[0.82rem] text-[#717171]">
                      (305) 555-0100 · Available 8am - 10pm daily
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-[#EBEBEB] p-4">
                  <span className="text-2xl leading-none" aria-hidden="true">
                    💬
                  </span>
                  <div>
                    <p className="text-[0.875rem] font-bold text-[#222222]">WhatsApp</p>
                    <p className="mt-0.5 text-[0.82rem] text-[#717171]">Message us anytime for fast responses</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-[#EBEBEB] p-4">
                  <span className="text-2xl leading-none" aria-hidden="true">
                    📧
                  </span>
                  <div>
                    <p className="text-[0.875rem] font-bold text-[#222222]">Email</p>
                    <p className="mt-0.5 text-[0.82rem] text-[#717171]">info@miamiwhitetrolley.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-lg">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AreaCard({ area }: { area: (typeof AREAS)[number] }) {
  const [open, setOpen] = useState(false);

  const ctaHref = area.hasDetailPage && area.slug ? area.slug : "#book";
  const ctaLabel = area.hasDetailPage ? `Explore ${area.name}` : `Book in ${area.name}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#EBEBEB] transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)]">
      <div className="group relative overflow-hidden" style={{ height: "200px" }}>
        <img
          src={area.image}
          alt={area.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)",
          }}
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.72rem] font-semibold text-[#484848] backdrop-blur-sm">
          {area.region}
        </span>

        {area.tag ? (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-[0.72rem] font-bold text-white"
            style={{ background: area.tagColor }}
          >
            {area.tag}
          </span>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-[1.1rem] font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
            {area.name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="mb-4 text-[0.875rem] leading-[1.65] text-[#484848]">{area.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {area.events.map((event) => (
            <span key={event} className="rounded-full bg-[#FFF1F3] px-3 py-1 text-[0.72rem] font-semibold text-[#FF385C]">
              {event}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center gap-1.5 text-[0.8rem] font-semibold text-[#717171] transition-colors hover:text-[#222222]"
        >
          <svg
            aria-hidden="true"
            width="13"
            height="13"
            viewBox="0 0 20 20"
            fill="none"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
          >
            <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          {open ? "Hide popular venues" : "Show popular venues"}
        </button>

        {open ? (
          <div className="mt-3 space-y-1.5 border-t border-[#EBEBEB] pt-3">
            {area.venues.map((venue) => (
              <div key={venue} className="flex items-center gap-2 text-[0.82rem] text-[#484848]">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#FFF1F3]">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-2.5 w-2.5" fill="none">
                    <path
                      d="M4.5 10.5 8.3 14l7.2-8"
                      stroke="#FF385C"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{venue}</span>
              </div>
            ))}
          </div>
        ) : null}

        <Link
          href={ctaHref}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#222222] py-3 text-[0.85rem] font-bold text-white transition-colors duration-200 hover:bg-[#FF385C]"
        >
          {ctaLabel}
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
            <path
              d="M4 10h12m0 0-4-4m4 4-4 4"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    date: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const labelClass = "mb-1.5 block text-[0.75rem] font-bold text-[#222222]";
  const labelStyle = { letterSpacing: "0.02em" };
  const inputClass =
    "w-full rounded-xl border border-[#DDDDDD] px-4 py-3 text-[0.875rem] text-[#222222] placeholder:text-[#BBBBBB] transition-colors focus:border-[#222222] focus:outline-none";

  return (
    <>
      {!submitted ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          className="flex flex-col gap-4 rounded-2xl border border-[#DDDDDD] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="booking-name" className={labelClass} style={labelStyle}>
                  NAME
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Maria Garcia"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className={labelClass} style={labelStyle}>
                  PHONE
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="(305) 000-0000"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-email" className={labelClass} style={labelStyle}>
                EMAIL
              </label>
              <input
                id="booking-email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="maria@email.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="booking-area" className={labelClass} style={labelStyle}>
                SERVICE AREA
              </label>
              <select
                id="booking-area"
                value={form.area}
                onChange={(event) => setForm((prev) => ({ ...prev, area: event.target.value }))}
                className={`${inputClass} bg-white`}
                required
              >
                <option value="">
                  Select your city...
                </option>
                {AREAS.map((area) => (
                  <option key={area.name} value={area.name}>
                    {area.name}
                  </option>
                ))}
                <option value="Other">Other / Not listed</option>
              </select>
            </div>

            <div>
              <label htmlFor="booking-date" className={labelClass} style={labelStyle}>
                EVENT DATE
              </label>
              <input
                id="booking-date"
                type="date"
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="booking-notes" className={labelClass} style={labelStyle}>
                NOTES
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                placeholder="Tell us about your event, venue, group size..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#FF385C] py-4 text-[0.9375rem] font-bold text-white shadow-[0_2px_16px_rgba(255,56,92,0.35)] transition-colors hover:bg-[#E00B41]"
            >
              Request a Quote
            </button>

            <p className="text-center text-[0.75rem] text-[#717171]">
              We&apos;ll confirm availability within 2 hours.
            </p>
        </form>
      ) : (
        <div className="rounded-2xl border border-[#EBEBEB] p-8 text-center">
            <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1F3]">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-6 w-6" fill="none">
                <path
                  d="M4.5 10.5 8.3 14l7.2-8"
                  stroke="#FF385C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h4 className="text-[1rem] font-bold text-[#222222]">Request received!</h4>
            <p className="mt-2 text-[0.875rem] leading-[1.65] text-[#717171]">
              We&apos;ll reach out within 2 hours to confirm availability for your area and provide a custom quote.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-5 text-[0.82rem] font-semibold text-[#FF385C] underline underline-offset-2"
            >
              Submit another request
            </button>
        </div>
      )}
    </>
  );
}

