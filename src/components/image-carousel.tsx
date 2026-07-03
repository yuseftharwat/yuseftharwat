"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ImageCarousel({ images, altPrefix }: { images: string[]; altPrefix: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const node = scrollRef.current;
    const child = node.children[index] as HTMLElement;
    if (child) {
      const scrollLeft = child.offsetLeft - node.offsetLeft;
      node.scrollTo({ left: scrollLeft, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    let timeout: ReturnType<typeof setTimeout>;
    
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const scrollPosition = node.scrollLeft;
        const childWidth = (node.children[0] as HTMLElement)?.offsetWidth || 0;
        if (childWidth > 0) {
          const newIndex = Math.round(scrollPosition / childWidth);
          setCurrentIndex(newIndex);
        }
      }, 50);
    };

    node.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      node.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, []);

  // Sync scroll position if carousel index matches lightbox index change
  useEffect(() => {
    if (isLightboxOpen) {
      scrollToIndex(lightboxIndex);
    }
  }, [lightboxIndex, isLightboxOpen]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  // Listen for keyboard navigation in lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => Math.min(images.length - 1, prev + 1));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="group relative mx-auto w-full max-w-site">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((src, idx) => (
            <div
              key={src}
              className="relative aspect-[16/9] w-full shrink-0 snap-center overflow-hidden rounded-card bg-text-primary/5 md:aspect-[21/9] cursor-zoom-in"
              onClick={() => {
                setLightboxIndex(idx);
                setIsLightboxOpen(true);
              }}
            >
              <Image
                src={src}
                alt={`${altPrefix} — image ${idx + 1}`}
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
              className={cn(
                "absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition-opacity hover:bg-black/60",
                currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100"
              )}
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            
            <button
              onClick={() => scrollToIndex(Math.min(images.length - 1, currentIndex + 1))}
              className={cn(
                "absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition-opacity hover:bg-black/60",
                currentIndex === images.length - 1 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100"
              )}
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur-md">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    currentIndex === idx ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/75"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-6 top-6 z-50 flex items-center justify-center rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Close fullscreen view"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Active Image */}
          <div 
            className="relative h-[80vh] w-[90vw] md:w-[80vw]"
            onClick={(e) => e.stopPropagation()} // Stop overlay click closing modal when clicking image
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${altPrefix} fullscreen view`}
              fill
              className="object-contain select-none"
              priority
            />
          </div>

          {/* Lightbox Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => Math.max(0, prev - 1));
                }}
                className={cn(
                  "absolute left-6 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-4 text-white hover:bg-white/20 transition-all",
                  lightboxIndex === 0 ? "opacity-20 pointer-events-none" : "opacity-100"
                )}
                aria-label="Previous image"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => Math.min(images.length - 1, prev + 1));
                }}
                className={cn(
                  "absolute right-6 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-4 text-white hover:bg-white/20 transition-all",
                  lightboxIndex === images.length - 1 ? "opacity-20 pointer-events-none" : "opacity-100"
                )}
                aria-label="Next image"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>

              {/* Lightbox Index Counter */}
              <div className="absolute bottom-6 text-sm text-white/50 select-none">
                {lightboxIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

