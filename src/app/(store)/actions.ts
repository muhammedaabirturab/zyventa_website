"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export type FormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

async function clientKey(scope: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  return `${scope}:${ip}`;
}

const emailSchema = z.email("Please enter a valid email address.").max(200);

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = emailSchema.safeParse(String(formData.get("email") ?? "").trim().toLowerCase());
  if (!parsed.success) return { ok: false, errors: { email: parsed.error.issues[0].message } };

  if (!rateLimit(await clientKey("subscribe"), 5, 60 * 60 * 1000)) {
    return { ok: false, message: "Too many attempts. Please try again later." };
  }

  await db.subscriber.upsert({ where: { email: parsed.data }, update: {}, create: { email: parsed.data } });
  return { ok: true, message: "Thank you for subscribing — we'll be in touch." };
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(30).optional().default(""),
  subject: z.string().trim().min(3, "Please add a subject.").max(150),
  message: z.string().trim().min(10, "Please write a message of at least 10 characters.").max(4000),
});

export async function sendContactMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return { ok: false, errors };
  }

  if (!rateLimit(await clientKey("contact"), 5, 60 * 60 * 1000)) {
    return { ok: false, message: "Too many messages sent. Please try again later." };
  }

  await db.contactMessage.create({ data: parsed.data });
  return { ok: true, message: "Thanks for getting in touch. Our team will reply as soon as possible." };
}
