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
        <h2 className="text-lg font-extrabold text-navy-950">General</h2>
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
        <h2 className="text-lg font-extrabold text-navy-950">Logo</h2>
        <div className="mt-4">
          {logoPreview && <img src={logoPreview} alt="Logo preview" className="mb-3 h-16 w-auto rounded-md bg-navy-950 p-2" />}
          <input type="file" name="logo" accept="image/*"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) setLogoPreview(URL.createObjectURL(f)); }}
            className="w-full text-sm text-navy-700/70 file:mr-3 file:rounded-md file:border-0 file:bg-navy-900/5 file:px-3 file:py-2 file:text-sm file:font-medium file:text-navy-950 hover:file:bg-navy-900/10" />
          <p className="mt-1 text-xs text-navy-700/50">Shown in the navbar and footer. Leave empty to keep the current logo.</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-navy-950">Hero Section</h2>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Primary button label</label>
              <input name="hero_primary_cta_label" required defaultValue={settings.hero_primary_cta_label}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Primary button link</label>
              <input name="hero_primary_cta_href" required defaultValue={settings.hero_primary_cta_href}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Secondary button label</label>
              <input name="hero_secondary_cta_label" required defaultValue={settings.hero_secondary_cta_label}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Secondary button link</label>
              <input name="hero_secondary_cta_href" required defaultValue={settings.hero_secondary_cta_href}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
            </div>
          </div>
          <div>
            {heroPreview && <img src={heroPreview} alt="Hero preview" className="mb-3 h-44 w-full rounded-md object-cover" />}
            <input type="file" name="hero_image" accept="image/*"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) setHeroPreview(URL.createObjectURL(f)); }}
              className="w-full text-sm text-navy-700/70 file:mr-3 file:rounded-md file:border-0 file:bg-navy-900/5 file:px-3 file:py-2 file:text-sm file:font-medium file:text-navy-950 hover:file:bg-navy-900/10" />
            <p className="mt-1 text-xs text-navy-700/50">First slide of the homepage hero carousel.</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-navy-950">Additional carousel images</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {([2, 3, 4, 5] as const).map((n) => (
                <div key={n}>
                  <label className="mb-1.5 block text-xs font-medium text-navy-700/70">Slide {n} path or URL</label>
                  <input name={`hero_image_${n}`} required defaultValue={settings[`hero_image_${n}`]}
                    className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-navy-950">Homepage Stats</h2>
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
        <h2 className="text-lg font-extrabold text-navy-950">Homepage Sections</h2>
        <p className="mt-1 text-xs text-navy-700/50">Edit the headings, supporting copy, and link labels shown below the homepage stats.</p>
        <div className="mt-4 space-y-5">
          {([
            { name: "Services", prefix: "home_services", hasEyebrow: true, hasDescription: true },
            { name: "Facilities", prefix: "home_facilities", hasEyebrow: true, hasDescription: true },
          ] as const).map((section) => (
            <div key={section.prefix} className="rounded-xl border border-navy-900/10 bg-white p-4 sm:p-5">
              <h3 className="text-sm font-extrabold text-navy-950">{section.name}</h3>
              <div className="mt-3 space-y-3">
                <input name={`${section.prefix}_eyebrow`} required defaultValue={settings[`${section.prefix}_eyebrow`]}
                  aria-label={`${section.name} eyebrow`}
                  className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                <input name={`${section.prefix}_title`} required defaultValue={settings[`${section.prefix}_title`]}
                  aria-label={`${section.name} title`}
                  className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                <textarea name={`${section.prefix}_description`} required rows={2} defaultValue={settings[`${section.prefix}_description`]}
                  aria-label={`${section.name} description`}
                  className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input name={`${section.prefix}_link_label`} required defaultValue={settings[`${section.prefix}_link_label`]}
                    aria-label={`${section.name} link label`}
                    className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                  <input name={`${section.prefix}_link_href`} required defaultValue={settings[`${section.prefix}_link_href`]}
                    aria-label={`${section.name} link destination`}
                    className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                </div>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {([
              { name: "Announcements", prefix: "home_announcements" },
              { name: "Events", prefix: "home_events" },
            ] as const).map((section) => (
              <div key={section.prefix} className="rounded-xl border border-navy-900/10 bg-white p-4 sm:p-5">
                <h3 className="text-sm font-extrabold text-navy-950">{section.name}</h3>
                <div className="mt-3 space-y-3">
                  <input name={`${section.prefix}_title`} required defaultValue={settings[`${section.prefix}_title`]}
                    aria-label={`${section.name} title`}
                    className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                  <input name={`${section.prefix}_link_label`} required defaultValue={settings[`${section.prefix}_link_label`]}
                    aria-label={`${section.name} link label`}
                    className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                  <input name={`${section.prefix}_link_href`} required defaultValue={settings[`${section.prefix}_link_href`]}
                    aria-label={`${section.name} link destination`}
                    className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-navy-900/10 bg-white p-4 sm:p-5">
            <h3 className="text-sm font-extrabold text-navy-950">Closing call to action</h3>
            <div className="mt-3 space-y-3">
              <input name="home_cta_title" required defaultValue={settings.home_cta_title} aria-label="CTA title"
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
              <textarea name="home_cta_description" required rows={2} defaultValue={settings.home_cta_description} aria-label="CTA description"
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input name="home_cta_button_label" required defaultValue={settings.home_cta_button_label} aria-label="CTA button label"
                  className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
                <input name="home_cta_button_href" required defaultValue={settings.home_cta_button_href} aria-label="CTA button link"
                  className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-navy-950">Contact & Location</h2>
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
        <h2 className="text-lg font-extrabold text-navy-950">Social Links</h2>
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
        Looking for operating hours? That&apos;s managed on its own &quot;Library Hours&quot; page in the staff nav.
      </p>

      <button type="submit" className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">
        Save Settings
      </button>
    </form>
  );
}
