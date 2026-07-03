"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero({ dict }: { dict: any }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12">
      <div className="mx-auto flex w-full max-w-site flex-col items-center justify-center px-6 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-4xl flex-col items-center"
        >
          <h1 className="font-heading text-[3.5rem] leading-[1.1] md:text-[5.5rem] font-black tracking-tighter text-balance text-text-primary">
            {dict.titlePart1}<span className="bg-gradient-to-r from-text-secondary to-text-primary bg-clip-text text-transparent">{dict.titleHighlight}</span>{dict.titlePart2}
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-text-secondary text-balance leading-relaxed">
            {dict.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/#work" size="lg" className="rounded-full px-8">{dict.viewWork}</Button>
            <Button href="/#contact" variant="secondary" size="lg" className="rounded-full px-8">
              {dict.bookProject}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
