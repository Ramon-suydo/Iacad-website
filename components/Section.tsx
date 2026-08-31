import { ReactNode } from "react";
import Container from "./Container";
import Reveal from "./Reveal";

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
    className={`library-section overflow-hidden py-14 sm:py-20 lg:py-24 [content-visibility:auto] [contain-intrinsic-size:1px_800px] ${className}`}
      >
      <Container>
        {(eyebrow || title || description) && (
          <Reveal className={`section-heading mb-9 sm:mb-12 ${center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
            {eyebrow && (
              <span
                className={`mb-3 inline-block text-xs font-bold uppercase tracking-[0.16em] ${
                  dark ? "text-pop-cyan" : "text-cobalt-500"
                }`}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <h2
                className={`text-2xl font-extrabold tracking-[-0.025em] min-[420px]:text-3xl sm:text-4xl ${
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
          </Reveal>
        )}
        <Reveal delay={90}>{children}</Reveal>
      </Container>
    </section>
  );
}
