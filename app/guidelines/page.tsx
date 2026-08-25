import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { guidelineSections } from "@/data/guidelines";

export const metadata: Metadata = {
  title: "Guidelines",
  description: "Review the policies and guidelines for using the iACADEMY Library.",
};

export default function GuidelinesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guidelines"
        title="Library policies and etiquette"
        description="Please review the following guidelines to help maintain a productive and respectful environment for everyone."
      />

      <Section>
        <div className="mx-auto max-w-4xl space-y-6">
          {guidelineSections.map((section, index) => (
            <Card key={section.slug} className="!p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy-950 font-serif text-sm font-semibold text-gold-400">
                  {index + 1}
                </span>
                <h2 className="font-serif text-xl font-semibold text-navy-950">
                  {section.title}
                </h2>
              </div>
              <ul className="mt-5 space-y-3 pl-11">
                {section.rules.map((rule) => (
                  <li
                    key={rule}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-700/80"
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
                    {rule}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-navy-950" center>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
            Questions about our policies?
          </h2>
          <p className="mt-3 text-white/60">
            Reach out to our staff for clarification on any library guideline.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Contact Us
          </Link>
        </div>
      </Section>
    </>
  );
}