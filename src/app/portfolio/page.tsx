import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { allProjectsQuery } from "@/lib/sanity/queries";
import type { ProjectDoc } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portfolio — A&A Flooring",
  description:
    "Recent flooring projects across the Lower Mainland — hardwood, vinyl, laminate, custom stair work.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = (await sanityFetch<ProjectDoc[]>({
    query: allProjectsQuery,
    tags: ["project"],
  })) ?? [];

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
          Port Moody, and Vancouver.
        </p>
      </section>

      <section className="container-prose pb-24">
        {projects.length === 0 ? (
          <SeedGallery />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p._id}
                href={`/portfolio/${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-line)]">
                  {p.after ? (
                    <Image
                      src={urlFor(p.after).width(900).url()}
                      alt={p.after.alt ?? p.title}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-xl">{p.title}</p>
                    <p className="text-sm text-[var(--color-muted)]">
                      {p.city?.name}
                      {p.services?.length
                        ? ` · ${p.services.map((s) => s.name).join(", ")}`
                        : ""}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function SeedGallery() {
  const items = [
    { src: "/images/portfolio-1.jpg", title: "Hardwood install", caption: "Coquitlam · Hardwood" },
    { src: "/images/portfolio-2.jpg", title: "Vinyl plank — basement", caption: "Burnaby · Vinyl" },
    { src: "/images/portfolio-3.jpg", title: "Stair treads & risers", caption: "Port Moody · Stair work" },
    { src: "/images/portfolio-4.jpg", title: "Engineered hardwood", caption: "Vancouver · Hardwood" },
    { src: "/images/portfolio-5.jpg", title: "Custom transitions", caption: "Coquitlam · Custom millwork" },
  ];

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.src} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-line)]">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 font-display text-xl">{item.title}</p>
            <p className="text-sm text-[var(--color-muted)]">{item.caption}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 text-sm text-[var(--color-muted)]">
        More projects, with before/after photos, are being added to this gallery as we
        photograph recent installs. In the meantime,{" "}
        <Link href="/contact" className="underline underline-offset-4 hover:text-[var(--color-fg)]">
          ask for samples relevant to your project
        </Link>
        .
      </p>
    </>
  );
}
