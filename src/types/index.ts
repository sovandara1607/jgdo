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
  price: number;
  description: string;
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
  features: string[];
}

export interface PricingFeatureRow {
  label: string;
  pro: string | boolean;
  proPlus: string | boolean;
}
