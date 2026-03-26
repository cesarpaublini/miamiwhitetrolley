export type Occasion = {
  id: string;
  emoji: string;
  label: string;
  accent: string;
  tagline: string;
  description: string;
  image: string;
  secondImage: string;
  quote: string;
  quoteAuthor: string;
  stats: [
    { value: string; label: string },
    { value: string; label: string },
  ];
  includes: string[];
  vehicles: string[];
  primaryCta?: string;
};

export const OCCASIONS: Occasion[] = [
  {
    id: "wedding",
    emoji: "💍",
    label: "Wedding",
    accent: "#222222",
    tagline: "Elegant wedding transportation with flawless timing",
    description:
      "From ceremony arrivals to reception departures, we coordinate every transfer so your wedding day stays smooth, stylish, and stress-free.",
    image: "/images/wedding-trolley-service-miami-white-trolley.jpg",
    secondImage: "/images/wedding-trolley-guests-miami-white-trolley.jpg",
    quote: "Our guests loved the experience and every transfer was perfectly on schedule.",
    quoteAuthor: "Olivia & Daniel",
    stats: [
      { value: "500+", label: "Weddings" },
      { value: "5★", label: "Rated" },
    ],
    includes: [
      "Ceremony and reception transfers",
      "Hotel and guest shuttle routes",
      "Planner timeline coordination",
      "Decor-friendly vehicle staging",
    ],
    vehicles: ["White Trolley", "Mini Coach", "Shuttle Van", "Luxury SUV"],
  },
  {
    id: "corporate-events",
    emoji: "🏢",
    label: "Corporate Events",
    accent: "#222222",
    tagline: "Professional corporate transportation with seamless coordination",
    description:
      "From executive arrivals to conference shuttles, we coordinate every transfer so your event stays polished, punctual, and stress-free.",
    image: "/images/corporate-event-transportation-miami-white-trolley.jpg",
    secondImage: "/images/corporate-group-shuttle-miami-white-trolley.jpg",
    quote: "Our team was impressed by how smooth and professional everything felt from start to finish.",
    quoteAuthor: "Corporate Event Client",
    stats: [
      { value: "250+", label: "Corporate Events" },
      { value: "5★", label: "Rated" },
    ],
    includes: [
      "Executive and guest transportation",
      "Hotel and venue shuttle routes",
      "On-site schedule coordination",
      "Multi-vehicle event logistics",
    ],
    vehicles: ["Shuttle Van", "Mini Coach", "Motorcoach", "Luxury SUV"],
    primaryCta: "Book Corporate Transportation",
  },
  {
    id: "dinner-transfers",
    emoji: "🍽️",
    label: "Dinner Transfers",
    accent: "#222222",
    tagline: "Stylish dinner transportation with smooth arrivals and returns",
    description:
      "From group dinners to special nights out, we coordinate transportation that feels easy, comfortable, and right on time.",
    image: "/images/dinner-transfer-transportation-miami-white-trolley.jpg",
    secondImage: "/images/dinner-group-shuttle-miami-white-trolley.jpg",
    quote: "The ride made the whole evening feel more elevated and much easier for our group.",
    quoteAuthor: "Private Client",
    stats: [
      { value: "300+", label: "Dinner Transfers" },
      { value: "5★", label: "Rated" },
    ],
    includes: [
      "Restaurant arrival and return transportation",
      "Multi-stop dinner itinerary coordination",
      "Private group transportation",
      "Flexible pickup and drop-off timing",
    ],
    vehicles: ["Luxury SUV", "Shuttle Van", "Mini Coach", "Sprinter Van"],
    primaryCta: "Book Dinner Transportation",
  },
  {
    id: "event-shuttles",
    emoji: "🏨",
    label: "Event Shuttles",
    accent: "#222222",
    tagline: "Reliable event shuttle transportation with organized guest flow",
    description:
      "From hotels to venues and everything in between, we help move guests efficiently so your event stays on schedule.",
    image: "/images/event-shuttle-service-miami-white-trolley.jpg",
    secondImage: "/images/event-shuttle-group-miami-white-trolley.jpg",
    quote: "The shuttle service made transportation simple for our guests and kept the entire event moving smoothly.",
    quoteAuthor: "Event Planner",
    stats: [
      { value: "400+", label: "Event Shuttles" },
      { value: "5★", label: "Rated" },
    ],
    includes: [
      "Guest shuttle routes between locations",
      "Event timeline transportation planning",
      "Group pickup and drop-off coordination",
      "Multi-stop shuttle management",
    ],
    vehicles: ["Shuttle Van", "Mini Coach", "Motorcoach", "White Trolley"],
    primaryCta: "Book Event Shuttles",
  },
  {
    id: "company-outings",
    emoji: "🏢",
    label: "Company Outings",
    accent: "#222222",
    tagline: "Comfortable company outing transportation for teams and groups",
    description:
      "From team dinners to off-site activities, we coordinate transportation so your group can stay together and enjoy the day.",
    image: "/images/company-outings-team-transportation-miami-white-trolley.jpg",
    secondImage: "/images/company-outings-group-shuttle-miami-white-trolley.jpg",
    quote: "Everything was handled professionally and our whole team arrived together without any stress.",
    quoteAuthor: "Office Manager",
    stats: [
      { value: "150+", label: "Company Outings" },
      { value: "5★", label: "Rated" },
    ],
    includes: [
      "Team pickup and drop-off coordination",
      "Group transportation to venues and activities",
      "Flexible route planning",
      "Comfortable private charter options",
    ],
    vehicles: ["Shuttle Van", "Mini Coach", "Motorcoach", "Luxury SUV"],
    primaryCta: "Book a Company Outing",
  },
  {
    id: "proms-school-events",
    emoji: "🎓",
    label: "Proms & School Events",
    accent: "#222222",
    tagline: "Safe and stylish transportation for proms and school events",
    description:
      "From prom nights to school celebrations, we provide organized group transportation that feels fun, polished, and dependable.",
    image: "/images/prom-school-event-transportation-miami-white-trolley.jpg",
    secondImage: "/images/prom-school-event-group-shuttle-miami-white-trolley.jpg",
    quote: "The transportation was beautiful, safe, and made the night even more special for the students.",
    quoteAuthor: "Parent / School Client",
    stats: [
      { value: "200+", label: "School Events" },
      { value: "5★", label: "Rated" },
    ],
    includes: [
      "Group transportation for students",
      "Coordinated pickup and return schedules",
      "Safe and professional chauffeur service",
      "Private charter options for school groups",
    ],
    vehicles: ["White Trolley", "Mini Coach", "Shuttle Van", "Luxury SUV"],
    primaryCta: "Book for Prom or School Event",
  },
  {
    id: "sports-events",
    emoji: "🏟️",
    label: "Sports Events",
    accent: "#222222",
    tagline: "Group transportation for sports events with easy game-day coordination",
    description:
      "From pre-game pickups to post-game returns, we provide reliable transportation that keeps your group together and on time.",
    image: "/images/sports-event-group-transportation-miami-white-trolley.jpg",
    secondImage: "/images/sports-event-group-transportation-miami-white-trolley.jpg",
    quote: "Our group loved being able to ride together and not worry about parking or coordinating cars.",
    quoteAuthor: "Sports Group Client",
    stats: [
      { value: "180+", label: "Sports Event Trips" },
      { value: "5★", label: "Rated" },
    ],
    includes: [
      "Stadium and arena transportation",
      "Pre-game and post-game pickup coordination",
      "Group shuttle service for fans and teams",
      "Flexible charter options for large groups",
    ],
    vehicles: ["Shuttle Van", "Mini Coach", "Motorcoach", "White Trolley"],
    primaryCta: "Book Sports Transportation",
  },
];

export const NAV_ITEMS = OCCASIONS.map(({ id, emoji, label }) => ({ id, emoji, label }));
