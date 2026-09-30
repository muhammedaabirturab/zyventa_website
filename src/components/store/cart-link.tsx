"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cartCount, useCart, useCartHydrated } from "@/lib/cart-store";

export function CartLink() {
  const hydrated = useCartHydrated();
  const count = useCart((s) => cartCount(s.items));
  const shown = hydrated ? count : 0;

  return (
    <Link
      href="/cart"
      className="relative flex h-11 items-center gap-2 rounded-md px-3 text-ink hover:bg-surface"
      aria-label={shown > 0 ? `Cart, ${shown} item${shown === 1 ? "" : "s"}` : "Cart"}
    >
      <ShoppingBag className="size-[22px]" strokeWidth={1.75} aria-hidden />
      <span className="hidden text-sm font-medium sm:inline">Cart</span>
      {shown > 0 && (
        <span className="absolute top-1 left-6 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white tabular-nums">
          {shown > 99 ? "99+" : shown}
        </span>
      )}
    </Link>
  );
}
