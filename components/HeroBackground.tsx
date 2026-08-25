"use client";

import { useEffect, useState, useCallback } from "react";

export default function HeroBackground({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const visibleIndexes = images
    .map((_, i) => i)
    .filter((i) => !failed[i]);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (visibleIndexes.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => {
        const currentPos = visibleIndexes.indexOf(prev);
        const nextPos = (currentPos + 1) % visibleIndexes.length;
        return visibleIndexes[nextPos];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [visibleIndexes]);

  return (
    <>
      <div className="absolute inset-0">
        {images.map((src, i) => {
          if (failed[i]) return null;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
            />
          );
        })}
      </div>

      {visibleIndexes.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
          {visibleIndexes.map((i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-7 bg-gold-400"
                  : "w-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}