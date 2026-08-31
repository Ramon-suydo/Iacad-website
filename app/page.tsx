import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Card from "@/components/Card";
import SafeImage from "@/components/SafeImage";
import HeroCarousel, { type HeroSlide } from "@/components/HeroCarousel";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/site-settings";
import RevealGroup from "@/components/RevealGroup";
import { getFacilityAccent } from "@/lib/facility-accent";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = await createClient();
  const settings = await getSiteSettings();

  const { data: latestAnnouncements } = await supabase
    .from("announcements")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false })
    .limit(3);

  const { data: upcomingEvents } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: true })
    .limit(3);

  const { data: featuredFacilities } = await supabase
    .from("facilities")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .limit(3);

  const { data: featuredServices } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .limit(3);

  const heroSlides: HeroSlide[] = [
    { src: settings.hero_image ?? "/images/library/facilities/main-library-reading-hall.jpg", alt: "iACADEMY Library Reading Hall" },
    { src: settings.hero_image_2, alt: "UG Library" },
    { src: settings.hero_image_3, alt: "UG Research Hub" },
    { src: settings.hero_image_4, alt: "SHS Library" },
    { src: settings.hero_image_5, alt: "UG Discussion Room" },
  ];

  return (
    <>
      <section className="relative min-h-[620px] overflow-hidden bg-navy-950">
        <HeroCarousel slides={heroSlides} intervalMs={6000} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.6) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cobalt-bright/20 blur-3xl" />

        <Container className="relative flex min-h-[620px] items-end py-20 sm:py-24">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-white min-[420px]:text-4xl sm:text-5xl lg:text-6xl">
              {settings.hero_headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {settings.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-9 sm:gap-4">
              <Link
                href={settings.hero_primary_cta_href}
                className="inline-flex justify-center rounded-lg bg-gold-500 px-6 py-3 text-sm font-bold text-navy-950 shadow-[0_10px_24px_-10px_rgba(212,175,55,.8)] hover:-translate-y-0.5 hover:bg-gold-400"
              >
                {settings.hero_primary_cta_label}
              </Link>
              <Link
                href={settings.hero_secondary_cta_href}
                className="inline-flex justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-bold text-white hover:-translate-y-0.5 hover:bg-white/10"
              >
                {settings.hero_secondary_cta_label}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <div className="relative border-b border-navy-900/8 bg-white">
        <div className="brand-rail absolute inset-x-0 top-0" />
        <Container className="grid grid-cols-2 gap-x-4 gap-y-7 py-9 sm:grid-cols-4 sm:gap-8 sm:py-11">
          {[
            { label: settings.stat_1_label, value: settings.stat_1_value },
            { label: settings.stat_2_label, value: settings.stat_2_value },
            { label: settings.stat_3_label, value: settings.stat_3_value },
            { label: settings.stat_4_label, value: settings.stat_4_value },
          ].map((stat) => (
            <div key={stat.label} className="border-l-2 border-cobalt-500/20 pl-4">
              <p className="font-serif text-2xl font-semibold text-navy-950 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-navy-700/60">{stat.label}</p>
            </div>
          ))}
        </Container>
      </div>

      <Section
        eyebrow={settings.home_services_eyebrow}
        title={settings.home_services_title}
        description={settings.home_services_description}
      >
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(featuredServices ?? []).map((service) => (
            <Card key={service.id}>
              <div className="mb-7 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cobalt-bright via-cobalt-500 to-navy-800 font-display text-sm font-black text-white shadow-[0_12px_25px_-12px_rgba(59,91,255,.8)]">
                  {service.name.slice(0, 1)}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-navy-950">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                {service.description}
              </p>
            </Card>
          ))}
        </RevealGroup>
        <div className="mt-10 text-center">
          <Link
            href={settings.home_services_link_href}
            className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
          >
            {settings.home_services_link_label}
          </Link>
        </div>
      </Section>

      <Section
        className="bg-navy-950"
        dark
        eyebrow={settings.home_facilities_eyebrow}
        title={settings.home_facilities_title}
        description={settings.home_facilities_description}
      >
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(featuredFacilities ?? []).map((facility, index) => {
            const accent = getFacilityAccent(facility.name, facility.description, index);
            return (
            <div
              key={facility.id}
              className={`group h-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900 transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1.12)] hover:-translate-y-1.5 hover:border-cobalt-bright/40 active:translate-y-0 active:scale-[.99] ${accent.bloom}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-800">
                {facility.image_url && (
                  <SafeImage
                    src={facility.image_url}
                    alt={facility.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] motion-reduce:transform-none"
                  />
                )}
                <span className={`absolute right-3 top-3 rotate-2 rounded-md px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.08em] shadow-lg transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105 motion-reduce:transform-none ${accent.chip}`}>
                  {accent.label}
                </span>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-400">
                  {facility.campus} Library
                </span>
                <h3 className="mt-1 text-lg font-extrabold text-white">
                  {facility.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {facility.description}
                </p>
              </div>
            </div>
            );
          })}
        </RevealGroup>
        <div className="mt-10 text-center">
          <Link
            href={settings.home_facilities_link_href}
            className="text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
          >
            {settings.home_facilities_link_label}
          </Link>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold text-navy-950">
                {settings.home_announcements_title}
              </h2>
              <Link
                href={settings.home_announcements_link_href}
                className="shrink-0 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
              >
                {settings.home_announcements_link_label}
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
                  <h3 className="mt-3 text-base font-extrabold text-navy-950">
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
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold text-navy-950">
                {settings.home_events_title}
              </h2>
              <Link
                href={settings.home_events_link_href}
                className="shrink-0 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
              >
                {settings.home_events_link_label}
              </Link>
            </div>
            <div className="space-y-5">
              {(upcomingEvents ?? []).map((e) => (
                <Card key={e.id} className="!p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-navy-950 px-3 py-2 text-center">
                      <p className="font-serif text-lg font-semibold text-gold-400">
                        {new Date(e.event_date).getDate()}
                      </p>
                      <p className="text-[10px] font-semibold uppercase text-white/60">
                        {new Date(e.event_date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-navy-950">
                        {e.title}
                      </h3>
                      <p className="mt-1 text-xs text-navy-700/50">
                        {e.event_time} · {e.location}
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
        <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-navy-950 px-5 py-11 text-center sm:px-16 sm:py-14">
          <div className="dot-grid absolute inset-0 opacity-20" />
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {settings.home_cta_title}
          </h2>
          <p className="max-w-xl text-white/60">
            {settings.home_cta_description}
          </p>
          <Link
            href={settings.home_cta_button_href?.trim() || "/contact"}
            className="rounded-lg bg-gold-500 px-7 py-3 text-sm font-bold text-navy-950 shadow-[0_10px_24px_-10px_rgba(212,175,55,.8)] hover:-translate-y-0.5 hover:bg-gold-400"
          >
            {settings.home_cta_button_label}
          </Link>
        </div>
      </Section>
    </>
  );
}
