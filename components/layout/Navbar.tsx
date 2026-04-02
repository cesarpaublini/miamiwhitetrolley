"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="grid h-20 grid-cols-[1fr_auto] items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
            {siteConfig.name}
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium text-zinc-600">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-zinc-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 justify-self-end">
            <Button href="?book=1" size="md" className="hidden sm:inline-flex">
              Book Now
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 md:hidden"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white md:hidden">
          <Container>
            <nav aria-label="Mobile">
              <ul className="flex flex-col py-4 text-sm font-medium text-zinc-700">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 transition-colors hover:text-zinc-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-3">
                  <Button href="?book=1" size="lg" className="w-full">
                    Book Now
                  </Button>
                </li>
              </ul>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
