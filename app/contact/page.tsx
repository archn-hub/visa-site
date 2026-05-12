import type { Metadata } from "next";
import Link from "next/link";
import { BackToTopButton } from "../_components/BackToTopButton";
import { SocialContactButtons } from "../_components/SocialContactButtons";
import { ContactForm } from "./ContactForm";
import { phoneDisplay, phoneHref, siteName } from "../_lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ・無料相談",
  description:
    "行政書士アーチ事務所へのお問い合わせ・無料相談フォームです。名前、メールアドレス、電話番号、国籍、現在の在留資格、相談内容を入力してご相談ください。",
  alternates: {
    canonical: "/contact",
    languages: {
      ja: "/contact",
      en: "/en/contact",
      "zh-CN": "/zh-cn/contact",
    },
  },
  openGraph: {
    title: "お問い合わせ・無料相談 | 行政書士アーチ事務所",
    description:
      "ビザ申請・在留資格に関するお問い合わせ、無料相談はこちらから。全国対応でサポートします。",
    url: "/contact",
    siteName,
    locale: "ja_JP",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main id="page-top" className="min-h-screen bg-white text-[#0b2344]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="min-w-0 flex flex-col leading-tight">
            <span className="text-sm font-black tracking-[0.18em] text-[#143a6b]">
              行政書士アーチ事務所
            </span>
            <span className="text-xs font-bold text-slate-500">
              ビザ申請・在留資格専門サポート
            </span>
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/en/contact"
              className="rounded-full bg-[#caa15a] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#b58a42]"
            >
              English
            </Link>
            <Link href="/zh-cn/contact" className="text-xs font-black text-[#143a6b]">
              简体中文
            </Link>
            <SocialContactButtons locale="ja" tone="light" size="compact" />
            <a href={phoneHref} className="rounded-full border border-[#143a6b]/15 bg-white px-3 py-2 text-sm font-black text-[#143a6b] shadow-sm transition hover:bg-[#f4f8ff] md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-xl md:shadow-none">
              <span className="md:hidden">電話</span>
              <span className="hidden md:inline">{phoneDisplay}</span>
            </a>
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
            お問い合わせ
          </li>
        </ol>
      </nav>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[28px] bg-[#dcecff] p-6 sm:p-10">
            <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">CONTACT</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#143a6b] sm:text-5xl">
              お問い合わせ・無料相談
            </h1>
            <p className="mt-5 text-sm leading-7 text-slate-700">
              現在の状況を確認し、必要な手続き、許可の見込み、準備すべき書類を整理します。
              フォームに相談内容をご入力ください。
            </p>
            <div className="mt-8 rounded-[24px] bg-[#143a6b] p-6 text-white">
              <p className="text-sm font-black tracking-[0.18em] text-[#caa15a]">PHONE</p>
              <p className="mt-3 text-3xl font-black">{phoneDisplay}</p>
              <p className="mt-3 text-sm leading-7 text-blue-50">
                お急ぎの場合はお電話でもご相談いただけます。
              </p>
              <SocialContactButtons locale="ja" tone="dark" className="mt-5" />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
      <BackToTopButton label="上部へ" ariaLabel="ページ上部へ戻る" />
    </main>
  );
}
