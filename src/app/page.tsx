import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { ScrollRestorer } from "@/components/scroll-restorer";
import { getAllProjects, getServices, getTestimonials, getLocale } from "@/lib/data";
import { dictionaries } from "@/lib/dictionaries";

export default async function HomePage() {
  const locale = getLocale();
  const dict = dictionaries[locale];

  const [projects, services, testimonials] = await Promise.all([
    getAllProjects(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      <ScrollRestorer />
      <Hero dict={dict.hero} />
      <SelectedWork projects={projects} dict={dict.selectedWork} locale={locale} />
      <Services services={services} dict={dict.services} />
      <About dict={dict.about} />
      <Testimonials testimonials={testimonials} dict={dict.testimonials} />
      <Contact dict={dict.contact} />
    </>
  );
}
