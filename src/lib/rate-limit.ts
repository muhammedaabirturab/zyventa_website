import "server-only";

/**
 * Minimal in-memory rate limiter for login and public forms. It resets when
 * the server restarts and is per-instance; that is adequate for a single
 * server. Use a shared store (e.g. Redis) if the site runs on several instances.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

export function resetRateLimit(key: string) {
  buckets.delete(key);
}
