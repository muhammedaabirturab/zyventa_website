import { siteConfig } from "@/config/site";

const formatter = new Intl.NumberFormat(siteConfig.currency.locale, {
  style: "currency",
  currency: siteConfig.currency.code,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Formats an amount stored in minor units (e.g. paise) for display. */
export function formatMoney(minor: number): string {
  return formatter.format(minor / 100);
}

/** Converts a user-entered amount like "499.50" into minor units. */
export function toMinor(major: number): number {
  return Math.round(major * 100);
}

/** Converts minor units into a plain number string for form inputs. */
export function toMajorInput(minor: number | null | undefined): string {
  if (minor == null) return "";
  const major = minor / 100;
  return Number.isInteger(major) ? String(major) : major.toFixed(2);
}

export function shippingFor(subtotal: number): number {
  const { flatRate, freeShippingThreshold } = siteConfig.shipping;
  if (subtotal === 0 || subtotal >= freeShippingThreshold) return 0;
  return flatRate;
}
