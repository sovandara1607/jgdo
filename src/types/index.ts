export type Platform = "macos" | "windows" | "linux";

export interface PlatformAvailability {
  platform: Platform;
  label: string;
  available: boolean;
  minVersion?: string;
  href?: string;
  note?: string;
}

export interface DownloadAsset {
  platform: Platform;
  label: string;
  arch: string;
  fileName: string;
  href: string;
  sizeMb: number;
  sha256: string;
}

export interface AppRelease {
  version: string;
  date: string;
  latest?: boolean;
  assets: DownloadAsset[];
  highlights: string[];
  features: string[];
  improvements: string[];
  fixes: string[];
}

export interface Feature {
  slug: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string;
  category: "windows" | "productivity" | "system" | "focus";
}

export interface Testimonial {
  name: string;
  role: string;
  avatarInitials: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: {
    monthly: number | "custom";
    yearly: number | "custom";
  };
  description: string;
  cta: string;
  href: string;
  highlighted?: boolean;
  features: string[];
}

export interface PricingFeatureRow {
  label: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  authorRole?: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
  readingTime: string;
}
