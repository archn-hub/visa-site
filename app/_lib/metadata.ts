import type { Metadata } from "next";
import type { VisaPage } from "../_data/visaPages";
import { absoluteUrl, siteName } from "./site";

export function createVisaMetadata(page: VisaPage): Metadata {
  const path = `/${page.slug}`;

  return {
    title: {
      absolute: page.metaTitle,
    },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: path,
      languages: {
        ja: path,
        en: `/en/${page.slug}`,
        "zh-CN": `/zh-cn/${page.slug}`,
      },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteUrl(path),
      siteName,
      locale: "ja_JP",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}
