import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site";

export function Navbar() {
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
                  <a href={link.href} className="transition-colors hover:text-zinc-900">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="justify-self-end">
            <Button href="#contact" size="md">
              Book Now
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
