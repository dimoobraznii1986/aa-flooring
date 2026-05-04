import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Business name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3 }),
    defineField({
      name: "logo",
      title: "Logo (SVG preferred)",
      type: "image",
      options: { accept: "image/svg+xml,image/png" },
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "nap",
      title: "Name / Address / Phone",
      type: "object",
      fields: [
        { name: "streetAddress", type: "string" },
        { name: "addressLocality", type: "string" },
        { name: "addressRegion", type: "string" },
        { name: "postalCode", type: "string" },
        { name: "addressCountry", type: "string", initialValue: "CA" },
        { name: "telephone", type: "string" },
        { name: "email", type: "string" },
      ],
    }),
    defineField({
      name: "hours",
      title: "Business hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Days (e.g. Mon-Fri)" },
            { name: "opens", type: "string", title: "Opens (HH:MM)" },
            { name: "closes", type: "string", title: "Closes (HH:MM)" },
          ],
        },
      ],
    }),
    defineField({
      name: "social",
      title: "Social",
      type: "object",
      fields: [
        { name: "instagram", type: "url" },
        { name: "facebook", type: "url" },
        { name: "whatsapp", type: "url" },
      ],
    }),
    defineField({
      name: "warranty",
      title: "Warranty / Guarantee statement",
      type: "text",
      rows: 4,
      description: "Plain language. Shows on service pages.",
    }),
  ],
  preview: { select: { title: "name" } },
});
