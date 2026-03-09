"use client";

import { useState } from "react";
import type { ServiceAreaPage } from "@/lib/service-areas";

type ServiceAreaBookingSectionProps = {
  area: ServiceAreaPage;
};

export function ServiceAreaBookingSection({ area }: ServiceAreaBookingSectionProps) {
  const booking = area.booking;

  return (
    <section id="book" className="border-t border-[#EBEBEB] bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row xl:gap-20">
          <div className="max-w-lg flex-1">
            <p className="text-[0.75rem] font-semibold text-[#FF385C]">{booking.eyebrow}</p>
            <h2
              className="mb-4 mt-3 font-bold text-[#222222]"
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              {booking.heading}
            </h2>
            <p className="mb-8 text-[0.9375rem] leading-[1.8] text-[#717171]">
              {booking.body}
            </p>

            <div className="mb-8 space-y-3">
              {booking.trustSignals.map((signal) => {
                const [emoji, ...labelParts] = signal.split(" ");
                return (
                  <div key={signal} className="flex items-center gap-3">
                    <span className="text-lg leading-none" aria-hidden="true">
                      {emoji}
                    </span>
                    <span className="text-[0.9rem] text-[#484848]">{labelParts.join(" ")}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3">
              {booking.contactOptions.map((option) => (
                <div key={option.label} className="flex items-center gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-4">
                  <span className="text-xl" aria-hidden="true">
                    {option.icon}
                  </span>
                  <div>
                    <p className="text-[0.75rem] font-semibold text-[#717171]">{option.label}</p>
                    <p className="text-[0.9rem] font-bold text-[#222222]">{option.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-lg flex-1">
            <div className="rounded-2xl border border-[#DDDDDD] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
              <h3
                className="mb-5 text-[#222222]"
                style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {booking.formHeading}
              </h3>
              <BookingForm areaName={area.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingForm({ areaName }: { areaName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
  });

  const labelClass = "mb-1.5 block text-[0.75rem] font-bold text-[#222222]";
  const labelStyle = { letterSpacing: "0.02em" };
  const inputClass =
    "w-full rounded-xl border border-[#DDDDDD] px-4 py-3 text-[0.875rem] text-[#222222] placeholder:text-[#BBBBBB] transition-colors focus:border-[#222222] focus:outline-none";

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#EBEBEB] p-8 text-center">
        <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1F3]">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-6 w-6" fill="none">
            <path
              d="M4.5 10.5 8.3 14l7.2-8"
              stroke="#FF385C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h4 className="text-[1rem] font-bold text-[#222222]">Request received!</h4>
        <p className="mt-2 text-[0.875rem] leading-[1.65] text-[#717171]">
          We&apos;ll reach out within 2 hours to confirm availability for {areaName} and provide a custom quote.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-[0.82rem] font-semibold text-[#FF385C] underline underline-offset-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="area-booking-name" className={labelClass} style={labelStyle}>
          NAME
        </label>
        <input
          id="area-booking-name"
          type="text"
          required
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Maria Garcia"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="area-booking-email" className={labelClass} style={labelStyle}>
          EMAIL
        </label>
        <input
          id="area-booking-email"
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="maria@email.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="area-booking-phone" className={labelClass} style={labelStyle}>
          PHONE
        </label>
        <input
          id="area-booking-phone"
          type="tel"
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          placeholder="(305) 000-0000"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="area-booking-date" className={labelClass} style={labelStyle}>
          EVENT DATE
        </label>
        <input
          id="area-booking-date"
          type="date"
          required
          value={form.date}
          onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="area-booking-notes" className={labelClass} style={labelStyle}>
          NOTES
        </label>
        <textarea
          id="area-booking-notes"
          rows={3}
          value={form.notes}
          onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          placeholder="Tell us about your event, venue, and guest count..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-[#FF385C] py-4 text-[0.9375rem] font-bold text-white shadow-[0_2px_16px_rgba(255,56,92,0.35)] transition-colors duration-200 hover:bg-[#E00B41]"
      >
        Request a Quote
      </button>

      <p className="text-center text-[0.75rem] text-[#717171]">We&apos;ll confirm availability within 2 hours.</p>
    </form>
  );
}
