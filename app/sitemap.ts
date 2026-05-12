import type { MetadataRoute } from "next";
import { blogArticlesJa } from "./_data/blogJa";
import { visaPages } from "./_data/visaPages";
import { visaPagesEn } from "./_data/visaPagesEn";
import { visaPagesZhCn } from "./_data/visaPagesZhCn";
import { absoluteUrl } from "./_lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/en"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/en/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/zh-cn"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/zh-cn/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...Object.values(visaPages).map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...Object.values(visaPagesEn).map((page) => ({
      url: absoluteUrl(`/en/${page.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...Object.values(visaPagesZhCn).map((page) => ({
      url: absoluteUrl(`/zh-cn/${page.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...blogArticlesJa
      .filter((article) => !article.draft)
      .map((article) => ({
        url: absoluteUrl(`/blog/ja/${article.slug}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      })),
  ];
}
