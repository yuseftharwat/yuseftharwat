"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const TOUCH_MOVE_THRESHOLD = 12;

export function ProjectCard({
  project,
  priority = false,
  openProjectLabel = "Open Project",
  index = 0,
  onAutoScrollPause,
  onAutoScrollResume,
}: {
  project: Project;
  priority?: boolean;
  openProjectLabel?: string;
  index?: number;
  onAutoScrollPause?: () => void;
  onAutoScrollResume?: () => void;
}) {
  const [previewActive, setPreviewActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const didScrollRef = useRef(false);

  const activatePreview = () => {
    setPreviewActive(true);
    if (videoRef.current) {
      if (
        project.hoverStartTime !== undefined &&
        videoRef.current.currentTime < project.hoverStartTime
      ) {
        videoRef.current.currentTime = project.hoverStartTime;
      }
      videoRef.current.play().catch(() => {});
    }
  };

  const deactivatePreview = () => {
    setPreviewActive(false);
    videoRef.current?.pause();
  };

  const onEnter = () => {
    activatePreview();
  };

  const onLeave = () => {
    deactivatePreview();
  };


  const onTouchEnd = () => {
    touchStartRef.current = null;
    deactivatePreview();
    onAutoScrollResume?.();
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={(event) => {
        if (didScrollRef.current) {
          event.preventDefault();
          didScrollRef.current = false;
          return;
        }
        sessionStorage.setItem("scrollY", String(window.scrollY));
        window.location.href = `/work/${project.slug}`;
      }}
      className="group block relative cursor-pointer"
      style={{ touchAction: "pan-y" }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-secondary">
        {project.thumbnailScale ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative h-full w-full transition-transform duration-700 ease-elegant pointer-events-none"
              style={{
                transform: previewActive
                  ? `scale(${Number(project.thumbnailScale) * 1.05})`
                  : `scale(${project.thumbnailScale})`,
              }}
            >
              <Image
                src={project.thumbnail}
                alt={`${project.title} — ${project.industry}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain pointer-events-none"
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
            className={cn(
              "object-cover transition-transform duration-700 ease-elegant pointer-events-none",
              previewActive && "scale-[1.05]"
            )}
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
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-elegant pointer-events-none"
            style={{
              opacity: previewActive ? 1 : 0,
              transform: previewActive ? `scale(${project.videoHoverScale || 1.05})` : "scale(1)",
            }}
          />
        )}

        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            previewActive ? "opacity-100" : "opacity-0"
          )}
        />

        <span
          className={cn(
            "absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300",
            previewActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          {openProjectLabel} →
        </span>
      </div>

      <div className="mt-4">
        <h3
          className={cn(
            "font-heading text-xl font-bold text-white transition-colors duration-300",
            previewActive && "text-accent"
          )}
        >
          {project.title}
        </h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/40">
          {project.industry} — {project.year}
        </p>
      </div>
    </div>
  );
}
