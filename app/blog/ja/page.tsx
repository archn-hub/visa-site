import type { Metadata } from "next";
import Link from "next/link";
import { BackToTopButton } from "../../_components/BackToTopButton";
import { SocialContactButtons } from "../../_components/SocialContactButtons";
import { blogArticlesJa } from "../../_data/blogJa";
import { phoneDisplay, phoneHref } from "../../_lib/site";

export const metadata: Metadata = {
  title: "ビザ申請コラム 下書き一覧",
  description: "行政書士アーチ事務所のビザ申請・在留資格コラムの下書き確認ページです。",
  robots: {
    index: false,
    follow: false,
  },
};

const categories = Array.from(new Set(blogArticlesJa.map((article) => article.category)));

export default function JapaneseBlogIndexPage() {
  return (
    <main id="page-top" className="min-h-screen bg-white text-[#0b2344]">
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

      <section className="bg-[#dcecff] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">BLOG DRAFTS</p>
          <h1 className="mt-3 text-3xl font-black text-[#143a6b] sm:text-5xl">
            日本語記事 下書き一覧
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-700">
            公開前確認用のページです。現在の記事は下書き扱いのため、検索エンジンには
            index されない設定にしています。内容確認後に公開状態へ切り替えます。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#143a6b] shadow-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogArticlesJa.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/ja/${article.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(11,35,68,0.08)] transition hover:-translate-y-1 hover:border-[#143a6b]/35 hover:shadow-[0_20px_48px_rgba(11,35,68,0.14)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#f4f8ff] px-3 py-1 text-xs font-black text-[#143a6b]">
                  {article.category}
                </span>
                {article.draft && (
                  <span className="rounded-full bg-[#e96078]/10 px-3 py-1 text-xs font-black text-[#e3425d]">
                    下書き
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-xl font-black leading-8 text-[#143a6b]">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{article.description}</p>
              <span className="mt-5 inline-flex text-sm font-black text-[#caa15a] transition group-hover:text-[#143a6b]">
                記事を確認する
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#143a6b] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-white/15 bg-white/10 p-8 text-center shadow-2xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">REVIEW</p>
          <h2 className="mt-3 text-3xl font-black">公開前の記事確認</h2>
          <p className="mt-4 text-sm leading-7 text-blue-50">
            表現、料金、対応範囲に違和感がないか確認し、OKの記事から公開に切り替えます。
          </p>
          <SocialContactButtons locale="ja" tone="dark" className="mt-7" />
        </div>
      </section>
      <BackToTopButton label="上部へ" ariaLabel="ページ上部へ戻る" />
    </main>
  );
}
