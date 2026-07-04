"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero({ dict }: { dict: any }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12">
      {/* Background Image & Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-site px-6 md:px-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-3xl flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <span className="mb-4 text-sm md:text-base font-semibold tracking-[0.15em] text-[#C69C6D] uppercase">
            {dict.eyebrow}
          </span>
          
          {/* Title */}
          <h1 className="font-sans text-[2.5rem] leading-[1.05] md:text-[4rem] font-bold tracking-tight text-white text-balance uppercase">
            {dict.titlePart1}<span className="text-white">{dict.titleHighlight}</span>{dict.titlePart2}
          </h1>
          
          {/* Description */}
          <p className="mt-6 max-w-xl text-base md:text-lg text-white/80 leading-relaxed text-balance font-light">
            {dict.description}
          </p>
          
          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button 
              href="/#work" 
              size="lg" 
              className="rounded-full px-8 bg-white text-black hover:bg-gray-200 border-none font-semibold uppercase tracking-wider text-sm"
            >
              {dict.viewWork} ↗
            </Button>
            <Button 
              href="/#contact" 
              size="lg" 
              className="rounded-full px-8 bg-transparent text-white border border-white/40 hover:bg-white/10 uppercase tracking-wider text-sm"
            >
              {dict.bookProject}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
          Scroll
        </span>
        <div className="h-12 w-[1px] bg-white/30" />
      </motion.div>
    </section>
  );
}

