import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishVisaDetailPage } from "../../_components/EnglishVisaDetailPage";
import { visaPagesEn } from "../../_data/visaPagesEn";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(visaPagesEn).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = visaPagesEn[slug];

  if (!page) return {};

  return {
    title: {
      absolute: page.metaTitle,
    },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: `/en/${page.slug}`,
      languages: {
        ja: `/${page.slug}`,
        en: `/en/${page.slug}`,
      },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/en/${page.slug}`,
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function EnglishVisaPage({ params }: PageProps) {
  const { slug } = await params;
  const page = visaPagesEn[slug];

  if (!page) notFound();

  return <EnglishVisaDetailPage page={page} />;
}
