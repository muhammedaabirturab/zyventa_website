"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/config/site";
import { Logo } from "@/components/logo";

type NavCategory = { name: string; slug: string };

export function MobileMenu({ categories }: { categories: NavCategory[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close the menu after navigating.
  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="-ml-2 flex size-11 cursor-pointer items-center justify-center rounded-md text-ink hover:bg-surface lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-6" strokeWidth={1.75} aria-hidden />
      </button>

      <dialog
        ref={ref}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-dvh w-[86%] max-w-sm bg-paper p-0 text-ink"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <Logo />
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="flex size-11 cursor-pointer items-center justify-center rounded-md hover:bg-surface"
              aria-label="Close menu"
            >
              <X className="size-6" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
            <ul className="space-y-0.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-12 items-center rounded-md px-3 text-[17px] font-medium hover:bg-surface aria-[current=page]:text-brand"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-6 mb-2 px-3">Categories</p>
            <ul className="space-y-0.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    className="flex h-11 items-center rounded-md px-3 text-[15px] text-ink-soft hover:bg-surface hover:text-ink"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
