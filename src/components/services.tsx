import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import type { Service } from "@/lib/types";

export function Services({ services, dict }: { services: Service[]; dict: any }) {
  return (
    <section id="services" className="relative py-section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/services-bg.png')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-black/60" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          align="left"
          className="[&_span]:text-[#C69C6D] [&_h2]:text-white mb-20"
        />

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <div className="group h-full border-b border-r border-white/10 bg-transparent p-10 transition-all duration-500 ease-elegant hover:bg-white/[0.02]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C69C6D]/70 mb-6 block">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-base text-white/60 leading-relaxed font-light">
                  {service.description}
                </p>
                <div className="mt-8 h-px w-0 bg-[#C69C6D] transition-all duration-500 group-hover:w-12" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
