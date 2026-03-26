import type { ServiceAreaPage } from "@/lib/service-areas";

type ServiceAreaAboutSectionProps = {
  area: ServiceAreaPage;
};

export function ServiceAreaAboutSection({ area }: ServiceAreaAboutSectionProps) {
  const about = area.about;

  return (
    <section className="border-t border-[#EBEBEB]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col items-center gap-12 lg:flex-row xl:gap-20">
          <div className="max-w-xl flex-1">
            <p className="mb-3 text-[0.75rem] font-semibold uppercase text-[#222222]">{about.eyebrow}</p>
            <h2
              className="mb-5 font-bold text-[#222222]"
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              {about.heading}
            </h2>

            <p className="mb-4 text-[0.9375rem] leading-[1.8] text-[#484848]">
              {about.paragraphs[0]}
            </p>
            <p className="mb-4 text-[0.9375rem] leading-[1.8] text-[#484848]">
              {about.paragraphs[1]}
            </p>
            <p className="text-[0.9375rem] leading-[1.8] text-[#484848]">
              {about.paragraphs[2]}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {about.highlights.map((item) => {
                const [emoji, ...labelParts] = item.split(" ");
                const label = labelParts.join(" ");

                return (
                  <div key={item} className="flex items-center gap-2.5 rounded-xl bg-[#F7F7F7] px-4 py-3">
                    <span className="text-lg" aria-hidden="true">
                      {emoji}
                    </span>
                    <span className="text-[0.82rem] font-semibold text-[#484848]">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-xl flex-1">
            <div className="grid h-[420px] grid-cols-2 gap-3">
              <div className="row-span-2 overflow-hidden rounded-2xl">
                <img src={about.images.primary} alt={`${area.name} architecture`} className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img src={about.images.topRight} alt={`Transportation in ${area.name}`} className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img src={about.images.bottomRight} alt={`${area.name} event setting`} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
