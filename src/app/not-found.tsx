import Link from "next/link";
import { dictionaries } from "@/lib/dictionaries";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="font-heading text-8xl font-bold text-text-primary dark:text-white">
        404
      </h1>
      <p className="mt-4 text-xl text-text-secondary dark:text-white/60">
        Page not found
      </p>
      <p className="mt-2 max-w-md text-center text-text-secondary dark:text-white/40">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-text-primary/30 px-8 py-3 text-text-primary transition-colors hover:bg-text-primary/5 dark:border-white/40 dark:text-white dark:hover:bg-white/10"
      >
        Back to Home
      </Link>
    </div>
  );
}
