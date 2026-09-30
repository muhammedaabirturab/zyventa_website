import { discountPercent, effectivePrice, isOnSale } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

type PriceProps = {
  price: number;
  salePrice: number | null;
  size?: "sm" | "lg";
  showSaving?: boolean;
  className?: string;
};

export function Price({ price, salePrice, size = "sm", showSaving = false, className }: PriceProps) {
  const onSale = isOnSale({ price, salePrice });
  const current = effectivePrice({ price, salePrice });

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span
        className={cn(
          "font-semibold tabular-nums",
          size === "lg" ? "text-[28px] leading-none" : "text-[15px]",
          onSale ? "text-accent" : "text-ink",
        )}
      >
        <span className="sr-only">{onSale ? "Sale price " : "Price "}</span>
        {formatMoney(current)}
      </span>
      {onSale && (
        <>
          <s className={cn("text-muted tabular-nums", size === "lg" ? "text-lg" : "text-sm")}>
            <span className="sr-only">Original price </span>
            {formatMoney(price)}
          </s>
          {showSaving && (
            <span className="rounded-sm bg-accent-soft px-2 py-0.5 text-[13px] font-semibold text-accent">
              Save {discountPercent({ price, salePrice })}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
