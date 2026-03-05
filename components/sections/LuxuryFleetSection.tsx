import { Container } from "@/components/layout/Container";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { luxuryFleetItems } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function LuxuryFleetSection() {
  return (
    <section id="fleet" className={`${sectionStyles.base} bg-zinc-100/70`}>
      <Container className="space-y-8">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <h2 className={typographyStyles.h2}>Our Luxury Transportation Fleet</h2>
            <p className={`max-w-3xl ${typographyStyles.body}`}>
              Elegant options for weddings, corporate events, and private group transportation
              across Miami.
            </p>
          </div>
          <Button href="#fleet" variant="outline" className="border-zinc-400">
            View Full Fleet
          </Button>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {luxuryFleetItems.map((item) => (
            <article key={item.title} className="space-y-3">
              <Link href={`/fleet/${item.slug}`} aria-label={`View ${item.title} details`} className="block">
                <figure className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <ImageOrPlaceholder
                    src={item.image}
                    alt={item.title}
                    width={1000}
                    height={700}
                    className="h-52 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:h-56"
                  />
                </figure>
              </Link>
              <div className="space-y-1">
                <h3 className={typographyStyles.h3}>{item.title}</h3>
                <p className={typographyStyles.bodySm}>{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
