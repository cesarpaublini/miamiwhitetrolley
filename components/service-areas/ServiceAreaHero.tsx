import Link from "next/link";
import type { ServiceAreaPage } from "@/lib/service-areas";

type ServiceAreaHeroProps = {
  area: ServiceAreaPage;
};

export function ServiceAreaHero({ area }: ServiceAreaHeroProps) {
  return (
    <section className="w-full pt-6">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <nav className="mb-5 flex items-center gap-2 text-[0.82rem]" aria-label="Breadcrumb">
          <Link href="/" className="text-[#717171] transition-colors hover:text-[#222222]">
            Home
          </Link>
          <span className="text-[#CCCCCC]" aria-hidden="true">
            /
          </span>
          <Link href="/service-areas" className="text-[#717171] transition-colors hover:text-[#222222]">
            Service Areas
          </Link>
          <span className="text-[#CCCCCC]" aria-hidden="true">
            /
          </span>
          <span className="font-semibold text-[#222222]">{area.name}</span>
        </nav>

        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ height: "clamp(280px, 38vw, 520px)" }}
        >
          <img src={area.heroImage} alt={`${area.name} transportation service area`} className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)",
            }}
          />

          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.75rem] font-bold text-[#484848] backdrop-blur-sm">
            {area.regionBadge}
          </span>
          <span className="absolute right-5 top-5 rounded-full bg-[#FF385C] px-3.5 py-1.5 text-[0.75rem] font-bold text-white">
            {area.statusBadge}
          </span>

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-widest text-white/70">
              Service Area
            </p>
            <h1
              className="font-extrabold text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              {area.name}, {area.state}
            </h1>
            <p
              className="max-w-xl text-white/85"
              style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)", lineHeight: 1.65 }}
            >
              {area.heroSubtext}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
