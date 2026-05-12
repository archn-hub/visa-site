import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTopButton } from "../../../_components/BackToTopButton";
import { SocialContactButtons } from "../../../_components/SocialContactButtons";
import { getKijiArticle, getKijiArticles, getServiceForCategory, RenderKijiBody } from "../../../_lib/kiji";
import { absoluteUrl, phoneDisplay, phoneHref, siteName } from "../../../_lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getKijiArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getKijiArticle(slug);

  if (!article) return {};

  return {
    title: {
      absolute: `${article.title} | ${siteName}`,
    },
    description: article.description,
    keywords: [article.category, "ビザ申請", "在留資格", "行政書士"],
    alternates: {
      canonical: `/blog/ja/${article.slug}`,
    },
    robots: article.draft
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/blog/ja/${article.slug}`,
      siteName,
      locale: "ja_JP",
      type: "article",
    },
  };
}

export default async function JapaneseBlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getKijiArticle(slug);

  if (!article) notFound();

  const allArticles = getKijiArticles();
  const relatedArticles = [
    ...allArticles.filter((item) => item.slug !== article.slug && item.category === article.category),
    ...allArticles.filter((item) => item.slug !== article.slug && item.category !== article.category),
  ].slice(0, 3);
  const service = getServiceForCategory(article.category);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
    mainEntityOfPage: absoluteUrl(`/blog/ja/${article.slug}`),
  };

  return (
    <main id="page-top" className="min-h-screen bg-white text-[#0b2344]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="min-w-0 flex flex-col leading-tight">
            <span className="text-sm font-black tracking-[0.18em] text-[#143a6b]">
              行政書士アーチ事務所
            </span>
            <span className="text-xs font-bold text-slate-500">
              ビザ申請・在留資格コラム
            </span>
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
            <SocialContactButtons locale="ja" tone="light" size="compact" />
            <a href={phoneHref} className="hidden text-xl font-black text-[#143a6b] md:inline">
              {phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="rounded-full bg-[#143a6b] px-4 py-2 text-sm font-black text-white transition hover:bg-[#0b2344]"
            >
              無料相談
            </Link>
          </div>
        </div>
      </header>

      <nav aria-label="パンくずリスト" className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-xs font-bold text-slate-500 sm:text-sm">
          <li>
            <Link href="/" className="text-[#143a6b] transition hover:text-[#0b2344]">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-300">/</li>
          <li>
            <Link href="/blog/ja" className="text-[#143a6b] transition hover:text-[#0b2344]">
              コラム
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-300">/</li>
          <li aria-current="page" className="text-slate-700">{article.title}</li>
        </ol>
      </nav>

      <article>
        <section className="bg-[#dcecff] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#143a6b] shadow-sm">
                {article.category}
              </span>
              {article.draft && (
                <span className="rounded-full bg-[#e96078]/10 px-4 py-2 text-xs font-black text-[#e3425d]">
                  下書き確認中
                </span>
              )}
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight text-[#143a6b] sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-base">
              {article.description}
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_320px]">
            <div className="min-w-0">
              <RenderKijiBody body={article.body} />

              {relatedArticles.length > 0 && (
                <section className="mt-14 border-t border-slate-200 pt-10" aria-labelledby="related-articles">
                  <p className="text-sm font-black tracking-[0.18em] text-[#caa15a]">RELATED ARTICLES</p>
                  <h2 id="related-articles" className="mt-3 text-2xl font-black text-[#143a6b]">
                    関連記事
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.slug}
                        href={`/blog/ja/${relatedArticle.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#143a6b]/30 hover:shadow-md"
                      >
                        <span className="w-fit rounded-full bg-[#f4f8ff] px-3 py-1 text-xs font-black text-[#143a6b]">
                          {relatedArticle.category}
                        </span>
                        <span className="mt-4 text-base font-black leading-7 text-[#143a6b] transition group-hover:text-[#0b2344]">
                          {relatedArticle.title}
                        </span>
                        <span className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                          {relatedArticle.description}
                        </span>
                        <span className="mt-auto pt-4 text-sm font-black text-[#e96078]">
                          記事を読む
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-black tracking-[0.18em] text-[#caa15a]">CONTACT</p>
                <p className="mt-3 text-2xl font-black text-[#143a6b]">{phoneDisplay}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  記事の内容に近い状況でお悩みの場合は、現在の資料を確認しながら方針を整理します。
                </p>
                <SocialContactButtons locale="ja" tone="light" className="mt-5" />
              </div>
              <div className="rounded-2xl bg-[#f4f8ff] p-5">
                <p className="text-sm font-black text-[#143a6b]">関連サービス</p>
                <Link
                  href={service.href}
                  className="mt-3 block text-lg font-black leading-7 text-[#143a6b] transition hover:text-[#0b2344]"
                >
                  {service.label}
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </article>

      <BackToTopButton label="上部へ" ariaLabel="ページ上部へ戻る" />
    </main>
  );
}
