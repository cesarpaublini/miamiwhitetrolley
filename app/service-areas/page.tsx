import type { Metadata } from "next";
import { ServiceAreasGridSection } from "@/components/sections/ServiceAreasGridSection";

export const metadata: Metadata = {
  title: "Service Areas | Miami White Trolley Transportation",
  description:
    "Discover Miami White Trolley service areas across Miami and South Florida, including Miami Beach, Coral Gables, Fort Lauderdale, and more.",
  keywords: [
    "Miami trolley service areas",
    "South Florida event transportation",
    "wedding transportation Miami Beach",
    "group transportation Coral Gables",
    "Fort Lauderdale charter transportation",
  ],
  alternates: {
    canonical: "/service-areas",
  },
  openGraph: {
    title: "Service Areas | Miami White Trolley Transportation",
    description:
      "Explore our transportation coverage across Miami and South Florida for weddings, private events, and corporate group travel.",
    url: "/service-areas",
    siteName: "Miami White Trolley",
    type: "website",
    images: [
      {
        url: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
        alt: "Miami White Trolley service coverage area",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas | Miami White Trolley Transportation",
    description:
      "Explore transportation coverage across Miami and South Florida for weddings, private charters, and events.",
    images: ["/images/Areas/miami-miami-white-trolley-transportation.jpg"],
  },
};

export default function ServiceAreasPage() {
  return (
    <main className="bg-white">
      <ServiceAreasGridSection />
    </main>
  );
}
