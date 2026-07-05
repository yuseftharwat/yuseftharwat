"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process({ dict }: { dict: any }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-section">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/process-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/95 via-black/80 to-black/90" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <div className="mb-24">
          <SectionHeading
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
            className="[&_span]:text-accent [&_h2]:text-white [&_p]:text-white/60"
          />
        </div>

        <div className="relative mt-20 max-w-4xl mx-auto">
          {dict.steps.map((step: any, i: number) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-32 last:mb-0 flex flex-col md:flex-row items-center gap-10 md:gap-20"
            >
              {/* Giant Watermark Number */}
              <div className="absolute -top-10 -left-10 md:-left-20 text-[10rem] md:text-[14rem] font-heading font-black text-white/[0.03] leading-none pointer-events-none select-none">
                0{i + 1}
              </div>

              <div className="w-full md:w-1/3 text-accent font-heading text-4xl md:text-5xl font-bold pt-4">
                {step.title}
              </div>
              
              <div className="w-full md:w-2/3 relative">
                <div className="hidden md:block absolute -left-10 top-2 bottom-0 w-px bg-white/10" />
                <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
