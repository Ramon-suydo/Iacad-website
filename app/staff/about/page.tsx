import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AboutForm from "./AboutForm";

export const metadata: Metadata = {
  title: "About Page Content",
};

export const revalidate = 0;

export default async function StaffAboutPage() {
  const supabase = await createClient();
  const { data: content } = await supabase.from("about_content").select("*").limit(1).single();

  if (!content) {
    return <p className="text-sm text-navy-700/60">About content not found. Check the Supabase table was seeded.</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">About Page Content</h1>
      <p className="mt-1 text-sm text-navy-700/60">
         Edit the mission statement and value cards shown on the public About page.
      </p>
      <div className="mt-8">
        <AboutForm content={content} />
      </div>
    </div>
  );
}