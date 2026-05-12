import type { Metadata } from "next";
import Link from "next/link";
import { BackToTopButton } from "../../_components/BackToTopButton";
import { SocialContactButtons } from "../../_components/SocialContactButtons";
import { getKijiArticles } from "../../_lib/kiji";
import { phoneDisplay, phoneHref } from "../../_lib/site";

export const metadata: Metadata = {
  title: "ビザ申請・在留資格コラム | 行政書士アーチ事務所",
  description: "日本人配偶者ビザ、永住申請、就労ビザ、技術・人文知識・国際業務など、ビザ申請と在留資格の実務ポイントを行政書士アーチ事務所が解説します。",
  robots: {
    index: true,
    follow: true,
  },
};

const articles = getKijiArticles();
const categories = Array.from(new Set(articles.map((article) => article.category)));

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
            <a href={phoneHref} className="rounded-full border border-[#143a6b]/15 bg-white px-3 py-2 text-sm font-black text-[#143a6b] shadow-sm transition hover:bg-[#f4f8ff] md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-xl md:shadow-none">
              <span className="md:hidden">電話</span>
              <span className="hidden md:inline">{phoneDisplay}</span>
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
          <li aria-hidden="true" className="text-slate-300">
            /
          </li>
          <li aria-current="page" className="text-slate-700">
            コラム
          </li>
        </ol>
      </nav>

      <section className="bg-[#dcecff] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">VISA COLUMN</p>
          <h1 className="mt-3 text-3xl font-black text-[#143a6b] sm:text-5xl">
            ビザ申請・在留資格コラム
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-700">
            日本人配偶者ビザ、永住申請、就労ビザ、技術・人文知識・国際業務など、
            申請前に確認したいポイントを行政書士がわかりやすく整理しています。
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
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/ja/${article.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(11,35,68,0.08)] transition hover:-translate-y-1 hover:border-[#143a6b]/35 hover:shadow-[0_20px_48px_rgba(11,35,68,0.14)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#f4f8ff] px-3 py-1 text-xs font-black text-[#143a6b]">
                  {article.category}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-black leading-8 text-[#143a6b]">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{article.description}</p>
              <span className="mt-5 inline-flex text-sm font-black text-[#caa15a] transition group-hover:text-[#143a6b]">
                記事を読む
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#143a6b] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-white/15 bg-white/10 p-8 text-center shadow-2xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">CONTACT</p>
          <h2 className="mt-3 text-3xl font-black">ビザ申請でお困りの方へ</h2>
          <p className="mt-4 text-sm leading-7 text-blue-50">
            記事の内容に近い状況で不安がある場合は、現在の資料や事情を確認しながら申請方針を整理します。
          </p>
          <SocialContactButtons locale="ja" tone="dark" className="mt-7" />
        </div>
      </section>
      <BackToTopButton label="上部へ" ariaLabel="ページ上部へ戻る" />
    </main>
  );
}
