import type { ServiceAreaPage } from "@/lib/service-areas";

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-[#222222]">
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.11.99 5.8L10 14.75l-5.2 2.78.99-5.8-4.21-4.11 5.82-.85L10 1.5z" />
    </svg>
  );
}

type ServiceAreaReviewsSectionProps = {
  area: ServiceAreaPage;
};

export function ServiceAreaReviewsSection({ area }: ServiceAreaReviewsSectionProps) {
  const reviews = area.reviews;

  return (
    <section className="border-t border-[#EBEBEB]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="mb-10 flex items-center gap-3">
          <h2
            className="font-bold text-[#222222]"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", letterSpacing: "-0.03em" }}
          >
            {reviews.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.items.map((r) => (
            <article
              key={`${r.name}-${r.date}`}
              className="rounded-2xl border border-[#EBEBEB] p-6 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
            >
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, index) => (
                  <StarIcon key={`${r.name}-${index}`} />
                ))}
              </div>

              <p className="mb-5 text-[0.9rem] leading-[1.75] text-[#484848]">&quot;{r.quote}&quot;</p>

              <div className="border-t border-[#EBEBEB] pt-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#222222] text-[0.72rem] font-bold text-white">
                    {r.avatar}
                  </span>
                  <div>
                    <p className="text-[0.875rem] font-bold text-[#222222]">{r.name}</p>
                    <p className="text-[0.78rem] text-[#717171]">
                      {r.venue} · {r.date}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
