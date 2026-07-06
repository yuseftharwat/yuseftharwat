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

  const baseUrl = "https://yuseftharwat.com";

  // Structured Data for Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yusef Tharwat",
    jobTitle: "3D Product Animation & CGI Artist",
    url: baseUrl,
    sameAs: [
      "https://www.linkedin.com/in/yusef-tharwat-0a8713293/",
      "https://www.instagram.com/_yuseftharwat/",
      "https://www.behance.net/Yusef_Tharwat",
    ],
    description: "Premium 3D product animation and CGI artist specializing in product visualization, CGI commercials, motion design, and VFX.",
    knowsAbout: [
      "3D Product Animation",
      "Product Visualization",
      "CGI Commercial",
      "Motion Design",
      "Blender",
      "3D Rendering",
      "VFX",
    ],
  };

  // Structured Data for ProfessionalService
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Yusef Tharwat - 3D Product Animation & CGI Services",
    description: "Commercial-quality CGI, product animation, and motion design for premium brands.",
    url: baseUrl,
    telephone: "+20",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
    },
    priceRange: "$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  // Structured Data for WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Yusef Tharwat Portfolio",
    url: baseUrl,
    description: "Portfolio of Yusef Tharwat - Premium 3D Product Animation & CGI Artist",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
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
