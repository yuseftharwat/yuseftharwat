"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Required"),
  budget: z.string().min(1, "Required"),
  message: z.string().min(10, "Required"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

type FormData = z.infer<typeof schema>;

const inputClasses =
  "w-full border-b border-text-primary/15 bg-transparent py-3 text-body text-text-primary placeholder:text-text-secondary/60 focus:border-accent focus:outline-none transition-colors";

export function ContactForm({ dict }: { dict: any }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 sm:grid-cols-2" noValidate>
      {/* Honeypot field for spam bots */}
      <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="honeypot">Don&apos;t fill this out if you&apos;re human:</label>
        <input id="honeypot" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="name" className="mb-1 block text-small text-text-secondary">{dict.name}</label>
        <input id="name" {...register("name")} className={inputClasses} />
        {errors.name && <p className="mt-1 text-small text-error">{errors.name.message as string}</p>}
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="email" className="mb-1 block text-small text-text-secondary">{dict.email}</label>
        <input id="email" type="email" {...register("email")} className={inputClasses} />
        {errors.email && <p className="mt-1 text-small text-error">{errors.email.message as string}</p>}
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="company" className="mb-1 block text-small text-text-secondary">{dict.company}</label>
        <input id="company" {...register("company")} className={inputClasses} />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="projectType" className="mb-1 block text-small text-text-secondary">{dict.projectType}</label>
        <select id="projectType" {...register("projectType")} className={inputClasses}>
          <option value="" className="bg-bg-primary text-text-primary">{dict.selectOne}</option>
          <option value="product-visualization" className="bg-bg-primary text-text-primary">{dict.productVisualization}</option>
          <option value="product-animation" className="bg-bg-primary text-text-primary">{dict.productAnimation}</option>
          <option value="motion-design" className="bg-bg-primary text-text-primary">{dict.motionDesign}</option>
          <option value="commercial-cgi" className="bg-bg-primary text-text-primary">{dict.commercialCGI}</option>
          <option value="other" className="bg-bg-primary text-text-primary">{dict.other}</option>
        </select>
        {errors.projectType && <p className="mt-1 text-small text-error">{errors.projectType.message as string}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="budget" className="mb-1 block text-small text-text-secondary">{dict.budget}</label>
        <select id="budget" {...register("budget")} className={inputClasses}>
          <option value="" className="bg-bg-primary text-text-primary">{dict.selectRange}</option>
          <option value="300-1k" className="bg-bg-primary text-text-primary">$300 – $1,000</option>
          <option value="1k-3k" className="bg-bg-primary text-text-primary">$1,000 – $3,000</option>
          <option value="3k-plus" className="bg-bg-primary text-text-primary">$3,000+</option>
        </select>
        {errors.budget && <p className="mt-1 text-small text-error">{errors.budget.message as string}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1 block text-small text-text-secondary">{dict.message}</label>
        <textarea id="message" rows={4} {...register("message")} className={inputClasses} />
        {errors.message && <p className="mt-1 text-small text-error">{errors.message.message as string}</p>}
      </div>

      <div className="sm:col-span-2 flex items-center gap-6 pt-2">
        <Button type="submit">{isSubmitting ? dict.sending : dict.submit}</Button>
        {status === "success" && (
          <p className="text-small text-success">{dict.success}</p>
        )}
        {status === "error" && (
          <p className="text-small text-error">{dict.error}</p>
        )}
      </div>
    </form>
  );
}
