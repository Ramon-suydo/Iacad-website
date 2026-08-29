import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Guidelines",
  description: "Review the policies and guidelines for using the iACADEMY Library.",
};

export const revalidate = 0;

export default async function GuidelinesPage() {
  const supabase = await createClient();
  const { data: guidelineSections } = await supabase
    .from("guidelines")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <>
      <PageHeader
        eyebrow="Guidelines"
        title="Library policies and etiquette"
        description="Please review the following guidelines to help maintain a productive and respectful environment for everyone."
      />

      <Section>
        <div className="mx-auto max-w-4xl space-y-6">
          {guidelineSections?.map((section) => (
            <Card key={section.id} className="!p-7">
              <h2 className="font-serif text-xl font-semibold text-navy-950">
                {section.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {section.rules?.map((rule: string) => (
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
              {section.note && (
                <p className="mt-5 border-t border-navy-900/8 pt-5 text-xs italic leading-relaxed text-navy-700/50">
                  {section.note}
                </p>
              )}
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