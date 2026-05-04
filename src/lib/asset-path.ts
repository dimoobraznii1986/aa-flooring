/**
 * Prefix a public asset path (e.g. "/images/hero.jpg") with the basePath
 * configured for this build. Necessary because `next/image` with
 * `unoptimized: true` does NOT auto-prepend basePath to its src.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE}${path}`;
}
