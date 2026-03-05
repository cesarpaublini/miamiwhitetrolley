import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featureItems } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function WhyChooseUs() {
  return (
    <section id="why-us" className={sectionStyles.base}>
      <Container className={sectionStyles.stack}>
        <SectionHeader
          label="Why Choose Us"
          title="Service details that make every ride feel premium"
          description="From timing precision to polished presentation, we focus on the details that matter most."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {featureItems.map((feature) => (
            <Card key={feature.title} className="space-y-3">
              <h3 className={typographyStyles.h3}>{feature.title}</h3>
              <p className={typographyStyles.bodySm}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
