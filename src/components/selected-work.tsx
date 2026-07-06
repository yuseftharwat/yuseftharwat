"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const SCROLL_SPEED_DESKTOP = 0.6; // pixels per frame (~36px/sec at 60fps) - increased by 20%
const SCROLL_SPEED_MOBILE = 0.95; // faster on mobile for better visibility - increased by ~19%

export function SelectedWork({ projects, dict, locale }: { projects: Project[]; dict: any; locale?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number>();
  const isDraggingRef = useRef(false);
  const resumeTimeoutRef = useRef<number>();
  const isRTL = locale === 'ar';
  const [translateX, setTranslateX] = useState(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [mobileActivePreview, setMobileActivePreview] = useState<string | null>(null);

  // Duplicate projects 3 times for seamless loop (enough to fill viewport)
  const marqueeProjects = [...projects, ...projects, ...projects];

  // Calculate single set width
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        const card = trackRef.current.querySelector('[data-project-card]') as HTMLElement;
        const cardWidth = card?.offsetWidth || 400;
        const gap = 24;
        setSingleSetWidth(projects.length * (cardWidth + gap));
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [projects.length]);

  // Continuous auto-scroll using requestAnimationFrame
  useEffect(() => {
    if (singleSetWidth === 0) return;

    const animate = () => {
      if (isDraggingRef.current) {
        autoScrollRef.current = requestAnimationFrame(animate);
        return;
      }

      const speed = window.matchMedia("(max-width: 767px)").matches
        ? SCROLL_SPEED_MOBILE
        : SCROLL_SPEED_DESKTOP;

      setTranslateX((prev) => {
        const newX = prev + speed;
        // Reset when we've scrolled past one full set
        if (newX >= singleSetWidth) {
          return newX - singleSetWidth;
        }
        if (newX < 0) {
          return newX + singleSetWidth;
        }
        return newX;
      });

      autoScrollRef.current = requestAnimationFrame(animate);
    };

    autoScrollRef.current = requestAnimationFrame(animate);
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, [singleSetWidth]);

  // Touch gesture detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const touchStartRef = { x: 0, y: 0 };
    const gestureLockedRef = { horizontal: false };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.x = touch.clientX;
      touchStartRef.y = touch.clientY;
      gestureLockedRef.horizontal = false;
      // Don't set isDraggingRef yet - wait for gesture direction
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.x;
      const deltaY = touch.clientY - touchStartRef.y;

      // Lock gesture direction
      if (!gestureLockedRef.horizontal && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
        gestureLockedRef.horizontal = Math.abs(deltaX) > Math.abs(deltaY);
        // Only pause autoplay when horizontal gesture is detected
        if (gestureLockedRef.horizontal) {
          isDraggingRef.current = true;
        }
      }

      // Only prevent default and handle drag for horizontal gestures
      if (gestureLockedRef.horizontal) {
        e.preventDefault();
        setTranslateX((prev) => {
          // For RTL, invert the delta to match visual direction
          const adjustedDelta = isRTL ? deltaX : -deltaX;
          const newX = prev + adjustedDelta;
          // Handle loop during drag
          if (newX >= singleSetWidth) return newX - singleSetWidth;
          if (newX < 0) return newX + singleSetWidth;
          return newX;
        });
        touchStartRef.x = touch.clientX;

        // Check which project is under the finger and activate preview
        const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
        const projectCard = elementUnderFinger?.closest('[data-project-card]');
        if (projectCard) {
          const projectSlug = projectCard.getAttribute('data-project-card');
          if (projectSlug && projectSlug !== mobileActivePreview) {
            setMobileActivePreview(projectSlug);
          }
        }
      }
    };

    const onTouchEnd = () => {
      gestureLockedRef.horizontal = false;
      
      // Clear any existing resume timeout
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      
      // Resume auto-scroll after 1 second
      resumeTimeoutRef.current = window.setTimeout(() => {
        isDraggingRef.current = false;
      }, 1000);
    };

    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchcancel', onTouchEnd);

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [singleSetWidth, isRTL]);

  // Desktop drag support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dragStartRef = { x: 0, translateX: 0 };

    const onMouseDown = (e: MouseEvent) => {
      dragStartRef.x = e.clientX;
      dragStartRef.translateX = translateX;
      isDraggingRef.current = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - dragStartRef.x;
      setTranslateX(() => {
        // For RTL, invert the delta to match visual direction
        const adjustedDelta = isRTL ? deltaX : -deltaX;
        const newX = dragStartRef.translateX + adjustedDelta;
        // Handle loop during drag
        if (newX >= singleSetWidth) return newX - singleSetWidth;
        if (newX < 0) return newX + singleSetWidth;
        return newX;
      });
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onMouseLeave = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [singleSetWidth, translateX, isRTL]);

  // Manual scroll with arrows
  const scroll = useCallback(
    (arrowDirection: "left" | "right") => {
      const card = trackRef.current?.querySelector('[data-project-card]') as HTMLElement;
      const cardWidth = card?.offsetWidth || 400;
      const scrollAmount = cardWidth + 24;

      setTranslateX((prev) => {
        // For RTL, invert the delta since icons are swapped
        const delta = isRTL 
          ? (arrowDirection === "left" ? scrollAmount : -scrollAmount)
          : (arrowDirection === "left" ? -scrollAmount : scrollAmount);
        const newX = prev + delta;
        if (newX >= singleSetWidth) return newX - singleSetWidth;
        if (newX < 0) return newX + singleSetWidth;
        return newX;
      });
    },
    [singleSetWidth, isRTL]
  );

  // Mobile preview handlers
  const handleProjectTap = useCallback((projectSlug: string) => {
    if (mobileActivePreview === projectSlug) {
      // Second tap on same project - navigate
      window.location.href = `/work/${projectSlug}`;
    } else {
      // First tap or different project - activate preview
      setMobileActivePreview(projectSlug);
    }
  }, [mobileActivePreview]);

  const clearMobilePreview = useCallback(() => {
    setMobileActivePreview(null);
  }, []);

  // Detect touch device
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  // Handle tap outside to clear preview
  useEffect(() => {
    const handleOutsideTap = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-project-card]')) {
        clearMobilePreview();
      }
    };

    if (isTouchDevice) {
      document.addEventListener('click', handleOutsideTap);
      return () => document.removeEventListener('click', handleOutsideTap);
    }
  }, [isTouchDevice, clearMobilePreview]);

  return (
    <section id="work" aria-labelledby="selected-work-heading" className="relative py-section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/work-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat opacity-25 dark:opacity-100 transition-opacity duration-500" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg-primary/95 via-bg-primary/90 to-bg-primary dark:from-black/90 dark:via-black/80 dark:to-black/95 transition-colors duration-500" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        {/* Header with arrows */}
        <header className="flex items-end justify-between mb-16">
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
        </header>
      </div>

      {/* Horizontal Scroll Container — full bleed */}
      <div
        ref={containerRef}
        className="relative z-10 px-6 md:px-10 pb-4 overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex gap-6"
          style={{
            transform: `translateX(${isRTL ? translateX : -translateX}px)`,
            willChange: 'transform'
          }}
        >
          {/* Left spacer to align with max-w-site */}
          <div className="hidden lg:block shrink-0" style={{ width: "max(0px, calc((100vw - 1400px) / 2))" }} />

          {marqueeProjects.map((project: Project, index: number) => (
            <motion.div
              key={`${project.slug}-${index}`}
              data-project-card={project.slug}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % projects.length) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 w-[80vw] sm:w-[45vw] lg:w-[30vw] xl:w-[26vw]"
            >
              <ProjectCard
                project={project}
                openProjectLabel={dict.openProject}
                index={index}
                mobilePreviewActive={mobileActivePreview === project.slug}
                onMobileTap={isTouchDevice ? () => handleProjectTap(project.slug) : undefined}
              />
            </motion.div>
          ))}

          {/* Right spacer */}
          <div className="hidden lg:block shrink-0" style={{ width: "max(0px, calc((100vw - 1400px) / 2))" }} />
        </div>
      </div>

      {projects.length === 0 && (
        <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
          <p className="mt-14 text-lg text-text-secondary dark:text-white/50">
            {dict.noProjects}
          </p>
        </div>
      )}
    </section>
  );
}
