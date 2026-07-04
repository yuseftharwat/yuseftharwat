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
          : "bg-transparent py-6 border-b border-white/10"
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
          className={cn("font-sans text-xl md:text-2xl font-black tracking-tighter", scrolled ? "text-text-primary" : "text-white")}
        >
          YT.
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link href="/#work" className={cn("link-underline text-[13px] uppercase tracking-widest font-semibold transition-colors", scrolled ? "text-text-primary/80 hover:text-text-primary" : "text-white/80 hover:text-white")}>
              {dict.work}
            </Link>
          </li>
          <li>
            <Link href="/#services" className={cn("link-underline text-[13px] uppercase tracking-widest font-semibold transition-colors", scrolled ? "text-text-primary/80 hover:text-text-primary" : "text-white/80 hover:text-white")}>
              {dict.services}
            </Link>
          </li>
          <li>
            <Link href="/#about" className={cn("link-underline text-[13px] uppercase tracking-widest font-semibold transition-colors", scrolled ? "text-text-primary/80 hover:text-text-primary" : "text-white/80 hover:text-white")}>
              {dict.about}
            </Link>
          </li>
          <li>
            <Link href="/#contact" className={cn("link-underline text-[13px] uppercase tracking-widest font-semibold transition-colors", scrolled ? "text-text-primary/80 hover:text-text-primary" : "text-white/80 hover:text-white")}>
              {dict.letsTalk}
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle scrolled={scrolled} />
          <button 
            onClick={toggleLanguage}
            className={cn("text-sm font-medium transition-colors", scrolled ? "text-text-primary/80 hover:text-text-primary" : "text-white/80 hover:text-white")}
            aria-label="Switch language"
          >
            {locale === "en" ? "AR" : "EN"}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle scrolled={scrolled} />
          <button 
            onClick={toggleLanguage}
            className={cn("text-sm font-medium transition-colors", scrolled ? "text-text-primary/80 hover:text-text-primary" : "text-white/80 hover:text-white")}
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
            <li><Link href="/#contact" onClick={() => setMenuOpen(false)} className="text-lg text-text-primary">{dict.letsTalk}</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
