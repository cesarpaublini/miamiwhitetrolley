import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function TrustSection() {
  return (
    <section className={`${sectionStyles.base} bg-zinc-100/70`}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#222222]">
              Why Couples Choose Us
            </p>
            <h2 className={`${typographyStyles.h2} max-w-lg`}>
              Miami&apos;s Trusted Wedding Transportation Company
            </h2>
          </div>

          <div className="space-y-6">
            <p className={typographyStyles.body}>
              Miami White Trolley provides elegant transportation for weddings, corporate events,
              and special occasions across South Florida. Our iconic white wedding trolleys and
              luxury vehicles are designed to add style, reliability, and comfort to your event.
            </p>
            <p className={typographyStyles.body}>
              With years of experience serving Miami&apos;s top venues, hotels, and event planners, we
              help ensure your transportation runs smoothly on your big day.
            </p>
            <Button href="#fleet" variant="outline" size="lg" className="border-zinc-400">
              Explore Our Fleet &rarr;
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
