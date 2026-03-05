import { Container } from "@/components/layout/Container";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { Button } from "@/components/ui/Button";
import { serviceShowcaseItems } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function ServiceShowcaseSection() {
  const [primaryCard, ...secondaryCards] = serviceShowcaseItems;

  return (
    <section id="services" className={`${sectionStyles.base} bg-zinc-100/70`}>
      <Container className="space-y-8">
        <header className="space-y-3">
          <h2 className={typographyStyles.h2}>Transportation for Every Occasion</h2>
          <p className={`max-w-2xl ${typographyStyles.body}`}>
            Miami White Trolley provides transportation services for a variety of events across
            South Florida.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3 lg:auto-rows-[180px]">
          {primaryCard ? (
            <ServiceCard
              title={primaryCard.title}
              description={primaryCard.description}
              image={primaryCard.image}
              className="lg:row-span-2"
            />
          ) : null}

          {secondaryCards.map((item) => (
            <ServiceCard
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Button href="#" size="lg">
            Request a Quote &rarr;
          </Button>
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({
  title,
  description,
  image,
  className = "",
}: {
  title: string;
  description: string;
  image: string;
  className?: string;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm transition-shadow duration-300 hover:shadow-md ${className}`}
    >
      <ImageOrPlaceholder
        src={image}
        alt={title}
        width={1200}
        height={900}
        className="h-full min-h-64 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] lg:min-h-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-100">{description}</p>
      </div>
    </article>
  );
}
