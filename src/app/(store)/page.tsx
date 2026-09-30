import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Headset, ShieldCheck, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatMoney } from "@/lib/money";
import { getCategories, getHomeProducts } from "@/lib/queries";
import { ProductImage } from "@/components/product-image";
import { NewsletterForm } from "@/components/store/newsletter-form";
import { ProductGrid } from "@/components/store/product-card";
import { SectionHeading } from "@/components/store/section-heading";
import { ButtonLink } from "@/components/ui/button";

export default async function HomePage() {
  const [categories, { featured, newArrivals, onSale }] = await Promise.all([getCategories(), getHomeProducts()]);
  const productTotal = categories.reduce((sum, c) => sum + c.productCount, 0);
  const promoCategory = categories[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-surface">
        <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow">Health · Skincare · Wellness</p>
            <h1 className="mt-5 font-display text-[44px] leading-[1.04] font-normal tracking-tight text-ink sm:text-6xl lg:text-[68px]">
              Everyday health, <em className="text-brand">thoughtfully</em> chosen.
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-soft">
              Vitamins, skincare, personal care and home health devices — selected for quality and delivered to your
              door with a simple, secure checkout.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop" size="lg">
                Shop all products
              </ButtonLink>
              <ButtonLink href="#categories" size="lg" variant="secondary">
                Browse categories
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-md sm:aspect-[4/3] lg:aspect-[5/6]">
              <Image
                src={siteConfig.images.hero}
                alt="Minimal wellness product bottle on a warm neutral background"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {productTotal > 0 && (
              <div className="absolute -bottom-5 left-4 rounded-md border border-line bg-white px-5 py-4 shadow-sm sm:left-6">
                <p className="font-display text-3xl leading-none text-brand">{productTotal}</p>
                <p className="mt-1 text-[13px] text-muted">products across {categories.length} categories</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service highlights */}
      <section aria-label="Why shop with us" className="border-b border-line bg-white">
        <ul className="container-page grid grid-cols-2 gap-x-6 gap-y-6 py-8 pt-12 lg:grid-cols-4 lg:pt-8">
          {[
            { icon: BadgeCheck, title: "Carefully selected", text: "Quality-checked products" },
            {
              icon: Truck,
              title: "Free delivery",
              text: `On orders over ${formatMoney(siteConfig.shipping.freeShippingThreshold)}`,
            },
            { icon: ShieldCheck, title: "Secure checkout", text: "Cash on delivery available" },
            { icon: Headset, title: "Here to help", text: "Friendly customer care" },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3.5">
              <Icon className="mt-0.5 size-6 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
              <div>
                <p className="text-[15px] font-semibold text-ink">{title}</p>
                <p className="text-sm text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section id="categories" className="container-page scroll-mt-32 py-16 lg:py-24">
          <SectionHeading
            eyebrow="Shop by category"
            title="Find what your routine needs"
            href="/shop"
            linkLabel="Shop all"
          />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/shop?category=${c.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
                    <ProductImage
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink group-hover:text-brand">{c.name}</h3>
                      <p className="text-[13px] text-muted">
                        {c.productCount} product{c.productCount === 1 ? "" : "s"}
                      </p>
                    </div>
                    <ArrowRight
                      className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                      aria-hidden
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <section className="border-t border-line bg-white py-16 lg:py-24">
          <div className="container-page">
            <SectionHeading
              eyebrow="Featured"
              title="Customer favourites"
              description="Popular picks from across the Zyventa range."
              href="/shop"
            />
            <ProductGrid products={featured} />
          </div>
        </section>
      )}

      {/* Promotional banner */}
      {promoCategory && (
        <section className="container-page py-16 lg:py-24">
          <div className="grid overflow-hidden rounded-md bg-brand-soft md:grid-cols-2">
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px]">
              <Image
                src={siteConfig.images.promo}
                alt="Minimal supplement bottle on a warm background"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16">
              <p className="eyebrow">{promoCategory.name}</p>
              <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-ink sm:text-[42px]">
                Build a daily routine that works for you
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">{promoCategory.description}</p>
              <div className="mt-8">
                <ButtonLink href={`/shop?category=${promoCategory.slug}`} size="lg">
                  Explore {promoCategory.name.toLowerCase()}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* New arrivals */}
      {newArrivals.length > 0 && (
        <section className="container-page pb-16 lg:pb-24">
          <SectionHeading
            eyebrow="Just in"
            title="New arrivals"
            description="The latest additions to our shelves."
            href="/shop?sort=newest"
          />
          <ProductGrid products={newArrivals} />
        </section>
      )}

      {/* Offers */}
      {onSale.length > 0 && (
        <section className="border-t border-line bg-white py-16 lg:py-24">
          <div className="container-page">
            <SectionHeading
              eyebrow="Offers"
              title="Good value, right now"
              description="Limited-time prices on selected essentials."
              href="/shop?sort=price-asc"
              linkLabel="Shop all products"
            />
            <ProductGrid products={onSale} />
          </div>
        </section>
      )}

      {/* Brand promise */}
      <section className="border-t border-line bg-surface py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="eyebrow">Why Zyventa</p>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-ink sm:text-[40px]">
              A calmer way to shop for your health
            </h2>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-strong"
            >
              More about us <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {[
              [
                "Carefully selected",
                "Every product in our range is chosen for quality, clear labelling and everyday usefulness.",
              ],
              ["Honest pricing", "Clear prices with offers shown upfront, and no surprises at checkout."],
              ["Simple ordering", "A straightforward checkout, delivery to your door and cash on delivery."],
              ["Real support", "Questions about a product or an order? Our customer care team is here to help."],
            ].map(([title, text], i) => (
              <li key={title} className="border-t border-line-strong pt-5">
                <span className="font-display text-[15px] text-brand">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand text-white">
        <div className="container-page flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
              Offers and new arrivals, first
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/75">
              Join our mailing list for new products and seasonal offers. Unsubscribe at any time.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
