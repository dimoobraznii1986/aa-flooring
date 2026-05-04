import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { asset } from "@/lib/asset-path";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About A&A Flooring",
  description:
    "Owner-operated flooring shop in Coquitlam, BC. Hardwood, vinyl, and laminate installation across the Lower Mainland since 2016.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "About", url: absoluteUrl("/about") },
        ])}
      />

      <section className="container-prose pt-20 pb-12 md:pt-28">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
          About
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-6xl">
          A small shop that does one thing well.
        </h1>
      </section>

      <section className="container-prose pb-12">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[var(--radius-card)]">
          <Image
            src={asset("/images/lifestyle-2.jpg")}
            alt="Workshop scene at A&A Flooring"
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="container-prose grid gap-16 border-y border-[var(--color-line)] py-16 md:grid-cols-2">
        <div className="space-y-5 text-[var(--color-muted)]">
          <p>
            A&amp;A Flooring opened its doors in {siteConfig.founded} at{" "}
            {siteConfig.nap.streetAddress} in Coquitlam. We&rsquo;re a hands-on,
            owner-operated shop &mdash; the same people who quote your job are the
            ones who show up on day one with a measuring tape.
          </p>
          <p>
            We focus on hardwood, vinyl, laminate, and the trim and stairs that go
            with them. We don&rsquo;t do tile, we don&rsquo;t do carpet, and we
            don&rsquo;t subcontract our installs. If you booked us, you got us.
          </p>
          <p>
            Most of our work happens within {siteConfig.serviceRadiusKm} km of the
            shop &mdash; the Tri-Cities, Burnaby, New West, East Van &mdash; though
            we do a little further afield for projects that match our wheelhouse.
          </p>
        </div>

        <dl className="grid gap-8 self-start">
          <div>
            <dt className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Founded
            </dt>
            <dd className="mt-2 font-display text-3xl">{siteConfig.founded}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Where we work
            </dt>
            <dd className="mt-2 font-display text-3xl">Lower Mainland, BC</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Specialization
            </dt>
            <dd className="mt-2 font-display text-3xl">
              Hardwood &amp; custom millwork
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
