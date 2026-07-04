import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
        },
        card: "var(--card)",
        border: "var(--border)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "#C69C6D",
          hover: "#B08A5B",
        },
        success: "#16A34A",
        warning: "#EAB308",
        error: "#DC2626",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.75rem, 6vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section-title": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "card-title": ["clamp(1.375rem, 1.6vw, 1.75rem)", { lineHeight: "1.3" }],
        body: ["1.125rem", { lineHeight: "1.7" }],
        small: ["0.9375rem", { lineHeight: "1.5" }],
      },
      maxWidth: {
        site: "1400px",
        content: "1200px",
      },
      spacing: {
        section: "clamp(5rem, 10vw, 10rem)",
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
