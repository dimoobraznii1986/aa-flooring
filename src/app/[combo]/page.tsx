import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { findCombo, getAllCombos, getComboCopy } from "@/lib/service-city-matrix";
import { QuoteForm } from "@/components/quote-form";
import {
  JsonLd,
  breadcrumbSchema,
  serviceSchema,
} from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCombos().map((c) => ({ combo: c.combo }));
}

interface PageProps {
  params: Promise<{ combo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { combo: comboSlug } = await params;
  const combo = findCombo(comboSlug);
  if (!combo) return {};

  const title = `${combo.serviceName} in ${combo.cityName}, BC`;
  const description = `Professional ${combo.serviceName.toLowerCase()} installation in ${combo.cityName}. Quality work and fair quotes from A&A Flooring — based in Coquitlam, serving the Lower Mainland.`;

  return {
    title,
    description,
    alternates: { canonical: `/${comboSlug}` },
    openGraph: { title, description, url: absoluteUrl(`/${comboSlug}`) },
  };
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { combo: comboSlug } = await params;
  const combo = findCombo(comboSlug);
  if (!combo) notFound();

  const { service, city } = getComboCopy(combo);
  if (!service || !city) notFound();

  const otherCities = siteConfig.serviceAreas
    .filter((c) => c.launch && c.slug !== combo.citySlug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            {
              name: combo.serviceName,
              url: absoluteUrl(`/services/${combo.serviceSlug}`),
            },
            {
              name: combo.cityName,
              url: absoluteUrl(`/${comboSlug}`),
            },
          ]),
          serviceSchema({
            name: `${combo.serviceName} in ${combo.cityName}`,
            description: service.metaDescription,
            url: absoluteUrl(`/${comboSlug}`),
          }),
        ]}
      />

      <section className="container-prose pt-20 pb-12">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
          {combo.cityName} &middot; {combo.serviceName}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl md:text-6xl">
          {combo.serviceName} in {combo.cityName}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
          {service.heroSubhead}
        </p>
      </section>

      <section className="container-prose grid gap-12 border-y border-[var(--color-line)] py-16 md:grid-cols-3">
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="font-display text-3xl">
              {combo.serviceName.toLowerCase()}, locally
            </h2>
            <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
              {city.intro}
            </p>
            <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
              {service.intro}
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl">Local considerations</h2>
            <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
              {city.localNotes}
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl">Why this service, here</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {service.highlights.map((h) => (
                <div key={h.title}>
                  <h3 className="font-display text-lg">{h.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {h.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <QuoteForm
            serviceSlug={combo.serviceSlug}
            cityName={combo.cityName}
          />
        </aside>
      </section>

      <section className="container-prose py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Or look at
        </p>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {otherCities.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${combo.serviceSlug}-${c.slug}`}
                className="group flex items-center justify-between rounded-md border border-[var(--color-line)] p-4 transition hover:border-[var(--color-fg)]"
              >
                <span className="text-sm font-medium">
                  {combo.serviceName} in {c.name}
                </span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
