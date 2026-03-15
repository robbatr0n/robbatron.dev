"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function ImageGallery({ images, title }: Props) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight" && active !== null)
        setActive((active + 1) % images.length);
      if (e.key === "ArrowLeft" && active !== null)
        setActive((active - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, images.length]);

  return (
    <>
      <div className="mt-10 pt-10 border-t border-neutral-100">
        <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4">
          screenshots
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative aspect-video rounded-lg overflow-hidden bg-neutral-50 border border-neutral-200 hover:border-neutral-400 transition-colors cursor-zoom-in"
            >
              <Image
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${title} screenshot ${active + 1}`}
              fill
              className="object-contain"
            />

            {/* close */}
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors font-mono text-xs"
            >
              esc
            </button>

            {/* prev / next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActive((active - 1 + images.length) % images.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActive((active + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-xs text-white/50">
                  {active + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
