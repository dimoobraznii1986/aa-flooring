export const siteConfig = {
  name: "A&A Flooring Accessories",
  shortName: "A&A Flooring",
  url: "https://aa-flooring.ca",
  description:
    "Hardwood, vinyl, and laminate flooring installation in Coquitlam and across the Lower Mainland. Custom stair treads, casings, and accessories crafted by A&A Flooring.",
  founded: 2016,

  nap: {
    streetAddress: "629 Smith Ave",
    addressLocality: "Coquitlam",
    addressRegion: "BC",
    postalCode: "V3J 2W5",
    addressCountry: "CA",
    telephone: "+1-778-881-3604",
    telephoneDisplay: "(778) 881-3604",
    email: "anaflooringltd@gmail.com",
    geo: { latitude: 49.2509, longitude: -122.8972 },
  },

  hours: [
    { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "09:00", closes: "18:00" },
    { days: ["Sa"], opens: "10:00", closes: "16:00" },
  ],

  social: {
    instagram: "https://www.instagram.com/aa.flooring/",
    facebook: "https://www.facebook.com/aa.flooring.ca",
    whatsapp: "https://wa.me/17788813604",
  },

  serviceRadiusKm: 40,

  serviceAreas: [
    { name: "Coquitlam", slug: "coquitlam", launch: true },
    { name: "Port Moody", slug: "port-moody", launch: true },
    { name: "Burnaby", slug: "burnaby", launch: true },
    { name: "Vancouver", slug: "vancouver", launch: true },
    { name: "Port Coquitlam", slug: "port-coquitlam", launch: false },
    { name: "New Westminster", slug: "new-westminster", launch: false },
    { name: "Surrey", slug: "surrey", launch: false },
    { name: "Maple Ridge", slug: "maple-ridge", launch: false },
  ],

  services: [
    {
      slug: "hardwood",
      name: "Hardwood Flooring",
      shortName: "Hardwood",
      tagline: "Solid and engineered hardwood, expertly installed.",
      image: "/images/service-hardwood.jpg",
    },
    {
      slug: "vinyl-laminate",
      name: "Vinyl & Laminate Flooring",
      shortName: "Vinyl & Laminate",
      tagline: "Durable, water-resistant floors that look like the real thing.",
      image: "/images/service-vinyl-laminate.jpg",
    },
    {
      slug: "custom-accessories",
      name: "Custom Flooring Accessories",
      shortName: "Custom Accessories",
      tagline: "Bespoke trims, transitions, and millwork to finish a floor right.",
      image: "/images/service-custom-accessories.jpg",
    },
    {
      slug: "stair-treads-casings",
      name: "Stair Treads & Casings",
      shortName: "Stair Treads",
      tagline: "Custom stair treads and casings made on-site for a seamless fit.",
      image: "/images/service-stair-treads.jpg",
    },
  ],
} as const;

export type ServiceSlug = (typeof siteConfig.services)[number]["slug"];
export type CitySlug = (typeof siteConfig.serviceAreas)[number]["slug"];
