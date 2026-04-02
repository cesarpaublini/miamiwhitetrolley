export type FleetItem = {
  title: string;
  description: string;
  image: string;
};

export type LuxuryFleetItem = {
  slug: string;
  title: string;
  details: string;
  image: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type ServiceShowcaseItem = {
  title: string;
  description: string;
  image: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type WhyChooseItem = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

export type ServiceAreaItem = {
  title: string;
  description: string;
};

export type ServiceAreaShowcaseItem = {
  name: string;
  image: string;
};

export type TestimonialItem = {
  initial: string;
  name: string;
  location: string;
  event: string;
  quote: string;
};

export type GalleryItem = {
  alt: string;
  image: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const siteConfig = {
  name: "Miami White Trolley",
  description:
    "Premium white trolley transportation for weddings, private events, and unforgettable group experiences in South Florida.",
  phone: "(786) 565-1088",
  email: "reservations@rumbatoursmiami.com",
  location: "Miami, FL",
  googleReviewsUrl: "https://www.google.com/search?q=Miami+White+Trolley+reviews",
};

export const heroContent = {
  rating: "★★★★★",
  reviews: "5.0 · 200+ reviews",
  title: "Miami Wedding Trolley Rentals & Luxury Group Transportation",
  description:
    "Elegant white trolleys, sprinter vans, and luxury buses for weddings, corporate events, and private transportation across Miami.",
  primaryCta: "Reserve Your Date",
  secondaryCta: "Get a Quote",
  image: "/images/white-wedding-trolley-rental-south-florida.jpg",
  highlights: ["Top Rated Service", "Miami & South Florida", "Licensed & Insured"],
};

export const fleetItems: FleetItem[] = [
  {
    title: "Classic White Trolley",
    description:
      "A timeless trolley with comfortable seating, perfect for wedding parties and elegant city transfers.",
    image: "/images/fleet-1.svg",
  },
  {
    title: "Executive Mini Coach",
    description:
      "Modern group transportation with extra space, climate control, and a clean premium interior.",
    image: "/images/fleet-2.svg",
  },
  {
    title: "Private Shuttle Option",
    description:
      "Reliable point-to-point transport for guests, family, and event teams across Miami.",
    image: "/images/fleet-3.svg",
  },
];

export const luxuryFleetItems: LuxuryFleetItem[] = [
  {
    slug: "white-trolley",
    title: "White Wedding Trolleys",
    details: "Iconic · Up to 30 guests · Most popular",
    image: "/images/white-trolley-transportation-miami.jpg",
  },
  {
    slug: "green-trolley",
    title: "Green Trolleys",
    details: "Classic · Up to 30 guests · Vintage charm",
    image: "/images/trolley-rental-miami.jpg",
  },
  {
    slug: "classic-lincoln",
    title: "Lincoln Continental",
    details: "Timeless · 2-4 guests · Grand entrance",
    image: "/images/lincoln-continental-classic-car-rental-miami.jpg",
  },
  {
    slug: "mini-coach",
    title: "Mini Coaches",
    details: "Comfortable · Up to 36 guests · Group ready",
    image: "/images/Minibus-south-florida-transportation.jpg",
  },
  {
    slug: "motorcoach",
    title: "Motorcoaches",
    details: "Grand · Up to 55 guests · Convention grade",
    image: "/images/motorcoach-rental-miami.jpg",
  },
  {
    slug: "sprinter-van",
    title: "Sprinter Vans",
    details: "Luxury · Up to 14 guests · VIP ready",
    image: "/images/sprinter-van-rental-miami.jpg",
  },
];

export const serviceItems: ServiceItem[] = [
  {
    title: "Wedding Transportation",
    description:
      "Guest shuttles between hotels, ceremony, and reception with white-glove coordination.",
  },
  {
    title: "Corporate Events",
    description:
      "Professional transportation for conferences, networking events, and executive groups.",
  },
  {
    title: "Private Charters",
    description:
      "Flexible hourly charters for celebrations, tours, and custom routes around South Florida.",
  },
  {
    title: "Prom & Quinceanera",
    description:
      "Safe and stylish transportation for milestone celebrations with dependable service.",
  },
  {
    title: "One-Way Transfers",
    description:
      "Simple, smooth transfers for airport pickups, hotels, and event venues.",
  },
  {
    title: "Multi-Stop Itineraries",
    description:
      "Planned routes for wedding weekends and event timelines with easy guest logistics.",
  },
];

export const serviceShowcaseItems: ServiceShowcaseItem[] = [
  {
    title: "Wedding Transportation",
    description:
      "Elegant guest transportation between hotels, ceremony venues, and reception locations.",
    image: "/images/Services/wedding-transportation-miami-white-trolley.jpg",
  },
  {
    title: "Corporate Events",
    description:
      "Professional transportation for conferences, executive travel, and corporate gatherings.",
    image: "/images/Services/corporate-event-transportation-miami-white-trolley.jpg",
  },
  {
    title: "Private Events",
    description:
      "Stylish transportation for birthdays, celebrations, and groups of all sizes.",
    image: "/images/miami-wedding-trolley-bridesmaids-group.jpg",
  },
  {
    title: "Hotel & Venue Transportation",
    description:
      "Reliable guest shuttles between hotels and venues across Miami and Miami Beach.",
    image: "/images/miami-trolley-rental-wedding-transportation.jpeg",
  },
  {
    title: "Shuttle Services",
    description:
      "Scheduled shuttle runs for airports, cruise ports, and multi-stop event routes across South Florida.",
    image: "/images/Minibus-south-florida-transportation.jpg",
  },
];

export const featureItems: FeatureItem[] = [
  {
    title: "Always On Time",
    description:
      "Precise scheduling and proactive communication from booking to final drop-off.",
  },
  {
    title: "Professional Chauffeurs",
    description:
      "Courteous, experienced drivers focused on safety and elevated hospitality.",
  },
  {
    title: "Immaculate Fleet",
    description:
      "Clean, polished white vehicles maintained to premium presentation standards.",
  },
  {
    title: "Stress-Free Planning",
    description:
      "Our team helps organize routes, guest timing, and venue coordination in advance.",
  },
];

export const whyChooseItems: WhyChooseItem[] = [
  {
    number: "01",
    title: "Elegant Vehicles",
    description:
      "Our fleet is maintained to the highest standards and designed to complement weddings and upscale events.",
    icon: "✩",
  },
  {
    number: "02",
    title: "Experienced Event Transportation",
    description:
      "We work with wedding planners, venues, and corporate coordinators to ensure transportation runs smoothly.",
    icon: "◌",
  },
  {
    number: "03",
    title: "Professional Chauffeurs",
    description:
      "Our drivers are experienced, courteous, and trained to provide exceptional service on every ride.",
    icon: "◍",
  },
  {
    number: "04",
    title: "Reliable Scheduling",
    description:
      "We carefully plan routes and timing to ensure guests arrive safely and on schedule, every time.",
    icon: "◷",
  },
];

export const serviceAreas: ServiceAreaItem[] = [
  {
    title: "Miami",
    description: "Downtown, Brickell, Wynwood, and Miami Beach coverage.",
  },
  {
    title: "Coral Gables",
    description: "Reliable transportation for elegant venues and private estates.",
  },
  {
    title: "Fort Lauderdale",
    description: "Seamless charters for weddings, events, and waterfront properties.",
  },
  {
    title: "Key Biscayne",
    description: "Convenient guest shuttles for ceremonies and destination weekends.",
  },
];

export const serviceAreaShowcaseItems: ServiceAreaShowcaseItem[] = [
  { name: "Miami", image: "/images/Areas/miami-miami-white-trolley-transportation.jpg" },
  { name: "Coral Gables", image: "/images/Areas/coral-gables-miami-white-trolley-transportation.jpg" },
  { name: "Coconut Grove", image: "/images/Areas/coconut-grove-miami-white-trolley-transportation.jpg" },
  { name: "West Palm Beach", image: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg" },
  { name: "Miami Beach", image: "/images/Areas/miami-beach-miami-white-trolley-transportation.jpg" },
  { name: "Brickell", image: "/images/Areas/brickell-miami-white-trolley-transportation.jpg" },
  { name: "Downtown Miami", image: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg" },
  { name: "Wynwood", image: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg" },
];

export const serviceAreaFeaturedItems: ServiceAreaShowcaseItem[] = [
  { name: "Miami", image: "/images/Areas/miami-miami-white-trolley-transportation.jpg" },
  { name: "Coral Gables", image: "/images/Areas/coral-gables-miami-white-trolley-transportation.jpg" },
  { name: "Coconut Grove", image: "/images/Areas/coconut-grove-miami-white-trolley-transportation.jpg" },
  { name: "West Palm Beach", image: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg" },
];

export const serviceAreaAdditionalItems: ServiceAreaShowcaseItem[] = [
  { name: "Miami Beach", image: "/images/Areas/miami-beach-miami-white-trolley-transportation.jpg" },
  { name: "Brickell", image: "/images/Areas/brickell-miami-white-trolley-transportation.jpg" },
  { name: "Downtown Miami", image: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg" },
  { name: "Wynwood", image: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg" },
  { name: "Fort Lauderdale", image: "/images/Areas/fort-lauderdale-miami-white-trolley-transportation.jpg" },
  { name: "Naples", image: "/images/Areas/Naples-miami-white-trolley-transportation.jpg" },
  { name: "Tampa", image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg" },
  { name: "Sarasota", image: "/images/Areas/Sarasota-miami-white-trolley-transportation.jpg" },
];

export const testimonialItems: TestimonialItem[] = [
  {
    initial: "W",
    name: "Wedding Client",
    location: "Miami",
    event: "Wedding",
    quote:
      "Miami White Trolley was the perfect transportation for our wedding. The trolley looked beautiful and the service was incredibly professional. Our guests loved the experience.",
  },
  {
    initial: "E",
    name: "Event Planner",
    location: "Miami",
    event: "Corporate Event",
    quote:
      "The team coordinated transportation between our hotel and venue perfectly. Everything was on time and completely stress free.",
  },
  {
    initial: "B",
    name: "Bride",
    location: "Coral Gables",
    event: "Private Charter",
    quote:
      "Highly recommend for weddings in Miami. The trolley looked amazing in photos and made transportation easy for all of our guests.",
  },
];

export const lifestyleGalleryItems: GalleryItem[] = [
  {
    alt: "Bride and groom by trolley",
    image: "/images/miami-trolley-rental-wedding.jpeg",
  },
  {
    alt: "Couple boarding white trolley",
    image: "/images/miami-trolley-rental-wedding-transportation.jpeg",
  },
  {
    alt: "Bridal party inside Miami trolley",
    image: "/images/miami-trolley-groom-and-groomsmen.jpg",
  },
  {
    alt: "Bride walking near wedding trolley",
    image: "/images/miami-wedding-trolley-bride-walking.jpg",
  },
  {
    alt: "Bridesmaids smiling in trolley",
    image: "/images/miami-wedding-trolley-bridesmaids-smiling.jpg",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "How far in advance should we book?",
    answer:
      "For weddings and peak dates, we recommend booking 2-3 months in advance. We can also accommodate last-minute requests based on availability.",
  },
  {
    question: "Do you offer custom pickup and drop-off routes?",
    answer:
      "Yes. We build custom route plans around your timeline, guest count, and venue locations to keep transportation smooth.",
  },
  {
    question: "Is there a minimum booking time?",
    answer:
      "Most services include a minimum booking window. Final minimums depend on event type, date, and service area.",
  },
  {
    question: "Can we decorate the trolley for our event?",
    answer:
      "Light decor is allowed with prior approval. Our team will share guidelines so your setup stays safe and beautiful.",
  },
  {
    question: "Do you provide transportation outside Miami?",
    answer:
      "Yes. We serve multiple South Florida locations, including Coral Gables, Fort Lauderdale, and Key Biscayne.",
  },
  {
    question: "How do we receive pricing?",
    answer:
      "Use the quote form or call our team. We provide clear pricing based on route, hours, and total service needs.",
  },
];
