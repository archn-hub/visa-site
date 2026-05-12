import type { Metadata } from "next";
import Link from "next/link";
import { BackToTopButton } from "../_components/BackToTopButton";
import { SocialContactButtons } from "../_components/SocialContactButtons";
import { visaPagesZhCn } from "../_data/visaPagesZhCn";
import { absoluteUrl, phoneDisplay, phoneHref, siteName } from "../_lib/site";

export const metadata: Metadata = {
  title: "日本签证・在留资格申请支持",
  description:
    "行政书士Arch事务所为日本人配偶者签证、就劳签证、家族滞在签证、特定技能签证、永住、归化、经营管理签证提供中文咨询。事务所内也有可中文对应的社会保险劳务士，也可简单咨询外国人雇用相关劳务社保问题。",
  alternates: {
    canonical: "/zh-cn",
    languages: {
      ja: "/",
      en: "/en",
      "zh-CN": "/zh-cn",
    },
  },
  openGraph: {
    title: "日本签证・在留资格申请支持 | 行政书士Arch事务所",
    description: "日本签证申请、在留资格和外国人雇用相关咨询。可用中文对应。",
    url: absoluteUrl("/zh-cn"),
    siteName,
    locale: "zh_CN",
    type: "website",
  },
};

const services = Object.values(visaPagesZhCn);

const strengths = [
  {
    title: "降低不许可风险",
    text: "申请前确认不利点，并准备说明资料和证明材料。",
  },
  {
    title: "中文咨询",
    text: "签证、在留资格以及外国人雇用相关问题均可用中文沟通。",
  },
  {
    title: "社劳士在籍",
    text: "事务所内也有可中文对应的社会保险劳务士，可简单咨询劳务社保问题。",
  },
  {
    title: "费用清楚",
    text: "先说明手续、费用和可能追加的材料，再开始正式委托。",
  },
];

const flow = [
  ["01", "免费咨询", "确认目前的在留资格、申请目的、家庭和工作情况。"],
  ["02", "方针整理", "整理许可可能性、必要材料、风险点和日程。"],
  ["03", "材料准备", "制作申请书、理由书和补充说明资料。"],
  ["04", "申请・追加对应", "申请后如有追加资料要求，也会继续对应。"],
];

export default function ChineseHomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteName,
    description: "日本签证・在留资格申请支持。可用中文咨询。",
    url: absoluteUrl("/zh-cn"),
    telephone: phoneDisplay,
    areaServed: "JP",
    serviceType: services.map((service) => service.title),
    priceRange: "¥88,000-¥440,000",
  };

  return (
    <main id="page-top" className="bg-white text-[#0b2344]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
              href="/"
              className="rounded-full bg-[#caa15a] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#b58a42]"
            >
              日本語
            </Link>
            <Link href="/en" className="text-xs font-black text-[#143a6b]">
              English
            </Link>
            <SocialContactButtons locale="zh" tone="light" size="compact" />
            <a href={phoneHref} className="rounded-full border border-[#143a6b]/15 bg-white px-3 py-2 text-sm font-black text-[#143a6b] shadow-sm transition hover:bg-[#f4f8ff] md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-xl md:shadow-none">
              <span className="md:hidden">电话</span>
              <span className="hidden md:inline">{phoneDisplay}</span>
            </a>
            <Link
              href="/zh-cn/contact"
              className="rounded-full bg-[#143a6b] px-4 py-2 text-sm font-black text-white transition hover:bg-[#0b2344]"
            >
              咨询
            </Link>
          </div>
        </div>
      </header>

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#dcecff] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="inline-block bg-[#143a6b] px-5 py-4 shadow-lg">
              <h1 className="text-2xl font-black leading-snug tracking-normal text-white sm:text-4xl">
                日本签证申请
                <br />
                专业人员为您整理
              </h1>
            </div>
            <div className="mt-5 rounded-r-3xl bg-[#143a6b] p-5 text-white shadow-lg">
              <p className="text-lg font-black sm:text-2xl">
                免费初次咨询，中文对应
              </p>
              <p className="mt-3 text-sm leading-7 text-blue-50">
                从日本人配偶者签证、就劳签证、家族滞在签证、特定技能签证到永住、归化、经营管理签证，
                我们会根据您的情况整理申请方向和必要材料。
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/zh-cn/contact"
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-[#143a6b] transition hover:bg-[#f4f8ff]"
                >
                  免费咨询
                </Link>
                <a
                  href={phoneHref}
                  className="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-white/10"
                >
                  电话咨询
                </a>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="flex aspect-square max-h-36 flex-col items-center justify-center rounded-full border-2 border-[#e96078] bg-white text-center text-[#e3425d]">
                <span className="text-xs font-bold">咨询费</span>
                <span className="mt-1 text-2xl font-black">0日元</span>
              </div>
              <div className="flex aspect-square max-h-36 flex-col items-center justify-center rounded-full border-2 border-[#e96078] bg-white text-center text-[#e3425d]">
                <span className="text-xs font-bold tracking-[0.18em]">SINCE</span>
                <span className="mt-1 text-2xl font-black">2010</span>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-white/30 p-6 sm:p-10">
            <div className="rounded-[24px] border border-white/60 bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">CHINESE SUPPORT</p>
              <p className="mt-4 text-3xl font-black text-[#143a6b]">
                中文社劳士也在事务所内
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                除了签证申请，也可简单咨询外国人雇用时的劳动条件、社会保险、
                雇用保险、工资制度、入退社手续等基础劳务社保问题。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#143a6b] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">STRENGTH</p>
          <h2 className="mt-3 text-3xl font-black">本事务所的特点</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item, index) => (
              <article key={item.title} className="rounded-2xl bg-white p-6 text-[#0b2344] shadow-xl">
                <p className="text-sm font-black text-[#caa15a]">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm font-black tracking-[0.2em] text-[#caa15a]">SERVICES</p>
          <h2 className="mt-3 text-center text-3xl font-black text-[#143a6b]">服务内容</h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/zh-cn/${service.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(11,35,68,0.08)] transition hover:-translate-y-1 hover:border-[#143a6b]/35 hover:shadow-[0_20px_48px_rgba(11,35,68,0.14)]"
              >
                <h3 className="text-xl font-black text-[#143a6b]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                <span className="mt-5 inline-flex text-sm font-black text-[#caa15a] transition group-hover:text-[#143a6b]">
                  查看详情
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">PRICE</p>
          <h2 className="mt-3 text-3xl font-black text-[#143a6b]">费用参考</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {services.map((service) => (
              <div key={service.slug} className="grid gap-2 border-b border-slate-200 p-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                <span className="font-bold">{service.title}</span>
                <span className="text-2xl font-black text-[#143a6b]">{service.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            最终费用会根据案件内容、家族人数、追加资料数量等情况报价。
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">FLOW</p>
          <h2 className="mt-3 text-3xl font-black text-[#143a6b]">办理流程</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {flow.map(([num, title, text]) => (
              <article key={num} className="border-t-4 border-[#143a6b] bg-[#f8fbff] p-5">
                <p className="text-sm font-black text-[#caa15a]">{num}</p>
                <h3 className="mt-3 text-lg font-black text-[#143a6b]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#143a6b] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-white/15 bg-white/10 p-8 text-center shadow-2xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">CONTACT</p>
          <h2 className="mt-3 text-3xl font-black">欢迎先从免费咨询开始</h2>
          <p className="mt-4 text-3xl font-black">{phoneDisplay}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={phoneHref}
              className="rounded-full bg-white px-8 py-4 text-sm font-black text-[#143a6b] transition hover:bg-[#eef6ff]"
            >
              电话咨询
            </a>
            <Link
              href="/zh-cn/contact"
              className="rounded-full bg-[#caa15a] px-8 py-4 text-sm font-black text-white transition hover:bg-[#b58a42]"
            >
              表单咨询
            </Link>
          </div>
          <SocialContactButtons locale="zh" tone="dark" className="mt-3" />
        </div>
      </section>
      <BackToTopButton label="上方" ariaLabel="返回页面上方" />
    </main>
  );
}
