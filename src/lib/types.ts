export interface Credit {
  role: string;
  name: string;
}

export interface Project {
  title: string;
  slug: string;
  client: string;
  industry: string;
  categories: string[];
  description: string;
  challenge: string;
  solution: string;
  process?: string;
  year: number;
  duration: string;
  software: string[];
  services: string[];
  credits: Credit[];
  thumbnail: string;
  thumbnailObjectPosition?: string;
  thumbnailScale?: number;
  videoHoverScale?: number;
  hoverStartTime?: number;
  hoverVideo?: string;
  videoAspectRatio?: string;
  heroVideo: string;
  /** Mux playback ID, if hosting video on Mux. Takes precedence over heroVideo when present. */
  muxPlaybackId?: string;
  posterImage: string;
  galleryImages: string[];
  stackedVideos?: string[];
  stackedVideoLabels?: string[];
  stackedVideoAspectRatios?: string[];
  behindTheScenesImages: string[];
  tags: string[];
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  publishDate: string; // ISO date
}

export interface Testimonial {
  clientName: string;
  company: string;
  country: string;
  review: string;
  logo?: string;
}

export interface Service {
  title: string;
  description: string;
}

export const CATEGORIES = [
  "All",
  "Product",
  "Furniture",
  "Healthcare",
  "Technology",
  "Motion Design",
] as const;

export type Category = (typeof CATEGORIES)[number];
