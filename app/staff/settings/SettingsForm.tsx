"use client";

import { useState } from "react";
import { saveSiteSettings } from "./actions";
import type { SiteSettings } from "@/lib/site-settings";

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [heroPreview, setHeroPreview] = useState<string | null>(settings.hero_image);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo_url);

  return (
    <form action={saveSiteSettings} className="max-w-2xl space-y-8">
      <input type="hidden" name="id" value={settings.id} />
      <input type="hidden" name="current_hero_image" value={settings.hero_image ?? ""} />
      <input type="hidden" name="current_logo_url" value={settings.logo_url ?? ""} />

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">General</h2>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Full site name</label>
              <input name="name" required defaultValue={settings.name}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Short name</label>
              <input name="short_name" required defaultValue={settings.short_name}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">Tagline</label>
            <input name="tagline" required defaultValue={settings.tagline}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">Homepage description</label>
            <textarea name="description" required rows={3} defaultValue={settings.description}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">Logo</h2>
        <div className="mt-4">
          {logoPreview && <img src={logoPreview} alt="Logo preview" className="mb-3 h-16 w-auto rounded-md bg-navy-950 p-2" />}
          <input type="file" name="logo" accept="image/*"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) setLogoPreview(URL.createObjectURL(f)); }}
            className="w-full text-sm text-navy-700/70 file:mr-3 file:rounded-md file:border-0 file:bg-navy-900/5 file:px-3 file:py-2 file:text-sm file:font-medium file:text-navy-950 hover:file:bg-navy-900/10" />
          <p className="mt-1 text-xs text-navy-700/50">Shown in the navbar and footer. Leave empty to keep the current logo.</p>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">Hero Section</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">Eyebrow text</label>
            <input name="hero_eyebrow" required defaultValue={settings.hero_eyebrow}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">Headline</label>
            <textarea name="hero_headline" required rows={2} defaultValue={settings.hero_headline}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            {heroPreview && <img src={heroPreview} alt="Hero preview" className="mb-3 h-44 w-full rounded-md object-cover" />}
            <input type="file" name="hero_image" accept="image/*"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) setHeroPreview(URL.createObjectURL(f)); }}
              className="w-full text-sm text-navy-700/70 file:mr-3 file:rounded-md file:border-0 file:bg-navy-900/5 file:px-3 file:py-2 file:text-sm file:font-medium file:text-navy-950 hover:file:bg-navy-900/10" />
            <p className="mt-1 text-xs text-navy-700/50">First slide of the homepage hero carousel.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">Homepage Stats</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} className="rounded-lg border border-navy-900/10 p-4">
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Stat {n} value</label>
              <input name={`stat_${n}_value`} required defaultValue={settings[`stat_${n}_value` as keyof SiteSettings] as string}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
              <label className="mb-1.5 mt-3 block text-sm font-medium text-navy-950">Stat {n} label</label>
              <input name={`stat_${n}_label`} required defaultValue={settings[`stat_${n}_label` as keyof SiteSettings] as string}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">Contact & Location</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">Address</label>
            <input name="address" required defaultValue={settings.address}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Email</label>
              <input name="email" type="email" required defaultValue={settings.email}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Phone</label>
              <input name="phone" required defaultValue={settings.phone}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">Social Links</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">Facebook URL</label>
            <input name="social_facebook" defaultValue={settings.social_facebook ?? ""}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">Instagram URL</label>
            <input name="social_instagram" defaultValue={settings.social_instagram ?? ""}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">TikTok URL</label>
            <input name="social_tiktok" defaultValue={settings.social_tiktok ?? ""}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
          </div>
        </div>
      </div>

      <p className="text-xs text-navy-700/50">
        Looking for operating hours? That's managed on its own "Library Hours" page in the staff nav.
      </p>

      <button type="submit" className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">
        Save Settings
      </button>
    </form>
  );
}