import { ReactNode } from "react";
import Container from "./Container";

export default function Section({
  children,
  className = "",
  eyebrow,
  title,
  description,
  center = false,
  dark = false,
}: {
  children?: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <section
    className={`py-16 sm:py-20 [content-visibility:auto] [contain-intrinsic-size:1px_800px] ${className}`}
      >
      <Container>
        {(eyebrow || title || description) && (
          <div className={`mb-12 ${center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
            {eyebrow && (
              <span
                className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] ${
                  dark ? "text-gold-400" : "text-gold-600"
                }`}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <h2
                className={`font-serif text-3xl font-semibold sm:text-4xl ${
                  dark ? "text-white" : "text-navy-950"
                }`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`mt-4 text-base leading-relaxed ${
                  dark ? "text-white/60" : "text-navy-700/70"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}