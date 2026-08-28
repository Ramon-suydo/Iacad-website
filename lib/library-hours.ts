import { createClient } from "@/lib/supabase/server";

export type DayHours = {
  id: string;
  day_index: number;
  day_name: string;
  hours_text: string;
  is_closed: boolean;
};

export type LibraryHoursData = {
  main: DayHours[];
  extension: DayHours[];
};

export async function getLibraryHours(): Promise<LibraryHoursData> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("library_hours")
    .select("*")
    .order("day_index", { ascending: true });

  const rows = data ?? [];
  return {
    main: rows.filter((r) => r.library === "main"),
    extension: rows.filter((r) => r.library === "extension"),
  };
}