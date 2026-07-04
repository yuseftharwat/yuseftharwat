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

  const isReversed = index % 2 !== 0;

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => sessionStorage.setItem("scrollY", String(window.scrollY))}
      className={cn(
        "group flex flex-col gap-8 md:gap-16 items-center",
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      <div className="relative aspect-[16/10] w-full md:w-2/3 overflow-hidden bg-bg-secondary">
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
                sizes="(min-width: 1024px) 66vw, 100vw"
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
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-[1.03]"
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
              transform: hovered ? `scale(${project.videoHoverScale || 1.10})` : "scale(1)",
            }}
          />
        )}
      </div>

      <div className="w-full md:w-1/3 flex flex-col justify-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C69C6D] mb-4">
          {project.industry} — {project.year}
        </span>
        <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-[#C69C6D] transition-colors duration-500">
          {project.title}
        </h3>
        
        <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors duration-300">
          {openProjectLabel}
          <div className="h-px w-8 bg-white/30 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
}
