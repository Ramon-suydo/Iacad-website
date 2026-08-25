import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { resourceCategories } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Browse the print, digital, and archival resources available at the iACADEMY Library.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Materials that support your research and study"
        description="From print collections to industry-aligned references, explore what's available across the library."
      />

      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {resourceCategories.map((category) => (
            <Card key={category.slug} className="!p-7">
              <h3 className="font-serif text-xl font-semibold text-navy-950">
                {category.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                {category.description}
              </p>
              <ul className="mt-5 space-y-2.5">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-navy-700/80"
                  >
                    <svg
                      className="mt-0.5 flex-shrink-0"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-navy-950" eyebrow="Need Help" title="Can't find what you're looking for?" center>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-white/60">
            Our library staff can help you locate specific materials or point
            you toward the right resource category for your research.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Ask the Library
          </Link>
        </div>
      </Section>
    </>
  );
}