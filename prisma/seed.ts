import { prisma } from "./client";
import { seedCategories, seedProducts } from "./seed-data";
import { hashPassword, MIN_PASSWORD_LENGTH } from "../src/lib/auth/password";
import { slugify } from "../src/lib/utils";

async function seedCatalog() {
  for (const [index, category] of seedCategories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: { ...category, sortOrder: index },
    });
  }

  if ((await prisma.product.count()) > 0) {
    console.log("• Products already exist — sample catalogue skipped.");
    return;
  }

  const categories = await prisma.category.findMany();
  const categoryId = (slug: string) => {
    const found = categories.find((c) => c.slug === slug);
    if (!found) throw new Error(`Unknown category: ${slug}`);
    return found.id;
  };

  // Stagger creation dates so "Newest" sorting has a stable, meaningful order.
  for (const [index, p] of seedProducts.entries()) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: slugify(p.name),
        sku: p.sku,
        description: p.description,
        specs: JSON.stringify(p.specs.map(([label, value]) => ({ label, value }))),
        price: p.price,
        salePrice: p.salePrice ?? null,
        stock: p.stock,
        isFeatured: p.featured ?? false,
        isNew: p.isNew ?? false,
        categoryId: categoryId(p.category),
        createdAt: new Date(Date.now() - (seedProducts.length - index) * 60 * 60 * 1000),
        images: {
          create: p.images.map((file, sortOrder) => ({
            url: `/images/products/${file}.jpg`,
            alt: p.name,
            sortOrder,
          })),
        },
      },
    });
  }
  console.log(`• Added ${seedCategories.length} categories and ${seedProducts.length} sample products.`);
}

async function seedAdmin() {
  if ((await prisma.adminUser.count()) > 0) {
    console.log("• Admin account already exists — skipped.");
    return;
  }
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (!email || password.length < MIN_PASSWORD_LENGTH) {
    console.warn(
      `• No admin created. Set ADMIN_EMAIL and ADMIN_PASSWORD (min ${MIN_PASSWORD_LENGTH} characters) in .env, then run "npm run admin:create".`,
    );
    return;
  }
  await prisma.adminUser.create({
    data: {
      email,
      name: process.env.ADMIN_NAME?.trim() || "Store Admin",
      passwordHash: await hashPassword(password),
    },
  });
  console.log(`• Admin account created for ${email}.`);
}

async function main() {
  await seedCatalog();
  await seedAdmin();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
