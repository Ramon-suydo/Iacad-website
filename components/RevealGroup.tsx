"use client";

import { Children, type ReactNode } from "react";
import Reveal from "./Reveal";

export default function RevealGroup({
  children,
  className = "",
  staggerMs = 80,
}: {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <Reveal delay={Math.min(index * staggerMs, 400)} className="h-full [&>*]:h-full">
          {child}
        </Reveal>
      ))}
    </div>
  );
}
