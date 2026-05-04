import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { citiesContent } from "@/lib/cities-content";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Service areas — A&A Flooring across the Lower Mainland",
  description:
    "We install hardwood, vinyl, and laminate floors across the Lower Mainland — Coquitlam, Port Moody, Burnaby, and Vancouver.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  const launchCities = siteConfig.serviceAreas.filter((c) => c.launch);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Service Areas", url: absoluteUrl("/service-areas") },
        ])}
      />

      <section className="container-prose pt-20 pb-12">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Where we work
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-6xl">
          {siteConfig.serviceRadiusKm} km from the shop, mostly.
        </h1>
        <p className="mt-6 max-w-2xl text-[var(--color-muted)]">
          We&rsquo;re based at {siteConfig.nap.streetAddress} in Coquitlam. Most jobs
          are within the Tri-Cities, Burnaby, and Vancouver — but we&rsquo;ll travel
          for the right project.
        </p>
      </section>

      <section className="container-prose grid gap-px border-y border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2">
        {launchCities.map((c) => {
          const content = citiesContent[c.slug];
          return (
            <Link
              key={c.slug}
              href={`/service-areas/${c.slug}`}
              className="group bg-[var(--color-bg)] p-10 transition hover:bg-[var(--color-accent-soft)]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Service area
              </p>
              <h2 className="mt-3 font-display text-3xl">{c.name}</h2>
              {content ? (
                <p className="mt-4 text-sm text-[var(--color-muted)]">
                  {content.intro.split(".")[0]}.
                </p>
              ) : null}
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                Local details
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          );
        })}
      </section>

      <section className="container-prose py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Also serving
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {siteConfig.serviceAreas
            .filter((c) => !c.launch)
            .map((c) => (
              <li
                key={c.slug}
                className="rounded-full border border-[var(--color-line)] px-4 py-1 text-sm text-[var(--color-muted)]"
              >
                {c.name}
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
