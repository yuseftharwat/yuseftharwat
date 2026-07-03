"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ 
  project, 
  priority = false,
  openProjectLabel = "Open Project"
}: { 
  project: Project; 
  priority?: boolean;
  openProjectLabel?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      if (project.hoverStartTime !== undefined && videoRef.current.currentTime < project.hoverStartTime) {
        videoRef.current.currentTime = project.hoverStartTime;
      }
      videoRef.current.play().catch(() => {});
    }
  };

  const onLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => sessionStorage.setItem("scrollY", String(window.scrollY))}
      className="group block transition-transform duration-500 ease-elegant hover:-translate-y-1.5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-bg-secondary">
        {project.thumbnailScale ? (
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="relative h-full w-full transition-transform duration-700 ease-elegant group-hover:scale-[1.03]"
              style={{ transform: `scale(${project.thumbnailScale})` }}
            >
              <Image
                src={project.thumbnail}
                alt={`${project.title} — ${project.industry}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain"
                style={{ objectPosition: project.thumbnailObjectPosition ?? "center" }}
              />
            </div>
          </div>
        ) : (
          <Image
            src={project.thumbnail}
            alt={`${project.title} — ${project.industry}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-[1.03]"
            style={{ objectPosition: project.thumbnailObjectPosition ?? "center" }}
          />
        )}

        {project.heroVideo && (
          <video
            ref={videoRef}
            src={project.heroVideo}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-elegant"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? `scale(${project.videoHoverScale || 1.10})` : "scale(1)",
            }}
          />
        )}

        <span
          className={`absolute bottom-5 left-5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-text-primary shadow-sm transition-all duration-300 ease-elegant ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {openProjectLabel}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-card-title text-text-primary">{project.title}</h3>
          <p className="mt-1 text-small text-text-secondary">{project.industry}</p>
        </div>
        <span className="mt-1 shrink-0 text-small text-text-secondary">{project.year}</span>
      </div>
    </Link>
  );
}
