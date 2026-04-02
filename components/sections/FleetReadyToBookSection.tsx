'use client'

import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";

export function FleetReadyToBookSection() {
  return (
    <section className="w-full border-t border-[#EBEBEB] bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 text-center md:px-10 md:py-20">
        <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-[#222222]">
          Ready to book?
        </p>

        <h2
          className="mb-4 font-bold text-[#222222]"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
        >
          Find the perfect vehicle for your event
        </h2>

        <p className="mx-auto mb-8 max-w-md text-[0.95rem] leading-[1.7] text-[#717171]">
          Not sure which vehicle is right for you? Our team will help you choose the best option
          for your group size and event type.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="?book=1"
            onClick={() => trackCtaClick('Book a Vehicle', 'fleet-ready')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#222222] px-8 py-3.5 text-[0.9rem] font-semibold text-white transition-colors duration-200 hover:bg-[#e03150]"
          >
            Book a Vehicle
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 7H12M12 7L8.5 3.5M12 7L8.5 10.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="?book=1"
            onClick={() => trackCtaClick('Get a Quote', 'fleet-ready')}
            className="inline-flex items-center justify-center rounded-full border border-[#DDDDDD] px-8 py-3.5 text-[0.9rem] font-semibold text-[#484848] transition-all duration-200 hover:border-[#222222] hover:text-[#222222]"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
