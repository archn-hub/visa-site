import type { Metadata } from "next";
import Link from "next/link";
import { SocialContactButtons } from "../../_components/SocialContactButtons";
import { EnglishContactForm } from "./EnglishContactForm";
import { phoneDisplay, phoneHref, siteName } from "../../_lib/site";

export const metadata: Metadata = {
  title: "Contact and Free Consultation",
  description:
    "Contact Gyoseishoshi Arch Office for consultation about Japanese visas and residence status applications.",
  alternates: {
    canonical: "/en/contact",
    languages: {
      ja: "/contact",
      en: "/en/contact",
      "zh-CN": "/zh-cn/contact",
    },
  },
  openGraph: {
    title: "Contact and Free Consultation | Gyoseishoshi Arch Office",
    description: "Contact us about Japanese visa and residence status applications.",
    url: "/en/contact",
    siteName,
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishContactPage() {
  return (
    <main id="page-top" className="min-h-screen bg-white text-[#0b2344]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/en" className="min-w-0 flex flex-col leading-tight">
            <span className="text-sm font-black tracking-[0.18em] text-[#143a6b]">
              Gyoseishoshi Arch Office
            </span>
            <span className="text-xs font-bold text-slate-500">
              Japan visa and residence status support
            </span>
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-[#caa15a] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#b58a42]"
            >
              日本語
            </Link>
            <Link href="/zh-cn/contact" className="text-xs font-black text-[#143a6b]">
              简体中文
            </Link>
            <SocialContactButtons locale="en" tone="light" size="compact" />
            <a href={phoneHref} className="hidden text-xl font-black text-[#143a6b] sm:block">
              {phoneDisplay}
            </a>
          </div>
        </div>
      </header>

      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-xs font-bold text-slate-500 sm:text-sm">
          <li>
            <Link href="/en" className="text-[#143a6b] transition hover:text-[#0b2344]">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-300">/</li>
          <li aria-current="page" className="text-slate-700">Contact</li>
        </ol>
      </nav>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[28px] bg-[#dcecff] p-6 sm:p-10">
            <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">CONTACT</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#143a6b] sm:text-5xl">
              Contact and Free Consultation
            </h1>
            <p className="mt-5 text-sm leading-7 text-slate-700">
              Tell us about your current situation. We will review the procedure,
              expected requirements, and documents needed for your case.
            </p>
            <div className="mt-8 rounded-[24px] bg-[#143a6b] p-6 text-white">
              <p className="text-sm font-black tracking-[0.18em] text-[#caa15a]">PHONE</p>
              <p className="mt-3 text-3xl font-black">{phoneDisplay}</p>
              <p className="mt-3 text-sm leading-7 text-blue-50">
                If your matter is urgent, please contact us by phone.
              </p>
              <SocialContactButtons locale="en" tone="dark" className="mt-5" />
            </div>
          </div>

          <EnglishContactForm />
        </div>
      </section>
    </main>
  );
}
