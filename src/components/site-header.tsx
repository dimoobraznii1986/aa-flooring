import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] backdrop-blur">
      <div className="container-prose flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight">A&amp;A</span>
          <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Flooring
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden gap-8 md:flex">
          <Link href="/services" className="text-sm hover:text-[var(--color-accent)]">
            Services
          </Link>
          <Link href="/portfolio" className="text-sm hover:text-[var(--color-accent)]">
            Portfolio
          </Link>
          <Link href="/service-areas" className="text-sm hover:text-[var(--color-accent)]">
            Service Areas
          </Link>
          <Link href="/reviews" className="text-sm hover:text-[var(--color-accent)]">
            Reviews
          </Link>
          <Link href="/about" className="text-sm hover:text-[var(--color-accent)]">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.nap.telephone}`}
            className="hidden items-center gap-1.5 text-sm md:flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {siteConfig.nap.telephoneDisplay}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-[var(--color-fg)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-accent)]"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
