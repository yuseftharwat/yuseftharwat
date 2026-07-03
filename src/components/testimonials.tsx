import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ testimonials, dict }: { testimonials: Testimonial[]; dict: any }) {
  return (
    <section className="bg-bg-secondary py-section">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.clientName} delay={i * 0.06}>
              <figure className="flex h-full flex-col justify-between rounded-card bg-card p-8">
                <blockquote className="text-body text-text-primary">
                  “{t.review}”
                </blockquote>
                <figcaption className="mt-8 text-small text-text-secondary">
                  <span className="font-medium text-text-primary">{t.clientName}</span>
                  {" — "}
                  {t.company}, {t.country}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
