import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";

export function FleetHeroSection() {
  return (
    <section className="pt-6 pb-0">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ height: "clamp(220px, 28vw, 360px)" }}
        >
          <ImageOrPlaceholder
            src="/images/Services/corporate-event-transportation-miami-white-trolley.jpg"
            alt="Fleet hero background"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <h1
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}
            >
              Our Full Fleet
            </h1>
            <p
              className="mt-3 max-w-2xl leading-relaxed text-white/90"
              style={{ fontSize: "clamp(0.875rem, 1.4vw, 1rem)" }}
            >
              Vehicles for every occasion - from iconic trolleys to luxury
              coaches, all available for private charter across Miami.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-zinc-900 transition hover:bg-zinc-100"
            >
              Book a Vehicle
              <span aria-hidden="true">-&gt;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
