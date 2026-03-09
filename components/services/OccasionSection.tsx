import Link from "next/link";
import type { Occasion } from "@/components/services/servicesData";

type OccasionSectionProps = {
  occasion: Occasion;
  reverse?: boolean;
};

export function OccasionSection({ occasion, reverse = false }: OccasionSectionProps) {
  return (
    <section id={occasion.id} className="scroll-mt-[72px] border-t border-[#EBEBEB] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className={`flex flex-col gap-10 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
          <div className="w-full max-w-2xl flex-1">
            <div className="grid h-[420px] grid-cols-2 gap-3 md:h-[480px]">
              <div className="relative col-span-2 overflow-hidden rounded-2xl">
                <img
                  src={occasion.image}
                  alt={`${occasion.label} service`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/92 text-xl shadow-sm backdrop-blur-sm">
                  {occasion.emoji}
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img src={occasion.secondImage} alt={`${occasion.label} details`} className="h-full w-full object-cover" />
              </div>
              <div
                className="flex flex-col justify-between rounded-2xl p-4"
                style={{
                  background: `${occasion.accent}12`,
                  border: `1.5px solid ${occasion.accent}22`,
                }}
              >
                <p style={{ color: "#222", fontSize: "0.8rem", lineHeight: 1.65, fontStyle: "italic" }}>
                  "{occasion.quote}"
                </p>
                <p style={{ color: "#717171", marginTop: "8px", fontSize: "0.72rem", fontWeight: 700 }}>
                  {occasion.quoteAuthor}
                </p>
              </div>
            </div>
          </div>

          <div className="flex max-w-xl flex-1 flex-col justify-center">
            <div
              className="mb-4 inline-flex w-fit items-center gap-3 rounded-full px-3 py-1 text-white"
              style={{ background: occasion.accent, fontSize: "0.72rem", fontWeight: 700 }}
            >
              <span>{occasion.emoji}</span>
              <span>{occasion.label}</span>
            </div>

            <h2
              className="mb-3 text-[#222222]"
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              {occasion.tagline}
            </h2>

            <p className="mb-7 text-[#484848]" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
              {occasion.description}
            </p>

            <div className="mb-7 flex items-center gap-6">
              <StatItem value={occasion.stats[0].value} label={occasion.stats[0].label} accent={occasion.accent} />
              <div className="h-8 w-px bg-[#EBEBEB]" />
              <StatItem value={occasion.stats[1].value} label={occasion.stats[1].label} accent={occasion.accent} />
            </div>

            <div className="mb-7">
              <p
                className="mb-3 uppercase text-[#222222]"
                style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em" }}
              >
                What's included
              </p>
              <ul className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                {occasion.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon color={occasion.accent} />
                    <span style={{ color: "#484848", fontSize: "0.85rem", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <p
                className="mb-2.5 uppercase text-[#222222]"
                style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em" }}
              >
                Available vehicles
              </p>
              <div className="flex flex-wrap gap-2">
                {occasion.vehicles.map((vehicle) => (
                  <span
                    key={vehicle}
                    className="rounded-full bg-[#F5F5F5] px-3 py-1.5 text-[#484848]"
                    style={{ fontSize: "0.78rem", fontWeight: 600 }}
                  >
                    {vehicle}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-white transition-opacity hover:opacity-90"
                style={{ background: occasion.accent, fontSize: "0.9rem", fontWeight: 700 }}
              >
                {occasion.primaryCta ?? `Book for ${occasion.label.split(" ")[0]}`}
                <ArrowIcon />
              </a>
              <Link
                href="/fleet"
                className="inline-flex items-center justify-center rounded-full border border-[#DDDDDD] bg-white px-7 py-3.5 text-[#484848] transition-colors hover:border-[#222222] hover:text-[#222222]"
                style={{ fontSize: "0.9rem", fontWeight: 600 }}
              >
                View Fleet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div>
      <p style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.04em", color: accent }}>{value}</p>
      <p style={{ color: "#717171", fontSize: "0.75rem", fontWeight: 600 }}>{label}</p>
    </div>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ background: `${color}18` }}>
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3" fill="none">
        <path d="M4.5 10.5 8.3 14l7.2-8" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
      <path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
