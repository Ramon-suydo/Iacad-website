import Image from "next/image";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import RevealGroup from "@/components/RevealGroup";
import Section from "@/components/Section";

const newspapers = [
  { name: "Philippine Daily Inquirer", domain: "inquirer.net", logo: "inquirer.svg" },
  { name: "Manila Bulletin", domain: "mb.com.ph", logo: "mb.png" },
  { name: "The Philippine Star", domain: "philstar.com", logo: "philstar.svg" },
  { name: "The Manila Times", domain: "manilatimes.net", logo: "manilatimes.png" },
  { name: "Manila Standard", domain: "manilastandard.net", logo: "manilastandard.svg" },
  { name: "BusinessMirror", domain: "businessmirror.com.ph", logo: "businessmirror.png" },
  { name: "BusinessWorld", domain: "bworldonline.com", logo: "bworldonline.png" },
  { name: "Daily Tribune", domain: "tribune.net.ph", logo: "tribune.png" },
  { name: "Malaya Business Insight", domain: "malaya.com.ph", logo: "malaya.png" },
  { name: "SunStar", domain: "sunstar.com.ph", logo: "sunstar.svg" },
];

export default function NewsHub() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="News Hub"
        description="Access trusted news websites. Stay informed, stay connected."
      />
      <Section>
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newspapers.map((paper) => (
            <a
              key={paper.domain}
              href={`https://${paper.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${paper.name} (opens in a new tab)`}
              className="group block min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt-500"
            >
              <Card className="flex h-full flex-col group-focus-visible:border-cobalt-bright/30">
                <div className={`relative h-28 w-full overflow-hidden rounded-xl border border-navy-900/8 transition-colors duration-300 group-hover:border-cobalt-bright/25 ${paper.domain === "bworldonline.com" ? "bg-gradient-to-br from-navy-900 to-navy-800" : "bg-gradient-to-br from-white via-white to-cobalt-500/5"}`}>
                  <Image
                    src={`/images/news/${paper.logo}`}
                    alt={`${paper.name} logo`}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 42vw, 85vw"
                    className="object-contain p-5"
                  />
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-navy-950">{paper.name}</h2>
                <p className="mt-2 break-all text-sm leading-relaxed text-navy-700/70">{paper.domain}</p>
                <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-semibold text-cobalt-500">
                  <span className="group-hover:underline">Visit website</span>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                  </svg>
                </span>
              </Card>
            </a>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
