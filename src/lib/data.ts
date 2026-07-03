import "server-only";
import type { Project, Testimonial, Service } from "./types";
import * as mock from "./mock-data";
import {
  getSanityClient,
  isSanityConfigured,
  queries,
  mapSanityProject,
  mapSanityTestimonial,
  mapSanityService,
} from "./sanity";

/**
 * LIVE DATA LAYER
 * ------------------------------------------------------------------
 * Every component imports from THIS file. When Sanity env vars are set
 * (see src/lib/sanity.ts), each function below queries Sanity for real.
 * Otherwise — or if a live query throws — it serves src/lib/mock-data.ts
 * so the site never breaks. No component code changes when you go live;
 * just set the env vars.
 * ------------------------------------------------------------------
 */

import { cookies } from "next/headers";

async function safeSanityQuery<T>(fn: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  if (!isSanityConfigured) return fallback();
  try {
    return await fn();
  } catch (error) {
    console.error("Sanity query failed, falling back to mock content:", error);
    return fallback();
  }
}

export function getLocale(): "en" | "ar" {
  try {
    const cookieStore = cookies();
    return (cookieStore.get("NEXT_LOCALE")?.value as "en" | "ar") || "en";
  } catch {
    return "en";
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const locale = getLocale();
  return safeSanityQuery(
    async () => {
      const docs = await getSanityClient().fetch(queries.allProjects);
      return docs.map(mapSanityProject); // Note: Sanity mapping would need localization too if used
    },
    () => mock.getAllProjects(locale)
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const locale = getLocale();
  return safeSanityQuery(
    async () => {
      const docs = await getSanityClient().fetch(queries.featuredProjects);
      return docs.map(mapSanityProject);
    },
    () => mock.getFeaturedProjects(locale)
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const locale = getLocale();
  return safeSanityQuery(
    async () => {
      const doc = await getSanityClient().fetch(queries.projectBySlug, { slug });
      return doc ? mapSanityProject(doc) : undefined;
    },
    () => mock.getProjectBySlug(slug, locale)
  );
}

export async function getRelatedProjects(current: Project, limit = 3): Promise<Project[]> {
  // Related-project logic runs in-memory against whichever source is active,
  // since it depends on the already-resolved current project.
  const all = await getAllProjects();
  return all
    .filter((p) => p.slug !== current.slug && p.categories.some((c) => current.categories.includes(c)))
    .slice(0, limit);
}

export async function getNextProject(current: Project): Promise<Project> {
  const ordered = await getAllProjects();
  const index = ordered.findIndex((p) => p.slug === current.slug);
  return ordered[(index + 1) % ordered.length];
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return safeSanityQuery(
    () => getSanityClient().fetch(queries.allProjectSlugs),
    () => mock.getAllProjectSlugs()
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const locale = getLocale();
  return safeSanityQuery(
    async () => {
      const docs = await getSanityClient().fetch(queries.testimonials);
      return docs.map(mapSanityTestimonial);
    },
    () => mock.getTestimonials(locale)
  );
}

export async function getServices(): Promise<Service[]> {
  const locale = getLocale();
  return safeSanityQuery(
    async () => {
      const docs = await getSanityClient().fetch(queries.services);
      return docs.map(mapSanityService);
    },
    () => mock.getServices(locale)
  );
}
