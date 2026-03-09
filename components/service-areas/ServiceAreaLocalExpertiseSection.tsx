import type { ServiceAreaPage } from "@/lib/service-areas";

type ServiceAreaLocalExpertiseSectionProps = {
  area: ServiceAreaPage;
};

export function ServiceAreaLocalExpertiseSection({ area }: ServiceAreaLocalExpertiseSectionProps) {
  const local = area.localExpertise;

  return (
    <section className="border-t border-[#EBEBEB] bg-[#111111]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col items-center gap-12 lg:flex-row xl:gap-20">
          <div className="w-full max-w-lg flex-1">
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <img
                src={local.image}
                alt={`${area.name} reception transportation`}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
              />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-[0.9rem] font-semibold leading-[1.6] text-white">
                  "{local.quote}"
                </p>
                <p className="mt-2 text-[0.78rem] font-semibold text-white/60">{local.quoteAttribution}</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl flex-1">
            <p className="text-[0.75rem] font-semibold text-[#FF385C]">{local.eyebrow}</p>
            <h2
              className="mt-3 font-bold text-white"
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              {local.heading}
            </h2>
            <p className="mb-6 mt-4 text-[0.9375rem] leading-[1.8] text-white/70">
              {local.body}
            </p>

            <div className="space-y-4">
              {local.items.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="text-2xl leading-none" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[0.9rem] font-bold text-white">{item.title}</p>
                    <p className="mt-1 text-[0.85rem] leading-[1.65] text-white/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
