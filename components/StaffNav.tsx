"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StaffNav({
  items,
}: {
  items: { href: string; label: string; badgeCount?: number }[];
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
            aria-label={
              item.badgeCount
                ? `${item.label}, ${item.badgeCount} pending request${item.badgeCount === 1 ? "" : "s"}`
                : undefined
            }
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
            {!!item.badgeCount && (
              <span
                aria-hidden="true"
                className={`ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-extrabold leading-none ${
                  active
                    ? "bg-white text-cobalt-500"
                    : "bg-red-600 text-white"
                }`}
              >
                {item.badgeCount > 99 ? "99+" : item.badgeCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
