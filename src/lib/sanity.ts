/**
 * SANITY CLIENT — REAL, ACTIVE INTEGRATION
 * ------------------------------------------------------------------
 * This client and its queries run for real as soon as these are set:
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_API_TOKEN=            (only needed for draft/preview content)
 *
 * Until those exist, src/lib/data.ts detects that Sanity isn't configured
 * and serves src/lib/mock-data.ts instead — nothing breaks, nothing needs
 * to be commented in or out by hand.
 *
 * Expected Sanity schema: a `project` document type with fields matching
 * src/lib/types.ts (title, slug, client, industry, categories[], etc).
 * Image fields should be Sanity `image` type; video should be either a
 * `mux.video` field (via the sanity-plugin-mux-input plugin) exposed as
 * `muxPlaybackId`, or a plain `url` string field for externally hosted MP4s.
 * ------------------------------------------------------------------
 */

import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Project, Testimonial, Service } from "./types";

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const isSanityConfigured = Boolean(SANITY_PROJECT_ID);

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!client) {
    client = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: "2024-01-01",
      token: process.env.SANITY_API_TOKEN,
      useCdn: !process.env.SANITY_API_TOKEN,
    });
  }
  return client;
}

const builder = isSanityConfigured ? imageUrlBuilder(getSanityClient()) : null;

export function urlFor(source: unknown): string {
  if (!builder || !source) return "";
  return builder.image(source as never).width(1600).quality(80).auto("format").url();
}

// ---- GROQ queries -------------------------------------------------

const PROJECT_FIELDS = `
  title,
  "slug": slug.current,
  client,
  industry,
  categories,
  description,
  challenge,
  solution,
  process,
  year,
  duration,
  software,
  services,
  credits[]{role, name},
  "thumbnail": thumbnail,
  "heroVideoUrl": heroVideo.asset->url,
  "muxPlaybackId": heroVideo.asset->playbackId,
  "posterImage": posterImage,
  "galleryImages": gallery[],
  "behindTheScenesImages": behindTheScenes[],
  tags,
  featured,
  seoTitle,
  seoDescription,
  "publishDate": publishDate
`;

export const queries = {
  allProjects: `*[_type == "project"] | order(year desc) { ${PROJECT_FIELDS} }`,
  featuredProjects: `*[_type == "project" && featured == true] { ${PROJECT_FIELDS} }`,
  projectBySlug: `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`,
  allProjectSlugs: `*[_type == "project"][].slug.current`,
  testimonials: `*[_type == "testimonial"]{ clientName, company, country, review, "logo": logo }`,
  services: `*[_type == "service"] | order(order asc) { title, description }`,
};

// ---- Mappers: raw Sanity doc -> app's Project/Testimonial/Service shape --

// Using `any` at this boundary is intentional: this is the single seam
// translating an untyped CMS response into the app's strict internal types.
export function mapSanityProject(doc: any): Project {
  return {
    title: doc.title,
    slug: doc.slug,
    client: doc.client,
    industry: doc.industry,
    categories: doc.categories || [],
    description: doc.description,
    challenge: doc.challenge,
    solution: doc.solution,
    process: doc.process,
    year: doc.year,
    duration: doc.duration,
    software: doc.software || [],
    services: doc.services || [],
    credits: doc.credits || [],
    thumbnail: urlFor(doc.thumbnail),
    heroVideo: doc.heroVideoUrl || "",
    muxPlaybackId: doc.muxPlaybackId || undefined,
    posterImage: urlFor(doc.posterImage),
    galleryImages: (doc.galleryImages || []).map(urlFor),
    behindTheScenesImages: (doc.behindTheScenesImages || []).map(urlFor),
    tags: doc.tags || [],
    featured: Boolean(doc.featured),
    seoTitle: doc.seoTitle || doc.title,
    seoDescription: doc.seoDescription || doc.description,
    publishDate: doc.publishDate,
  };
}

export function mapSanityTestimonial(doc: any): Testimonial {
  return {
    clientName: doc.clientName,
    company: doc.company,
    country: doc.country,
    review: doc.review,
    logo: doc.logo ? urlFor(doc.logo) : undefined,
  };
}

export function mapSanityService(doc: any): Service {
  return { title: doc.title, description: doc.description };
}
