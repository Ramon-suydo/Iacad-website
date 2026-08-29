"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/nav";
import Container from "./Container";

export default function Navbar({ shortName, logoUrl }: { shortName: string; logoUrl: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[box-shadow,border-color] duration-300 will-change-[box-shadow] ${
        scrolled
          ? "border-navy-900/10 shadow-md"
          : "border-transparent shadow-none"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between transition-[height,padding] duration-300 ${
            scrolled ? "h-14" : "h-18 py-4"
          }`}
        >
          <Link href="/" className="flex items-center group" onClick={() => setOpen(false)}>
            {logoUrl ? (
              <img src={logoUrl} alt={shortName} className="h-10 w-auto transition-transform group-hover:scale-105" />
            ) : (
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-900 text-gold-400 font-serif font-semibold text-lg">
                  i
                </span>
                <span className="font-serif text-lg font-semibold text-navy-950 tracking-tight">
                  {shortName}
                  <span className="ml-1.5 font-sans text-xs font-medium uppercase tracking-wider text-gold-600">
                    Library
                  </span>
                </span>
              </span>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? "text-navy-950"
                      : "text-navy-700/70 hover:text-navy-950 hover:bg-navy-900/5"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-md text-navy-950 -mr-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-navy-900/10 bg-white max-h-[calc(100dvh-3.5rem)] overflow-y-auto">
          <Container>
            <nav className="flex flex-col py-3">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`px-2 py-3 text-sm font-medium rounded-md ${
                      active
                        ? "text-navy-950 bg-navy-900/5"
                        : "text-navy-700/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}