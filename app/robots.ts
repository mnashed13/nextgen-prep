import { MetadataRoute } from "next";
import { env } from "@/lib/config/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/terms", "/privacy", "/refund-policy"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${env.APP_URL}/sitemap.xml`,
  };
}
