"use client";

import { useState } from "react";
import { NAV_ITEMS } from "@/components/services/servicesData";

export function ServicesOccasionStickyNav() {
  const [stickyActive, setStickyActive] = useState(NAV_ITEMS[0].id);

  return (
    <section className="sticky top-[72px] z-40 border-b border-[#EBEBEB] bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div
          className="flex gap-1.5 overflow-x-auto py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = stickyActive === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setStickyActive(item.id)}
                className="flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  background: isActive ? "#222" : "transparent",
                  color: isActive ? "#fff" : "#484848",
                  borderColor: isActive ? "#222" : "#E5E5E5",
                }}
              >
                <span className="sm:hidden">{item.emoji}</span>
                <span className="hidden sm:inline">{item.emoji}</span>
                <span className="hidden sm:inline">{item.label.split(" ")[0]}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
