"use client";

import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/project-card";
import { CATEGORIES, type Category, type Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const SCROLL_SPEED = 0.5; // pixels per frame (~30px/sec at 60fps)

export function SelectedWork({ projects, dict }: { projects: Project[]; dict: any }) {
  const filtered = projects;
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const isPausedRef = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Continuous smooth auto-scroll with requestAnimationFrame
  useEffect(() => {
    const tick = () => {
      const el = scrollRef.current;
      if (el && !isPausedRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 1) {
          // Seamlessly jump back to start
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += SCROLL_SPEED;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth || 400;
    const scrollAmount = cardWidth + 24; // card width + gap
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="work" className="relative py-section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/work-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        {/* Header with arrows */}
        <div className="flex items-end justify-between mb-16">
          <SectionHeading
            eyebrow={dict.eyebrow}
            title={dict.title}
            className="mb-0 [&_span]:text-[#C69C6D] [&_h2]:text-white"
          />

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous projects"
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300",
                canScrollLeft
                  ? "text-white hover:bg-white hover:text-black"
                  : "text-white/20 cursor-not-allowed"
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next projects"
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300",
                canScrollRight
                  ? "text-white hover:bg-white hover:text-black"
                  : "text-white/20 cursor-not-allowed"
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container — full bleed */}
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 flex gap-6 overflow-x-auto px-6 md:px-10 pb-4 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Left spacer to align with max-w-site */}
        <div className="hidden lg:block shrink-0" style={{ width: "max(0px, calc((100vw - 1400px) / 2))" }} />

        {filtered.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 w-[80vw] sm:w-[45vw] lg:w-[30vw] xl:w-[26vw]"
          >
            <ProjectCard project={project} openProjectLabel={dict.openProject} index={index} />
          </motion.div>
        ))}

        {/* Right spacer */}
        <div className="hidden lg:block shrink-0" style={{ width: "max(0px, calc((100vw - 1400px) / 2))" }} />
      </div>

      {filtered.length === 0 && (
        <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
          <p className="mt-14 text-lg text-white/50">
            {dict.noProjects}
          </p>
        </div>
      )}
    </section>
  );
}
