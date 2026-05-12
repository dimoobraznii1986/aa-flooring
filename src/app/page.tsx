import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { asset } from "@/lib/asset-path";
import { getReviews } from "@/lib/reviews";

export default function HomePage() {
  const reviewsBundle = getReviews();
  const featuredReviews = reviewsBundle.reviews.slice(0, 3);
  return (
    <>
      <section className="relative">
        <div className="container-prose grid items-end gap-12 pt-16 pb-20 md:grid-cols-[1.05fr_1fr] md:pt-24 md:pb-28">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Coquitlam &middot; Since {siteConfig.founded}
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
              Floors, finished the way they should be.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">
              Hardwood, vinyl, and laminate installation across the Lower Mainland —
              plus custom stair treads and accessories made on site.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent)]"
              >
                Request a quote <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-6 py-3 text-sm font-medium hover:border-[var(--color-fg)]"
              >
                See recent projects
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src={asset("/images/hero.jpg")}
              alt="Hardwood flooring detail — A&A Flooring"
              fill
              priority
              sizes="(min-width: 768px) 540px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <div className="container-prose grid gap-px bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative flex flex-col bg-[var(--color-bg)] transition hover:bg-[var(--color-accent-soft)]"
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden">
                <Image
                  src={asset(s.image)}
                  alt={s.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  Service
                </p>
                <h3 className="mt-2 font-display text-2xl">{s.name}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{s.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-prose py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src={asset("/images/lifestyle-1.jpg")}
              alt="Living room with newly installed hardwood floor"
              fill
              sizes="(min-width: 768px) 540px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Serving the Lower Mainland
            </p>
            <h2 className="mt-4 font-display text-4xl">
              From our shop in Coquitlam to your home.
            </h2>
            <p className="mt-6 text-[var(--color-muted)]">
              We&rsquo;re an owner-operated flooring shop based at{" "}
              {siteConfig.nap.streetAddress} in Coquitlam. Most of our work happens
              within {siteConfig.serviceRadiusKm} km of the shop &mdash; from new
              builds in Burquitlam to character renovations in East Van.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {siteConfig.serviceAreas
                .filter((a) => a.launch)
                .map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/service-areas/${a.slug}`}
                      className="text-[var(--color-fg)] hover:text-[var(--color-accent)]"
                    >
                      {a.name} &rarr;
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-prose pb-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Recent work
            </p>
            <h2 className="mt-3 font-display text-4xl">A peek at the portfolio.</h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden items-center gap-1 text-sm font-medium md:inline-flex"
          >
            See all <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { src: "/images/portfolio/25-naturale-white-oak-custom-waterfall-staircase.jpeg", alt: "White oak waterfall staircase" },
            { src: "/images/portfolio/22-curved-staircase.jpg", alt: "Curved hardwood staircase" },
            { src: "/images/portfolio/18-herringbone-installation-in-kitchen.jpeg", alt: "Herringbone hardwood in a kitchen" },
            { src: "/images/portfolio/23-white-oak-engineered-harwood-custome-nosing-accessories.jpeg", alt: "White oak with custom nosing" },
            { src: "/images/portfolio/01-natural-engineered-hardwood.jpeg", alt: "Natural engineered hardwood" },
          ].map((p) => (
            <Link
              key={p.src}
              href="/portfolio"
              className="relative block aspect-square overflow-hidden rounded-[var(--radius-card)]"
            >
              <Image
                src={asset(p.src)}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 18vw, (min-width: 768px) 20vw, 50vw"
                className="object-cover transition duration-500 hover:scale-[1.05]"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <div className="container-prose py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Customer reviews
              </p>
              <h2 className="mt-3 font-display text-4xl">
                {reviewsBundle.averageRating
                  ? `${reviewsBundle.averageRating.toFixed(1)} on Google.`
                  : "What customers say."}
              </h2>
              {reviewsBundle.averageRating ? (
                <p className="mt-3 flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <Stars rating={reviewsBundle.averageRating} />
                  {reviewsBundle.ratingCount?.toLocaleString() ?? featuredReviews.length} ratings
                </p>
              ) : null}
            </div>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1 text-sm font-medium"
            >
              Read all reviews <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredReviews.map((r, i) => (
              <article
                key={`${r.author}-${i}`}
                className="flex flex-col rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-6"
              >
                <Stars rating={r.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-fg)]">
                  &ldquo;{truncate(r.text, 240)}&rdquo;
                </p>
                <p className="mt-6 text-sm font-medium">
                  {r.author}
                  {r.relativeTime ? (
                    <span className="ml-2 text-xs font-normal text-[var(--color-muted)]">
                      {r.relativeTime}
                    </span>
                  ) : null}
                </p>
              </article>
            ))}
          </div>
        </div>
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

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}
