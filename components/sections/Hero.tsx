import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { heroContent } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function Hero() {
  return (
    <section className={`bg-white ${sectionStyles.hero}`}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="tracking-[0.22em] text-zinc-900">{heroContent.rating}</span>
              <span className="text-zinc-600">{heroContent.reviews}</span>
            </div>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl">
              {heroContent.title}
            </h1>
            <p className={`max-w-lg ${typographyStyles.body}`}>{heroContent.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/book" size="lg">
                {heroContent.primaryCta}
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                {heroContent.secondaryCta}
              </Button>
            </div>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-sm text-zinc-600">
              <li className="inline-flex items-center gap-2">
                <span className="text-amber-400">★</span>
                {heroContent.highlights[0]}
              </li>
              <li className="inline-flex items-center gap-2">
                <span>📍</span>
                {heroContent.highlights[1]}
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                {heroContent.highlights[2]}
              </li>
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm">
            <ImageOrPlaceholder
              src={heroContent.image}
              alt="White trolley hero"
              width={1200}
              height={900}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
