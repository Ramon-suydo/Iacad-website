import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`index-card group rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card transition-[box-shadow,transform,border-color] duration-500 ease-[cubic-bezier(.2,.8,.2,1.12)] hover:-translate-y-1 hover:border-cobalt-bright/30 hover:shadow-[0_24px_48px_-24px_rgba(91,127,255,.45)] active:translate-y-0 active:scale-[.99] ${className}`}
    >
      {children}
    </div>
  );
}
