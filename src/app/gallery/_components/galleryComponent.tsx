"use client";

import { ParallaxScroll } from "@/components/ui/parallax-scroll";

export function Gallery({ images }: { images: string[] }) {
  return <ParallaxScroll images={images} />;
}
