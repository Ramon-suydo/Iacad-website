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
  description: "Learn about the mission, vision, and history of the iACADEMY Library.",
};

export const revalidate = 0;

function paragraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const hours = await getLibraryHours();
  const supabase = await createClient();
  const { data: about } = await supabase.from("about_content").select("*").limit(1).single();

  const values = about
    ? [
        { title: about.value_1_title, description: about.value_1_description },
        { title: about.value_2_title, description: about.value_2_description },
        { title: about.value_3_title, description: about.value_3_description },
        { title: about.value_4_title, description: about.value_4_description },
      ]
    : [];

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Supporting iACADEMY's academic community"
        description="The iACADEMY Library is more than a collection of books — it's a hub for research, collaboration, and creative growth."
      />

      <Section
        eyebrow="Our Mission"
        title="Empowering learning through access and innovation"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-5 text-navy-700/80 leading-relaxed">
            {paragraphs(about?.mission_left ?? "").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="space-y-5 text-navy-700/80 leading-relaxed">
            {paragraphs(about?.mission_right ?? "").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section
        className="bg-navy-950"
        eyebrow="What We Value"
        title="The principles that guide us"
        center
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-white/10 bg-navy-900 p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-gold-400">
                {value.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                {value.description}
              </p>
            </div>
          ))}
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