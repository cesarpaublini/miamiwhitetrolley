"use client";

import Link from "next/link";
import { useState } from "react";
import type { ServiceAreaPage } from "@/lib/service-areas";

type ServiceAreaVenuesSectionProps = {
  area: ServiceAreaPage;
};

export function ServiceAreaVenuesSection({ area }: ServiceAreaVenuesSectionProps) {
  const [activeVenue, setActiveVenue] = useState<number | null>(null);
  const venues = area.venues;

  return (
    <section className="border-t border-[#EBEBEB]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">{venues.eyebrow}</p>
            <h2
              className="mt-2 font-bold text-[#222222]"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}
            >
              {venues.heading}
            </h2>
          </div>
          <p className="max-w-sm text-[0.875rem] leading-[1.65] text-[#717171]">
            {venues.descriptor}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {venues.items.map((venue, index) => {
            const isActive = activeVenue === index;

            return (
              <article
                key={venue.name}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-[#EBEBEB] transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)]"
                onClick={() => setActiveVenue(isActive ? null : index)}
              >
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }}
                  />
                  <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-bold text-[#484848] backdrop-blur-sm">
                    {venue.type}
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="text-[1rem] font-bold text-[#222222]" style={{ letterSpacing: "-0.02em" }}>
                      {venue.emoji} {venue.name}
                    </h3>
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      style={{
                        transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <path d="M5 7.5 10 12.5 15 7.5" stroke="#AAAAAA" strokeWidth="2.1" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-[#F5F5F5] px-2.5 py-0.5 text-[0.7rem] font-bold text-[#222222]">
                      {venue.highlight}
                    </span>
                    <span className="text-[0.75rem] text-[#717171]">{venue.capacity}</span>
                  </div>

                  <p className="text-[0.85rem] leading-[1.65] text-[#484848]">{venue.description}</p>

                  {isActive ? (
                    <div className="mt-4 border-t border-[#EBEBEB] pt-4">
                      <div className="flex items-center gap-1.5 text-[0.8rem] text-[#717171]">
                        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M8 14s4.5-4.2 4.5-7.5A4.5 4.5 0 1 0 3.5 6.5C3.5 9.8 8 14 8 14Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <circle cx="8" cy="6.5" r="1.6" fill="currentColor" />
                        </svg>
                        <span>{venue.address}</span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {venue.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#F5F5F5] px-3 py-1 text-[0.72rem] font-semibold text-[#484848]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href="?book=1"
                        onClick={(event) => event.stopPropagation()}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#222222] py-3 text-[0.85rem] font-bold text-white transition-colors hover:bg-[#222222]"
                      >
                        Book for {venue.name}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
