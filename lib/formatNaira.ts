/** Rounds to 2 decimal places and avoids floating-point errors (0.1 + 0.2). */
export function roundTo2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** 1250000 becomes "₦1,250,000.00". Empty or invalid values become ₦0.00 (never NaN). */
export function formatNaira(amount: number | null | undefined): string {
  const safe =
    typeof amount === "number" && Number.isFinite(amount) ? amount : 0;

  const formatted = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundTo2(safe));

  return `₦${formatted}`;
}