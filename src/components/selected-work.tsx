"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/project-card";
import { CATEGORIES, type Category, type Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SelectedWork({ projects, dict }: { projects: Project[]; dict: any }) {
  const filtered = projects;

  return (
    <section id="work" className="relative py-section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/work-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end mb-24">
          <SectionHeading
            eyebrow={dict.eyebrow}
            title={dict.title}
            className="mb-0 [&_span]:text-[#C69C6D] [&_h2]:text-white"
          />
        </div>

        <div className="mt-14 flex flex-col gap-y-32">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} openProjectLabel={dict.openProject} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-14 text-lg text-white/50">
            {dict.noProjects}
          </p>
        )}
      </div>
    </section>
  );
}
