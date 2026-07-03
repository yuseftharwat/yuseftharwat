import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-small font-medium uppercase tracking-[0.15em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-section-title text-text-primary">{title}</h2>
      {description && (
        <p className="mt-5 text-body text-text-secondary">{description}</p>
      )}
    </div>
  );
}
