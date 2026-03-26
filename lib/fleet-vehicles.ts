export const fleetCategories = [
  "All",
  "Trolleys",
  "Large Vehicles",
  "Limousines",
  "Vans & SUVs",
  "Classic & Specialty",
] as const;

export type VehicleCategory = (typeof fleetCategories)[number];

export type FleetVehicle = {
  slug: string;
  name: string;
  category: Exclude<VehicleCategory, "All">;
  tagline: string;
  capacity: string;
  ideal: string;
  description: string;
  image: string;
  gallery?: string[];
  badge: string | null;
};

export const vehicles: FleetVehicle[] = [
  {
    slug: "white-trolley",
    name: "White Trolley",
    category: "Trolleys",
    tagline: "Up to 30 guests · Most popular",
    capacity: "Up to 30",
    ideal: "Weddings · Events · Proms",
    description:
      "Our iconic white wedding trolleys are the signature choice for Miami celebrations. Charming, elegant, and stunning in photos - they create an unforgettable arrival for any occasion.",
    image: "/images/white-trolley-transportation-miami.jpg",
    gallery: [
      "/images/white-trolley-transportation-miami.jpg",
      "/images/wedding-transportation-miami-white-trolley-01.jpg",
      "/images/wedding-transportation-miami-white-trolley-02.jpg",
      "/images/wedding-transportation-miami-white-trolley-03.jpg",
      "/images/wedding-transportation-miami-white-trolley-04.jpg",
      "/images/wedding-transportation-miami-white-trolley-05.jpg",
      "/images/wedding-transportation-miami-white-trolley-06.jpg",
    ],
    badge: "Most Popular",
  },
  {
    slug: "green-trolley",
    name: "Green Trolley",
    category: "Trolleys",
    tagline: "Up to 30 guests · Vintage charm",
    capacity: "Up to 30",
    ideal: "Weddings · Corporate · Events",
    description:
      "The green trolley brings timeless vintage character to your event. Fully enclosed with air conditioning, it offers a comfortable ride for guests while standing out in every photo.",
    image: "/images/trolley-rental-miami.jpg",
    gallery: [
      "/images/trolley-rental-miami.jpg",
      "/images/green-trolley-interior-seating-miami.jpg",
      "/images/green-trolley-wedding-transportation-miami.jpg",
      "/images/green-trolley-wedding-event-miami.jpg",
      "/images/green-trolley-entrance-miami.jpg",
      "/images/green-trolley-boarding-guests-miami.jpg",
      "/images/green-trolley-guests-boarding-miami.jpg",
      "/images/green-trolleys-miami-fleet.jpg",
    ],
    badge: null,
  },
  {
    slug: "motorcoach",
    name: "Motorcoach",
    category: "Large Vehicles",
    tagline: "Up to 55 guests · Convention grade",
    capacity: "Up to 55",
    ideal: "Large Weddings · Conventions · Corporate",
    description:
      "For large-scale events, our motorcoaches deliver convention-grade comfort. Climate-controlled, reclining seats, and professional drivers for the most demanding group travel needs.",
    image: "/images/motorcoach-rental-miami.jpg",
    gallery: [
      "/images/motorcoach-rental-miami.jpg",
      "/images/motorcoach-wedding-guests-miami.jpg",
      "/images/motorcoach-event-transportation-miami.jpg",
      "/images/motorcoach-group-transportation-miami.jpg",
      "/images/motorcoach-charter-miami-south-florida.jpg",
    ],
    badge: null,
  },
  {
    slug: "mini-coach",
    name: "Mini Coach",
    category: "Large Vehicles",
    tagline: "Up to 36 guests · Group ready",
    capacity: "Up to 36",
    ideal: "Corporate · Shuttles · Events",
    description:
      "A practical premium option for mid-size groups that need comfort and reliability. Great for hotel loops, venue runs, and smooth multi-stop transportation.",
    image: "/images/Minibus-south-florida-transportation.jpg",
    gallery: [
      "/images/Minibus-south-florida-transportation.jpg",
      "/images/motorcoach-exterior-miami-transportation.jpg",
      "/images/motorcoach-side-view-miami.jpg",
      "/images/motorcoach-front-view-miami.jpg",
      "/images/motorcoach-interior-seating-miami.jpg",
    ],
    badge: null,
  },
  {
    slug: "classic-lincoln",
    name: "Lincoln Continental",
    category: "Classic & Specialty",
    tagline: "2-4 guests · Grand entrance",
    capacity: "Up to 4",
    ideal: "Weddings · Photoshoots · VIP",
    description:
      "Make a timeless statement with our classic Lincoln. Perfect for elegant arrivals, wedding portraits, and special moments that deserve iconic style.",
    image: "/images/lincoln-continental-classic-car-rental-miami.jpg",
    gallery: [
      "/images/lincoln-continental-classic-car-rental-miami.jpg",
      "/images/lincoln-continental-front-detail-miami.jpg",
      "/images/lincoln-continental-side-view-miami.jpg",
      "/images/lincoln-continental-classic-car-miami.jpg",
      "/images/lincoln-continental-convertible-miami.jpg",
      "/images/lincoln-continental-wedding-car-miami.jpg",
    ],
    badge: null,
  },
  {
    slug: "sprinter-van",
    name: "Sprinter Van",
    category: "Vans & SUVs",
    tagline: "Up to 14 guests · VIP ready",
    capacity: "Up to 14",
    ideal: "Airport Transfers · Corporate · Private",
    description:
      "Luxury van transportation for smaller groups that need flexible routes and premium comfort. Ideal for executive travel, airport pickups, and private charters.",
    image: "/images/sprinter-van-rental-miami.jpg",
    gallery: [
      "/images/sprinter-van-rental-miami.jpg",
      "/images/sprinter-van-group-transportation-miami.jpg",
      "/images/sprinter-van-exterior-miami.jpg",
      "/images/sprinter-van-interior-miami.jpg",
    ],
    badge: null,
  },
];

export function getVehicleBySlug(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}
