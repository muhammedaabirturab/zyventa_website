"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { ProductSummary } from "@/lib/catalog";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";

type Props = {
  product: ProductSummary;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
  /** "buy" adds the item and goes straight to checkout. */
  mode?: "add" | "buy";
};

export function AddToCartButton({ product, quantity = 1, size = "md", variant = "primary", className, mode = "add" }: Props) {
  const add = useCart((s) => s.add);
  const router = useRouter();
  const soldOut = product.stock <= 0;

  function handleClick() {
    add(product, quantity);
    if (mode === "buy") {
      router.push("/checkout");
      return;
    }
    toast.success(`${product.name} added to your cart`, {
      action: { label: "View cart", onClick: () => router.push("/cart") },
    });
  }

  return (
    <Button type="button" size={size} variant={variant} className={className} onClick={handleClick} disabled={soldOut}>
      {mode === "add" && <ShoppingBag className="size-4" aria-hidden />}
      {soldOut ? "Out of stock" : mode === "buy" ? "Buy now" : "Add to cart"}
    </Button>
  );
}
