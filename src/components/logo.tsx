import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Brand logo. Uses the image set in siteConfig.logo.src when provided,
 * otherwise a temporary text wordmark.
 */
export function Logo({ tone = "dark", className, href = "/" }: { tone?: "dark" | "light"; className?: string; href?: string }) {
  const { logo, name } = siteConfig;

  return (
    <Link href={href} className={cn("inline-flex shrink-0 items-center gap-2.5", className)} aria-label={`${name} home`}>
      {logo.src ? (
        <Image src={logo.src} alt={name} width={logo.width} height={logo.height} priority />
      ) : (
        <>
          <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
            <rect width="32" height="32" rx="7" className={tone === "dark" ? "fill-brand" : "fill-white"} />
            <path
              d="M10 10.5h12L10 21.5h12"
              fill="none"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={tone === "dark" ? "stroke-white" : "stroke-brand"}
            />
          </svg>
          <span
            className={cn(
              "font-display text-[26px] leading-none font-medium tracking-tight",
              tone === "dark" ? "text-ink" : "text-white",
            )}
          >
            {name.toLowerCase()}
          </span>
        </>
      )}
    </Link>
  );
}
