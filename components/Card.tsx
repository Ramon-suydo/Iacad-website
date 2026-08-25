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
      className={`group rounded-xl border border-navy-900/8 bg-white p-6 shadow-card transition-all hover:shadow-cardHover hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </div>
  );
}