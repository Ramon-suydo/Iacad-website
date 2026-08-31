import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";
import LibraryHoursTable from "@/components/LibraryHoursTable";
import { getSiteSettings } from "@/lib/site-settings";
import { getLibraryHours } from "@/lib/library-hours";
import RevealGroup from "@/components/RevealGroup";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the iACADEMY Library for inquiries, assistance, or feedback.",
};

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const hours = await getLibraryHours();

  const contactMethods = [
    {
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
      icon: "M4 4h16v16H4V4Zm0 0 8 8 8-8",
    },
    {
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone}`,
      icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.902.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.908.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z",
    },
    {
      label: "Address",
      value: settings.address,
      icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We're here to help"
        description="Reach out to the iACADEMY Library team for inquiries, feedback, or assistance with any service."
      />

      <Section className="bg-[linear-gradient(180deg,#fff_0%,#f7f5f0_100%)]">
        <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-3" staggerMs={70}>
            {contactMethods.map((method) => (
              <Card key={method.label} className="!p-5 sm:!p-6">
                <div className="flex h-full items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cobalt-bright via-cobalt-500 to-navy-800 shadow-[0_12px_26px_-14px_rgba(91,127,255,.9)]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e8c874"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={method.icon} />
                    </svg>
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-cobalt-500/75">
                      {method.label}
                    </p>
                    {method.href ? (
                      
                      <a href={method.href}
                        className="mt-1.5 block break-words text-sm font-semibold leading-relaxed text-navy-950 hover:text-cobalt-500"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-sm font-semibold leading-relaxed text-navy-950">
                        {method.value}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
        </RevealGroup>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,.75fr)]">
          <Card className="!p-5 sm:!p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-pop-cyan shadow-[0_0_14px_rgba(45,212,220,.8)]" />
                <h2 className="text-lg font-extrabold text-navy-950">Library Hours</h2>
              </div>
              <div className="overflow-x-auto">
                <LibraryHoursTable main={hours.main} extension={hours.extension} />
              </div>
          </Card>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950 p-6 shadow-[0_22px_48px_-28px_rgba(7,11,31,.8)] sm:p-7">
            <div className="dot-grid absolute inset-0 opacity-20" />
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cobalt-bright/20 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gold-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8a3 3 0 1 0-3-3M6 14a3 3 0 1 0 0 6M18 14a3 3 0 1 0 0 6M8.6 16.5l6.8 0M8.6 7.5l6.8-1.5M8.6 18.5l6.8 0" />
                  </svg>
                </span>
                <h3 className="text-xl font-extrabold text-white">Follow the Library</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">Stay connected through our official social channels.</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                  {settings.social_facebook && (
                    <a href={settings.social_facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:-translate-y-0.5 hover:border-cobalt-bright/50 hover:bg-cobalt-500/20 hover:text-white"
                    >
                      Facebook
                    </a>
                  )}
                  {settings.social_instagram && (
                    <a href={settings.social_instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:-translate-y-0.5 hover:border-cobalt-bright/50 hover:bg-cobalt-500/20 hover:text-white"
                    >
                      Instagram
                    </a>
                  )}
                  {settings.social_tiktok && (
                    <a href={settings.social_tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:-translate-y-0.5 hover:border-cobalt-bright/50 hover:bg-cobalt-500/20 hover:text-white"
                    >
                      TikTok
                    </a>
                  )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="!pt-0 bg-paper">
        <div className="overflow-hidden rounded-2xl border border-navy-900/8 bg-white p-2 shadow-card">
          <iframe
            title="iACADEMY Makati Campus Map"
            src="https://www.google.com/maps?q=iACADEMY+Nexus+7434+Yakal+St+Makati+City&output=embed"
            width="100%"
            height="380"
            className="block rounded-xl"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  );
}
