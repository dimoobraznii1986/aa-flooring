import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { dataset, projectId } from "./client";

let _builder: ImageUrlBuilder | null = null;

function getBuilder() {
  if (!projectId) return null;
  if (_builder) return _builder;
  _builder = imageUrlBuilder({ projectId, dataset });
  return _builder;
}

export function urlFor(source: SanityImageSource) {
  const builder = getBuilder();
  if (!builder) {
    // No-op chain that returns "" for url(). Prevents build crashes
    // when Sanity isn't configured yet.
    return {
      width: () => ({ url: () => "" }),
      url: () => "",
    } as unknown as ImageUrlBuilder;
  }
  return builder.image(source).auto("format").fit("max");
}
