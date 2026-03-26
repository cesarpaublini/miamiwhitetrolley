"use client";

import Link from "next/link";
import { useState } from "react";
import { fleetCategories, vehicles } from "@/lib/fleet-vehicles";

export function FleetVehicleGridSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof fleetCategories)[number]>("All");

  const filtered =
    activeCategory === "All" ? vehicles : vehicles.filter((v) => v.category === activeCategory);

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {fleetCategories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="rounded-full px-5 py-2 font-semibold transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
                style={{
                  backgroundColor: isActive ? "#222222" : "#F5F5F5",
                  color: isActive ? "#FFFFFF" : "#484848",
                  fontSize: "0.85rem",
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-6 mb-10 border-t border-[#EBEBEB]" aria-hidden="true" />

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle) => (
            <Link key={vehicle.slug} href={`/fleet/${vehicle.slug}`} className="group block">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                {vehicle.badge ? (
                  <span
                    className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: "#222222" }}
                  >
                    {vehicle.badge}
                  </span>
                ) : null}

                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#484848] backdrop-blur-sm">
                  {vehicle.category}
                </span>
              </div>

              <div className="mt-4 space-y-3 px-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-[#1A1A1A]">{vehicle.name}</h3>
                  <span className="text-[0.8rem] font-semibold text-[#222222]">Book -&gt;</span>
                </div>

                <p className="text-sm text-[#717171]">{vehicle.tagline}</p>
                <p className="text-sm leading-7 text-[#484848]">{vehicle.description}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-[0.75rem] font-semibold text-[#484848]">
                    {vehicle.capacity}
                  </span>
                  {vehicle.ideal.split("·").map((tag) => (
                    <span
                      key={`${vehicle.name}-${tag.trim()}`}
                      className="rounded-full px-3 py-1 text-[0.75rem] font-semibold"
                      style={{ backgroundColor: "#F5F5F5", color: "#222222" }}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
