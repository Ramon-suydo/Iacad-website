import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the mission, vision, and history of the iACADEMY Library.",
};

const values = [
  {
    title: "Academic Excellence",
    description:
      "We curate resources and spaces that directly support the rigor and creativity of iACADEMY's programs.",
  },
  {
    title: "Accessibility",
    description:
      "Our facilities and services are designed to be open, welcoming, and easy to navigate for every student.",
  },
  {
    title: "Innovation",
    description:
      "From digital labs to collaborative pods, we continuously evolve to match modern learning styles.",
  },
  {
    title: "Community",
    description:
      "The library serves as a shared space where students, faculty, and staff connect and collaborate.",
  },
];

export default function AboutPage() {
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
            <p>
              The iACADEMY Library exists to provide students, faculty, and staff
              with the resources, spaces, and support needed to thrive
              academically. We serve as the central knowledge hub for the
              institution&apos;s specialized programs in design, technology,
              business, and the arts.
            </p>
            <p>
              Our facilities are built to accommodate a range of learning
              styles — from focused individual study to collaborative team
              projects — all within a modern, welcoming environment.
            </p>
          </div>
          <div className="space-y-5 text-navy-700/80 leading-relaxed">
            <p>
              We are committed to staying aligned with the evolving needs of
              iACADEMY&apos;s creative and professional programs, continuously
              updating our resources and technology to match industry
              standards.
            </p>
            <p>
              Whether you&apos;re conducting research, preparing a thesis, or
              simply looking for a quiet place to read, the library is here to
              support your academic journey.
            </p>
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
        <Card className="!p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-serif text-base font-semibold text-navy-950">
                Location
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                {site.address}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-navy-950">
                Operating Hours
              </h3>
              <ul className="mt-2 space-y-1.5">
                {site.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between text-sm text-navy-700/70"
                  >
                    <span>{h.day}</span>
                    <span className="font-medium text-navy-950">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}