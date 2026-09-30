import "server-only";
import { db } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { effectivePrice, type ProductSummary, type SortOption } from "@/lib/catalog";

const summarySelect = {
  id: true,
  slug: true,
  name: true,
  price: true,
  salePrice: true,
  stock: true,
  isNew: true,
  isFeatured: true,
  createdAt: true,
  category: { select: { name: true } },
  images: { select: { url: true }, orderBy: { sortOrder: "asc" }, take: 1 },
} satisfies Prisma.ProductSelect;

type SummaryRow = Prisma.ProductGetPayload<{ select: typeof summarySelect }>;

function toSummary(p: SummaryRow): ProductSummary {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    salePrice: p.salePrice,
    stock: p.stock,
    image: p.images[0]?.url ?? null,
    isNew: p.isNew,
    categoryName: p.category.name,
  };
}

export async function getCategories() {
  const categories = await db.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: { where: { isActive: true } } } } },
  });
  return categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image,
    productCount: c._count.products,
  }));
}

export async function getHomeProducts() {
  const [featured, newArrivals, onSale] = await Promise.all([
    db.product.findMany({
      where: { isActive: true, isFeatured: true },
      select: summarySelect,
      orderBy: { updatedAt: "desc" },
      take: 8,
    }),
    db.product.findMany({
      where: { isActive: true, isNew: true },
      select: summarySelect,
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    db.product.findMany({
      where: { isActive: true, salePrice: { not: null }, stock: { gt: 0 } },
      select: summarySelect,
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
  ]);
  return {
    featured: featured.map(toSummary),
    newArrivals: newArrivals.map(toSummary),
    onSale: onSale.map(toSummary),
  };
}

export type ShopFilters = {
  q?: string;
  category?: string;
  sort?: SortOption;
  min?: number;
  max?: number;
  inStock?: boolean;
  page?: number;
};

export const SHOP_PAGE_SIZE = 12;

/**
 * Catalog search. Filtering by text/category happens in the database; price
 * filtering and price sorting use the effective (sale-aware) price and are done
 * in memory, which is fast for catalogs of up to a few thousand products.
 */
export async function searchProducts(filters: ShopFilters) {
  const where: Prisma.ProductWhereInput = { isActive: true };
  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q } },
      { description: { contains: filters.q } },
      { sku: { contains: filters.q } },
      { category: { name: { contains: filters.q } } },
    ];
  }
  if (filters.category) where.category = { slug: filters.category };
  if (filters.inStock) where.stock = { gt: 0 };

  const rows = await db.product.findMany({ where, select: summarySelect });

  let items = rows.filter((p) => {
    const price = effectivePrice(p);
    if (filters.min != null && price < filters.min) return false;
    if (filters.max != null && price > filters.max) return false;
    return true;
  });

  const byName = (a: SummaryRow, b: SummaryRow) => a.name.localeCompare(b.name);
  switch (filters.sort) {
    case "newest":
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    case "price-asc":
      items.sort((a, b) => effectivePrice(a) - effectivePrice(b) || byName(a, b));
      break;
    case "price-desc":
      items.sort((a, b) => effectivePrice(b) - effectivePrice(a) || byName(a, b));
      break;
    case "name":
      items.sort(byName);
      break;
    default:
      // Featured first, then in-stock items, then newest.
      items.sort(
        (a, b) =>
          Number(b.isFeatured) - Number(a.isFeatured) ||
          Number(b.stock > 0) - Number(a.stock > 0) ||
          b.createdAt.getTime() - a.createdAt.getTime(),
      );
  }

  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / SHOP_PAGE_SIZE));
  const page = Math.min(Math.max(1, filters.page ?? 1), pages);
  items = items.slice((page - 1) * SHOP_PAGE_SIZE, page * SHOP_PAGE_SIZE);

  return { items: items.map(toSummary), total, page, pages };
}

export async function getProductBySlug(slug: string) {
  return db.product.findFirst({
    where: { slug, isActive: true },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4) {
  const rows = await db.product.findMany({
    where: { isActive: true, categoryId, id: { not: productId } },
    select: summarySelect,
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: limit,
  });
  if (rows.length < limit) {
    const extra = await db.product.findMany({
      where: { isActive: true, id: { notIn: [productId, ...rows.map((r) => r.id)] } },
      select: summarySelect,
      orderBy: { isFeatured: "desc" },
      take: limit - rows.length,
    });
    rows.push(...extra);
  }
  return rows.map(toSummary);
}

/** Current data for products in a customer's cart (prices may have changed). */
export async function getProductsByIds(ids: string[]) {
  if (ids.length === 0) return [];
  const rows = await db.product.findMany({
    where: { id: { in: ids }, isActive: true },
    select: summarySelect,
  });
  return rows.map(toSummary);
}
