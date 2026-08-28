import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";
import LibraryHoursTable from "@/components/LibraryHoursTable";
import { getSiteSettings } from "@/lib/site-settings";
import { getLibraryHours } from "@/lib/library-hours";

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

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method) => (
              <Card key={method.label} className="!p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-navy-950">
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
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-navy-700/50">
                      {method.label}
                    </p>
                    {method.href ? (
                      
                      <a  href={method.href}
                        className="mt-1 block text-sm font-medium text-navy-950 hover:text-gold-600 transition-colors"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-navy-950">
                        {method.value}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-3">
            <Card className="!p-7 h-full">
              <h2 className="font-serif text-lg font-semibold text-navy-950">Library Hours</h2>
              <div className="mt-4">
                <LibraryHoursTable main={hours.main} extension={hours.extension} />
              </div>

              <div className="mt-8 rounded-xl bg-navy-950 p-6">
                <h3 className="font-serif text-base font-semibold text-white">
                  Follow the Library
                </h3>
                <div className="mt-4 flex gap-3">
                  {settings.social_facebook && (
                    
                    <a  href={settings.social_facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors"
                    >
                      Facebook
                    </a>
                  )}
                  {settings.social_instagram && (
                    
                    <a  href={settings.social_instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors"
                    >
                      Instagram
                    </a>
                  )}
                  {settings.social_tiktok && (
                    
                    <a  href={settings.social_tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors"
                    >
                      TikTok
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="overflow-hidden rounded-xl border border-navy-900/8 shadow-card">
          <iframe
            title="iACADEMY Makati Campus Map"
            src="https://www.google.com/maps?q=iACADEMY+Nexus+7434+Yakal+St+Makati+City&output=embed"
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  );
}