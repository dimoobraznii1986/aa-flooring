import { defineType, defineField } from "sanity";

export const brand = defineType({
  name: "brand",
  title: "Brand carried",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      type: "image",
      options: { accept: "image/svg+xml,image/png" },
    }),
    defineField({ name: "url", type: "url" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Hardwood", value: "hardwood" },
          { title: "Vinyl / LVP", value: "vinyl" },
          { title: "Laminate", value: "laminate" },
          { title: "Underlay / accessories", value: "accessories" },
        ],
      },
    }),
  ],
  preview: { select: { title: "name", subtitle: "category", media: "logo" } },
});
