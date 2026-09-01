import type { Metadata, Viewport } from "next";
import { Montserrat, Roboto, Fraunces } from "next/font/google";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/site-settings";
import { getLibraryHours } from "@/lib/library-hours";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://iacademy-library.vercel.app";
const SITE_NAME = "iACADEMY Library";
const SITE_TITLE = "iACADEMY Library | Knowledge. Access. Excellence.";
const SITE_DESCRIPTION =
  "The official library portal of iACADEMY - informational hub for resources, services, facilities, and academic support across the Undergraduate programs.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | iACADEMY Library",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: "/favicon.png?v=3", type: "image/png", sizes: "512x512" },
      { url: "/icon.png?v=3", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.png?v=3",
    apple: [{ url: "/apple-icon.png?v=3", type: "image/png", sizes: "512x512" }],
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: "The official library portal of iACADEMY.",
    url: SITE_URL,
    type: "website",
  },
  verification: {
    google: "du1dH-xq54pFndAxIHEYOLblOZ5XRS_bGLyk1hJ4NoM",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a1128",
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const hours = await getLibraryHours();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isStaffRoute = pathname.startsWith("/staff");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [settings.social_facebook, settings.social_instagram, settings.social_tiktok].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        alternateName: ["iACADEMY Library Makati", "iacademy-library.vercel.app"],
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Library",
        "@id": `${SITE_URL}/#library`,
        url: `${SITE_URL}/`,
        name: settings.name,
        description: settings.description,
        logo: `${SITE_URL}/logo.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address,
        },
        email: settings.email,
        telephone: settings.phone,
        openingHoursSpecification: hours.main.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.day_name,
          description: h.hours_text,
        })),
      },
    ],
  };
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
      </head>
      <body
        className={`${roboto.variable} ${montserrat.variable} ${fraunces.variable} font-sans antialiased flex min-h-screen flex-col overflow-x-hidden`}
      >
        <a href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950"
        >
          Skip to content
        </a>
        {!isStaffRoute && <Navbar shortName={settings.short_name} logoUrl={settings.logo_url} />}
        <main id="main-content" className="flex-1">
          {children}
        </main>
        {!isStaffRoute && <Footer settings={settings} />}
        <Analytics />
      </body>
    </html>
  );
}