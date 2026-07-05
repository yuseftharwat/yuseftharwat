"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const SCROLL_SPEED_DESKTOP = 0.5; // pixels per frame (~30px/sec at 60fps)
const SCROLL_SPEED_MOBILE = 1.0; // faster on mobile for better visibility
const TOUCH_PAUSE_MS = 500; // shorter pause on mobile

export function SelectedWork({ projects, dict, locale }: { projects: Project[]; dict: any; locale?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const autoScrollPausedRef = useRef(false);
  const scrollSpeedRef = useRef(SCROLL_SPEED_DESKTOP);
  const touchPauseTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isRTL = locale === 'ar';

  const filtered = projects;

  const pauseAutoScrollFor = useCallback((ms = TOUCH_PAUSE_MS) => {
    autoScrollPausedRef.current = true;
    if (touchPauseTimerRef.current) clearTimeout(touchPauseTimerRef.current);
    touchPauseTimerRef.current = setTimeout(() => {
      autoScrollPausedRef.current = false;
    }, ms);
  }, []);

  const pauseAutoScrollOnTouch = useCallback(() => {
    autoScrollPausedRef.current = true;
    if (touchPauseTimerRef.current) clearTimeout(touchPauseTimerRef.current);
  }, []);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const hasOverflow = maxScroll > 10;
    setCanScrollLeft(hasOverflow && el.scrollLeft > 10);
    setCanScrollRight(hasOverflow && el.scrollLeft < maxScroll - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollSpeed = () => {
      scrollSpeedRef.current = window.matchMedia("(max-width: 767px)").matches
        ? SCROLL_SPEED_MOBILE
        : SCROLL_SPEED_DESKTOP;
      checkScroll();
    };

    updateScrollSpeed();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", updateScrollSpeed);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", updateScrollSpeed);
    };
  }, [checkScroll, filtered.length]);


  // Pause auto-scroll on touch — stop for 1s when finger touches projects
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let userInteracting = false;

    const onTouchStart = () => {
      userInteracting = true;
      pauseAutoScrollOnTouch();
    };

    const onTouchEnd = () => {
      userInteracting = false;
      pauseAutoScrollFor(TOUCH_PAUSE_MS);
    };

    const onScroll = () => {
      if (!userInteracting) return;
      pauseAutoScrollFor(TOUCH_PAUSE_MS);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("scroll", onScroll);
      if (touchPauseTimerRef.current) clearTimeout(touchPauseTimerRef.current);
    };
  }, [pauseAutoScrollFor, pauseAutoScrollOnTouch]);

  // Continuous auto-scroll
  useEffect(() => {
    const tick = () => {
      const el = scrollRef.current;
      if (el && !autoScrollPausedRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;

        // Only scroll if there's content to scroll
        if (maxScroll <= 0) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        // Check if element is in viewport (important for iOS Safari)
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (!isInViewport) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        if (isRTL) {
          // RTL: scroll from right to left (decrease scrollLeft)
          if (el.scrollLeft <= -maxScroll + 1) {
            el.scrollLeft = 0;
          } else {
            el.scrollLeft -= scrollSpeedRef.current;
          }
        } else {
          // LTR: scroll from left to right (increase scrollLeft)
          if (el.scrollLeft >= maxScroll - 1) {
            el.scrollLeft = 0;
          } else {
            el.scrollLeft += scrollSpeedRef.current;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRTL]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = scrollRef.current;
      if (!el) return;

      const card = el.querySelector<HTMLElement>("[data-project-card]");
      const cardWidth = card?.offsetWidth ?? 400;
      const scrollAmount = cardWidth + 24; // card width + gap (gap-6)

      if (isRTL) {
        // RTL: reverse the direction for correct visual behavior
        // "left" button should scroll right (positive), "right" button should scroll left (negative)
        el.scrollLeft += direction === "left" ? scrollAmount : -scrollAmount;
      } else {
        // LTR: normal behavior
        el.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
      }
      checkScroll();
    },
    [checkScroll, isRTL]
  );

  return (
    <section id="work" className="relative py-section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/work-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat opacity-25 dark:opacity-100 transition-opacity duration-500" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg-primary/95 via-bg-primary/90 to-bg-primary dark:from-black/90 dark:via-black/80 dark:to-black/95 transition-colors duration-500" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        {/* Header with arrows */}
        <div className="flex items-end justify-between mb-16">
          <SectionHeading
            eyebrow={dict.eyebrow}
            title={dict.title}
            className="mb-0 [&_span]:text-accent [&_h2]:text-text-primary dark:[&_h2]:text-white"
          />

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous projects"
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300",
                "border-text-primary/20 text-text-primary hover:bg-text-primary hover:text-bg-primary",
                "dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
              )}
            >
              {isRTL ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next projects"
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 active:scale-90",
                "border-text-primary/20 text-text-primary hover:bg-text-primary hover:text-bg-primary",
                "dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
              )}
            >
              {isRTL ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container — full bleed */}
      <div
        ref={scrollRef}
        className="relative z-10 flex gap-6 overflow-x-scroll px-6 md:px-10 pb-4 no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain"
        }}
      >
        {/* Left spacer to align with max-w-site */}
        <div className="hidden lg:block shrink-0" style={{ width: "max(0px, calc((100vw - 1400px) / 2))" }} />

        {filtered.map((project, index) => (
          <motion.div
            key={project.slug}
            data-project-card
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 w-[80vw] sm:w-[45vw] lg:w-[30vw] xl:w-[26vw]"
          >
            <ProjectCard
              project={project}
              openProjectLabel={dict.openProject}
              index={index}
              onAutoScrollPause={pauseAutoScrollOnTouch}
              onAutoScrollResume={() => pauseAutoScrollFor(TOUCH_PAUSE_MS)}
            />
          </motion.div>
        ))}

        {/* Right spacer */}
        <div className="hidden lg:block shrink-0" style={{ width: "max(0px, calc((100vw - 1400px) / 2))" }} />
      </div>

      {filtered.length === 0 && (
        <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
          <p className="mt-14 text-lg text-text-secondary dark:text-white/50">
            {dict.noProjects}
          </p>
        </div>
      )}
    </section>
  );
}
