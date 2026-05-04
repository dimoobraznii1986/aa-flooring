/**
 * Shared, hand-written types for query results. When/if we adopt
 * `sanity typegen`, this file is replaced by the generated `sanity.types.ts`.
 */

import type { PortableTextBlock } from "@portabletext/types";

export interface AltImage {
  _type?: "image";
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface ServiceDoc {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  hero?: AltImage;
  intro?: string;
  body?: PortableTextBlock[];
  highlights?: Array<{ title: string; body: string }>;
  faqs?: FaqDoc[];
  brands?: BrandDoc[];
  seo?: { title?: string; description?: string };
}

export interface CityDoc {
  _id: string;
  name: string;
  slug: string;
  neighborhoods?: string[];
  intro?: string;
  localNotes?: string;
  geo?: { lat: number; lng: number };
  seo?: { title?: string; description?: string };
  featuredProject?: ProjectDoc;
  localTestimonial?: TestimonialDoc;
}

export interface ServiceCityDoc {
  intro: string;
  callouts?: string[];
  seo?: { title?: string; description?: string };
  service: Pick<ServiceDoc, "_id" | "name" | "slug" | "tagline" | "hero" | "intro">;
  city: Pick<CityDoc, "_id" | "name" | "slug" | "neighborhoods">;
  featuredProject?: ProjectDoc;
}

export interface ProjectDoc {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  body?: PortableTextBlock[];
  before?: AltImage;
  after: AltImage;
  gallery?: AltImage[];
  completedAt?: string;
  city?: { name: string; slug: string };
  services?: Array<{ name: string; slug: string }>;
}

export interface TestimonialDoc {
  _id: string;
  author: string;
  quote: string;
  rating: number;
  source?: string;
  publishedAt?: string;
}

export interface FaqDoc {
  _id: string;
  question: string;
  answer: string;
}

export interface BrandDoc {
  _id: string;
  name: string;
  logo?: AltImage;
  url?: string;
  category?: string;
}
