import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceAreaAboutSection } from "@/components/service-areas/ServiceAreaAboutSection";
import { ServiceAreaBookingSection } from "@/components/service-areas/ServiceAreaBookingSection";
import { ServiceAreaHero } from "@/components/service-areas/ServiceAreaHero";
import { ServiceAreaLocalExpertiseSection } from "@/components/service-areas/ServiceAreaLocalExpertiseSection";
import { ServiceAreaReviewsSection } from "@/components/service-areas/ServiceAreaReviewsSection";
import { ServiceAreaServicesSection } from "@/components/service-areas/ServiceAreaServicesSection";
import { ServiceAreaVenuesSection } from "@/components/service-areas/ServiceAreaVenuesSection";
import { getServiceAreaBySlug, serviceAreaPages } from "@/lib/service-areas";

type ServiceAreaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceAreaPages.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: ServiceAreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) {
    return {
      title: "Service Area Not Found | Miami White Trolley",
      description: "The requested service area page could not be found.",
    };
  }

  const canonical = `https://miamiwhitetrolley.com/service-areas/${area.slug}`;

  return {
    title: area.seoTitle,
    description: area.seoDescription,
    keywords: area.seoKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: area.seoTitle,
      description: area.seoDescription,
      url: canonical,
      siteName: "Miami White Trolley",
      type: "website",
      images: [{ url: area.heroImage, alt: `${area.name} service area` }],
    },
    twitter: {
      card: "summary_large_image",
      title: area.seoTitle,
      description: area.seoDescription,
      images: [area.heroImage],
    },
  };
}

export default async function ServiceAreaDetailPage({ params }: ServiceAreaPageProps) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const BASE = 'https://miamiwhitetrolley.com';

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${area.name} transportation service`,
    areaServed: `${area.name}, ${area.state}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Miami White Trolley",
    },
    serviceType: "Wedding and event transportation",
    url: `${BASE}/service-areas/${area.slug}`,
    image: area.heroImage,
    description: area.seoDescription,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${BASE}/service-areas` },
      { "@type": "ListItem", position: 3, name: area.name, item: `${BASE}/service-areas/${area.slug}` },
    ],
  };

  return (
    <main className="bg-white">
      <ServiceAreaHero area={area} />
      <ServiceAreaAboutSection area={area} />
      <ServiceAreaVenuesSection area={area} />
      <ServiceAreaServicesSection area={area} />
      <ServiceAreaReviewsSection area={area} />
      <ServiceAreaLocalExpertiseSection area={area} />
      <ServiceAreaBookingSection area={area} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}
