/**
 * Default per-service content used until the Sanity project is populated.
 * Once Sanity has matching documents, the page falls back to that.
 */

import type { ServiceSlug } from "@/lib/site-config";

export interface ServiceContent {
  slug: ServiceSlug;
  metaTitle: string;
  metaDescription: string;
  heroSubhead: string;
  intro: string;
  highlights: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const servicesContent: Record<ServiceSlug, ServiceContent> = {
  hardwood: {
    slug: "hardwood",
    metaTitle: "Hardwood Flooring Installation in Coquitlam, BC",
    metaDescription:
      "Solid and engineered hardwood floors installed across the Lower Mainland. Site-finished or pre-finished, with custom transitions and stair work to match.",
    heroSubhead: "Solid and engineered hardwood, expertly installed.",
    intro:
      "Hardwood is what we love most. We install both solid and engineered floors — oak, maple, walnut, hickory — and finish the trim, transitions, and stairs in-house so the floor reads as one continuous surface.",
    highlights: [
      {
        title: "Solid or engineered",
        body: "Solid for character homes that can take it; engineered for slabs, basements, and condos with strata flooring rules.",
      },
      {
        title: "Site-finished or pre-finished",
        body: "Site-finished gives you the flattest surface and your choice of stain. Pre-finished is faster and dust-free.",
      },
      {
        title: "Stairs and trim made in-shop",
        body: "We mill matching nosings, casings, and stair treads on the same machine, so the grain and tone line up.",
      },
    ],
    faqs: [
      {
        question: "Can hardwood go over a concrete slab?",
        answer:
          "Yes — engineered hardwood is the right choice over concrete (basements and condos). We test moisture before installation and use a vapor barrier when needed.",
      },
      {
        question: "Solid vs engineered: how do I choose?",
        answer:
          "Solid is best on plywood subfloors above grade and can be sanded multiple times over decades. Engineered is more dimensionally stable, which matters in BC&rsquo;s humid winters and in concrete installations.",
      },
      {
        question: "How long does an install take?",
        answer:
          "A typical 1,000 sq ft main floor is 3–5 days for pre-finished and 6–10 days for site-finished (which includes drying time between coats).",
      },
    ],
  },

  "vinyl-laminate": {
    slug: "vinyl-laminate",
    metaTitle: "Vinyl & Laminate Flooring Installation — Coquitlam to Vancouver",
    metaDescription:
      "Waterproof luxury vinyl plank (LVP) and high-pressure laminate installed throughout the Lower Mainland. Pet-proof, kid-proof, basement-friendly.",
    heroSubhead: "Durable, water-resistant, and very hard to tell from the real thing.",
    intro:
      "Modern vinyl plank and laminate look better and last longer than the materials our parents installed. We carry waterproof LVP for kitchens and basements, and quality laminate for bedrooms and rentals where a tougher wear layer matters more than authenticity.",
    highlights: [
      {
        title: "Waterproof LVP",
        body: "Spills, pets, and basement leaks are non-events. Click-lock systems install over almost any flat subfloor.",
      },
      {
        title: "Acoustic-rated underlayment",
        body: "Required by most strata buildings. We install IIC-rated underlay that meets condo bylaws.",
      },
      {
        title: "Realistic visuals",
        body: "Embossed-in-register textures and 8&prime; planks read like real wood at arm&rsquo;s length.",
      },
    ],
    faqs: [
      {
        question: "Is vinyl plank really waterproof?",
        answer:
          "The plank itself is, yes. The seams resist water but aren&rsquo;t fully sealed — for full waterproofing in wet rooms (laundry, bathroom) we recommend a full-spread glue install.",
      },
      {
        question: "Will it work in my condo?",
        answer:
          "Almost certainly. We meet IIC 50+ acoustic ratings required by most Lower Mainland strata. We&rsquo;ll review your strata flooring policy with you before purchasing material.",
      },
    ],
  },

  "custom-accessories": {
    slug: "custom-accessories",
    metaTitle: "Custom Flooring Accessories & Trim — A&A Flooring",
    metaDescription:
      "Custom transitions, reducers, t-moldings, and millwork made on-site to match your floor exactly. Coquitlam, BC.",
    heroSubhead: "Trims, transitions, and millwork made to match.",
    intro:
      "When the floor is right but the trim doesn&rsquo;t match, the whole room reads cheap. We mill our own transitions, t-moldings, reducers, quarter rounds, and reveal trims from the same boards as the floor itself.",
    highlights: [
      {
        title: "Mill-on-site",
        body: "We pull boards from the same lot as your floor and shape transitions on the same morning we install them.",
      },
      {
        title: "Tone-matched stain",
        body: "Custom stain mixing so transitions to tile, carpet, or other rooms disappear instead of standing out.",
      },
      {
        title: "Reveal and shadow gap details",
        body: "Modern wall-to-floor reveals where you don&rsquo;t want a baseboard interrupting a clean wall.",
      },
    ],
    faqs: [
      {
        question: "Can you match trim to a floor I already have?",
        answer:
          "Usually yes — bring us a sample piece (a closet cutoff is ideal) and we&rsquo;ll mill matching stock.",
      },
    ],
  },

  "stair-treads-casings": {
    slug: "stair-treads-casings",
    metaTitle: "Custom Hardwood Stair Treads & Casings — Coquitlam, BC",
    metaDescription:
      "Custom stair treads, risers, and casings milled to match your hardwood. Site-fit and finished by A&A Flooring.",
    heroSubhead: "Stairs that match the floors, exactly.",
    intro:
      "Stairs are where flooring jobs go wrong most often — generic treads from a big box store almost never line up with a real hardwood floor. We make our treads from the same boards as the floor, route the nosings on-site, and finish them in place.",
    highlights: [
      {
        title: "Milled to your stair width",
        body: "Cut to fit, not trimmed-to-fit — every tread is sized to the rough opening of your stair.",
      },
      {
        title: "Open or closed stringers",
        body: "Mitered returns on open-side stairs so end grain never shows.",
      },
      {
        title: "Casings and aprons",
        body: "Skirt boards, aprons, and door casings ordered from the same lot to keep the grain consistent.",
      },
    ],
    faqs: [
      {
        question: "Can you cap carpeted stairs in hardwood?",
        answer:
          "Yes — this is one of our most-requested jobs. We pull the carpet and pad, inspect the substring, then install solid treads and risers with matching nosings.",
      },
    ],
  },
};
