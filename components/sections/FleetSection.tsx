import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fleetItems } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function FleetSection() {
  return (
    <section id="fleet" className={sectionStyles.base}>
      <Container className={sectionStyles.stack}>
        <SectionHeader
          label="Our Fleet"
          title="Vehicles designed for elegant group travel"
          description="Choose the right trolley and shuttle options for your event size, route, and style."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {fleetItems.map((item) => (
            <Card key={item.title} className="overflow-hidden p-0">
              <div className="relative h-52 bg-zinc-200">
                <ImageOrPlaceholder src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="space-y-3 p-6">
                <h3 className={typographyStyles.h3}>{item.title}</h3>
                <p className={typographyStyles.bodySm}>{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
