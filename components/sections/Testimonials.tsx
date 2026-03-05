import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { testimonialItems } from "@/lib/site";

export function Testimonials() {
  return (
    <section className="bg-zinc-100/70 py-20 lg:py-28">
      <Container className="px-6 lg:px-10">
        <header className="mb-14 space-y-5 text-center">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-rose-500">
            Testimonials
          </p>
          <h2 className="text-[clamp(1.4rem,2.5vw,1.85rem)] font-bold tracking-[-0.03em] text-zinc-900">
            What Our Clients Say
          </h2>

          <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">
            <p className="text-rose-500">★★★★★</p>
            <p className="mt-2 text-[0.85rem] font-medium text-zinc-700">
              Rated 5 Stars by Wedding Couples, Event Planners, and Corporate Clients
            </p>
          </div>
        </header>

        <div className="flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {testimonialItems.map((item) => (
            <article
              key={item.name}
              className="min-w-[300px] rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm md:flex md:min-w-0"
            >
              <div className="flex h-full w-full flex-col gap-5">
                <p className="text-rose-500">★★★★★</p>
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute -left-1 -top-8 text-[4rem] font-black leading-none text-zinc-900/12">
                    &ldquo;
                  </span>
                  <p className="relative text-[0.95rem] leading-7 text-zinc-700">{item.quote}</p>
                </div>

                <div className="border-t border-zinc-200 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF1F3] text-[0.8rem] font-bold text-[#FF385C]">
                      {item.initial}
                    </span>
                    <div>
                      <p className="text-[0.875rem] font-bold text-[#222222]">{item.name}</p>
                      <p className="text-[0.8rem] text-[#717171]">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="#" className="h-auto px-7 py-3.5 text-[0.9rem] font-semibold">
            Book Your Trolley &rarr;
          </Button>
          <Button
            href="#"
            variant="outline"
            className="h-auto border-zinc-300 px-7 py-3.5 text-[0.9rem] font-semibold"
          >
            Read More Reviews
          </Button>
        </div>
      </Container>
    </section>
  );
}
