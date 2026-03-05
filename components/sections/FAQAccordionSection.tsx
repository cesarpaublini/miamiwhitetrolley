"use client";

import { useState } from "react";

type FAQAccordionItem = {
  q: string;
  a: string;
};

type FAQAccordionSectionProps = {
  items: FAQAccordionItem[];
  title?: string;
  className?: string;
};

export function FAQAccordionSection({
  items,
  title = "Frequently Asked Questions",
  className = "",
}: FAQAccordionSectionProps) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold tracking-tight text-[#222222] sm:text-3xl">{title}</h2>
      <div className="mt-4">
        {items.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#EBEBEB]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-[0.9375rem] font-semibold text-[#222222]">{q}</span>
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}
        >
          <line x1="9" y1="3" x2="9" y2="15" stroke="#717171" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="3" y1="9" x2="15" y2="9" stroke="#717171" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {open ? <p className="pb-5 text-[0.9rem] leading-[1.75] text-[#717171]">{a}</p> : null}
    </div>
  );
}
