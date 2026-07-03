import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About({ dict }: { dict: any }) {
  return (
    <section id="about" className="mx-auto max-w-site px-6 py-section md:px-10">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-bg-secondary">
            <Image
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1000&q=80"
              alt="Portrait of Yusef Tharwat"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow={dict.eyebrow}
            title={dict.title}
            className="mb-8"
          />
          <p className="max-w-xl text-body text-text-secondary">
            {dict.description}
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {dict.stats.map((stat: any) => (
              <div key={stat.label}>
                <dt className="text-small text-text-secondary">{stat.label}</dt>
                <dd className="mt-2 font-heading text-lg text-text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
