import { createClient, type SanityClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

let _client: SanityClient | null = null;

function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (_client) return _client;
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return _client;
}

/**
 * Wrap GROQ fetches with consistent caching tags so revalidation can be
 * triggered from a Sanity webhook later. Returns null when Sanity isn't
 * configured (e.g. during scaffolding builds before the project is created).
 */
export async function sanityFetch<T>(args: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  const { query, params = {}, tags = ["sanity"] } = args;

  const client = getClient();
  if (!client) return null as T;

  // In static-export mode (GH Pages), the `next` cache options aren't usable.
  if (process.env.NEXT_OUTPUT_MODE === "export") {
    return client.fetch<T>(query, params);
  }

  return client.fetch<T>(query, params, {
    next: { tags, revalidate: 300 },
  });
}
