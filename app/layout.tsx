import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/site-settings";
import { getLibraryHours } from "@/lib/library-hours";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: `${settings.name} | ${settings.tagline}`,
      template: `%s | ${settings.name}`,
    },
    description: settings.description,
    metadataBase: new URL("https://iacademy-library.vercel.app"),
    openGraph: {
      title: settings.name,
      description: settings.description,
      type: "website",
    },
    verification: {
      google: "du1dH-xq54pFndAxIHEYOLblOZ5XRS_bGLyk1hJ4NoM",
    },
  };
}

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
    "@type": "Library",
    name: settings.name,
    description: settings.description,
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
    sameAs: [settings.social_facebook, settings.social_instagram, settings.social_tiktok].filter(Boolean),
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans antialiased flex min-h-screen flex-col overflow-x-hidden`}
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
      </body>
    </html>
  );
}