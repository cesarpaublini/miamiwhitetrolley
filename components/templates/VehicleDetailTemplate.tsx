import { VehicleBreadcrumb } from "@/components/vehicle/VehicleBreadcrumb";
import { VehiclePhotoGallery } from "@/components/vehicle/VehiclePhotoGallery";
import { VehicleTitleRow } from "@/components/vehicle/VehicleTitleRow";
import { VehicleTwoColumnLayout } from "@/components/vehicle/VehicleTwoColumnLayout";
import type { FleetVehicle } from "@/lib/fleet-vehicles";

type VehicleDetailTemplateProps = {
  vehicle: FleetVehicle;
};

export function VehicleDetailTemplate({ vehicle }: VehicleDetailTemplateProps) {
  return (
    <main className="bg-white">
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-16">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <VehicleBreadcrumb currentLabel={vehicle.name} />
          <VehicleTitleRow name={vehicle.name} badge={vehicle.badge} />
          <VehiclePhotoGallery name={vehicle.name} images={vehicle.gallery ?? [vehicle.image]} />
          <VehicleTwoColumnLayout vehicle={vehicle} />
        </div>
      </section>
    </main>
  );
}
