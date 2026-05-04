import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { asset } from "@/lib/asset-path";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Flooring services in Coquitlam & the Lower Mainland",
  description:
    "Hardwood, vinyl, laminate, custom accessories, and stair treads — installed across Coquitlam, Burnaby, Port Moody, and Vancouver.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Services", url: absoluteUrl("/services") },
        ])}
      />

      <section className="container-prose pt-20 pb-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
          What we do
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-6xl">
          Four things, done properly.
        </h1>
        <p className="mt-6 max-w-2xl text-[var(--color-muted)]">
          We don&rsquo;t carpet, we don&rsquo;t tile. We focus on the surfaces we know
          inside-out, and we make the trim and stairs ourselves so the job comes out
          of one shop.
        </p>
      </section>

      <section className="container-prose grid gap-px border-y border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2">
        {siteConfig.services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex flex-col bg-[var(--color-bg)] transition hover:bg-[var(--color-accent-soft)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={asset(s.image)}
                alt={s.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {s.shortName}
              </p>
              <h2 className="mt-3 font-display text-3xl">{s.name}</h2>
              <p className="mt-4 text-[var(--color-muted)]">{s.tagline}</p>
              <span className="mt-8 inline-flex items-center gap-1 text-sm font-medium">
                Learn more
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
