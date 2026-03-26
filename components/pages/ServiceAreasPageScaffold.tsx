import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { serviceAreaAdditionalItems, serviceAreaFeaturedItems } from "@/lib/site";

export function ServiceAreasPageScaffold() {
  return (
    <main className="bg-white">
      <section className="border-b border-zinc-200 bg-zinc-50">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#222222]">Service Areas</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Premium group transportation across South Florida
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">
            Explore where Miami White Trolley operates for weddings, private charters, corporate events, and
            special occasions. This page is scaffolded and ready for section-by-section buildout.
          </p>
          <div className="mt-8">
            <Link
              href="#coverage"
              className="inline-flex items-center justify-center rounded-full bg-[#222222] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#000000]"
            >
              Explore Coverage
            </Link>
          </div>
        </Container>
      </section>

      <section id="coverage">
        <Container className="py-14 sm:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Scaffold Section</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Primary Coverage Areas
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceAreaFeaturedItems.map((area) => (
              <article key={area.name} className="rounded-2xl border border-zinc-200 bg-white p-5">
                <h3 className="text-base font-semibold text-zinc-900">{area.name}</h3>
                <p className="mt-2 text-sm text-zinc-600">Dedicated event transportation coverage.</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <Container className="py-14 sm:py-16">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Extended Service Areas
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {serviceAreaAdditionalItems.map((area) => (
              <span
                key={area.name}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700"
              >
                {area.name}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
