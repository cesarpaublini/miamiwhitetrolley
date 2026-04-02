import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { serviceAreaAdditionalItems, serviceAreaFeaturedItems } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function ServiceAreasShowcaseSection() {
  return (
    <section className={`${sectionStyles.base} bg-zinc-100/70`}>
      <Container className="space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#222222]">
            Serving South Florida &amp; Beyond
          </p>
          <h2 className={typographyStyles.h2}>Our Service Areas</h2>
          <p className={`max-w-3xl ${typographyStyles.body}`}>
            We provide transportation services for weddings, corporate events, and private group
            travel throughout South Florida and select destinations across the state.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3 mb-3">
          {serviceAreaFeaturedItems.map((item) => (
            <DestinationCard key={item.name} name={item.name} image={item.image} tall />
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible">
          {serviceAreaAdditionalItems.map((item) => (
            <DestinationCard key={item.name} name={item.name} image={item.image} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Button href="/service-areas" variant="outline" size="lg" className="border-zinc-400">
            View All Service Areas &rarr;
          </Button>
        </div>
      </Container>
    </section>
  );
}

function DestinationCard({
  name,
  image,
  tall = false,
}: {
  name: string;
  image: string;
  tall?: boolean;
}) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/service-areas/${slug}`}
      className={`group relative block min-w-[180px] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm transition-shadow duration-300 hover:shadow-lg md:min-w-0 ${
        tall ? "h-[340px]" : "h-[220px]"
      }`}
    >
      <ImageOrPlaceholder
        src={image}
        alt={name}
        width={900}
        height={900}
        sizes="(max-width: 640px) 50vw, 25vw"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-white"
          style={{
            fontSize: tall ? "1.15rem" : "0.95rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {name}
        </p>
      </div>
    </Link>
  );
}
