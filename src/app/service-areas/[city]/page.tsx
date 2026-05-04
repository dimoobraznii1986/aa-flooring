import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig, type CitySlug } from "@/lib/site-config";
import { citiesContent } from "@/lib/cities-content";
import { QuoteForm } from "@/components/quote-form";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.serviceAreas
    .filter((c) => c.launch)
    .map((c) => ({ city: c.slug }));
}

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const content = citiesContent[city as CitySlug];
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/service-areas/${city}` },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params;
  const cityMeta = siteConfig.serviceAreas.find((c) => c.slug === city);
  const content = citiesContent[city as CitySlug];
  if (!cityMeta || !content) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Service Areas", url: absoluteUrl("/service-areas") },
          { name: cityMeta.name, url: absoluteUrl(`/service-areas/${city}`) },
        ])}
      />

      <section className="container-prose pt-20 pb-12">
        <Link
          href="/service-areas"
          className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
        >
          &larr; All service areas
        </Link>
        <h1 className="mt-6 max-w-3xl font-display text-5xl md:text-6xl">
          Flooring in {cityMeta.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
          {content.intro}
        </p>
      </section>

      <section className="container-prose grid gap-12 border-y border-[var(--color-line)] py-16 md:grid-cols-3">
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="font-display text-3xl">Neighborhoods we work in</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {content.neighborhoods.map((n) => (
                <li
                  key={n}
                  className="rounded-full border border-[var(--color-line)] px-4 py-1 text-sm text-[var(--color-muted)]"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl">Local notes</h2>
            <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
              {content.localNotes}
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl">Services in {cityMeta.name}</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {siteConfig.services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}-${city}`}
                    className="group flex items-center justify-between rounded-md border border-[var(--color-line)] p-4 transition hover:border-[var(--color-fg)]"
                  >
                    <span className="text-sm font-medium">
                      {s.name} in {cityMeta.name}
                    </span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside>
          <QuoteForm cityName={cityMeta.name} />
        </aside>
      </section>
    </>
  );
}
