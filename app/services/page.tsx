import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the academic support services offered by the iACADEMY Library.",
};

const iconPaths: Record<string, string> = {
  book: "M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5v-18ZM4 19.5V4.5",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM21 21l-4.35-4.35",
  printer: "M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6v-7Z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2",
  graduation:
    "M22 10 12 5 2 10l10 5 10-5ZM6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Support designed for every stage of your work"
        description="From borrowing books to booking group study rooms, our services are built to help you focus on what matters."
      />

      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.slug}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-950">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e8c874"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={iconPaths[service.icon]} />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-navy-950">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-navy-950">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 px-8 py-12 text-center sm:px-16">
          <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
            Need help with a specific request?
          </h2>
          <p className="max-w-xl text-white/60">
            Reach out to our library staff directly for assistance with any of
            our services.
          </p>
          <Link
            href="/contact"
            className="rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Contact the Library
          </Link>
        </div>
      </Section>
    </>
  );
}