import { MetadataRoute } from "next";
import { env } from "@/lib/config/env";
import { getAllCases } from "@/lib/mock-cases/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const cases = getAllCases();
  const currentDate = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${env.APP_URL}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${env.APP_URL}/pricing`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${env.APP_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${env.APP_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${env.APP_URL}/refund-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const caseRoutes: MetadataRoute.Sitemap = cases.flatMap((c) => [
    {
      url: `${env.APP_URL}/exam/${c.id}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${env.APP_URL}/review/${c.id}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]);

  return [...staticRoutes, ...caseRoutes];
}
