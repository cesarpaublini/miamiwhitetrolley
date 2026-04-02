import type { Metadata } from "next";
import { ServicesBookingSection } from "@/components/services/ServicesBookingSection";

export const metadata: Metadata = {
  title: "Miami Transportation Services | Trolleys, Sprinters, Mini Coaches & More",
  description:
    "Explore Miami White Trolley transportation services for weddings, corporate events, guest shuttles, hotel transportation, airport transfers, private events, and group travel with trolleys, mini coaches, sprinter vans, limousines, SUVs, classic cars, and motor coaches.",
  alternates: { canonical: 'https://miamiwhitetrolley.com/services' },
  openGraph: {
    title: "Miami Transportation Services | Trolleys, Sprinters, Mini Coaches & More",
    description: "Wedding trolleys, sprinter vans, mini coaches, and more for events across Miami and South Florida.",
    url: 'https://miamiwhitetrolley.com/services',
    siteName: 'Miami White Trolley',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Miami Transportation Services | Trolleys, Sprinters, Mini Coaches & More",
    description: "Wedding trolleys, sprinter vans, mini coaches, and more for events across Miami and South Florida.",
  },
};


const SERVICES = [
  {
    title: "Wedding Transportation",
    description:
      "Transportation for couples, wedding parties, and guests traveling between hotels, ceremony venues, reception spaces, and after-party locations. We help organize wedding day transportation with vehicles that fit the style and size of the event.",
  },
  {
    title: "Wedding Guest Shuttle Service",
    description:
      "Guest shuttle service for transporting wedding guests between hotels and venues in a more organized and comfortable way. A great solution for improving guest experience and reducing delays or parking issues.",
  },
  {
    title: "Corporate Event Transportation",
    description:
      "Transportation for conferences, conventions, team outings, business dinners, meetings, company celebrations, and executive events. We help businesses coordinate professional group transportation for staff, clients, and guests.",
  },
  {
    title: "Hotel Shuttle Service",
    description:
      "Shuttle transportation between hotels and venues for weddings, business events, and private gatherings. Ideal when guests are staying at one or multiple hotels and need coordinated transportation.",
  },
  {
    title: "Airport Transportation",
    description:
      "Group airport pickups and drop-offs for event guests, corporate travelers, wedding parties, and private clients. This is a useful option when attendees are arriving from out of town and need reliable transportation to hotels, homes, or venues.",
  },
  {
    title: "Private Event Transportation",
    description:
      "Transportation for birthdays, anniversary dinners, family gatherings, social events, gala nights, and other private occasions. We provide vehicles that fit both the style and logistics of the event.",
  },
  {
    title: "Group Transportation",
    description:
      "Transportation for groups traveling together for special events, organized outings, celebrations, or private functions. This service is designed to simplify logistics by keeping everyone together in the right vehicle.",
  },
  {
    title: "Shuttle Service",
    description:
      "Shuttle transportation for guests, employees, attendees, or private groups moving between hotels, venues, offices, event spaces, restaurants, and other scheduled stops.",
  },
  {
    title: "Prom and School Event Transportation",
    description:
      "Transportation for proms, dances, school banquets, and formal student events where safety, presentation, and group coordination matter.",
  },
  {
    title: "Convention and Event Transportation",
    description:
      "Transportation for conventions, expos, conferences, trade shows, and large-scale event attendance. Ideal for moving attendees, exhibitors, teams, or clients between hotels and event locations.",
  },
  {
    title: "Rehearsal Dinner and Welcome Event Transportation",
    description:
      "Transportation for rehearsal dinners, welcome parties, pre-event gatherings, and wedding weekend events that require smooth guest movement.",
  },
  {
    title: "Charter Transportation",
    description:
      "Private charter transportation for custom routes, group travel, point-to-point service, and event-related transportation needs throughout Miami and South Florida.",
  },
];

const VEHICLES = [
  {
    name: "White Trolleys",
    description:
      "A classic and memorable option for weddings, guest shuttle service, and special events where presentation matters.",
  },
  {
    name: "Mini Coaches",
    description:
      "A practical option for medium-sized groups that need efficient and comfortable transportation.",
  },
  {
    name: "Sprinter Vans",
    description:
      "Ideal for smaller groups, airport transportation, executive transfers, and private events.",
  },
  {
    name: "SUVs",
    description:
      "A clean and flexible choice for smaller group transportation, private rides, and executive service.",
  },
  {
    name: "Limousines",
    description:
      "A strong fit for formal events, celebrations, weddings, and special occasion transportation.",
  },
  {
    name: "Classic Cars",
    description:
      "Perfect for stylish arrivals, wedding couples, photo-friendly transportation, and special event moments.",
  },
  {
    name: "Motor Coaches",
    description:
      "Best for large group transportation, corporate events, conventions, and larger shuttle operations.",
  },
];

const WHY_BULLETS = [
  "Multiple vehicle options for different needs",
  "Transportation for both small and large groups",
  "Strong fit for weddings, business events, and private groups",
  "Better coordination for hotel, venue, and guest transportation",
  "Elegant and practical transportation options",
  "Flexible solutions for different routes and schedules",
  "Service designed around the event, not just the vehicle",
];

const OCCASIONS = [
  { label: "Weddings", image: "/images/Services/wedding-transportation-miami-white-trolley.jpg" },
  { label: "Corporate Events", image: "/images/Services/corporate-event-transportation-miami-white-trolley.jpg" },
  { label: "Guest Shuttles", image: "/images/white-trolley-transportation-miami.jpg" },
  { label: "Rehearsal Dinners", image: "/images/miami-trolley-rental-wedding-transportation.jpeg" },
  { label: "Conferences & Conventions", image: "/images/motorcoach-rental-miami.jpg" },
  { label: "Airport Transfers", image: "/images/Minibus-south-florida-transportation.jpg" },
  { label: "Gala & Formal Events", image: "/images/lincoln-continental-classic-car-rental-miami.jpg" },
  { label: "Private Group Outings", image: "/images/sprinter-van-rental-miami.jpg" },
];

const WHO_BULLETS = [
  "guests are staying in hotels",
  "an event has multiple locations",
  "airport pickups are needed",
  "the group should arrive together",
  "parking is limited",
  "timing matters",
  "the event needs a more polished transportation experience",
];

const AREAS = [
  "Miami",
  "Miami Beach",
  "Brickell",
  "Coral Gables",
  "Coconut Grove",
  "Wynwood",
  "Key Biscayne",
  "Downtown Miami",
  "Fort Lauderdale",
  "West Palm Beach",
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Share your event details",
    description:
      "Tell us your date, locations, guest count, and the type of transportation you need.",
  },
  {
    step: "2",
    title: "We help match the right vehicle",
    description:
      "Based on your event and group size, we help determine the best vehicle and service setup.",
  },
  {
    step: "3",
    title: "Receive pricing and availability",
    description:
      "We provide a quote based on your event details, route, and selected service.",
  },
  {
    step: "4",
    title: "Confirm your booking",
    description:
      "Once confirmed, we coordinate the service details for the day of your event.",
  },
];

const FAQS = [
  {
    question: "What types of transportation services do you offer?",
    answer:
      "We offer wedding transportation, guest shuttle service, corporate event transportation, hotel shuttles, airport transportation, private event transportation, charter transportation, and group transportation for special occasions.",
  },
  {
    question: "Do you only offer white trolley rentals?",
    answer:
      "No. In addition to white trolleys, we also offer mini coaches, sprinter vans, SUVs, limousines, classic cars, and motor coaches depending on the event and transportation needs.",
  },
  {
    question: "Do you only provide wedding transportation?",
    answer:
      "No. Weddings are one part of what we do, but we also provide transportation for corporate events, private parties, airport transfers, hotel shuttles, conventions, and group travel.",
  },
  {
    question: "Can you help me choose the right vehicle?",
    answer:
      "Yes. We help match the right vehicle based on group size, route, event type, and overall transportation goals.",
  },
  {
    question: "Do you offer airport pickups and drop-offs?",
    answer:
      "Yes. We can help with airport transportation for event guests, wedding parties, corporate travelers, and private groups.",
  },
  {
    question: "Do you provide shuttle service between hotels and venues?",
    answer:
      "Yes. Hotel and venue shuttle service is one of the most common transportation setups we handle.",
  },
  {
    question: "Can you handle large groups?",
    answer:
      "Yes. We offer larger vehicle options such as mini coaches and motor coaches for bigger group transportation needs.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking early, especially for weddings, peak weekends, and high-demand event dates.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* PAGE INTRO */}
      <section className="border-b border-[#EBEBEB] py-14 md:py-16">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

            {/* Left — text */}
            <div>
              <h1
                className="mb-4 text-[#222222]"
                style={{
                  fontSize: "clamp(1.75rem, 3.2vw, 2.7rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.08,
                }}
              >
                Group Transportation for Weddings, Events &amp; Corporate Travel
              </h1>
              <p
                className="mb-8 max-w-md text-[#717171]"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
              >
                White trolleys, shuttles, and private transportation across Miami.
              </p>
              <a
                href="?book=1"
                className="inline-flex w-fit items-center rounded-full bg-[#222222] px-8 py-4 text-white transition-colors duration-200 hover:bg-[#000000]"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
                }}
              >
                Request a Quote
              </a>
            </div>

            {/* Right — image */}
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
              <img
                src="/images/white-trolley-transportation-miami.jpg"
                alt="White trolley transportation Miami"
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — OUR SERVICES */}
      <section className="border-t border-[#EBEBEB] bg-[#F7F7F7] py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">
            What We Offer
          </p>
          <h2
            className="mb-3 text-[#222222]"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Our Transportation Services
          </h2>
          <p className="mb-10 max-w-2xl text-[#717171]" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
            We offer transportation solutions for weddings, business events, private groups, guest
            movement, and special occasions across Miami and surrounding areas.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-[#EBEBEB] bg-white p-6"
              >
                <h3
                  className="mb-2 text-[#222222]"
                  style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {service.title}
                </h3>
                <p className="text-[#717171]" style={{ fontSize: "0.875rem", lineHeight: 1.75 }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — VEHICLES */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">
            Our Fleet
          </p>
          <h2
            className="mb-4 text-[#222222]"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Vehicle Options for Different Group Sizes and Event Styles
          </h2>
          <p className="mb-10 max-w-2xl text-[#717171]" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
            Not every event needs the same type of vehicle. We offer a range of transportation
            options so clients can choose the best fit based on group size, route, occasion, and
            desired experience.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {VEHICLES.map((vehicle) => (
              <div
                key={vehicle.name}
                className="rounded-2xl border border-[#EBEBEB] p-6"
              >
                <h3
                  className="mb-2 text-[#222222]"
                  style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {vehicle.name}
                </h3>
                <p className="text-[#717171]" style={{ fontSize: "0.875rem", lineHeight: 1.75 }}>
                  {vehicle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY CLIENTS CHOOSE US */}
      <section className="border-t border-[#EBEBEB] bg-[#F7F7F7] py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">
                Why Us
              </p>
              <h2
                className="mb-5 text-[#222222]"
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}
              >
                Why Clients Choose Miami White Trolley
              </h2>
              <p className="text-[#484848]" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
                We help clients organize transportation that feels polished, coordinated, and
                appropriate for the event. Instead of forcing every booking into one vehicle type, we
                help match the service to the group, the route, and the occasion.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {WHY_BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 rounded-2xl border border-[#EBEBEB] bg-white p-4"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F5F5F5]"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                      <path
                        d="M2.5 6.5 5 9l4.5-6"
                        stroke="#222222"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[#484848]" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5 — OCCASIONS WE SERVE */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">
            Occasions
          </p>
          <h2
            className="mb-10 text-[#222222]"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Transportation for Many Types of Events
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {OCCASIONS.map((occasion) => (
              <div
                key={occasion.label}
                className="relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={occasion.image}
                  alt={occasion.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.04) 100%)",
                  }}
                />
                <span
                  className="absolute bottom-0 left-0 p-4 text-white"
                  style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.3 }}
                >
                  {occasion.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHO THIS IS FOR */}
      <section className="border-t border-[#EBEBEB] bg-[#F7F7F7] py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">
                Who We Work With
              </p>
              <h2
                className="mb-5 text-[#222222]"
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}
              >
                A Good Fit for Planners, Couples, Businesses &amp; Private Groups
              </h2>
              <p className="text-[#484848]" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
                Our services are a strong fit for clients who need transportation that is organized,
                professional, and suited to the occasion. We work with couples, wedding planners,
                event planners, hotels, businesses, private groups, families, and coordinators who
                want transportation to feel smooth from start to finish.
              </p>
            </div>
            <div>
              <p
                className="mb-4 text-[#222222]"
                style={{ fontSize: "0.9375rem", fontWeight: 700 }}
              >
                This is especially useful when:
              </p>
              <ul className="flex flex-col gap-3">
                {WHO_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F5F5F5]"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                        <path
                          d="M2.5 6.5 5 9l4.5-6"
                          stroke="#222222"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-[#484848]" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — AREAS WE SERVE */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">
            Service Areas
          </p>
          <h2
            className="mb-4 text-[#222222]"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Serving Miami and South Florida
          </h2>
          <p className="mb-8 max-w-2xl text-[#717171]" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
            We provide transportation services throughout Miami and surrounding South Florida areas
            depending on the event, vehicle type, and route needs.
          </p>
          <div className="flex flex-wrap gap-3">
            {AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-[#DDDDDD] px-5 py-2 text-[#484848]"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — HOW IT WORKS */}
      <section className="border-t border-[#EBEBEB] bg-[#F7F7F7] py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">
            Getting Started
          </p>
          <h2
            className="mb-10 text-[#222222]"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            How Our Booking Process Works
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="rounded-2xl border border-[#EBEBEB] bg-white p-6">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5]"
                  aria-hidden="true"
                >
                  <span
                    style={{ color: "#222222", fontSize: "1rem", fontWeight: 800 }}
                  >
                    {item.step}
                  </span>
                </div>
                <h3
                  className="mb-2 text-[#222222]"
                  style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#717171]" style={{ fontSize: "0.875rem", lineHeight: 1.75 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">
                FAQ
              </p>
              <h2
                className="text-[#222222]"
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}
              >
                Frequently Asked Questions
              </h2>
            </div>
            <div className="flex flex-col divide-y divide-[#EBEBEB]">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary
                    className="flex cursor-pointer list-none items-start justify-between gap-4 text-[#222222]"
                    style={{ fontSize: "0.9375rem", fontWeight: 700 }}
                  >
                    <span>{faq.question}</span>
                    <span
                      className="mt-0.5 flex-shrink-0 text-[#717171] transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                      style={{ fontSize: "1.2rem", lineHeight: 1 }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="mt-3 text-[#717171]"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}
                  >
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — CTA */}
      <section className="border-t border-[#EBEBEB] bg-[#222222] py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 text-center">
          <h2
            className="mb-5 text-white"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Looking for Group Transportation in Miami?
          </h2>
          <p
            className="mx-auto mb-8 max-w-2xl text-white/70"
            style={{ fontSize: "1rem", lineHeight: 1.8 }}
          >
            From white trolley rentals to sprinter vans, mini coaches, limousines, SUVs, classic
            cars, and motor coaches, we help clients find the right transportation service for
            weddings, private events, business functions, guest shuttle service, and group travel
            across Miami and South Florida.
          </p>
          <a
            href="?book=1"
            className="inline-flex items-center gap-2 rounded-full bg-[#222222] px-10 py-4 text-white transition-colors duration-200 hover:bg-[#000000]"
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              boxShadow: "0 2px 20px rgba(0,0,0,0.18)",
            }}
          >
            Request a Quote
          </a>
        </div>
      </section>

      {/* BOOKING FORM */}
      <ServicesBookingSection />
    </main>
  );
}
