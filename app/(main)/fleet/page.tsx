import type { Metadata } from "next";
import { FleetHeroSection } from "@/components/sections/FleetHeroSection";
import { FleetReadyToBookSection } from "@/components/sections/FleetReadyToBookSection";
import { FleetVehicleGridSection } from "@/components/sections/FleetVehicleGridSection";

export const metadata: Metadata = {
  title: "Trolley & Luxury Vehicle Fleet | Miami White Trolley",
  description:
    "Explore our fleet of white trolleys, mini coaches, sprinter vans, classic cars, and motorcoaches for weddings, corporate events, and group transportation in Miami and South Florida.",
  alternates: { canonical: 'https://miamiwhitetrolley.com/fleet' },
  openGraph: {
    title: "Trolley & Luxury Vehicle Fleet | Miami White Trolley",
    description: "White trolleys, sprinter vans, coaches, and classic cars for Miami weddings and events.",
    url: 'https://miamiwhitetrolley.com/fleet',
    siteName: 'Miami White Trolley',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trolley & Luxury Vehicle Fleet | Miami White Trolley",
    description: "White trolleys, sprinter vans, coaches, and classic cars for Miami weddings and events.",
  },
};

export default function FleetPage() {
  return (
    <main className="bg-white">
      <FleetHeroSection />
      <FleetVehicleGridSection />
      <FleetReadyToBookSection />
    </main>
  );
}
