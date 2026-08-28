import Link from "next/link";
import { navItems } from "@/data/nav";
import Container from "./Container";
import type { SiteSettings } from "@/lib/site-settings";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white/80">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-500 text-navy-950 font-serif font-semibold text-lg">
                i
              </span>
              <span className="font-serif text-lg font-semibold text-white">
                {settings.short_name}
                <span className="ml-1.5 font-sans text-xs font-medium uppercase tracking-wider text-gold-400">
                  Library
                </span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              {settings.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              More
            </h3>
            <ul className="space-y-2.5">
              {navItems.slice(5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>{settings.address}</li>
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-gold-400 transition-colors">
                  {settings.email}
                </a>
              </li>
              <li>
                <a href={`tel:${settings.phone}`} className="hover:text-gold-400 transition-colors">
                  {settings.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {year} {settings.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Informational site — not affiliated with library system access.
          </p>
        </div>
      </Container>
    </footer>
  );
}