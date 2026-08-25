import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { facilitiesByCampus, campusLabels, type Campus } from "@/data/facilities";
import SafeImage from "@/components/SafeImage";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Explore the UG and SHS library facilities at iACADEMY's Makati campus.",
};

function FacilityGrid({ campus }: { campus: Campus }) {
  const items = facilitiesByCampus(campus);
  const label = campusLabels[campus];

  return (
    <Section
      eyebrow={campus === "UG" ? "Undergraduate" : "Senior High School"}
      title={label.title}
      description={label.description}
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((facility) => (
          <div
            key={facility.slug}
            className="group overflow-hidden rounded-xl border border-navy-900/8 bg-white shadow-card transition-all hover:shadow-cardHover"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
              <SafeImage
              src={facility.image}
            alt={facility.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-lg font-semibold text-navy-950">
                {facility.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                {facility.description}
              </p>
              {facility.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {facility.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-navy-900/5 px-2.5 py-1 text-xs font-medium text-navy-700/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Facilities"
        title="Spaces built for how you study"
        description="From silent reading rooms to collaborative discussion spaces, discover the facilities across our UG and SHS libraries."
      />
      <FacilityGrid campus="UG" />
      <div className="border-t border-navy-900/8" />
      <FacilityGrid campus="SHS" />
    </>
  );
}