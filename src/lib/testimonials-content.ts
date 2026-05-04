/**
 * Default testimonials seeded from the existing aa-flooring.ca Tilda site.
 * The /reviews page replaces these with live Google reviews when
 * GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are configured.
 */

export interface Testimonial {
  author: string;
  rating: number;
  body: string;
  service?: string;
}

export const seedTestimonials: Testimonial[] = [
  {
    author: "Sarah Lewin",
    rating: 5,
    body: "A&A Flooring transformed our home with their exquisite hardwood floors. The team's attention to detail and craftsmanship were outstanding. We couldn't be happier with the result.",
    service: "Hardwood",
  },
  {
    author: "Samuel Willson",
    rating: 5,
    body: "The attention to detail and quality of work from A&A Flooring is exceptional. Our custom stair treads look incredible and they handled everything professionally start to finish.",
    service: "Stair treads",
  },
  {
    author: "Alex Larkins",
    rating: 5,
    body: "Choosing A&A was the best decision for our laminate flooring — fair quote, on schedule, and the finished work speaks for itself. Highly recommend.",
    service: "Laminate",
  },
];
