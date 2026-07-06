import { Reveal } from "@/components/animations/reveal";

export function About({ dict }: { dict: any }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/about-bg.png')] bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-100 transition-opacity duration-500" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg-primary/90 via-bg-primary/80 to-bg-primary dark:from-black/80 dark:via-black/60 dark:to-black/90 transition-colors duration-500" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <Reveal>
          <h2 id="about-heading" className="sr-only">{dict.eyebrow}</h2>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            {dict.eyebrow}
          </p>
        </Reveal>

        {/* Main Bio */}
        <Reveal delay={0.05}>
          <div className="mt-8 max-w-4xl border-l border-accent/30 pl-8">
            <p className="font-heading text-3xl md:text-5xl font-bold leading-tight text-text-primary dark:text-white transition-colors duration-500">
              {dict.bio1}
            </p>
            <p className="mt-8 text-lg md:text-xl text-text-secondary dark:text-white/80 leading-relaxed font-light transition-colors duration-500">
              {dict.bio2}
            </p>
            <p className="mt-6 text-lg text-text-secondary dark:text-white/70 leading-relaxed font-light transition-colors duration-500">
              {dict.bio3}
            </p>
          </div>
        </Reveal>

        {/* Divider */}
        <div className="mt-20 h-px w-full bg-text-primary/10 dark:bg-white/10 transition-colors duration-500" />

        {/* At a Glance Stats */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {dict.stats.map((stat: any) => (
              <div key={stat.label} className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-text-primary/10 dark:bg-white/10 hidden sm:block transition-colors duration-500" />
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary dark:text-white/50 mb-4 transition-colors duration-500">
                  {stat.label}
                </dt>
                <dd className="font-heading text-2xl md:text-3xl text-text-primary dark:text-white leading-snug transition-colors duration-500">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Hero Statement */}
        <Reveal delay={0.15}>
          <div className="mt-24 text-center max-w-4xl mx-auto">
            <p className="font-heading text-3xl md:text-5xl italic text-text-primary/90 dark:text-white/90 leading-snug transition-colors duration-500">
              &quot;{dict.heroStatement}&quot;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
