import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { whyChooseItems } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function WhyChooseMiamiSection() {
  return (
    <section className={`${sectionStyles.base} bg-zinc-100/70`}>
      <Container className="space-y-8">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#222222]">
              Our Promise
            </p>
            <h2 className={typographyStyles.h2}>Why Choose Miami White Trolley</h2>
          </div>
          <Button href="/book" variant="outline" className="border-zinc-400">
            Request a Quote &rarr;
          </Button>
        </header>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <div className="grid md:grid-cols-2">
            {whyChooseItems.map((item, index) => (
              <article
                key={item.number}
                className={`space-y-4 p-8 sm:p-9 ${index % 2 === 0 ? "md:border-r md:border-zinc-200" : ""} ${
                  index < 2 ? "border-b border-zinc-200" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-semibold leading-none tracking-tight text-zinc-200">
                    {item.number}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F5F5] text-lg text-[#222222]">
                    {item.icon}
                  </span>
                </div>
                <h3 className={typographyStyles.h3}>{item.title}</h3>
                <p className={`max-w-xl ${typographyStyles.bodySm}`}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
