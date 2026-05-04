import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "author", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "rating",
      type: "number",
      validation: (r) => r.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "source",
      type: "string",
      options: {
        list: [
          { title: "Google", value: "google" },
          { title: "Manual / direct", value: "manual" },
          { title: "Instagram", value: "instagram" },
          { title: "Facebook", value: "facebook" },
        ],
      },
      initialValue: "manual",
    }),
    defineField({ name: "publishedAt", type: "date" }),
    defineField({
      name: "city",
      type: "reference",
      to: [{ type: "city" }],
    }),
    defineField({
      name: "service",
      type: "reference",
      to: [{ type: "service" }],
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "quote" },
  },
});
