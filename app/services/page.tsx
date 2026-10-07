import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import ServicesExplorer from "@/components/ServicesExplorer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the academic support services offered by the iACADEMY Library.",
};

export const revalidate = 0;

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services, error } = await supabase
    .from("services")
    .select("id, name, description, icon")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Your learning comes first"
        description="From borrowing books to booking group study rooms, our services are built to help you focus on what matters."
      />

      <Section eyebrow="At your service" title="How can we help you today?">
        <ServicesExplorer services={services ?? []} unavailable={Boolean(error)} />
      </Section>

      <Section className="bg-navy-950">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 px-8 py-12 text-center sm:px-16">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Need help with a specific request?
          </h2>
          <p className="max-w-xl text-white/60">
            Reach out to our library staff directly for assistance with any of
            our services.
          </p>
          <Link
            href="/contact"
            className="rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Contact the Library
          </Link>
        </div>
      </Section>
    </>
  );
}
