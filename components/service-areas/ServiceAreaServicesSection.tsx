import Link from "next/link";
import type { ServiceAreaPage } from "@/lib/service-areas";

type ServiceAreaServicesSectionProps = {
  area: ServiceAreaPage;
};

export function ServiceAreaServicesSection({ area }: ServiceAreaServicesSectionProps) {
  const services = area.services;

  return (
    <section className="border-t border-[#EBEBEB] bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <header className="mb-10 max-w-2xl">
          <p className="text-[0.75rem] font-semibold uppercase tracking-widest text-[#FF385C]">
            {services.eyebrow}
          </p>
          <h2
            className="mt-3 font-bold text-[#222222]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            {services.heading}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-[1.75] text-[#717171]">
            {services.description}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-[#EBEBEB] bg-white p-6 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
            >
              <span className="mb-4 block text-3xl" aria-hidden="true">
                {service.icon}
              </span>
              <h3 className="mb-2 text-[0.9375rem] font-bold text-[#222222]">{service.title}</h3>
              <p className="text-[0.875rem] leading-[1.7] text-[#717171]">{service.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#EBEBEB] bg-white p-6 sm:flex-row">
          <div>
            <p className="text-[0.9375rem] font-bold text-[#222222]">{services.fleetCtaTitle}</p>
            <p className="mt-1 text-[0.875rem] text-[#717171]">{services.fleetCtaSubtitle}</p>
          </div>
          <Link
            href="/fleet"
            className="rounded-full bg-[#222222] px-7 py-3 text-[0.875rem] font-bold text-white transition-colors hover:bg-[#FF385C]"
          >
            {services.fleetCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
