"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { subscribe, type FormState } from "@/app/(store)/actions";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(subscribe, { ok: false });

  if (state.ok) {
    return (
      <p className="flex items-center gap-2 text-[15px] font-medium text-white" role="status">
        <CheckCircle2 className="size-5" aria-hidden /> {state.message}
      </p>
    );
  }

  const error = state.errors?.email ?? state.message;

  return (
    <form action={action} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="h-12 flex-1 rounded-md border border-white/25 bg-white/10 px-4 text-[15px] text-white placeholder:text-white/60 focus:border-white focus:outline-none"
        />
        <Button type="submit" variant="inverse" size="lg" loading={pending}>
          Subscribe
        </Button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 text-sm text-[#ffd5c8]" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
