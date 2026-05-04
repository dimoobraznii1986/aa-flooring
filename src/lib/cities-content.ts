import type { CitySlug } from "@/lib/site-config";

export interface CityContent {
  slug: CitySlug;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  neighborhoods: string[];
  localNotes: string;
}

export const citiesContent: Partial<Record<CitySlug, CityContent>> = {
  coquitlam: {
    slug: "coquitlam",
    metaTitle: "Flooring Installation in Coquitlam, BC — A&A Flooring",
    metaDescription:
      "Hardwood, vinyl, and laminate floors installed across Coquitlam — from Burquitlam to Westwood Plateau. Same-day site visits available.",
    intro:
      "Coquitlam is home base. Our shop is on Smith Ave just off Como Lake, and most of the work we do happens within a 10-minute drive of it. We know the strata buildings around Burquitlam Station, the older homes in Maillardville, and the new builds going up around Burke Mountain.",
    neighborhoods: [
      "Burquitlam",
      "Westwood Plateau",
      "Maillardville",
      "Eagle Ridge",
      "Burke Mountain",
      "Como Lake",
    ],
    localNotes:
      "Older homes around Maillardville often have plywood subfloors that have settled — we plan an extra day for floor flattening on those. Strata buildings near the Evergreen Line require IIC 50+ acoustic underlay, which we always carry in stock.",
  },

  "port-moody": {
    slug: "port-moody",
    metaTitle: "Flooring Installation in Port Moody, BC — A&A Flooring",
    metaDescription:
      "Hardwood, vinyl, and laminate flooring installed across Port Moody — Inlet Centre, Heritage Mountain, Newport Village.",
    intro:
      "Port Moody is a 7-minute drive from our Coquitlam shop, and we work the city often — particularly the high-rise condos around Inlet Centre Station and the heritage homes near the brewery district.",
    neighborhoods: [
      "Inlet Centre",
      "Heritage Mountain",
      "Newport Village",
      "Heritage Woods",
      "Glenayre",
    ],
    localNotes:
      "Most newer towers in Port Moody have strata flooring policies requiring underlayment with documented IIC ratings. We submit the specs to your strata management office before the job starts so there&rsquo;s no friction at install.",
  },

  burnaby: {
    slug: "burnaby",
    metaTitle: "Flooring Installation in Burnaby, BC — A&A Flooring",
    metaDescription:
      "Trusted hardwood, vinyl, and laminate installation across Burnaby — Brentwood, Metrotown, Lougheed, Edmonds.",
    intro:
      "Burnaby is a city of contrasts for floors: glass-and-steel towers downtown, mid-century ramblers in Capitol Hill, and post-war bungalows around Edmonds. We&rsquo;ve worked all of it.",
    neighborhoods: [
      "Brentwood",
      "Metrotown",
      "Lougheed",
      "Edmonds",
      "Capitol Hill",
      "Burnaby Heights",
    ],
    localNotes:
      "Burnaby strata buildings often have restrictive flooring approval processes. We&rsquo;ve submitted documentation to most major property management firms in the city and can typically turn approval around in a few business days.",
  },

  vancouver: {
    slug: "vancouver",
    metaTitle: "Flooring Installation in Vancouver, BC — A&A Flooring",
    metaDescription:
      "Hardwood, vinyl, and custom flooring installed across Vancouver — Mount Pleasant, Kitsilano, East Van, Fairview, Marpole.",
    intro:
      "Vancouver is where character homes meet modern condos. We work everything from heritage Craftsman homes in Strathcona to Yaletown lofts and mid-century homes on the West Side.",
    neighborhoods: [
      "Mount Pleasant",
      "Kitsilano",
      "Strathcona",
      "Fairview",
      "East Van",
      "Marpole",
      "Cambie",
    ],
    localNotes:
      "Heritage homes in Strathcona, Mount Pleasant, and Kitsilano often have original fir floors worth saving. We&rsquo;ll always assess for refinishing before recommending replacement — sometimes a sand-and-stain is the right answer.",
  },
};
