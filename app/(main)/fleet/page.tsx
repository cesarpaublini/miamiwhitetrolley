import type { Metadata } from "next";
import { FleetHeroSection } from "@/components/sections/FleetHeroSection";
import { FleetReadyToBookSection } from "@/components/sections/FleetReadyToBookSection";
import { FleetVehicleGridSection } from "@/components/sections/FleetVehicleGridSection";

export const metadata: Metadata = {
  title: "Fleet | Miami White Trolley",
  description:
    "Explore our fleet of white trolleys, mini coaches, sprinter vans, SUVs, limousines, classic cars, and motor coaches for weddings, corporate events, shuttles, and private group transportation in Miami and South Florida.",
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
