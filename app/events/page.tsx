import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "See upcoming workshops, talks, and events hosted by the iACADEMY Library.",
};

export default function EventsPage() {
  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Workshops, talks, and library programs"
        description="Join our sessions designed to support research skills, career growth, and academic success."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          {sorted.map((e) => (
            <div
              key={e.slug}
              className="flex gap-5 rounded-xl border border-navy-900/8 bg-white p-6 shadow-card transition-all hover:shadow-cardHover"
            >
              <div className="flex-shrink-0 rounded-lg bg-navy-950 px-4 py-3 text-center">
                <p className="font-serif text-2xl font-semibold text-gold-400">
                  {new Date(e.date).getDate()}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
                  {new Date(e.date).toLocaleDateString("en-US", { month: "short" })}
                </p>
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-navy-950">
                  {e.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-gold-600">
                  {e.time} · {e.location}
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