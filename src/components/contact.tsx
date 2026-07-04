import { ContactForm } from "@/components/contact-form";

export function Contact({ dict }: { dict: any }) {
  return (
    <section id="contact" className="relative py-section overflow-hidden min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/contact-bg.png')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-black/60" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-site px-6 md:px-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C69C6D] mb-6 block">
                {dict.eyebrow || "Let's Talk"}
              </span>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-white leading-tight">
                {dict.title}
              </h2>
              <p className="mt-8 max-w-md text-lg text-white/60 leading-relaxed font-light">
                {dict.description}
              </p>
            </div>

            <div className="mt-16 flex flex-col gap-4">
              <a href="mailto:youssifqp123@gmail.com" className="text-xl font-heading text-white hover:text-[#C69C6D] transition-colors">
                youssifqp123@gmail.com
              </a>
              <div className="flex items-center gap-6 mt-4">
                <a
                  href="https://www.linkedin.com/in/yusef-tharwat-0a8713293/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/_yuseftharwat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.behance.net/Yusef_Tharwat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
                >
                  Behance
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-card">
            <ContactForm dict={dict.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
