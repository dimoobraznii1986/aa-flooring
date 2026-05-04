import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { seedTestimonials } from "@/lib/testimonials-content";
import {
  JsonLd,
  breadcrumbSchema,
  reviewsSchema,
} from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reviews — A&A Flooring",
  description:
    "What customers say about A&A Flooring in Coquitlam, BC. Hardwood, vinyl, laminate, and custom stair work across the Lower Mainland.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const reviews = seedTestimonials;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Reviews", url: absoluteUrl("/reviews") },
          ]),
          reviewsSchema(
            reviews.map((r) => ({
              author: r.author,
              rating: r.rating,
              body: r.body,
            })),
          ),
        ]}
      />

      <section className="container-prose pt-20 pb-12">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
          What customers say
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-6xl">
          Reviews
        </h1>
      </section>

      <section className="container-prose grid gap-px border-y border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <article
            key={`${r.author}-${i}`}
            className="bg-[var(--color-bg)] p-8"
          >
            <Stars rating={r.rating} />
            <p className="mt-4 text-[var(--color-fg)] leading-relaxed">
              &ldquo;{r.body}&rdquo;
            </p>
            <p className="mt-6 font-medium">{r.author}</p>
          </article>
        ))}
      </section>

      <section className="container-prose py-16 text-sm text-[var(--color-muted)]">
        <p>
          For the latest reviews, head to our{" "}
          <a
            href="https://www.google.com/maps?q=A%26A+Flooring+Coquitlam"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-[var(--color-fg)]"
          >
            Google profile
          </a>
          .
        </p>
        <p className="mt-3">
          Have a project in mind?{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-[var(--color-fg)]">
            Send us a message
          </Link>{" "}
          or call{" "}
          <a
            href={`tel:${siteConfig.nap.telephone}`}
            className="underline underline-offset-4 hover:text-[var(--color-fg)]"
          >
            {siteConfig.nap.telephoneDisplay}
          </a>
          .
        </p>
      </section>
    </>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i < full ? "currentColor" : "none"}
          stroke="currentColor"
          aria-hidden
        />
      ))}
    </span>
  );
}
