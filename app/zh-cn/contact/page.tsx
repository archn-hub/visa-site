import type { Metadata } from "next";
import Link from "next/link";
import { ChineseContactForm } from "./ChineseContactForm";
import { phoneDisplay, phoneHref, siteName } from "../../_lib/site";

export const metadata: Metadata = {
  title: "咨询・免费咨询",
  description:
    "行政书士Arch事务所的中文咨询表单。签证申请、在留资格、外国人雇用以及基础劳务社保问题均可咨询。",
  alternates: {
    canonical: "/zh-cn/contact",
    languages: {
      ja: "/contact",
      en: "/en/contact",
      "zh-CN": "/zh-cn/contact",
    },
  },
  openGraph: {
    title: "咨询・免费咨询 | 行政书士Arch事务所",
    description: "日本签证申请、在留资格和外国人雇用相关咨询。可用中文对应。",
    url: "/zh-cn/contact",
    siteName,
    locale: "zh_CN",
    type: "website",
  },
};

export default function ChineseContactPage() {
  return (
    <main id="page-top" className="min-h-screen bg-white text-[#0b2344]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/zh-cn" className="min-w-0 flex flex-col leading-tight">
            <span className="text-sm font-black tracking-[0.18em] text-[#143a6b]">
              行政书士Arch事务所
            </span>
            <span className="text-xs font-bold text-slate-500">
              日本签证・在留资格・劳务社保咨询
            </span>
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-[#caa15a] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#b58a42]"
            >
              日本語
            </Link>
            <Link href="/en/contact" className="text-xs font-black text-[#143a6b]">
              English
            </Link>
            <a href={phoneHref} className="hidden text-xl font-black text-[#143a6b] sm:block">
              {phoneDisplay}
            </a>
          </div>
        </div>
      </header>

      <nav aria-label="面包屑导航" className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-xs font-bold text-slate-500 sm:text-sm">
          <li>
            <Link href="/zh-cn" className="text-[#143a6b] transition hover:text-[#0b2344]">
              首页
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-300">/</li>
          <li aria-current="page" className="text-slate-700">咨询</li>
        </ol>
      </nav>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[28px] bg-[#dcecff] p-6 sm:p-10">
            <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">CONTACT</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#143a6b] sm:text-5xl">
              咨询・免费咨询
            </h1>
            <p className="mt-5 text-sm leading-7 text-slate-700">
              请告诉我们您目前的情况。我们会整理可申请的手续、主要要件、必要材料和注意点。
              事务所内有可用中文对应的社会保险劳务士，也可以简单咨询外国人雇用相关的劳务社保问题。
            </p>
            <div className="mt-8 rounded-[24px] bg-[#143a6b] p-6 text-white">
              <p className="text-sm font-black tracking-[0.18em] text-[#caa15a]">PHONE</p>
              <p className="mt-3 text-3xl font-black">{phoneDisplay}</p>
              <p className="mt-3 text-sm leading-7 text-blue-50">
                如有紧急事项，也可以通过电话咨询。
              </p>
            </div>
          </div>

          <ChineseContactForm />
        </div>
      </section>
    </main>
  );
}
