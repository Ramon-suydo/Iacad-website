import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import SafeImage from "@/components/SafeImage";
import HeroCarousel, { type HeroSlide } from "@/components/HeroCarousel";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { facilities } from "@/data/facilities";
import { events } from "@/data/events";
import { createClient } from "@/lib/supabase/server";

const heroSlides: HeroSlide[] = [
  { src: site.heroImage, alt: "iACADEMY Library Reading Hall" },
  { src: "/images/library/facilities/UG LIBRARY.jpg", alt: "UG Library" },
  { src: "/images/library/facilities/UG-Research Hub.jpg", alt: "UG Research Hub" },
  { src: "/images/library/facilities/SHS Library.jpg", alt: "SHS Library" },
  { src: "/images/library/facilities/UG-Discussion Room 1.jpg", alt: "UG Discussion Room" },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: latestAnnouncements } = await supabase
    .from("announcements")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false })
    .limit(3);

  const upcomingEvents = events.slice(0, 3);
  const featuredFacilities = facilities.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950">
        <HeroCarousel slides={heroSlides} intervalMs={6000} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.6) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

        <Container className="relative py-28 sm:py-36">
          <div className="max-w-2xl animate-fade-up">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              iACADEMY Library — Makati Campus
            </span>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              A modern space for{" "}
              <span className="text-gold-400">focused learning</span> and discovery.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {site.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/facilities"
                className="rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
              >
                Explore Facilities
              </Link>
              <Link
                href="/services"
                className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Services
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <div className="border-b border-navy-900/8 bg-white">
        <Container className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
          {[
            { label: "Study Seats", value: "300+" },
            { label: "Facilities", value: "15" },
            { label: "Weekly Hours", value: "70+" },
            { label: "Campus Libraries", value: "2" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl font-semibold text-navy-950">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-navy-700/60">{stat.label}</p>
            </div>
          ))}
        </Container>
      </div>

      <Section
        eyebrow="What We Offer"
        title="Services built around your academic needs"
        description="From research support to collaborative spaces, the library provides the tools to help you succeed."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <Card key={service.slug}>
              <h3 className="font-serif text-lg font-semibold text-navy-950">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
          >
            View all services →
          </Link>
        </div>
      </Section>

      <Section
        className="bg-navy-950"
        dark
        eyebrow="Our Spaces"
        title="Facilities designed for every study style"
        description="Explore reading halls, discussion rooms, and quiet rooms across our UG and SHS libraries."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredFacilities.map((facility) => (
            <div
              key={facility.slug}
              className="group overflow-hidden rounded-xl border border-white/10 bg-navy-900"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-800">
                <SafeImage
                  src={facility.image}
                  alt={facility.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-400">
                  {facility.campus} Library
                </span>
                <h3 className="mt-1 font-serif text-lg font-semibold text-white">
                  {facility.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/facilities"
            className="text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
          >
            View all facilities →
          </Link>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-navy-950">
                Latest Announcements
              </h2>
              <Link
                href="/announcements"
                className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="space-y-5">
              {(latestAnnouncements ?? []).map((a) => (
                <Card key={a.id} className="!p-5">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-600">
                      {a.category}
                    </span>
                    <span className="text-xs text-navy-700/50">
                      {new Date(a.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-base font-semibold text-navy-950">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-700/70">
                    {a.summary}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-navy-950">
                Upcoming Events
              </h2>
              <Link
                href="/events"
                className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="space-y-5">
              {upcomingEvents.map((e) => (
                <Card key={e.slug} className="!p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-navy-950 px-3 py-2 text-center">
                      <p className="font-serif text-lg font-semibold text-gold-400">
                        {new Date(e.date).getDate()}
                      </p>
                      <p className="text-[10px] font-semibold uppercase text-white/60">
                        {new Date(e.date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-navy-950">
                        {e.title}
                      </h3>
                      <p className="mt-1 text-xs text-navy-700/50">
                        {e.time} · {e.location}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-navy-900">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-navy-950 px-8 py-14 text-center sm:px-16">
          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Visit the Library Today
          </h2>
          <p className="max-w-xl text-white/60">
            Explore our resources, book a study space, or reach out to our team for assistance.
          </p>
          <Link
            href="/contact"
            className="rounded-md bg-gold-500 px-7 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Get in Touch
          </Link>
        </div>
      </Section>
    </>
  );
}