import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Events",
  description: "See upcoming workshops, talks, and events hosted by the iACADEMY Library.",
};

export const revalidate = 0;

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: sorted } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: true });

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Workshops, talks, and library programs"
        description="Join our sessions designed to support research skills, career growth, and academic success."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          {sorted?.length === 0 && (
            <p className="text-center text-sm text-navy-700/60">
              No upcoming events right now — check back soon.
            </p>
          )}
          {sorted?.map((e) => (
            <div
              key={e.id}
              className="flex gap-5 rounded-xl border border-navy-900/8 bg-white p-6 shadow-card transition-all hover:shadow-cardHover"
            >
              <div className="flex-shrink-0 rounded-lg bg-navy-950 px-4 py-3 text-center">
                <p className="font-serif text-2xl font-semibold text-gold-400">
                  {new Date(e.event_date).getDate()}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
                  {new Date(e.event_date).toLocaleDateString("en-US", { month: "short" })}
                </p>
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-navy-950">
                  {e.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-gold-600">
                  {e.event_time} · {e.location}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-navy-700/70">
                  {e.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}