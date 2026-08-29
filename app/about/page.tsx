import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";
import LibraryHoursTable from "@/components/LibraryHoursTable";
import { getSiteSettings } from "@/lib/site-settings";
import { getLibraryHours } from "@/lib/library-hours";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the mission, vision, and goals of the iACADEMY Library.",
};

export const revalidate = 0;

function paragraphs(text: string) {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const hours = await getLibraryHours();
  const supabase = await createClient();
  const { data: about } = await supabase.from("about_content").select("*").limit(1).single();

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Supporting iACADEMY's academic community"
        description="The iACADEMY Library exists to support the academic, professional, and personal growth of its community."
      />

      <Section eyebrow="Introduction" title="Who we are">
        <div className="mx-auto max-w-3xl space-y-5 text-navy-700/80 leading-relaxed">
          {paragraphs(about?.introduction ?? "").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section className="bg-navy-950">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-navy-900 p-7">
            <h3 className="font-serif text-lg font-semibold text-gold-400">Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{about?.mission}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-navy-900 p-7">
            <h3 className="font-serif text-lg font-semibold text-gold-400">Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{about?.vision}</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Goals & Objectives" title="What we strive to accomplish">
        <div className="mx-auto max-w-3xl">
          <Card className="!p-0 overflow-hidden">
            <ul className="divide-y divide-navy-900/8">
              {about?.goals?.map((goal: string, i: number) => (
                <li key={i} className="flex items-start gap-4 px-6 py-4 text-sm leading-relaxed text-navy-700/80">
                  <span className="mt-0.5 shrink-0 font-serif text-sm font-semibold text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {goal}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Visit Us" title="Where to find us">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card className="!p-6">
            <h3 className="font-serif text-base font-semibold text-navy-950">Location</h3>
            <p className="mt-1 text-sm leading-relaxed text-navy-700/70">{settings.address}</p>
          </Card>
          <LibraryHoursTable main={hours.main} extension={hours.extension} />
        </div>
      </Section>
    </>
  );
}