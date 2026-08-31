"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StaffNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex max-w-[1240px] gap-1 overflow-x-auto border-t border-navy-900/6 px-4 py-2 sm:flex-wrap sm:px-7">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            style={{
              color: active ? "#ffffff" : "#24396f",
              backgroundColor: active ? "#3b5bff" : "transparent",
            }}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
              active
                ? "shadow-[0_8px_18px_-12px_rgba(59,91,255,.8)]"
                : "hover:!bg-navy-900/5 hover:!text-navy-950"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
