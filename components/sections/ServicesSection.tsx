import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { serviceItems } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function ServicesSection() {
  return (
    <section id="services" className={sectionStyles.base}>
      <Container className={sectionStyles.stack}>
        <SectionHeader
          label="Services"
          title="Transportation tailored to every occasion"
          description="Flexible service options built for celebrations, business events, and custom group transportation."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((service) => (
            <Card key={service.title} className="space-y-3">
              <h3 className={typographyStyles.h3}>{service.title}</h3>
              <p className={typographyStyles.bodySm}>{service.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
