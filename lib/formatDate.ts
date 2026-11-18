/** Turns "2026-11-10" into "10 November 2026". Returns the original text if it cannot be read. */
export function formatPostDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;

  // new Date(year, monthIndex, day) uses local time, so the day never shifts by timezone.
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}