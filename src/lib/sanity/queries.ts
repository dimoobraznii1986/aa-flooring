// Sanity GROQ queries. `groq` is an identity tag — it just returns the string,
// but flagging templates with it lets editors highlight GROQ syntax.
const groq = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce((acc, s, i) => acc + s + (i < values.length ? String(values[i]) : ""), "");

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    name, tagline, description, logo, defaultOgImage,
    nap, hours, social, warranty
  }
`;

export const allServicesQuery = groq`
  *[_type == "service"] | order(name asc){
    _id, name, "slug": slug.current, tagline, hero, intro
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    _id, name, "slug": slug.current, tagline, hero, intro, body, highlights, seo,
    "faqs": faqs[]->{ _id, question, answer },
    "brands": brands[]->{ _id, name, logo, url, category }
  }
`;

export const allCitiesQuery = groq`
  *[_type == "city" && isLaunchCity == true] | order(name asc){
    _id, name, "slug": slug.current, intro
  }
`;

export const cityBySlugQuery = groq`
  *[_type == "city" && slug.current == $slug && isLaunchCity == true][0]{
    _id, name, "slug": slug.current, neighborhoods, intro, localNotes, geo, seo,
    "featuredProject": featuredProject->{
      _id, title, "slug": slug.current, summary, before, after, gallery
    },
    "localTestimonial": localTestimonial->{ _id, author, quote, rating, publishedAt }
  }
`;

export const serviceCityCombosQuery = groq`
  *[_type == "serviceCity"]{
    "serviceSlug": service->slug.current,
    "citySlug": city->slug.current
  }
`;

export const serviceCityQuery = groq`
  *[_type == "serviceCity"
    && service->slug.current == $service
    && city->slug.current == $city][0]{
    intro, callouts, seo,
    "service": service->{ _id, name, "slug": slug.current, tagline, hero, intro },
    "city": city->{ _id, name, "slug": slug.current, neighborhoods },
    "featuredProject": featuredProject->{
      _id, title, "slug": slug.current, summary, before, after
    }
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(completedAt desc){
    _id, title, "slug": slug.current, summary, before, after,
    "city": city->{ name, "slug": slug.current },
    "services": services[]->{ name, "slug": slug.current }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, summary, body, before, after, gallery, completedAt,
    "city": city->{ name, "slug": slug.current },
    "services": services[]->{ name, "slug": slug.current }
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(publishedAt desc, _createdAt desc)[0...6]{
    _id, author, quote, rating, source, publishedAt
  }
`;
