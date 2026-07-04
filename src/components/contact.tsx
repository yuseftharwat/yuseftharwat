import { ContactForm } from "@/components/contact-form";

export function Contact({ dict }: { dict: any }) {
  return (
    <section id="contact" className="py-section bg-bg-primary">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-section-title text-text-primary">
              {dict.title}
            </h2>
            <p className="mt-6 max-w-sm text-body text-text-secondary">
              {dict.description}
            </p>

            <div className="mt-10 flex flex-col gap-3 text-body">
              <a href="mailto:youssifqp123@gmail.com" className="link-underline w-fit text-text-primary">
                youssifqp123@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/yusef-tharwat-0a8713293/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit text-text-secondary hover:text-text-primary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/_yuseftharwat/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit text-text-secondary hover:text-text-primary transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.behance.net/Yusef_Tharwat"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit text-text-secondary hover:text-text-primary transition-colors"
              >
                Behance
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm dict={dict.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
