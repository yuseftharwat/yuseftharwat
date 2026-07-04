import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import type { Service } from "@/lib/types";

export function Services({ services, dict }: { services: Service[]; dict: any }) {
  return (
    <section id="services" className="relative py-section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/services-bg.png')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-black/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          align="center"
          className="mx-auto [&_*]:text-white"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <div className="group h-full rounded-card border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all duration-300 ease-elegant hover:-translate-y-1 hover:bg-white/10">
                <h3 className="font-heading text-card-title text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-body text-white/70">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
