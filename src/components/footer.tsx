import Link from "next/link";

export function Footer({ dict }: { dict: any }) {
  return (
    <footer className="border-t border-text-primary/10">
      <div className="mx-auto flex max-w-site flex-col items-center justify-between gap-6 px-6 py-10 text-small text-text-secondary md:flex-row md:px-10">
        <Link href="/" className="font-heading text-text-primary">
          Yusef Tharwat
        </Link>

        <nav className="flex gap-6">
          <Link href="/#work" className="link-underline">{dict.nav.work}</Link>
          <Link href="/#services" className="link-underline">{dict.nav.services}</Link>
          <Link href="/#about" className="link-underline">{dict.nav.about}</Link>
          <Link href="/#contact" className="link-underline">{dict.nav.letsTalk}</Link>
        </nav>

        <div className="flex gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="link-underline">
            LinkedIn
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="link-underline">
            Instagram
          </a>
        </div>

        <p>© {new Date().getFullYear()} Yusef Tharwat. {dict.footer.rights}</p>
      </div>
    </footer>
  );
}
