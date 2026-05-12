import reviewsJson from "@/data/google-reviews.json";
import { seedTestimonials } from "@/lib/testimonials-content";

export interface DisplayReview {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string | null;
  authorPhoto?: string | null;
  source: "google" | "seed";
  sourceUrl?: string | null;
}

interface RawGoogleReview {
  author: string;
  authorPhoto: string | null;
  rating: number;
  relativeTime: string | null;
  publishedAt: string | null;
  text: string;
  sourceUrl: string | null;
}

interface ReviewsBundle {
  reviews: DisplayReview[];
  /** Overall star rating from Google (e.g. 4.9) */
  averageRating: number | null;
  /** Number of ratings Google reports (not just reviews with text) */
  ratingCount: number | null;
  /** "google" if we have a live feed, else "seed" */
  source: "google" | "seed";
  fetchedAt: string | null;
}

const data = reviewsJson as {
  fetchedAt: string | null;
  placeName: string | null;
  rating: number | null;
  userRatingCount: number | null;
  reviews: RawGoogleReview[];
};

export function getReviews(): ReviewsBundle {
  if (data.reviews && data.reviews.length > 0) {
    const reviews: DisplayReview[] = data.reviews.map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relativeTime,
      authorPhoto: r.authorPhoto,
      source: "google",
      sourceUrl: r.sourceUrl,
    }));
    return {
      reviews,
      averageRating: data.rating,
      ratingCount: data.userRatingCount,
      source: "google",
      fetchedAt: data.fetchedAt,
    };
  }

  // Fall back to the hand-curated seed list.
  const reviews: DisplayReview[] = seedTestimonials.map((t) => ({
    author: t.author,
    rating: t.rating,
    text: t.body,
    relativeTime: null,
    authorPhoto: null,
    source: "seed",
    sourceUrl: null,
  }));
  return {
    reviews,
    averageRating: null,
    ratingCount: null,
    source: "seed",
    fetchedAt: null,
  };
}
