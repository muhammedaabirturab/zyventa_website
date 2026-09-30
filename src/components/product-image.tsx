"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductImageProps = Omit<ImageProps, "src"> & { src: string | null | undefined };

/** next/image with a neutral fallback when a product has no image or the file is missing. */
export function ProductImage({ src, alt, className, ...props }: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt || "No image available"}
        className={cn("flex size-full items-center justify-center bg-surface text-line-strong", className)}
      >
        <ImageOff className="size-8" aria-hidden />
      </div>
    );
  }

  return <Image src={src} alt={alt} className={className} onError={() => setFailedSrc(src)} {...props} />;
}
