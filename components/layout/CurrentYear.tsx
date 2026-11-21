import { cacheLife } from "next/cache";

/**
 * Shows the current year. "use cache" tells Next.js it is fine to work out the year
 * at build time and refresh it now and then, so the build no longer fails.
 */
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");

  return <>{new Date().getFullYear()}</>;
}