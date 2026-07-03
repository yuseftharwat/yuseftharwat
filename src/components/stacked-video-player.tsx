"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StackedVideoPlayerProps {
  videos: string[];
  poster?: string;
  className?: string;
}

export function StackedVideoPlayer({ videos, poster, className }: StackedVideoPlayerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("w-full max-w-5xl mx-auto flex flex-col items-center gap-6", className)}>
      {/* Main Video Display */}
      <motion.div 
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[70vh] max-w-full rounded-card overflow-hidden shadow-xl border border-text-primary/10"
      >
        <video
          src={videos[activeIndex]}
          poster={activeIndex === 0 ? poster : undefined}
          className="h-full w-auto object-cover"
          controls
          autoPlay
          playsInline
          loop
        />
      </motion.div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto w-full justify-center py-2">
        {videos.map((src, i) => (
          <button
            key={src}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative h-28 w-20 sm:h-36 sm:w-24 shrink-0 rounded-xl overflow-hidden transition-all duration-300",
              activeIndex === i 
                ? "ring-2 ring-text-primary ring-offset-2 ring-offset-bg-primary scale-105" 
                : "opacity-50 hover:opacity-100 hover:scale-105"
            )}
          >
            <video 
              src={src} 
              className="w-full h-full object-cover pointer-events-none" 
              muted 
              playsInline 
              preload="metadata"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
