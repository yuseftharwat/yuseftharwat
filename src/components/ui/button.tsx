"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
}

export function Button({
  href,
  onClick,
  variant = "primary",
  type = "button",
  className,
  children,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium transition-all duration-300 ease-elegant hover:-translate-y-0.5 active:translate-y-0";

  const styles =
    variant === "primary"
      ? "bg-text-primary text-bg-primary hover:bg-accent"
      : "bg-transparent text-text-primary border border-text-primary/15 hover:border-text-primary/40";

  const classes = cn(base, styles, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
