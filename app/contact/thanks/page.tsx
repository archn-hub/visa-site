import type { Metadata } from "next";
import Link from "next/link";
import { ConversionTracker } from "../../_components/ConversionTracker";
import { phoneDisplay, phoneHref } from "../../_lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ送信完了",
  description: "行政書士アーチ事務所へのお問い合わせを受け付けました。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactThanksPage() {
  return (
    <main className="min-h-screen bg-[#f4f8ff] px-4 py-10 text-[#0b2344] sm:px-6 lg:px-8">
      <ConversionTracker />
      <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_16px_40px_rgba(11,35,68,0.08)] sm:p-10">
        <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">THANK YOU</p>
        <h1 className="mt-4 text-3xl font-black text-[#143a6b] sm:text-4xl">
          お問い合わせを受け付けました
        </h1>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          内容を確認し、担当者よりご連絡いたします。お急ぎの場合はお電話でもご相談ください。
        </p>
        <p className="mt-5 text-3xl font-black text-[#143a6b]">{phoneDisplay}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={phoneHref}
            className="rounded-full bg-[#143a6b] px-7 py-4 text-sm font-black text-white transition hover:bg-[#0b2344]"
          >
            電話で相談する
          </a>
          <Link
            href="/"
            className="rounded-full border border-[#143a6b]/25 bg-white px-7 py-4 text-sm font-black text-[#143a6b] transition hover:bg-[#f4f8ff]"
          >
            トップページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
