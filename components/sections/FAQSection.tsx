"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How many guests can a trolley hold?",
    answer:
      "Our wedding trolleys typically accommodate 25-30 passengers comfortably, depending on the vehicle selected.",
  },
  {
    question: "Do you provide transportation between multiple locations?",
    answer:
      "Yes. We can create custom routes that include hotels, ceremony venues, photo stops, and reception locations.",
  },
  {
    question: "How far in advance should we book?",
    answer:
      "For peak wedding dates we recommend booking early, but we are happy to help with last-minute requests when availability allows.",
  },
  {
    question: "Do you provide transportation outside Miami?",
    answer:
      "Absolutely. We serve South Florida destinations including Coral Gables, Miami Beach, Fort Lauderdale, and more.",
  },
  {
    question: "Is the trolley reserved privately for our group?",
    answer:
      "Yes. Your booking is private for your guests and event schedule unless otherwise requested.",
  },
  {
    question: "Do your trolleys come with a professional driver?",
    answer:
      "Yes. Every booking includes a trained professional chauffeur focused on safety, timing, and service.",
  },
  {
    question: "Can the trolley pick up guests from multiple hotels?",
    answer:
      "Yes. We can arrange multiple pickups based on your timeline and guest logistics.",
  },
  {
    question: "How long can we rent the trolley for?",
    answer:
      "Rental windows are flexible based on your event needs. We can help define an ideal timeline during booking.",
  },
  {
    question: "Are your trolleys good for wedding photos?",
    answer:
      "Definitely. Our white trolleys are a favorite for elegant wedding photography and grand arrivals.",
  },
  {
    question: "Do you work with wedding planners and venues?",
    answer:
      "Yes. We coordinate directly with planners and venue teams to keep transportation smooth and on schedule.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const half = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, half);
  const rightFaqs = faqs.slice(half);

  return (
    <section className="border-t border-[#EBEBEB] bg-zinc-100/70 py-20 lg:py-24">
      <Container className="space-y-10">
        <header className="space-y-4">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-rose-500">FAQ</p>
          <h2 className="text-[clamp(1.4rem,2.5vw,1.85rem)] font-bold tracking-tight text-zinc-900">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl text-[0.95rem] leading-[1.7] text-zinc-600">
            Everything you need to know about booking a trolley with Miami White Trolley.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-16 gap-y-0 md:grid-cols-2">
          <div>
            {leftFaqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
              />
            ))}
          </div>

          <div>
            {rightFaqs.map((faq, i) => {
              const globalIndex = half + i;
              return (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  index={globalIndex}
                  isOpen={openIndex === globalIndex}
                  onToggle={() => setOpenIndex((prev) => (prev === globalIndex ? null : globalIndex))}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[1rem] font-bold tracking-tight text-zinc-900">Still have questions?</h3>
            <p className="mt-1 text-[0.875rem] text-[#717171]">
              Our team is happy to help you plan the perfect transportation experience.
            </p>
          </div>
          <Button href="#" className="h-auto px-7 py-3.5 text-[0.9rem] font-semibold">
            Contact Us &rarr;
          </Button>
        </div>
      </Container>
    </section>
  );
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <article className="border-t border-zinc-200">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center gap-4 py-5 text-left"
      >
        <span className="text-[0.8rem] font-semibold text-[#FF385C]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`flex-1 text-[1rem] font-semibold leading-[1.4] tracking-[-0.02em] ${
            isOpen ? "text-rose-500" : "text-zinc-900"
          }`}
        >
          {faq.question}
        </span>
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300"
          style={{
            backgroundColor: isOpen ? "#FF385C" : "transparent",
            border: isOpen ? "none" : "1px solid #E4E4E7",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke={isOpen ? "#fff" : "#71717A"} strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.28s ease",
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pl-8 pr-12 text-[0.95rem] leading-[1.75] text-[#717171]">{faq.answer}</p>
        </div>
      </div>
    </article>
  );
}
