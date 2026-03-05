import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleDetailTemplate } from "@/components/templates/VehicleDetailTemplate";
import { getVehicleBySlug, vehicles } from "@/lib/fleet-vehicles";

type VehiclePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Miami White Trolley",
      description: "The requested vehicle page could not be found.",
    };
  }

  const title = `${vehicle.name} Rentals in Miami | Miami White Trolley`;
  const description = `${vehicle.description} Capacity: ${vehicle.capacity}. Ideal for ${vehicle.ideal}.`;
  const url = `/fleet/${vehicle.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Miami White Trolley",
      type: "website",
      images: [
        {
          url: vehicle.image,
          alt: `${vehicle.name} by Miami White Trolley`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [vehicle.image],
    },
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${vehicle.name} transportation`,
    description: vehicle.description,
    areaServed: "Miami, Florida",
    provider: {
      "@type": "LocalBusiness",
      name: "Miami White Trolley",
    },
    category: vehicle.category,
    image: vehicle.image,
    url: `/fleet/${vehicle.slug}`,
  };

  return (
    <>
      <VehicleDetailTemplate vehicle={vehicle} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
