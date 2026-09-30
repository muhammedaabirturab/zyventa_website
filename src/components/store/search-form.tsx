import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/** Plain GET form to /shop — works without JavaScript. */
export function SearchForm({ className, defaultValue, id = "site-search" }: { className?: string; defaultValue?: string; id?: string }) {
  return (
    <form action="/shop" role="search" className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <input
        id={id}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Search vitamins, skincare, devices…"
        autoComplete="off"
        className="h-11 w-full rounded-md border border-line-strong bg-white pr-12 pl-4 text-[15px] placeholder:text-muted/80 focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute inset-y-1 right-1 flex w-10 cursor-pointer items-center justify-center rounded-[4px] text-ink-soft hover:bg-surface hover:text-ink"
        aria-label="Search"
      >
        <Search className="size-[18px]" aria-hidden />
      </button>
    </form>
  );
}
