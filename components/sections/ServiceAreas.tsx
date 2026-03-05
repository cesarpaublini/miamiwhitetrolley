import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { serviceAreas } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function ServiceAreas() {
  return (
    <section className={sectionStyles.base}>
      <Container className={sectionStyles.stack}>
        <SectionHeader
          label="Service Areas"
          title="Proudly serving Miami and surrounding destinations"
          description="We provide dependable transportation across major South Florida event locations."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceAreas.map((area) => (
            <Card key={area.title} className="space-y-2">
              <h3 className={typographyStyles.h3}>{area.title}</h3>
              <p className={typographyStyles.bodySm}>{area.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
