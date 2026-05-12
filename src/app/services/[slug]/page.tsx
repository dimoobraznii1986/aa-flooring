import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig, type ServiceSlug } from "@/lib/site-config";
import { asset } from "@/lib/asset-path";
import { servicesContent } from "@/lib/services-content";
import { QuoteForm } from "@/components/quote-form";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = servicesContent[slug as ServiceSlug];
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  const content = servicesContent[slug as ServiceSlug];
  if (!service || !content) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Services", url: absoluteUrl("/services") },
            { name: service.name, url: absoluteUrl(`/services/${slug}`) },
          ]),
          serviceSchema({
            name: service.name,
            description: content.metaDescription,
            url: absoluteUrl(`/services/${slug}`),
          }),
          faqSchema(content.faqs),
        ]}
      />

      <section className="container-prose pt-20 pb-16">
        <Link
          href="/services"
          className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
        >
          &larr; All services
        </Link>
        <h1 className="mt-6 max-w-3xl font-display text-5xl md:text-6xl">
          {service.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
          {content.heroSubhead}
        </p>
      </section>

      <section className="container-prose pb-12">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[var(--radius-card)]">
          <Image
            src={asset(service.image)}
            alt={service.name}
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="container-prose grid gap-12 border-y border-[var(--color-line)] py-16 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-base leading-relaxed">{content.intro}</p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {content.highlights.map((h) => (
              <div key={h.title}>
                <h3 className="font-display text-xl">{h.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{h.body}</p>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <QuoteForm serviceSlug={service.slug as ServiceSlug} />
        </aside>
      </section>

      <section className="container-prose py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Common questions
            </p>
            <h2 className="mt-4 font-display text-4xl">FAQ</h2>
            <p className="mt-4 max-w-md text-sm text-[var(--color-muted)]">
              Don&rsquo;t see your question? Call{" "}
              <a
                href={`tel:${siteConfig.nap.telephone}`}
                className="underline underline-offset-4"
              >
                {siteConfig.nap.telephoneDisplay}
              </a>{" "}
              or send a message — Atilla usually replies within a day.
            </p>
          </div>

          <div className="divide-y divide-[var(--color-line)]">
            {content.faqs.map((f) => (
              <details key={f.question} className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                  <span className="font-display text-xl">{f.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" aria-hidden />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <div className="container-prose py-16">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
            We work across
          </p>
          <h2 className="mt-3 font-display text-3xl">
            {service.name.toLowerCase()} in your neighborhood
          </h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-4">
            {siteConfig.serviceAreas
              .filter((a) => a.launch)
              .map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${slug}-${a.slug}`}
                    className="group flex items-center justify-between rounded-md border border-[var(--color-line)] p-4 transition hover:border-[var(--color-fg)]"
                  >
                    <span className="text-sm font-medium">
                      {service.shortName} in {a.name}
                    </span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
