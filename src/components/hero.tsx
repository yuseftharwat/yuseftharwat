"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero({ dict }: { dict: any }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12">
      {/* Background Image & Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0 bg-gradient-to-r from-bg-primary/95 via-bg-primary/75 to-bg-primary/40 dark:from-black/60 dark:via-black/20 dark:to-transparent transition-colors duration-500"
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
          <span className="mb-4 text-sm md:text-base font-semibold tracking-[0.15em] text-accent uppercase">
            {dict.eyebrow}
          </span>

          {/* Title */}
          <h1 className="font-sans text-[2.5rem] leading-[1.05] md:text-[4rem] font-bold tracking-tight text-text-primary dark:text-white text-balance uppercase transition-colors duration-500">
            {dict.titlePart1}<span className="text-text-primary dark:text-white">{dict.titleHighlight}</span>{dict.titlePart2}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base md:text-lg text-text-secondary dark:text-white/80 leading-relaxed text-balance font-light transition-colors duration-500">
            {dict.description}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              href="/#work"
              size="lg"
              className="rounded-full px-8 bg-text-primary text-bg-primary hover:bg-accent border-none font-semibold uppercase tracking-wider text-sm dark:bg-white dark:text-black dark:hover:bg-accent"
            >
              {dict.viewWork} ↗
            </Button>
            <Button
              href="/#contact"
              size="lg"
              className="rounded-full px-8 bg-transparent text-text-primary border border-text-primary/30 hover:bg-text-primary/5 uppercase tracking-wider text-sm dark:text-white dark:border-white/40 dark:hover:bg-white/10"
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
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary dark:text-white/70 transition-colors duration-500">
          Scroll
        </span>
        <div className="h-12 w-[1px] bg-text-primary/30 dark:bg-white/30 transition-colors duration-500" />
      </motion.div>
    </section>
  );
}

