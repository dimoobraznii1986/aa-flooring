import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";

type Json = Record<string, unknown>;

export function localBusinessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FlooringContractor",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.nap.telephone,
    email: siteConfig.nap.email,
    image: absoluteUrl("/og/default.png"),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.nap.streetAddress,
      addressLocality: siteConfig.nap.addressLocality,
      addressRegion: siteConfig.nap.addressRegion,
      postalCode: siteConfig.nap.postalCode,
      addressCountry: siteConfig.nap.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.nap.geo.latitude,
      longitude: siteConfig.nap.geo.longitude,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.nap.geo.latitude,
        longitude: siteConfig.nap.geo.longitude,
      },
      geoRadius: siteConfig.serviceRadiusKm * 1000,
    },
    openingHoursSpecification: siteConfig.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
    ],
  };
}

export function serviceSchema(args: {
  name: string;
  description: string;
  url: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: args.url,
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: siteConfig.serviceAreas
      .filter((a) => a.launch)
      .map((a) => ({ "@type": "City", name: a.name })),
  };
}

export function breadcrumbSchema(crumbs: Array<{ name: string; url: string }>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function reviewsSchema(reviews: Array<{
  author: string;
  rating: number;
  body: string;
  datePublished?: string;
}>): Json {
  if (reviews.length === 0) return {};
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return {
    "@context": "https://schema.org",
    "@type": "FlooringContractor",
    "@id": `${siteConfig.url}/#business`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    })),
  };
}

export function JsonLd({ data }: { data: Json | Json[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return payload
    .filter((d) => Object.keys(d).length > 0)
    .map((d, i) => (
      <script
        key={i}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
      />
    ));
}
