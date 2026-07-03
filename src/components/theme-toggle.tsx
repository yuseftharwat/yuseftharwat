"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
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
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary text-text-primary transition-colors hover:bg-bg-primary"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: [0.8, 1.1, 1] }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-lg"
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}
