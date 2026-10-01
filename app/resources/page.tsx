import { Metadata } from "next";
import NewsHub from "@/components/NewsHub";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access trusted news websites through the iACADEMY Library News Hub. Stay informed, stay connected.",
};

export default function ResourcesPage() {
  return <NewsHub />;
}
