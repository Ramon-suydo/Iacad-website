import { Metadata } from "next";
import { getLibraryHours } from "@/lib/library-hours";
import HoursForm from "./HoursForm";

export const metadata: Metadata = {
  title: "Library Hours",
};

export const revalidate = 0;

export default async function StaffHoursPage() {
  const hours = await getLibraryHours();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">Library Hours</h1>
      <p className="mt-1 text-sm text-navy-700/60">
        Set independent hours for each day, for both the Main Library and Library Extension.
      </p>
      <div className="mt-8">
        <HoursForm hours={hours} />
      </div>
    </div>
  );
}