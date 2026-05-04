import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="container-prose grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm text-[var(--color-muted)]">
            {siteConfig.description}
          </p>
          <address className="mt-6 not-italic text-sm">
            {siteConfig.nap.streetAddress}
            <br />
            {siteConfig.nap.addressLocality}, {siteConfig.nap.addressRegion}{" "}
            {siteConfig.nap.postalCode}
            <br />
            <a href={`tel:${siteConfig.nap.telephone}`} className="hover:text-[var(--color-accent)]">
              {siteConfig.nap.telephoneDisplay}
            </a>
            {" · "}
            <a href={`mailto:${siteConfig.nap.email}`} className="hover:text-[var(--color-accent)]">
              {siteConfig.nap.email}
            </a>
          </address>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-[var(--color-accent)]">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Service Areas
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.serviceAreas
              .filter((a) => a.launch)
              .map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}`}
                    className="hover:text-[var(--color-accent)]"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="container-prose flex flex-col items-start justify-between gap-3 py-6 text-xs text-[var(--color-muted)] md:flex-row md:items-center">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={siteConfig.social.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
