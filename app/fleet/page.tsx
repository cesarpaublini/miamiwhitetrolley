import { FleetHeroSection } from "@/components/sections/FleetHeroSection";
import { FleetReadyToBookSection } from "@/components/sections/FleetReadyToBookSection";
import { FleetVehicleGridSection } from "@/components/sections/FleetVehicleGridSection";

export default function FleetPage() {
  return (
    <main className="bg-white">
      <FleetHeroSection />
      <FleetVehicleGridSection />
      <FleetReadyToBookSection />
    </main>
  );
}
