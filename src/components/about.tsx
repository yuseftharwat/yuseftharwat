import { Reveal } from "@/components/animations/reveal";

export function About({ dict }: { dict: any }) {
  return (
    <section id="about" className="py-section bg-bg-primary">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <Reveal>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
            {dict.eyebrow}
          </span>
        </Reveal>

        {/* Main Bio */}
        <Reveal delay={0.05}>
          <div className="mt-8 max-w-3xl">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-text-primary">
              {dict.bio1}
            </p>
            <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
              {dict.bio2}
            </p>
            <p className="mt-4 text-base text-text-secondary leading-relaxed">
              {dict.bio3}
            </p>
          </div>
        </Reveal>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-border" />

        {/* At a Glance Stats */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {dict.stats.map((stat: any) => (
              <div key={stat.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-secondary mb-3">
                  {stat.label}
                </dt>
                <dd className="font-heading text-xl md:text-2xl text-text-primary leading-snug">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Hero Statement */}
        <Reveal delay={0.15}>
          <div className="mt-16 border-l-2 border-text-primary/20 pl-8">
            <p className="font-heading text-2xl md:text-3xl italic text-text-primary leading-snug">
              &quot;{dict.heroStatement}&quot;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
