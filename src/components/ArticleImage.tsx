"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ArticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
}

export default function ArticleImage({ src, alt, width, height, className, loading }: ArticleImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full flex flex-col items-center justify-center gap-2 bg-paper text-muted py-10"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <ImageOff size={28} className="opacity-50" />
        <span className="text-xs text-center px-4">Image unavailable</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
