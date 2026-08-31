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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[box-shadow,border-color,background-color,backdrop-filter] duration-300 will-change-[box-shadow] ${
        scrolled
          ? "border-white/10 bg-navy-950/80 shadow-[0_12px_34px_-18px_rgba(0,0,0,.8)] backdrop-blur-md"
          : "border-transparent bg-transparent shadow-none"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between transition-[height,padding] duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link href="/" className="flex items-center group" onClick={() => setOpen(false)}>
            {logoUrl ? (
              <img src={logoUrl} alt={shortName} className="h-8 max-w-[180px] object-contain object-left transition-transform group-hover:scale-105 sm:h-10 sm:max-w-[240px]" />
            ) : (
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-gradient-to-br from-cobalt-bright via-cobalt-500 to-navy-800 text-gold-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)] font-serif font-semibold italic text-lg">
                  i
                </span>
                <span className="text-base font-extrabold text-white tracking-tight">
                  {shortName}
                  <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-gold-400">
                    Library
                  </span>
                </span>
              </span>
            )}
          </Link>

          <nav className="hidden items-center gap-1 font-display lg:flex">
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
                  className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                    active
                      ? "bg-cobalt-500/25 text-white shadow-[inset_0_0_0_1px_rgba(91,127,255,.18)]"
                      : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {active && <span aria-hidden="true" className="absolute -left-0.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-pop-cyan shadow-[0_0_10px_rgba(45,212,220,.9)]" />}
                  {item.label}
                  {active && (
                    <span className="sr-only">Current page</span>
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
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
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-navy-950/95 shadow-2xl backdrop-blur-xl lg:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-3 font-display">
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
                    className={`rounded-lg px-3 py-3.5 text-sm font-semibold ${
                      active
                        ? "bg-cobalt-500/25 text-white"
                        : "text-white/65 hover:bg-white/8 hover:text-white"
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
      <div className={`brand-rail absolute inset-x-0 bottom-0 origin-left transition-transform duration-500 ${scrolled ? "scale-x-100" : "scale-x-0"}`} />
    </header>
  );
}
