"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { effectivePrice, type ProductSummary } from "@/lib/catalog";

/**
 * Shopping cart, stored in the visitor's browser (localStorage).
 * Prices here are for display only — the server recalculates every price
 * from the database when an order is placed.
 */
export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  unitPrice: number;
  compareAtPrice: number | null;
  stock: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (product: ProductSummary, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** Replaces cart data with the latest product info; drops products that no longer exist. */
  sync: (products: ProductSummary[]) => void;
};

export const MAX_QTY_PER_ITEM = 10;

function clampQty(quantity: number, stock: number) {
  return Math.max(1, Math.min(quantity, stock, MAX_QTY_PER_ITEM));
}

function toItem(product: ProductSummary, quantity: number): CartItem {
  const unitPrice = effectivePrice(product);
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    image: product.image,
    unitPrice,
    compareAtPrice: unitPrice < product.price ? product.price : null,
    stock: product.stock,
    quantity,
  };
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          const nextQty = clampQty((existing?.quantity ?? 0) + quantity, product.stock);
          const item = toItem(product, nextQty);
          return {
            items: existing ? state.items.map((i) => (i.id === product.id ? item : i)) : [...state.items, item],
          };
        }),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity: clampQty(quantity, i.stock) } : i)),
        })),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      sync: (products) =>
        set((state) => ({
          items: state.items.flatMap((item) => {
            const product = products.find((p) => p.id === item.id);
            if (!product) return [];
            // Out-of-stock items stay in the cart (flagged in the UI) so the customer sees what changed.
            const quantity = product.stock > 0 ? clampQty(item.quantity, product.stock) : item.quantity;
            return [toItem(product, quantity)];
          }),
        })),
    }),
    { name: "zyventa-cart", storage: createJSONStorage(() => localStorage), version: 1 },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}

/** True once the cart has been restored from localStorage (avoids hydration mismatches). */
export function useCartHydrated() {
  return useSyncExternalStore(
    (onChange) => useCart.persist.onFinishHydration(onChange),
    () => useCart.persist.hasHydrated(),
    () => false,
  );
}
