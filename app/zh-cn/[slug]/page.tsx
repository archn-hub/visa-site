import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChineseVisaDetailPage } from "../../_components/ChineseVisaDetailPage";
import { visaPagesZhCn } from "../../_data/visaPagesZhCn";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(visaPagesZhCn).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = visaPagesZhCn[slug];

  if (!page) return {};

  return {
    title: {
      absolute: page.metaTitle,
    },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: `/zh-cn/${page.slug}`,
      languages: {
        ja: `/${page.slug}`,
        en: `/en/${page.slug}`,
        "zh-CN": `/zh-cn/${page.slug}`,
      },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/zh-cn/${page.slug}`,
      locale: "zh_CN",
      type: "article",
    },
  };
}

export default async function ChineseVisaPage({ params }: PageProps) {
  const { slug } = await params;
  const page = visaPagesZhCn[slug];

  if (!page) notFound();

  return <ChineseVisaDetailPage page={page} />;
}
