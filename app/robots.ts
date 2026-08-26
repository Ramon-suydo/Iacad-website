import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/staff",
    },
    sitemap: "https://iacademy-library.vercel.app/sitemap.xml",
  };
}