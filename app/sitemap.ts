import { MetadataRoute } from "next";
import { navItems } from "@/data/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://iacademy-library.vercel.app";

  return navItems.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}