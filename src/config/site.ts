/**
 * Central store configuration.
 *
 * Everything company-specific lives here so branding and business details can
 * be replaced without touching components. Values wrapped in [square brackets]
 * are placeholders that must be replaced with Zyventa's real information
 * before launch.
 */
export const siteConfig = {
  name: "Zyventa",
  tagline: "Everyday health, thoughtfully chosen.",
  description:
    "Shop vitamins, skincare, personal care and home health essentials from Zyventa. Carefully selected products, clear pricing and a simple checkout.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /**
   * Logo. Leave `src` empty to use the built-in text logo, or place the
   * official logo in /public/images/brand/ and set its path here
   * (e.g. "/images/brand/zyventa-logo.svg").
   */
  logo: {
    src: "",
    width: 140,
    height: 36,
  },

  /** Homepage and page imagery (replace files in /public/images/site/). */
  images: {
    hero: "/images/site/hero.jpg",
    promo: "/images/site/promo.jpg",
    about: "/images/site/about.jpg",
  },

  /** Currency used for all prices. Amounts are stored in minor units (paise). */
  currency: {
    code: "INR",
    locale: "en-IN",
  },

  /** Delivery charges applied at checkout. Placeholder values — confirm with Zyventa. */
  shipping: {
    flatRate: 7900, // ₹79.00
    freeShippingThreshold: 99900, // free delivery on orders of ₹999 and above
  },

  /** Stock at or below this number is shown as "Only a few left". */
  lowStockThreshold: 5,

  contact: {
    email: "[support email]",
    phone: "[phone number]",
    address: "[registered business address]",
    hours: "[customer support hours]",
  },

  /** Social links. Set a URL to show the icon in the footer; leave empty to hide it. */
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    x: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const policyPages = [
  { slug: "shipping", title: "Shipping Policy" },
  { slug: "returns", title: "Returns & Refunds" },
  { slug: "privacy", title: "Privacy Policy" },
  { slug: "terms", title: "Terms & Conditions" },
] as const;
