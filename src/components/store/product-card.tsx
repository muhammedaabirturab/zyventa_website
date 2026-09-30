import Link from "next/link";
import { discountPercent, isOnSale, stockStatus, type ProductSummary } from "@/lib/catalog";
import { ProductImage } from "@/components/product-image";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { Price } from "@/components/store/price";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product, priority = false }: { product: ProductSummary; priority?: boolean }) {
  const status = stockStatus(product.stock);
  const href = `/products/${product.slug}`;

  return (
    <article className="group relative flex flex-col">
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden rounded-md bg-surface"
        tabIndex={-1}
        aria-hidden
      >
        <ProductImage
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 30vw, 50vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1.5">
          {isOnSale(product) && <Badge tone="accent">−{discountPercent(product)}%</Badge>}
          {product.isNew && <Badge tone="brand">New</Badge>}
        </div>
        {status === "out_of_stock" && (
          <div className="absolute inset-x-0 bottom-0 bg-ink/75 py-2 text-center text-xs font-semibold tracking-wider text-white uppercase">
            Out of stock
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-3.5">
        <p className="text-xs tracking-wide text-muted">{product.categoryName}</p>
        <h3 className="mt-1 text-[15px] leading-snug font-medium text-ink">
          <Link href={href} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <Price price={product.price} salePrice={product.salePrice} className="mt-2" />
        {status === "low_stock" && <p className="mt-1 text-xs font-medium text-warning">Only {product.stock} left</p>}
        <div className="mt-auto pt-3.5">
          <AddToCartButton product={product} size="sm" variant="secondary" className="w-full" />
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, priorityCount = 0 }: { products: ProductSummary[]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {products.map((p, i) => (
        <li key={p.id} className="flex">
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
