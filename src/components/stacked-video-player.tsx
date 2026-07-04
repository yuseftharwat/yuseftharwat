"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface StackedVideoPlayerProps {
  videos: string[];
  labels?: string[];
  aspectRatios?: string[];
  poster?: string;
  className?: string;
}

function getVimeoUrl(src: string, muted: boolean) {
  const url = new URL(src);
  url.searchParams.set("muted", muted ? "1" : "0");
  url.searchParams.set("autoplay", "1");
  return url.toString();
}

function getVimeoId(src: string): string | null {
  const match = src.match(/vimeo\.com\/video\/(\d+)/);
  return match ? match[1] : null;
}

/** Returns true if the ratio string represents a portrait (taller than wide) video */
function isPortrait(ratio?: string) {
  if (!ratio) return false;
  const [w, h] = ratio.split("/").map(Number);
  return h > w;
}

function VimeoThumbnail({ src, label }: { src: string; label?: string }) {
  const id = getVimeoId(src);
  if (!id) return <div className="w-full h-full bg-white/10 rounded-xl" />;
  return (
    <Image
      src={`https://vumbnail.com/${id}.jpg`}
      alt={label ?? "Video thumbnail"}
      fill
      className="object-cover"
      unoptimized
    />
  );
}

export function StackedVideoPlayer({ videos, labels, aspectRatios, poster, className }: StackedVideoPlayerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeRatio = aspectRatios?.[activeIndex];
  const portrait = isPortrait(activeRatio);

  return (
    <div className={cn("w-full mx-auto flex flex-col items-center gap-4", className)}>

      {/* Main video container — aspect ratio matches the active video exactly */}
      <div
        className={cn(
          "relative overflow-hidden rounded-card shadow-xl border border-text-primary/10 bg-black transition-all duration-500",
          portrait ? "max-w-sm w-full" : "max-w-4xl w-full"
        )}
        style={{ aspectRatio: activeRatio ?? "16/9" }}
      >
        {videos.map((src, i) => {
          const isActive = i === activeIndex;
          const isVimeo = src.includes("vimeo.com");
          return (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              {isVimeo ? (
                <iframe
                  src={getVimeoUrl(src, !isActive)}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  title={labels?.[i] ?? `Video ${i + 1}`}
                />
              ) : (
                <video
                  src={src}
                  poster={i === 0 ? poster : undefined}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay={isActive}
                  muted={!isActive}
                  playsInline
                  loop
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Thumbnails below */}
      <div className="flex gap-4 overflow-x-auto w-full justify-center py-2">
        {videos.map((src, i) => {
          const isVimeo = src.includes("vimeo.com");
          const thumbRatio = aspectRatios?.[i];
          const thumbPortrait = isPortrait(thumbRatio);
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 bg-black",
                thumbPortrait ? "h-28 w-16 sm:h-32 sm:w-20" : "h-20 w-32 sm:h-24 sm:w-40",
                activeIndex === i
                  ? "ring-2 ring-text-primary ring-offset-2 ring-offset-bg-primary scale-105"
                  : "opacity-50 hover:opacity-100 hover:scale-105"
              )}
            >
              {isVimeo ? (
                <VimeoThumbnail src={src} label={labels?.[i]} />
              ) : poster ? (
                <Image src={poster} alt={labels?.[i] ?? `Video ${i + 1}`} fill className="object-cover" />
              ) : null}
              {labels?.[i] && (
                <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs text-center py-1 px-1 truncate">
                  {labels[i]}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
