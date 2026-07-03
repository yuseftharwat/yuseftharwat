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
    <section id="work" className="mx-auto max-w-site px-6 py-section md:px-10">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          className="mb-0"
        />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} openProjectLabel={dict.openProject} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-14 text-body text-text-secondary">
          {dict.noProjects}
        </p>
      )}
    </section>
  );
}
