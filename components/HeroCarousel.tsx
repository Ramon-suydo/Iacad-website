"use client";

import { useState, useEffect, useCallback } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
};

export default function HeroCarousel({
  slides,
  intervalMs = 4000,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused, slides.length, intervalMs]);

  if (slides.length === 0) return null;

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2.5 sm:bottom-8">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              onClick={() => goTo(index)}
              aria-label={`Show slide ${index + 1}: ${slide.alt}`}
              aria-current={index === active}
              className="group flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === active
                    ? "w-6 bg-gold-400"
                    : "w-2 bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}