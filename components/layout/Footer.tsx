'use client'

import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { trackCtaClick, trackPhoneClick } from "@/lib/analytics";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const services = [
  { label: "Wedding Transportation", href: "/services" },
  { label: "Corporate Events", href: "/services" },
  { label: "Private Charters", href: "/services" },
  { label: "Prom & Quinceañera", href: "/services" },
  { label: "One-Way Transfers", href: "/services" },
];

const company = [
  { label: "Our Fleet", href: "/fleet" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Blog", href: "/blog" },
  { label: "Build Your Timeline", href: "/timeline-builder" },
];

const support = [
  { label: "Contact Us", href: "/contact" },
  { label: "Get a Quote", href: "/contact" },
  { label: "Book Now", href: "/book" },
];

export function Footer() {
  return (
    <footer id="contact" className={`${dmSans.className} bg-[#111111] text-zinc-100`}>
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-8">
          <div className="space-y-5 md:col-span-2">
            <h3 className="text-[1.15rem] font-extrabold tracking-[-0.04em] text-white">{siteConfig.name}</h3>
            <p className="max-w-[300px] text-[0.875rem] leading-7 text-[#999999]">
              Luxury wedding trolley transportation serving Miami, South Florida, and beyond.
              Private charters for weddings, corporate events, and special occasions.
            </p>
            <ul className="space-y-3 text-[0.875rem] text-[#AAAAAA]">
              <li>
                <a href={`tel:${siteConfig.phone}`} onClick={() => trackPhoneClick('footer')} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <PhoneIcon />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <MailIcon />
                  {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <PinIcon />
                Miami, FL &amp; South Florida
              </li>
            </ul>
            <div className="flex gap-3">
              <SocialLink label="Instagram" icon={<InstagramIcon />} />
              <SocialLink label="Facebook" icon={<FacebookIcon />} />
              <SocialLink label="TikTok" icon={<TiktokIcon />} />
            </div>
          </div>

          <FooterColumn title="Services" items={services} />
          <FooterColumn title="Company" items={company} />
          <FooterColumn title="Support" items={support} />
        </div>

        <div className="mt-14 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-8 py-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-[1rem] font-bold tracking-[-0.02em] text-white">Ready to book your trolley?</h4>
              <p className="mt-1 text-[0.85rem] text-[#888888]">
                Private charters available for weddings, events, and corporate groups.
              </p>
            </div>
            <Link
              href="?book=1"
              onClick={() => trackCtaClick('Book Now', 'footer')}
              className="inline-flex h-auto items-center justify-center rounded-full bg-[#222222] px-7 py-3.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-white hover:text-[#111111]"
            >
              Book Now &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#222222] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8rem] text-[#555555]">
            © {new Date().getFullYear()} Miami White Trolley. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white">{title}</h4>
      <ul className="space-y-3 text-[0.875rem] text-[#999999]">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span
      aria-label={label}
      className="inline-flex h-9 w-9 cursor-default items-center justify-center rounded-full border border-[#333333] text-[#555555]"
    >
      {icon}
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 4h4l2 5-2.5 2.5a14 14 0 0 0 6 6L17 15l5 2v4a2 2 0 0 1-2 2C10 23 1 14 1 4a2 2 0 0 1 2-2h2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v4h4v-4h3l1-4h-4V9a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c1.5 2 3 3 5 3" />
    </svg>
  );
}
