import { siteConfig } from "@/config/site";

/** Product shape used by cards, grids and the cart. Safe to pass to client components. */
export type ProductSummary = {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice: number | null;
  stock: number;
  image: string | null;
  isNew: boolean;
  categoryName: string;
};

export type Spec = { label: string; value: string };

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export function effectivePrice(p: { price: number; salePrice: number | null }): number {
  return p.salePrice != null && p.salePrice < p.price ? p.salePrice : p.price;
}

export function isOnSale(p: { price: number; salePrice: number | null }): boolean {
  return p.salePrice != null && p.salePrice < p.price;
}

export function discountPercent(p: { price: number; salePrice: number | null }): number {
  if (!isOnSale(p)) return 0;
  return Math.round(((p.price - effectivePrice(p)) / p.price) * 100);
}

export function stockStatus(stock: number): StockStatus {
  if (stock <= 0) return "out_of_stock";
  if (stock <= siteConfig.lowStockThreshold) return "low_stock";
  return "in_stock";
}

export const stockLabels: Record<StockStatus, string> = {
  in_stock: "In stock",
  low_stock: "Only a few left",
  out_of_stock: "Out of stock",
};

export function parseSpecs(json: string): Spec[] {
  try {
    const value: unknown = JSON.parse(json);
    if (!Array.isArray(value)) return [];
    return value.filter(
      (s): s is Spec =>
        typeof s === "object" && s !== null && typeof s.label === "string" && typeof s.value === "string",
    );
  } catch {
    return [];
  }
}

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A–Z" },
] as const;

export type SortOption = (typeof sortOptions)[number]["value"];
