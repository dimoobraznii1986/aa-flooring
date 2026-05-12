import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { QuoteForm } from "@/components/quote-form";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact A&A Flooring — Coquitlam, BC",
  description:
    "Call (778) 881-3604, message us on WhatsApp, or send a quote request. A&A Flooring serves Coquitlam, Burnaby, Port Moody, and Vancouver.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Contact", url: absoluteUrl("/contact") },
        ])}
      />

      <section className="container-prose pt-20 pb-12">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Contact
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-6xl">
          Tell us about the floor.
        </h1>
        <p className="mt-6 max-w-xl text-[var(--color-muted)]">
          Estimates are free and no-pressure. The more detail you can give us
          (rooms, square footage, photos), the more accurate the number we can
          come back with.
        </p>
      </section>

      <section className="container-prose grid gap-12 border-y border-[var(--color-line)] py-16 lg:grid-cols-[1.1fr_1fr]">
        <QuoteForm />

        <aside className="space-y-8">
          <ContactRow
            icon={<Phone className="h-5 w-5" aria-hidden />}
            label="Call"
            value={siteConfig.nap.telephoneDisplay}
            href={`tel:${siteConfig.nap.telephone}`}
          />
          <ContactRow
            icon={<MessageCircle className="h-5 w-5" aria-hidden />}
            label="WhatsApp"
            value="Message Atilla"
            href={siteConfig.social.whatsapp}
          />
          <ContactRow
            icon={<Mail className="h-5 w-5" aria-hidden />}
            label="Email"
            value={siteConfig.nap.email}
            href={`mailto:${siteConfig.nap.email}`}
          />
          <ContactRow
            icon={<MapPin className="h-5 w-5" aria-hidden />}
            label="Shop"
            value={`${siteConfig.nap.streetAddress}, ${siteConfig.nap.addressLocality} ${siteConfig.nap.postalCode}`}
            href={`https://maps.google.com/?q=${encodeURIComponent(
              `${siteConfig.nap.streetAddress}, ${siteConfig.nap.addressLocality} ${siteConfig.nap.addressRegion}`,
            )}`}
          />
        </aside>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {label}
      </p>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="mt-2 inline-flex items-center gap-3 font-display text-2xl hover:text-[var(--color-accent)]"
      >
        {icon}
        {value}
      </a>
    </div>
  );
}
