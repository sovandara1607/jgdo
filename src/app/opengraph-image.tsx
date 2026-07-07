import { ImageResponse } from "next/og";
import { OgImageContent, ogImageSize } from "@/lib/og-image";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
