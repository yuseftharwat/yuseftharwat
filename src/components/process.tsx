"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process({ dict }: { dict: any }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-content px-6 py-section md:px-10">
      <SectionHeading
        eyebrow={dict.eyebrow}
        title={dict.title}
        description={dict.description}
      />

      <ol className="relative mt-4 border-l border-text-primary/10 pl-10">
        {dict.steps.map((step: any, i: number) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative pb-14 last:pb-0"
          >
            <span className="absolute -left-[3.25rem] flex h-9 w-9 items-center justify-center rounded-full bg-text-primary text-small font-medium text-bg-primary">
              {i + 1}
            </span>
            <h3 className="font-heading text-card-title text-text-primary">{step.title}</h3>
            <p className="mt-2 max-w-md text-body text-text-secondary">{step.description}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
