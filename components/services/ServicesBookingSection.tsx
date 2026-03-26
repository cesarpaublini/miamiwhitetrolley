"use client";

import { useState } from "react";
import { OCCASIONS } from "@/components/services/servicesData";

const TRUST_POINTS = [
  "✅ Free quote - no commitment",
  "⚡ Response within 2 hours",
  "📋 Custom route plan included",
  "🔒 Fully licensed, insured & bonded",
  "💳 Flexible payment options",
] as const;

type ContactCard = { icon: string; label: string; value: string; sub?: string };

const CONTACT_CARDS: ContactCard[] = [
  { icon: "📞", label: "Call us", value: "(786) 565-1088", sub: "8am - 10pm daily" },
  { icon: "💬", label: "WhatsApp", value: "Message us anytime", sub: "Fast replies" },
  { icon: "📧", label: "Email", value: "reservations@rumbatoursmiami.com" },
];

const GUEST_COUNT_OPTIONS = [
  "1-8 guests",
  "9-20 guests",
  "21-40 guests",
  "41-60 guests",
  "61-100 guests",
  "100+ guests",
] as const;

export function ServicesBookingSection() {
  return (
    <section id="book" className="scroll-mt-[72px] border-t border-[#EBEBEB] bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-14 lg:flex-row xl:gap-20">
          <div className="max-w-lg flex-1">
            <p className="text-[0.75rem] font-semibold text-[#222222]">Ready when you are</p>
            <h2
              className="mb-4 mt-3 text-[#222222]"
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Let&apos;s plan your event transport
            </h2>
            <p className="mb-8 text-[#717171]" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
              Tell us your occasion, timeline, and guest count - our team will build a tailored transportation
              plan with the right vehicles and routing for your event.
            </p>

            <div className="mb-9 space-y-3">
              {TRUST_POINTS.map((point) => (
                <div key={point} className="text-[0.9rem] text-[#484848]">
                  {point}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {CONTACT_CARDS.map((card) => (
                <div key={card.label} className="flex items-center gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-4">
                  <span className="text-xl" aria-hidden="true">
                    {card.icon}
                  </span>
                  <div>
                    <p style={{ color: "#717171", fontSize: "0.72rem", fontWeight: 600 }}>{card.label}</p>
                    <p style={{ color: "#222", fontSize: "0.9rem", fontWeight: 700 }}>{card.value}</p>
                    {card.sub ? <p style={{ color: "#AAAAAA", fontSize: "0.72rem" }}>{card.sub}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-lg flex-1">
            <div className="rounded-2xl border border-[#DDDDDD] bg-white p-7 shadow-[0_4px_28px_rgba(0,0,0,0.07)]">
              <h3
                className="mb-5 text-[#222222]"
                style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                Request a free quote
              </h3>
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    guest_count: "",
    event_date: "",
    notes: "",
  });

  const labelClass = "mb-1.5 block text-[0.75rem] font-bold text-[#222222]";
  const labelStyle = { letterSpacing: "0.02em" };
  const inputClass =
    "w-full rounded-xl border border-[#DDDDDD] px-4 py-3 text-[0.875rem] text-[#222222] placeholder:text-[#BBBBBB] transition-colors focus:border-[#222222] focus:outline-none";

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "services-page",
          source_page: "/services",
          ...form,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#EBEBEB] p-8 text-center">
        <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-6 w-6" fill="none">
            <path d="M4.5 10.5 8.3 14l7.2-8" stroke="#222222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h4 className="text-[1rem] font-bold text-[#222222]">Request received!</h4>
        <p className="mt-2 text-[0.875rem] leading-[1.65] text-[#717171]">
          We&apos;ll reach out within 2 hours to confirm availability and share your quote.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-[0.82rem] font-semibold text-[#222222] underline underline-offset-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="sb-name" className={labelClass} style={labelStyle}>NAME</label>
        <input id="sb-name" type="text" required placeholder="Maria Garcia" value={form.name} onChange={set("name")} className={inputClass} />
      </div>

      <div>
        <label htmlFor="sb-email" className={labelClass} style={labelStyle}>EMAIL</label>
        <input id="sb-email" type="email" required placeholder="maria@email.com" value={form.email} onChange={set("email")} className={inputClass} />
      </div>

      <div>
        <label htmlFor="sb-phone" className={labelClass} style={labelStyle}>PHONE</label>
        <input id="sb-phone" type="tel" placeholder="(305) 000-0000" value={form.phone} onChange={set("phone")} className={inputClass} />
      </div>

      <div>
        <label htmlFor="sb-occasion" className={labelClass} style={labelStyle}>OCCASION</label>
        <select id="sb-occasion" required value={form.occasion} onChange={set("occasion")} className={`${inputClass} bg-white`}>
          <option value="">Select occasion...</option>
          {OCCASIONS.map((occasion) => (
            <option key={occasion.id} value={occasion.label}>
              {occasion.emoji} {occasion.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sb-guest-count" className={labelClass} style={labelStyle}>ESTIMATED GUEST COUNT</label>
        <select id="sb-guest-count" required value={form.guest_count} onChange={set("guest_count")} className={`${inputClass} bg-white`}>
          <option value="">Select guest count...</option>
          {GUEST_COUNT_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sb-date" className={labelClass} style={labelStyle}>EVENT DATE</label>
        <input id="sb-date" type="date" required value={form.event_date} onChange={set("event_date")} className={inputClass} />
      </div>

      <div>
        <label htmlFor="sb-notes" className={labelClass} style={labelStyle}>NOTES</label>
        <textarea
          id="sb-notes"
          rows={3}
          placeholder="Tell us about your event, pickup locations, and schedule..."
          value={form.notes}
          onChange={set("notes")}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.82rem] text-red-700">
          Something went wrong. Please try again or call us at (786) 565-1088.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-[#222222] py-4 text-[0.9375rem] font-bold text-white shadow-[0_2px_16px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-[#000000] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request a Free Quote"}
      </button>

      <p className="text-center text-[0.75rem] text-[#717171]">We&apos;ll confirm availability within 2 hours.</p>
    </form>
  );
}
