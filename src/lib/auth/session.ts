import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession } from "@/lib/auth/token";

export async function createSession(user: { id: string; tokenVersion: number }) {
  const token = await signSession({ sub: user.id, ver: user.tokenVersion });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** Returns the signed-in admin, or null. Cached for the duration of a request. */
export const getAdmin = cache(async () => {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  const admin = await db.adminUser.findUnique({
    where: { id: session.sub },
    select: { id: true, name: true, email: true, tokenVersion: true },
  });
  if (!admin || admin.tokenVersion !== session.ver) return null;
  return admin;
});

/**
 * Guard for admin pages and server actions. Every admin mutation must call
 * this — the proxy only provides a first, coarse check.
 */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
