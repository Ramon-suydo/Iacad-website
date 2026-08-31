import { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import SettingsForm from "./SettingsForm";

export const metadata: Metadata = {
  title: "Site Settings",
};

export const revalidate = 0;

export default async function StaffSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">Site Settings</h1>
      <p className="mt-1 text-sm text-navy-700/60">
        Sitewide info shown across the navbar, footer, homepage, about, and contact pages.
      </p>
      <div className="mt-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
