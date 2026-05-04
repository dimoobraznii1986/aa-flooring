import { defineType, defineField } from "sanity";

export const city = defineType({
  name: "city",
  title: "Service Area / City",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isLaunchCity",
      title: "Live on site?",
      type: "boolean",
      description: "Only enable when there's real local content (project + testimonial).",
      initialValue: false,
    }),
    defineField({
      name: "neighborhoods",
      title: "Named neighborhoods",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "intro", type: "text", rows: 4 }),
    defineField({
      name: "localNotes",
      title: "Local notes (strata, heritage, permit nuance)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featuredProject",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "localTestimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
    }),
    defineField({
      name: "geo",
      type: "geopoint",
      title: "City centroid (for the map)",
    }),
    defineField({
      name: "seo",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text", rows: 2 },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "isLaunchCity" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? "Live" : "Draft (not on site yet)",
    }),
  },
});
