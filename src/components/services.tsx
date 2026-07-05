import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import type { Service } from "@/lib/types";

export function Services({ services, dict }: { services: Service[]; dict: any }) {
  return (
    <section id="services" className="relative py-section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/services-bg.png')] bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-100 transition-opacity duration-500" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-bg-primary via-bg-primary/95 to-bg-primary/85 dark:from-black dark:via-black/80 dark:to-black/60 transition-colors duration-500" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          align="left"
          className="mb-20 [&_span]:text-accent [&_h2]:text-text-primary dark:[&_h2]:text-white"
        />

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-text-primary/10 dark:border-white/10 transition-colors duration-500">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <div className="group h-full border-b border-r border-text-primary/10 dark:border-white/10 bg-transparent p-10 transition-all duration-500 ease-elegant hover:bg-text-primary/[0.03] dark:hover:bg-white/[0.02]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/70 mb-6 block">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary dark:text-white mb-4 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-base text-text-secondary dark:text-white/60 leading-relaxed font-light transition-colors duration-500">
                  {service.description}
                </p>
                <div className="mt-8 h-px w-0 bg-accent transition-all duration-500 group-hover:w-12" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
