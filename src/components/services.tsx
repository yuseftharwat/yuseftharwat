import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import type { Service } from "@/lib/types";

export function Services({ services, dict }: { services: Service[]; dict: any }) {
  return (
    <section id="services" className="bg-bg-secondary py-section">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          align="center"
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <div className="group h-full rounded-card bg-card p-8 transition-transform duration-300 ease-elegant hover:-translate-y-1">
                <h3 className="font-heading text-card-title text-text-primary">
                  {service.title}
                </h3>
                <p className="mt-3 text-body text-text-secondary">
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
