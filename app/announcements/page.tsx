import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Stay updated with the latest news and announcements from the iACADEMY Library.",
};

const categoryStyles: Record<string, string> = {
  General: "bg-navy-900/10 text-navy-900",
  Maintenance: "bg-orange-500/10 text-orange-700",
  Academic: "bg-gold-500/10 text-gold-600",
  Event: "bg-emerald-500/10 text-emerald-700",
};

export const revalidate = 0;

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  const { data: sorted } = await supabase
    .from("announcements")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });

  return (
    <>
      <PageHeader
        eyebrow="Announcements"
        title="Library news and updates"
        description="Stay informed about schedule changes, new resources, and important notices from the library."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-5">
          {sorted?.length === 0 && (
            <p className="text-center text-sm text-navy-700/60">
              No announcements right now — check back soon.
            </p>
          )}
          {sorted?.map((a) => (
            <Card key={a.id} className="!p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    categoryStyles[a.category] ?? categoryStyles.General
                  }`}
                >
                  {a.category}
                </span>
                <span className="text-xs text-navy-700/50">
                  {new Date(a.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className="mt-3 font-serif text-xl font-semibold text-navy-950">
                {a.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                {a.summary}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}