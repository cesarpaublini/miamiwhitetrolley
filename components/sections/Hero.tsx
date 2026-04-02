import { Container } from "@/components/layout/Container";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { TrackedBookButton } from "@/components/ui/TrackedBookButton";
import { heroContent, siteConfig } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function Hero() {
  return (
    <section className={`bg-white ${sectionStyles.hero}`}>
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">

          {/* Image — first on mobile, second on desktop */}
          <div className="order-1 lg:order-2 relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm">
            <ImageOrPlaceholder
              src={heroContent.image}
              alt="White wedding trolley rental in Miami, South Florida"
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="h-64 w-full object-cover sm:h-80 lg:h-full"
            />
          </div>

          {/* Text content — second on mobile, first on desktop */}
          <div className="order-2 lg:order-1 space-y-5">

            {/* Stars only — no "5.0" text */}
            <a
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="See our 5-star Google reviews"
            >
              <span className="text-lg tracking-[0.15em] text-amber-400">{heroContent.rating}</span>
              <span className="text-sm text-zinc-500">200+ reviews</span>
            </a>

            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
              {heroContent.title}
            </h1>

            {/* Description — hidden on mobile */}
            <p className={`max-w-lg ${typographyStyles.body} hidden sm:block`}>
              {heroContent.description}
            </p>

            {/* Price anchor */}
            <p className="text-sm font-medium text-zinc-600">
              Trolleys from <span className="font-bold text-zinc-900">$350/hr</span> &nbsp;·&nbsp; No hidden fees
            </p>

            {/* Single CTA */}
            <div>
              <TrackedBookButton label={heroContent.primaryCta} location="hero" size="lg" />
            </div>

            {/* Urgency line */}
            <p className="text-sm text-zinc-500">
              <span className="font-semibold text-zinc-700">Wedding dates book 2–3 months out</span> — check availability now.
            </p>

            {/* Trust badges */}
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500">
              <li className="inline-flex items-center gap-1.5">
                <span className="text-amber-400">★</span>
                {heroContent.highlights[0]}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span>📍</span>
                {heroContent.highlights[1]}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span className="text-emerald-600">✓</span>
                {heroContent.highlights[2]}
              </li>
            </ul>

          </div>
        </div>
      </Container>
    </section>
  );
}
