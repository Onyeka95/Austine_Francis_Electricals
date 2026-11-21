/**
 * A very simple rate limiter (CT-5). It remembers recent requests in the server's memory.
 *
 * Honest limits: on Vercel each server instance has its own memory, so this slows down
 * casual spam but is not a perfect wall. Together with the hidden spam-trap field and the
 * length checks it is enough for a small business site.
 */
const recentHits = new Map<string, number[]>();

/**
 * Returns true if this visitor has sent too many requests recently.
 * Default: more than 5 requests in 10 minutes.
 */
export function isRateLimited(
  key: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): boolean {
  const now = Date.now();
  const recent = (recentHits.get(key) ?? []).filter(
    (time) => now - time < windowMs
  );

  if (recent.length >= limit) {
    recentHits.set(key, recent);
    return true;
  }

  recent.push(now);
  recentHits.set(key, recent);

  // Tidy up now and then so the map cannot grow forever.
  if (recentHits.size > 1000) {
    for (const [storedKey, times] of recentHits) {
      if (times.every((time) => now - time >= windowMs)) {
        recentHits.delete(storedKey);
      }
    }
  }

  return false;
}