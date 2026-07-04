import { Reveal } from "@/components/animations/reveal";

export function About({ dict }: { dict: any }) {
  return (
    <section id="about" className="relative py-section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/about-bg.png')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <Reveal>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C69C6D]">
            {dict.eyebrow}
          </span>
        </Reveal>

        {/* Main Bio */}
        <Reveal delay={0.05}>
          <div className="mt-8 max-w-4xl border-l border-[#C69C6D]/30 pl-8">
            <p className="font-heading text-3xl md:text-5xl font-bold leading-tight text-white">
              {dict.bio1}
            </p>
            <p className="mt-8 text-lg md:text-xl text-white/80 leading-relaxed font-light">
              {dict.bio2}
            </p>
            <p className="mt-6 text-lg text-white/70 leading-relaxed font-light">
              {dict.bio3}
            </p>
          </div>
        </Reveal>

        {/* Divider */}
        <div className="mt-20 h-px w-full bg-white/10" />

        {/* At a Glance Stats */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {dict.stats.map((stat: any) => (
              <div key={stat.label} className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
                  {stat.label}
                </dt>
                <dd className="font-heading text-2xl md:text-3xl text-white leading-snug">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Hero Statement */}
        <Reveal delay={0.15}>
          <div className="mt-24 text-center max-w-4xl mx-auto">
            <p className="font-heading text-3xl md:text-5xl italic text-white/90 leading-snug">
              &quot;{dict.heroStatement}&quot;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
