import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { sectionStyles, typographyStyles } from "@/lib/styles";

const stats = [
  { label: "Events Served", value: "1,200+" },
  { label: "5-Star Reviews", value: "450+" },
  { label: "On-Time Rate", value: "99%" },
];

export function TrustIntro() {
  return (
    <section className={sectionStyles.base}>
      <Container>
        <Card className="grid gap-8 p-8 sm:grid-cols-[1.5fr_1fr] sm:p-10">
          <div className="space-y-3">
            <p className={typographyStyles.eyebrow}>Trusted in South Florida</p>
            <h2 className={typographyStyles.h2}>A premium experience from booking to drop-off</h2>
            <p className={typographyStyles.body}>
              Couples, planners, and event teams trust Miami White Trolley for smooth logistics, elegant presentation, and exceptional hospitality.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-4 sm:grid-cols-1">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <dt className="text-xs uppercase tracking-wider text-zinc-500">{stat.label}</dt>
                <dd className="mt-2 text-2xl font-bold text-zinc-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </Container>
    </section>
  );
}
