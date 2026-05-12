import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getReviews } from "@/lib/reviews";
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
  const bundle = getReviews();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Reviews", url: absoluteUrl("/reviews") },
          ]),
          reviewsSchema(
            bundle.reviews.map((r) => ({
              author: r.author,
              rating: r.rating,
              body: r.text,
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
        {bundle.averageRating ? (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-base">
            <span className="font-display text-3xl">
              {bundle.averageRating.toFixed(1)}
            </span>
            <Stars rating={bundle.averageRating} />
            <span className="text-[var(--color-muted)]">
              {bundle.ratingCount?.toLocaleString() ?? bundle.reviews.length}{" "}
              ratings on Google
            </span>
          </div>
        ) : null}
      </section>

      <section className="container-prose grid gap-px border-y border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
        {bundle.reviews.map((r, i) => (
          <article key={`${r.author}-${i}`} className="bg-[var(--color-bg)] p-8">
            <Stars rating={r.rating} />
            <p className="mt-4 text-[var(--color-fg)] leading-relaxed">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              {r.authorPhoto ? (
                <Image
                  src={r.authorPhoto}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full bg-[var(--color-line)] object-cover"
                  unoptimized
                />
              ) : (
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-accent-soft)] text-xs font-medium text-[var(--color-accent)]">
                  {r.author.charAt(0)}
                </span>
              )}
              <div className="leading-tight">
                <p className="font-medium">{r.author}</p>
                {r.relativeTime ? (
                  <p className="text-xs text-[var(--color-muted)]">
                    {r.relativeTime} · Google
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="container-prose py-16 text-sm text-[var(--color-muted)]">
        <p>
          {bundle.source === "google"
            ? "Reviews above are pulled live from our Google Business Profile."
            : "Looking for the latest reviews?"}{" "}
          See them all on our{" "}
          <a
            href="https://www.google.com/maps?q=A%26A+Flooring+Accessories+Coquitlam"
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
          <Link
            href="/contact"
            className="underline underline-offset-4 hover:text-[var(--color-fg)]"
          >
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
    <span
      className="inline-flex items-center gap-0.5 text-[var(--color-accent)]"
      aria-label={`${rating} out of 5 stars`}
    >
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
