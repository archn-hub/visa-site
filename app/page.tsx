import type { Metadata } from "next";
import Link from "next/link";
import { SocialContactButtons } from "./_components/SocialContactButtons";
import { absoluteUrl, phoneDisplay, phoneHref, siteDescription, siteName } from "./_lib/site";

export const metadata: Metadata = {
  title: "ビザ申請・在留資格サポート",
  description:
    "行政書士アーチ事務所は、日本人配偶者ビザ、就労ビザ、技術・人文知識・国際業務、永住申請、帰化申請、経営管理ビザを全国対応でサポートします。",
  alternates: {
    canonical: "/",
    languages: {
      ja: "/",
      en: "/en",
      "zh-CN": "/zh-cn",
    },
  },
};

const strengths = [
  {
    title: "不許可リスクの低減",
    text: "申請前に不利になりやすい事情を洗い出し、説明資料と証明書類を整えてから進めます。",
  },
  {
    title: "全国対応",
    text: "オンライン相談と郵送・電子申請を活用し、遠方の方や企業担当者にも対応します。",
  },
  {
    title: "明朗会計",
    text: "初回相談時に必要な手続きと費用を提示し、追加費用が生じる条件も事前に説明します。",
  },
  {
    title: "豊富な実績",
    text: "就労、日本人配偶者、永住、経営管理など、個人・法人双方の申請を幅広く支援しています。",
  },
];

const services = [
  { title: "日本人配偶者ビザ", href: "/spouse-visa" },
  { title: "就労ビザ", href: "/work-visa" },
  { title: "技術・人文知識・国際業務", href: "/engineer-visa" },
  { title: "永住申請", href: "/permanent-residence" },
  { title: "帰化申請", href: "/naturalization" },
  { title: "経営管理ビザ", href: "/business-manager" },
];

const prices = [
  ["日本人配偶者ビザ申請", "88,000円〜"],
  ["就労ビザ申請", "88,000円〜"],
  ["技術・人文知識・国際業務", "88,000円〜"],
  ["永住申請", "110,000円〜"],
  ["帰化申請", "132,000円〜"],
  ["経営管理ビザ", "440,000円〜"],
];

const flow = [
  ["01", "無料相談", "現在の在留資格、申請目的、家族・勤務先の状況を確認します。"],
  ["02", "方針設計", "許可の見込み、必要書類、注意点、スケジュールを整理します。"],
  ["03", "書類作成", "理由書、申請書、添付資料を作成し、提出前に内容を確認します。"],
  ["04", "申請・追加対応", "入管への申請後、追加資料の要請にも最後まで対応します。"],
];

const faqs = [
  {
    q: "全国から相談できますか？",
    a: "可能です。オンライン面談、電話、メールを組み合わせ、来所が難しい方にも対応しています。",
  },
  {
    q: "不許可になった後でも依頼できますか？",
    a: "対応できます。不許可理由を確認し、再申請に必要な説明や資料の補強方針を検討します。",
  },
  {
    q: "相談したら必ず依頼しなければいけませんか？",
    a: "その必要はありません。まずは状況を整理し、依頼するかどうか判断できる材料をお伝えします。",
  },
  {
    q: "会社からの外国人採用相談もできますか？",
    a: "できます。職務内容、雇用条件、候補者の経歴を確認し、在留資格の適合性を整理します。",
  },
];

function HeroIllustration() {
  return (
    <svg viewBox="0 0 620 360" className="h-auto w-full" aria-hidden="true">
      <rect x="34" y="30" width="552" height="270" rx="28" fill="#eef6ff" />
      <path d="M92 257h430" stroke="#183b68" strokeWidth="4" strokeLinecap="round" />
      <g stroke="#183b68" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        <path d="M130 102h170v118H130z" fill="#fff" />
        <path d="M158 132h112M158 162h88M158 192h106" />
        <path d="M326 76h122l44 44v154H326z" fill="#fff" />
        <path d="M448 78v44h44" fill="#d7eaff" />
        <path d="M354 154h100M354 186h116M354 218h82" />
        <circle cx="470" cy="220" r="28" fill="#0f8fa5" />
        <path d="m458 220 8 8 18-22" stroke="#fff" />
      </g>
      <g stroke="#183b68" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        <circle cx="163" cy="72" r="20" fill="#fff" />
        <path d="M136 112c9-24 44-24 54 0l13 102h-80z" fill="#fff" />
        <path d="M146 256l12-42M181 256l-12-42M149 67c10 7 22 8 34 2" />
      </g>
      <g stroke="#183b68" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        <circle cx="522" cy="110" r="19" fill="#fff" />
        <path d="M497 149c9-24 42-24 51 0l10 105h-72z" fill="#fff" />
        <path d="M493 181h58M505 257l9-46M542 257l-10-46" />
      </g>
      <g fill="#caa15a">
        <circle cx="110" cy="54" r="9" />
        <circle cx="525" cy="60" r="9" />
        <circle cx="306" cy="284" r="8" />
      </g>
    </svg>
  );
}

function BackToTopButton() {
  return (
    <a
      href="#page-top"
      aria-label="ページ上部へ戻る"
      className="fixed bottom-5 right-5 z-40 rounded-full border border-white/20 bg-[#143a6b] px-5 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(11,35,68,0.25)] transition hover:bg-[#0b2344] focus:outline-none focus:ring-4 focus:ring-[#caa15a]/30"
    >
      上部へ
    </a>
  );
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteName,
    description: siteDescription,
    url: absoluteUrl("/"),
    telephone: phoneDisplay,
    areaServed: "JP",
    serviceType: services.map((service) => service.title),
    priceRange: "88,000円〜440,000円",
  };

  return (
    <main id="page-top" className="bg-white text-[#0b2344]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="min-w-0 flex flex-col leading-tight">
            <span className="text-sm font-black tracking-[0.18em] text-[#143a6b]">
              行政書士アーチ事務所
            </span>
            <span className="text-xs font-bold text-slate-500">
              ビザ申請・在留資格専門サポート
            </span>
          </a>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/en"
              className="rounded-full bg-[#caa15a] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#b58a42]"
            >
              English
            </Link>
            <Link href="/zh-cn" className="text-xs font-black text-[#143a6b]">
              简体中文
            </Link>
            <SocialContactButtons locale="ja" tone="light" size="compact" />
            <a href={phoneHref} className="hidden text-xl font-black text-[#143a6b] md:inline">
              {phoneDisplay}
            </a>
            <a
              href="/contact"
              className="hidden rounded-full bg-[#143a6b] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0b2344] md:inline-flex"
            >
              無料相談
            </a>
          </div>
          <a
            href="/contact"
            className="rounded-full bg-[#143a6b] px-4 py-2 text-sm font-black text-white md:hidden"
          >
            相談
          </a>
        </div>
      </header>

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#dcecff] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="inline-block bg-[#143a6b] px-5 py-4 shadow-lg">
              <h1 className="text-2xl font-black leading-snug tracking-normal text-white sm:text-4xl">
                ビザ申請の
                <br />
                プロフェッショナルが全国対応
              </h1>
            </div>
            <div className="mt-5 rounded-r-3xl bg-[#143a6b] p-5 text-white shadow-lg">
              <p className="text-lg font-black sm:text-2xl">
                初回相談0円・明朗な料金体系
              </p>
              <p className="mt-3 text-sm leading-7 text-blue-50">
                日本人配偶者ビザ、就労ビザ、永住申請、経営管理ビザまで、申請取次行政書士が許可に向けた道筋を明確にします。
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-[#143a6b] transition hover:bg-[#f4f8ff]"
                >
                  無料相談はこちら
                </a>
                <a
                  href={phoneHref}
                  className="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-white/10"
                >
                  電話で相談する
                </a>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {["相談料"].map((label) => (
                <div
                  key={label}
                  className="flex aspect-square max-h-36 flex-col items-center justify-center rounded-full border-2 border-[#e96078] bg-white text-center text-[#e3425d]"
                >
                  <span className="text-xs font-bold">{label}</span>
                  <span className="mt-1 text-2xl font-black">0円</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center p-5 sm:p-8 lg:p-10">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <section className="bg-[#143a6b] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">STRENGTH</p>
          <h2 className="mt-3 text-3xl font-black">選ばれる4つの強み</h2>
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
          <h2 className="mt-3 text-center text-3xl font-black text-[#143a6b]">サービス一覧</h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(11,35,68,0.08)] transition hover:-translate-y-1 hover:border-[#143a6b]/35 hover:shadow-[0_20px_48px_rgba(11,35,68,0.14)]"
              >
                <h3 className="text-xl font-black text-[#143a6b]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  状況に応じた許可要件を確認し、申請書類、理由書、証明資料を一式でサポートします。
                </p>
                <span className="mt-5 inline-flex text-sm font-black text-[#caa15a] transition group-hover:text-[#143a6b]">
                  詳細を見る
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">PRICE</p>
          <h2 className="mt-3 text-3xl font-black text-[#143a6b]">料金の一例</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {prices.map(([name, price]) => (
              <div key={name} className="grid gap-2 border-b border-slate-200 p-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                <span className="font-bold">{name}</span>
                <span className="text-2xl font-black text-[#143a6b]">{price}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            料金は申請内容、家族人数、追加資料の有無により変動します。正式な費用は無料相談後にお見積りします。
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">FLOW</p>
          <h2 className="mt-3 text-3xl font-black text-[#143a6b]">ご相談の流れ</h2>
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

      <section className="bg-[#f4f8ff] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">FAQ</p>
          <h2 className="mt-3 text-3xl font-black text-[#143a6b]">よくある質問</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-white p-5 shadow-sm">
                <summary className="cursor-pointer list-none text-lg font-black text-[#143a6b]">
                  Q. {faq.q}
                </summary>
                <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-7 text-slate-600">
                  A. {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">ABOUT</p>
            <h2 className="mt-3 text-3xl font-black text-[#143a6b]">事務所概要</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              外国人本人、ご家族、企業の人事担当者が安心して相談できる、ビザ申請専門の行政書士事務所です。
            </p>
          </div>
          <dl className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {[
              ["事務所名", "行政書士アーチ事務所"],
              ["所在地", "大阪府大阪市中央区石町1-1-1 天満橋千代田ビル10階"],
              ["電話番号", phoneDisplay],
              ["営業時間", "平日 9:00〜19:00"],
              ["対応業務", "在留資格申請、永住、帰化、外国人雇用支援"],
            ].map(([term, desc]) => (
              <div key={term} className="grid border-b border-slate-200 last:border-b-0 sm:grid-cols-[180px_1fr]">
                <dt className="bg-[#f4f8ff] p-4 font-black text-[#143a6b]">{term}</dt>
                <dd className="p-4 text-slate-700">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="bg-[#143a6b] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-white/15 bg-white/10 p-8 text-center shadow-2xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">CONTACT</p>
          <h2 className="mt-3 text-3xl font-black">無料相談はこちら</h2>
          <p className="mt-4 text-3xl font-black">{phoneDisplay}</p>
          <p className="mt-3 text-sm text-blue-50">
            ビザ申請の不安を、専門家と一緒に整理しましょう。
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={phoneHref}
              className="rounded-full bg-white px-8 py-4 text-sm font-black text-[#143a6b] transition hover:bg-[#eef6ff]"
            >
              電話で相談する
            </a>
            <a
              href="/contact"
              className="rounded-full bg-[#caa15a] px-8 py-4 text-sm font-black text-white transition hover:bg-[#b58a42]"
            >
              問い合わせボタン
            </a>
          </div>
          <SocialContactButtons locale="ja" tone="dark" className="mt-3" />
        </div>
      </section>
      <BackToTopButton />
    </main>
  );
}
