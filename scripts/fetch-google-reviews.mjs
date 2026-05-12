/**
 * Fetch Google reviews at build time and write them to
 * src/data/google-reviews.json. Runs in CI before `next build`.
 *
 * Env:
 *   GOOGLE_PLACES_API_KEY  — Places API (New) key
 *   GOOGLE_PLACE_ID        — Place ID for the business (ChIJ...)
 *
 * When either var is missing, the script no-ops gracefully (the JSON
 * stays empty and the site falls back to seeded testimonials).
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_PATH = path.resolve(
  import.meta.dirname,
  "..",
  "src",
  "data",
  "google-reviews.json",
);

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.log(
      "[google-reviews] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set — skipping. Site will use seeded testimonials.",
    );
    return;
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
  const fieldMask = [
    "id",
    "displayName",
    "rating",
    "userRatingCount",
    "reviews",
  ].join(",");

  let res;
  try {
    res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fieldMask,
        Accept: "application/json",
      },
    });
  } catch (err) {
    console.error("[google-reviews] network error:", err.message);
    process.exit(0); // do not fail the build
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(
      `[google-reviews] Places API returned HTTP ${res.status}. Body: ${body.slice(0, 400)}`,
    );
    process.exit(0); // soft-fail; keep prior JSON
  }

  const data = await res.json();

  const reviews = (data.reviews ?? []).map((r) => ({
    author: r.authorAttribution?.displayName ?? "Google reviewer",
    authorPhoto: r.authorAttribution?.photoUri ?? null,
    rating: r.rating ?? 5,
    relativeTime: r.relativePublishTimeDescription ?? null,
    publishedAt: r.publishTime ?? null,
    text: r.text?.text ?? r.originalText?.text ?? "",
    sourceUrl: r.googleMapsUri ?? data.googleMapsUri ?? null,
  }));

  const payload = {
    fetchedAt: new Date().toISOString(),
    placeName: data.displayName?.text ?? null,
    rating: data.rating ?? null,
    userRatingCount: data.userRatingCount ?? null,
    reviews,
  };

  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + "\n");
  console.log(
    `[google-reviews] wrote ${reviews.length} review(s) (overall rating ${payload.rating ?? "n/a"} from ${payload.userRatingCount ?? "?"} ratings) → ${path.relative(process.cwd(), OUT_PATH)}`,
  );
}

main().catch((err) => {
  console.error("[google-reviews] unexpected error:", err);
  process.exit(0);
});
