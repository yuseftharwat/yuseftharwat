import { ContactForm } from "@/components/contact-form";

export function Contact({ dict }: { dict: any }) {
  return (
    <section id="contact" className="mx-auto max-w-content px-6 py-section md:px-10">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-heading text-section-title text-text-primary">
            {dict.title}
          </h2>
          <p className="mt-6 max-w-sm text-body text-text-secondary">
            {dict.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 text-body">
            <a href="mailto:hello@yuseftharwat.com" className="link-underline w-fit text-text-primary">
              hello@yuseftharwat.com
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline w-fit text-text-secondary"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline w-fit text-text-secondary"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm dict={dict.form} />
        </div>
      </div>
    </section>
  );
}
