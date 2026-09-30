import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatMoney } from "@/lib/money";
import { Logo } from "@/components/logo";
import { CartLink } from "@/components/store/cart-link";
import { MobileMenu } from "@/components/store/mobile-menu";
import { SearchForm } from "@/components/store/search-form";

type NavCategory = { name: string; slug: string };

export function Header({ categories }: { categories: NavCategory[] }) {
  return (
    <>
      <div className="bg-brand-strong text-white">
        <p className="container-page py-2 text-center text-[13px] tracking-wide">
          Free delivery on orders over {formatMoney(siteConfig.shipping.freeShippingThreshold)}
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="container-page flex h-16 items-center gap-3 lg:h-[72px] lg:gap-8">
        <MobileMenu categories={categories} />
        <Logo />
        <SearchForm className="mx-auto hidden max-w-xl flex-1 md:block" />
        <div className="ml-auto flex items-center md:ml-0">
          <CartLink />
        </div>
      </div>

      <nav aria-label="Main" className="hidden border-t border-line lg:block">
        <ul className="container-page flex h-12 items-center gap-7 text-sm font-medium text-ink-soft">
          <li>
            <Link href="/shop" className="hover:text-brand">
              Shop all
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/shop?category=${c.slug}`} className="hover:text-brand">
                {c.name}
              </Link>
            </li>
          ))}
          <li className="ml-auto">
            <Link href="/about" className="hover:text-brand">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-brand">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      </header>
      <div className="container-page border-b border-line py-3 md:hidden">
        <SearchForm id="site-search-mobile" />
      </div>
    </>
  );
}
