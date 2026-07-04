"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
];

import { useRouter } from "next/navigation";

export function Nav({ 
  dict, 
  locale 
}: { 
  dict: any; 
  locale: "en" | "ar" 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-elegant",
        scrolled
          ? "bg-bg-primary/95 shadow-[0_1px_0_0_rgba(22,22,22,0.06)] backdrop-blur-md py-3"
          : "bg-transparent py-6"
      )}
    >
      <nav className="mx-auto flex max-w-site items-center justify-between px-6 md:px-10">
        <Link 
          href="/" 
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-heading text-lg font-medium tracking-tight text-text-primary"
        >
          Yusef Tharwat
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link href="/#work" className="link-underline text-[15px] text-text-primary/80 transition-colors hover:text-text-primary">
              {dict.work}
            </Link>
          </li>
          <li>
            <Link href="/#services" className="link-underline text-[15px] text-text-primary/80 transition-colors hover:text-text-primary">
              {dict.services}
            </Link>
          </li>
          <li>
            <Link href="/#about" className="link-underline text-[15px] text-text-primary/80 transition-colors hover:text-text-primary">
              {dict.about}
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Button href="/#contact" className="!py-2.5 !px-5 text-sm">
            {dict.letsTalk}
          </Button>
          <div className="h-4 w-px bg-text-primary/10" />
          <ThemeToggle />
          <button 
            onClick={toggleLanguage}
            className="text-sm font-medium text-text-primary/80 transition-colors hover:text-text-primary" 
            aria-label="Switch language"
          >
            {locale === "en" ? "AR" : "EN"}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={toggleLanguage}
            className="text-sm font-medium text-text-primary/80 transition-colors hover:text-text-primary" 
            aria-label="Switch language"
          >
            {locale === "en" ? "AR" : "EN"}
          </button>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
          <span className="sr-only">Toggle menu</span>
          <div className="flex h-5 w-6 flex-col justify-between">
            <span
              className={cn(
                "h-px w-full bg-text-primary transition-transform duration-300",
                menuOpen && "translate-y-[9px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-text-primary transition-opacity duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-text-primary transition-transform duration-300",
                menuOpen && "-translate-y-[9px] -rotate-45"
              )}
            />
          </div>
        </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-text-primary/10 bg-bg-primary px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            <li><Link href="/#work" onClick={() => setMenuOpen(false)} className="text-lg text-text-primary">{dict.work}</Link></li>
            <li><Link href="/#services" onClick={() => setMenuOpen(false)} className="text-lg text-text-primary">{dict.services}</Link></li>
            <li><Link href="/#about" onClick={() => setMenuOpen(false)} className="text-lg text-text-primary">{dict.about}</Link></li>
            <li>
              <Button href="/#contact" onClick={() => setMenuOpen(false)} className="w-full">
                {dict.letsTalk}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
