import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center px-6 py-section text-center">
      <h1 className="font-heading text-section-title text-text-primary">
        This project doesn&apos;t exist.
      </h1>
      <p className="mt-4 text-body text-text-secondary">
        It may have been renamed or removed. Head back to see everything currently live.
      </p>
      <Button href="/#work" className="mt-8">
        Back to Work
      </Button>
      <Link href="/" className="mt-4 link-underline text-small text-text-secondary">
        Return home
      </Link>
    </div>
  );
}
