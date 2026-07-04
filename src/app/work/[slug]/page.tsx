import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getRelatedProjects,
  getNextProject,
  getLocale,
} from "@/lib/data";
import { VideoPlayer } from "@/components/video-player";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/animations/reveal";
import { ImageCarousel } from "@/components/image-carousel";
import { StackedVideoPlayer } from "@/components/stacked-video-player";
import { dictionaries } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  // Always fetch English metadata for simplicity, or we could pass locale if we want localized SEO
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      images: [{ url: project.posterImage }],
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const locale = getLocale();
  const dict = dictionaries[locale].project;
  
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const [related, next] = await Promise.all([
    getRelatedProjects(project),
    getNextProject(project),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    creator: { "@type": "Person", name: "Yusef Tharwat" },
    dateCreated: project.publishDate,
    about: project.industry,
    image: project.posterImage,
  };

  return (
    <article className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="mx-auto max-w-site px-6 md:px-10">
        {project.stackedVideos && project.stackedVideos.length > 0 ? (
          <StackedVideoPlayer
            videos={project.stackedVideos}
            labels={project.stackedVideoLabels}
            aspectRatios={project.stackedVideoAspectRatios}
            poster={project.posterImage}
            className="w-full mb-16"
          />
        ) : (
          <VideoPlayer
            src={project.heroVideo || "/showreel.mp4"}
            muxPlaybackId={project.muxPlaybackId}
            poster={project.posterImage}
            className={cn(
              "w-full mb-16",
              project.videoAspectRatio === "9/16" && "max-w-md mx-auto",
              project.videoAspectRatio === "4/5" && "max-w-xl mx-auto"
            )}
            videoAspectRatio={project.videoAspectRatio}
          />
        )}
      </section>

      <section className="mx-auto grid max-w-site grid-cols-1 gap-8 px-6 py-16 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="font-heading text-section-title text-text-primary">
            {project.title}
          </h1>
        </div>
        <dl className="grid grid-cols-2 gap-6 text-small lg:col-span-4 lg:grid-cols-1">
          <div>
            <dt className="text-text-secondary">{dict.client}</dt>
            <dd className="mt-1 text-text-primary">{project.client}</dd>
          </div>
          <div>
            <dt className="text-text-secondary">{dict.year}</dt>
            <dd className="mt-1 text-text-primary">{project.year}</dd>
          </div>
          <div>
            <dt className="text-text-secondary">{dict.services}</dt>
            <dd className="mt-1 text-text-primary">{project.services.join(", ")}</dd>
          </div>
        </dl>
      </section>

      {project.galleryImages.length > 0 && (
        <section className="mx-auto max-w-site px-6 pb-section md:px-10">
          <h2 className="mb-8 font-heading text-card-title text-text-primary">{dict.gallery}</h2>
          <ImageCarousel images={project.galleryImages} altPrefix={project.title} />
        </section>
      )}

      <section className="mx-auto max-w-site px-6 pb-section md:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 lg:col-start-1">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <Reveal>
                <h2 className="font-heading text-card-title text-text-primary">{dict.overview}</h2>
                <p className="mt-4 text-body text-text-secondary">{project.description}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-heading text-card-title text-text-primary">{dict.challenge}</h2>
                <p className="mt-4 text-body text-text-secondary">{project.challenge}</p>
              </Reveal>
              <Reveal delay={0.16}>
                <h2 className="font-heading text-card-title text-text-primary">{dict.solution}</h2>
                <p className="mt-4 text-body text-text-secondary">{project.solution}</p>
              </Reveal>
            </div>

            {project.process && (
              <Reveal delay={0.2} className="mt-12">
                <h2 className="font-heading text-card-title text-text-primary">{dict.process}</h2>
                <p className="mt-4 max-w-2xl text-body text-text-secondary">{project.process}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 pb-section md:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 lg:col-start-1">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <h2 className="font-heading text-card-title text-text-primary">{dict.softwareUsed}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.software.map((tool) => (
                    <li key={tool} className="rounded-full border border-text-primary/15 px-4 py-2 text-small text-text-secondary">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-heading text-card-title text-text-primary">{dict.credits}</h2>
                <ul className="mt-4 space-y-2 text-body text-text-secondary">
                  {project.credits.map((credit) => (
                    <li key={credit.role}>
                      <span className="text-text-primary">{credit.role}</span> — {credit.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-site px-6 pb-section md:px-10">
          <h2 className="mb-10 font-heading text-section-title text-text-primary">
            {dict.relatedProjects}
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} openProjectLabel={dictionaries[locale].selectedWork.openProject} />
            ))}
          </div>
        </section>
      )}

      <Link
        href={`/work/${next.slug}`}
        replace
        className="group block border-t border-text-primary/10 px-6 py-20 text-center transition-colors hover:bg-bg-secondary md:px-10"
      >
        <p className="text-small uppercase tracking-[0.15em] text-text-secondary">
          {dict.nextProject}
        </p>
        <p className="mt-3 font-heading text-section-title text-text-primary transition-transform duration-300 ease-elegant group-hover:translate-x-1">
          {next.title} {locale === "ar" ? "←" : "→"}
        </p>
      </Link>
    </article>
  );
}
