"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle({ scrolled = false }: { scrolled?: boolean }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme based on localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // Prevent hydration mismatch by not rendering the icon until mounted
  if (!mounted) {
    return (
      <div className="flex h-8 w-12 items-center justify-center"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`text-[13px] font-semibold uppercase tracking-widest transition-colors ${
        scrolled ? "text-text-primary/80 hover:text-text-primary" : "text-white/80 hover:text-white"
      }`}
    >
      <motion.div
        initial={false}
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? "Light" : "Dark"}
      </motion.div>
    </button>
  );
}
