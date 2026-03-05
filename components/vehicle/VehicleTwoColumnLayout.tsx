"use client";

import { useState } from "react";
import type { FleetVehicle } from "@/lib/fleet-vehicles";

type VehicleTwoColumnLayoutProps = {
  vehicle: FleetVehicle;
};

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
      <path
        d="M4.5 10.5 8.3 14l7.2-8"
        stroke="#FF385C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path
        d="M6.3 2.7h2.5c.5 0 .9.4 1 .9l.4 2.6c.1.5-.2 1-.6 1.3l-1.5 1.1a12 12 0 0 0 3.2 3.2l1.1-1.5c.3-.4.8-.7 1.3-.6l2.6.4c.5.1.9.5.9 1v2.5c0 .6-.5 1.1-1.1 1.1H16A12.5 12.5 0 0 1 3.2 4v-.2c0-.6.5-1.1 1.1-1.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookingCard() {
  const [submitted, setSubmitted] = useState(false);

  const labelClass = "mb-1.5 block text-[0.78rem] font-bold uppercase text-[#222222]";
  const labelStyle = { letterSpacing: "0.02em" };
  const inputClass =
    "w-full rounded-xl border border-[#DDDDDD] px-4 py-3 text-[0.875rem] text-[#222222] focus:border-[#222222] focus:outline-none";

  return (
    <div className="rounded-2xl border border-[#DDDDDD] p-6 shadow-[0_6px_32px_rgba(0,0,0,0.09)]">
      <div>
        <p className="font-extrabold text-[#222222]" style={{ fontSize: "1.3rem", letterSpacing: "-0.03em" }}>
          From $850 <span className="text-[0.875rem] font-medium text-[#717171]">/ 5 hrs</span>
        </p>
        <div className="mt-2 mb-5 flex items-center gap-2 text-[0.82rem] text-[#717171]">
          <span className="text-[#FF385C]">★★★★★</span>
          <span className="font-bold text-[#222222]">5.0</span>
          <span>·</span>
          <span>200+ reviews</span>
        </div>
      </div>

      {!submitted ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-4"
        >
          <div>
            <label className={labelClass} style={labelStyle} htmlFor="event-date">
              Event date
            </label>
            <input id="event-date" type="date" className={inputClass} />
          </div>

          <div>
            <label className={labelClass} style={labelStyle} htmlFor="event-type">
              Event type
            </label>
            <select id="event-type" className={inputClass} defaultValue="">
              <option value="" disabled>
                Select event type
              </option>
              <option>Wedding</option>
              <option>Corporate Event</option>
              <option>Private Charter</option>
              <option>Prom</option>
            </select>
          </div>

          <div>
            <label className={labelClass} style={labelStyle} htmlFor="group-size">
              Group size
            </label>
            <select id="group-size" className={inputClass} defaultValue="">
              <option value="" disabled>
                Select group size
              </option>
              <option>Up to 10</option>
              <option>11-20</option>
              <option>21-40</option>
              <option>41+</option>
            </select>
          </div>

          <hr className="border-[#EBEBEB]" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} style={labelStyle} htmlFor="first-name">
                First name
              </label>
              <input id="first-name" type="text" className={inputClass} />
            </div>
            <div>
              <label className={labelClass} style={labelStyle} htmlFor="last-name">
                Last name
              </label>
              <input id="last-name" type="text" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass} style={labelStyle} htmlFor="email">
              Email
            </label>
            <input id="email" type="email" className={inputClass} />
          </div>

          <div>
            <label className={labelClass} style={labelStyle} htmlFor="phone">
              Phone
            </label>
            <input id="phone" type="tel" className={inputClass} />
          </div>

          <div>
            <label className={labelClass} style={labelStyle} htmlFor="notes">
              Additional notes
            </label>
            <textarea id="notes" rows={3} className={inputClass} />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#FF385C] py-4 text-[0.9375rem] font-bold text-white shadow-[0_2px_16px_rgba(255,56,92,0.35)] transition-colors hover:bg-[#E00B41]"
          >
            Send booking request
          </button>

          <p className="text-center text-[0.75rem] text-[#717171]">
            You won&apos;t be charged yet. We&apos;ll confirm details first.
          </p>
        </form>
      ) : (
        <div className="py-2 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1F3]">
            <CheckIcon />
          </div>
          <h4 className="mt-4 text-base font-bold text-[#222222]">Request sent!</h4>
          <p className="mt-2 text-[0.85rem] leading-[1.6] text-[#717171]">
            We received your request and our team will contact you shortly with availability and pricing details.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 text-[0.85rem] font-semibold text-[#FF385C] underline underline-offset-2"
          >
            Send another request
          </button>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-2 border-t border-[#EBEBEB] pt-4 text-[0.8rem] text-[#717171]">
        <PhoneIcon />
        <span>
          Or call us: <span className="font-bold text-[#222222]">(305) 555-0100</span>
        </span>
      </div>
    </div>
  );
}

export function VehicleTwoColumnLayout({ vehicle }: VehicleTwoColumnLayoutProps) {
  const tags = ["Up to 40 guests", "5-hr minimum", "Driver included", "Miami & South FL"];
  const highlights = [
    { emoji: "🪑", label: "Comfortable seating", value: vehicle.capacity },
    { emoji: "❄️", label: "Climate controlled", value: "Cold A/C and smooth ride" },
    { emoji: "🎩", label: "Professional chauffeur", value: "Experienced local driver" },
    { emoji: "📍", label: "Service area", value: "Miami and South Florida" },
  ];
  const included = [
    "Private vehicle charter",
    "Driver included for full service",
    "Route planning support",
    "Pickup and drop-off coordination",
    "Event-day communication",
    "Licensed and insured operations",
  ];
  const reviews = [
    {
      initials: "EW",
      name: "Emily Watson",
      date: "2 weeks ago",
      text: "The white trolley was absolutely beautiful and perfectly on time. Our guests loved the ride between venues and the driver was amazing.",
    },
    {
      initials: "MJ",
      name: "Michael James",
      date: "1 month ago",
      text: "Super easy booking process and incredible communication. The team coordinated every pickup and made our wedding day transportation stress-free.",
    },
    {
      initials: "AS",
      name: "Andrea Silva",
      date: "3 months ago",
      text: "Clean vehicle, courteous driver, and flawless execution. Highly recommend for anyone planning a Miami wedding or private event.",
    },
    {
      initials: "RK",
      name: "Rita Klein",
      date: "4 months ago",
      text: "Everything felt premium from start to finish. The trolley looked stunning in photos and added a special touch to our day.",
    },
  ];
  const videoThumbnail = vehicle.gallery?.[0] ?? vehicle.image;

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="mt-8 flex flex-col gap-12 xl:gap-16 lg:flex-row">
      <div className="min-w-0 flex-1">
        <section className="border-b border-[#EBEBEB] py-8">
          <h2 className="text-[1.25rem] font-bold text-[#222222]" style={{ letterSpacing: "-0.02em" }}>
            Iconic {vehicle.name} Wedding Trolley · {vehicle.capacity} Guests
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#F5F5F5] px-3.5 py-1.5 text-[0.8rem] font-semibold text-[#484848]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="border-b border-[#EBEBEB] py-8">
          <h3 className="mb-4 text-[1.05rem] font-bold text-[#222222]" style={{ letterSpacing: "-0.02em" }}>
            About this vehicle
          </h3>
          <div className="space-y-4 text-[0.9375rem] leading-[1.75] text-[#484848]">
            <p>{vehicle.description}</p>
            <p>
              Designed for stylish group transportation, this vehicle balances comfort, elegance, and reliability
              for weddings, corporate events, and private celebrations across South Florida.
            </p>
            <p>
              Our team helps coordinate schedules, stops, and guest flow so you can focus on your event while we
              handle the transportation details.
            </p>
          </div>
        </section>

        <section className="border-b border-[#EBEBEB] py-8">
          <h3 className="mb-5 text-[1.05rem] font-bold text-[#222222]" style={{ letterSpacing: "-0.02em" }}>
            Vehicle highlights
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-2xl" aria-hidden="true">
                  {item.emoji}
                </span>
                <div>
                  <p className="text-[0.9rem] font-semibold text-[#222222]">{item.label}</p>
                  <p className="text-[0.85rem] text-[#717171]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#EBEBEB] py-8">
          <h3 className="mb-5 text-[1.05rem] font-bold text-[#222222]" style={{ letterSpacing: "-0.02em" }}>
            What&apos;s included
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF1F3]">
                  <CheckIcon />
                </span>
                <p className="text-[0.875rem] text-[#484848]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#EBEBEB] py-8">
          <h3 className="text-[1.05rem] font-bold text-[#222222]" style={{ letterSpacing: "-0.02em" }}>
            See it in action
          </h3>
          <p className="mb-5 mt-2 text-[0.875rem] text-[#717171]">
            Quick video preview of this vehicle setup and event-ready interior.
          </p>

          <div className="relative overflow-hidden rounded-2xl bg-[#111]" style={{ aspectRatio: "16/9" }}>
            {!isVideoPlaying ? (
              <button
                type="button"
                onClick={() => setIsVideoPlaying(true)}
                className="group relative h-full w-full"
                aria-label="Play vehicle video"
              >
                <img src={videoThumbnail} alt={`${vehicle.name} video thumbnail`} className="h-full w-full object-cover opacity-75" />
                <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-200 group-hover:scale-110">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="ml-0.5 h-6 w-6 fill-[#222222]">
                    <path d="M6 4.5v11l9-5.5-9-5.5Z" />
                  </svg>
                </span>
                <span className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-3 py-1 text-[0.78rem] font-semibold text-white backdrop-blur-sm">
                  Vehicle walkthrough
                </span>
              </button>
            ) : (
              <iframe
                title={`${vehicle.name} video`}
                className="h-full w-full"
                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>
        </section>

        <section className="py-8">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-[#FF385C]">★★★★★</span>
            <h3 className="text-[1.05rem] font-bold text-[#222222]">5.0 · 200+ reviews</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <article key={`${review.name}-${review.date}`} className="rounded-2xl border border-[#EBEBEB] p-5">
                <div className="flex items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF385C] text-[0.72rem] font-bold text-white">
                    {review.initials}
                  </div>
                  <div className="ml-3">
                    <p className="text-[0.875rem] font-bold text-[#222222]">{review.name}</p>
                    <p className="text-[0.78rem] text-[#717171]">{review.date}</p>
                  </div>
                  <span className="ml-auto text-[#FF385C]">★★★★★</span>
                </div>
                <p className="mt-4 text-[0.875rem] leading-[1.65] text-[#484848]">{review.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="w-full shrink-0 lg:w-[380px] xl:w-[420px]">
        <div className="sticky top-[90px]">
          <BookingCard />
        </div>
      </aside>
    </div>
  );
}
