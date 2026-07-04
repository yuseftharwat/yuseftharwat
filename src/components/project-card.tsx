"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ 
  project, 
  priority = false,
  openProjectLabel = "Open Project",
  index = 0
}: { 
  project: Project; 
  priority?: boolean;
  openProjectLabel?: string;
  index?: number;
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
      className="group block"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-secondary">
        {project.thumbnailScale ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative h-full w-full transition-transform duration-700 ease-elegant group-hover:scale-[1.05]"
              style={{ transform: `scale(${project.thumbnailScale})` }}
            >
              <Image
                src={project.thumbnail}
                alt={`${project.title} — ${project.industry}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain"
                style={{ objectPosition: project.thumbnailObjectPosition ?? "center" }}
                priority={priority}
              />
            </div>
          </div>
        ) : (
          <Image
            src={project.thumbnail}
            alt={`${project.title} — ${project.industry}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-[1.05]"
            style={{ objectPosition: project.thumbnailObjectPosition ?? "center" }}
            priority={priority}
          />
        )}

        {(project.hoverVideo || (project.heroVideo && !project.heroVideo.includes("vimeo.com"))) && (
          <video
            ref={videoRef}
            src={project.hoverVideo || project.heroVideo}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-elegant"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? `scale(${project.videoHoverScale || 1.05})` : "scale(1)",
            }}
          />
        )}

        {/* Hover overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0"
        )} />

        <span
          className={cn(
            "absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300",
            hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          {openProjectLabel} →
        </span>
      </div>

      <div className="mt-4">
        <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#C69C6D] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/40">
          {project.industry} — {project.year}
        </p>
      </div>
    </Link>
  );
}

