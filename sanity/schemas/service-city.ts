import { defineType, defineField } from "sanity";

export const serviceCity = defineType({
  name: "serviceCity",
  title: "Service × City landing page",
  type: "document",
  description:
    "Powers /[service]-[city] long-tail pages. Each must have a unique intro and ideally a city-specific project.",
  fields: [
    defineField({
      name: "service",
      type: "reference",
      to: [{ type: "service" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "city",
      type: "reference",
      to: [{ type: "city" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "intro",
      title: "Unique intro (avoid duplicating other pages)",
      type: "text",
      rows: 4,
      validation: (r) => r.required().min(120),
    }),
    defineField({
      name: "featuredProject",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "callouts",
      title: "Local callouts (e.g. condo strata rules, heritage homes)",
      type: "array",
      of: [{ type: "string" }],
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
    select: { service: "service.name", city: "city.name" },
    prepare: ({ service, city }) => ({
      title: service && city ? `${service} — ${city}` : "Unconfigured",
    }),
  },
});
