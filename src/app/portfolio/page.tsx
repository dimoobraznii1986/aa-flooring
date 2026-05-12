import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";
import { asset } from "@/lib/asset-path";
import { portfolioGroups, type PortfolioItem } from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: "Portfolio — A&A Flooring",
  description:
    "Recent flooring projects across the Lower Mainland — engineered and solid hardwood, herringbone, vinyl, laminate, and custom stairs.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Portfolio", url: absoluteUrl("/portfolio") },
        ])}
      />

      <section className="container-prose pt-20 pb-12">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Recent work
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-6xl">
          Portfolio
        </h1>
        <p className="mt-6 max-w-2xl text-[var(--color-muted)]">
          A selection of recent installations across Coquitlam, Burnaby,
          Port Moody, and Vancouver. Grouped by the kind of work.
        </p>
        <nav className="mt-8 flex flex-wrap gap-3 text-sm">
          {portfolioGroups.map((g) => (
            <a
              key={g.slug}
              href={`#${g.slug}`}
              className="rounded-full border border-[var(--color-line)] px-4 py-1.5 hover:border-[var(--color-fg)]"
            >
              {g.title}
            </a>
          ))}
        </nav>
      </section>

      {portfolioGroups.map((group) => (
        <section
          key={group.slug}
          id={group.slug}
          className="border-t border-[var(--color-line)] py-16 scroll-mt-24"
        >
          <div className="container-prose">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl">{group.title}</h2>
              <p className="mt-4 text-[var(--color-muted)]">{group.blurb}</p>
            </div>

            <div className="mt-10 grid auto-rows-[280px] gap-4 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[320px]">
              {group.items.map((item, i) => (
                <PortfolioTile key={item.src} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="container-prose py-20 text-center">
        <p className="font-display text-3xl">Like what you see?</p>
        <p className="mt-3 text-[var(--color-muted)]">
          Tell us about your project and we&rsquo;ll come measure.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full bg-[var(--color-fg)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent)]"
        >
          Request a quote
        </Link>
      </section>
    </>
  );
}

function PortfolioTile({ item, index }: { item: PortfolioItem; index: number }) {
  const featured = item.feature ?? false;
  const className = [
    "group relative block overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-line)]",
    featured ? "md:col-span-2 md:row-span-2" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (item.type === "video") {
    return (
      <figure className={className}>
        <video
          src={asset(item.src)}
          poster={item.poster ? asset(item.poster) : undefined}
          controls
          playsInline
          preload="none"
          className="h-full w-full object-cover"
          aria-label={item.alt}
        />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/80">
            Video
          </span>
          <p className="font-display text-lg leading-tight">{item.title}</p>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={className}>
      <Image
        src={asset(item.src)}
        alt={item.alt}
        fill
        sizes={featured
          ? "(min-width: 1024px) 760px, (min-width: 768px) 100vw, 100vw"
          : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"}
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
        priority={index < 2}
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white opacity-0 transition group-hover:opacity-100">
        <p className="font-display text-lg leading-tight">{item.title}</p>
      </figcaption>
    </figure>
  );
}
