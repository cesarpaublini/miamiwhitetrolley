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
    tagline: "Up to 40 guests · Most popular",
    capacity: "Up to 40",
    ideal: "Weddings · Events · Proms",
    description:
      "Our iconic white wedding trolleys are the signature choice for Miami celebrations. Charming, elegant, and stunning in photos - they create an unforgettable arrival for any occasion.",
    image: "/images/white-trolley-transportation-miami.jpg",
    gallery: [
      "/images/white-trolley-transportation-miami.jpg",
      "/images/trolley-rental-miami.jpg",
      "/images/miami-trolley-rental-wedding.jpeg",
      "/images/miami-trolley-rental-wedding-transportation.jpeg",
      "/images/miami-trolley-groom-and-groomsmen.jpg",
    ],
    badge: "Most Popular",
  },
  {
    slug: "green-trolley",
    name: "Green Trolley",
    category: "Trolleys",
    tagline: "Up to 40 guests · Vintage charm",
    capacity: "Up to 40",
    ideal: "Weddings · Corporate · Events",
    description:
      "The green trolley brings timeless vintage character to your event. Same classic open-air experience as the white trolley, with a distinctive color that stands out in every photo.",
    image: "/images/trolley-rental-miami.jpg",
    gallery: [
      "/images/trolley-rental-miami.jpg",
      "/images/white-trolley-transportation-miami.jpg",
      "/images/miami-trolley-rental-wedding.jpeg",
      "/images/miami-trolley-groom-and-groomsmen.jpg",
      "/images/miami-trolley-rental-wedding-transportation.jpeg",
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
      "/images/Minibus-south-florida-transportation.jpg",
      "/images/Services/corporate-event-transportation-miami-white-trolley.jpg",
      "/images/sprinter-van-rental-miami.jpg",
      "/images/lincoln-continental-classic-car-rental-miami.jpg",
    ],
    badge: null,
  },
  {
    slug: "mini-coach",
    name: "Mini Coach",
    category: "Large Vehicles",
    tagline: "Up to 30 guests · Group ready",
    capacity: "Up to 30",
    ideal: "Corporate · Shuttles · Events",
    description:
      "A practical premium option for mid-size groups that need comfort and reliability. Great for hotel loops, venue runs, and smooth multi-stop transportation.",
    image: "/images/Minibus-south-florida-transportation.jpg",
    gallery: [
      "/images/Minibus-south-florida-transportation.jpg",
      "/images/motorcoach-rental-miami.jpg",
      "/images/sprinter-van-rental-miami.jpg",
      "/images/Services/corporate-event-transportation-miami-white-trolley.jpg",
      "/images/miami-trolley-groom-and-groomsmen.jpg",
    ],
    badge: null,
  },
  {
    slug: "classic-lincoln",
    name: "Classic Lincoln",
    category: "Classic & Specialty",
    tagline: "2-4 guests · Grand entrance",
    capacity: "Up to 4",
    ideal: "Weddings · Photoshoots · VIP",
    description:
      "Make a timeless statement with our classic Lincoln. Perfect for elegant arrivals, wedding portraits, and special moments that deserve iconic style.",
    image: "/images/lincoln-continental-classic-car-rental-miami.jpg",
    gallery: [
      "/images/lincoln-continental-classic-car-rental-miami.jpg",
      "/images/miami-wedding-trolley-bride-walking.jpg.jpg",
      "/images/miami-wedding-trolley-bridesmaids-group.jpg",
      "/images/miami-wedding-trolley-bridesmaids-smiling.jpg",
      "/images/miami-trolley-rental-wedding.jpeg",
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
      "/images/Minibus-south-florida-transportation.jpg",
      "/images/motorcoach-rental-miami.jpg",
      "/images/Services/corporate-event-transportation-miami-white-trolley.jpg",
      "/images/lincoln-continental-classic-car-rental-miami.jpg",
    ],
    badge: null,
  },
];

export function getVehicleBySlug(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}
