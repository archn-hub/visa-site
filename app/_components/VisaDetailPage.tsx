import Link from "next/link";
import type { VisaPage } from "../_data/visaPages";
import { absoluteUrl, phoneDisplay, phoneHref, siteName } from "../_lib/site";

function Section({
  eyebrow,
  title,
  children,
  muted = false,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={`${muted ? "bg-[#f4f8ff]" : "bg-white"} px-4 py-14 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-black text-[#143a6b] sm:text-3xl">{title}</h2>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function BulletGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm leading-7 text-slate-700">{item}</p>
        </div>
      ))}
    </div>
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

export function VisaDetailPage({ page }: { page: VisaPage }) {
  const pageUrl = absoluteUrl(`/${page.slug}`);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${page.title}申請サポート`,
      description: page.metaDescription,
      provider: {
        "@type": "LegalService",
        name: siteName,
        telephone: phoneDisplay,
        url: absoluteUrl("/"),
      },
      areaServed: "JP",
      url: pageUrl,
      offers: {
        "@type": "Offer",
        price: page.priceAmount,
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "サービス一覧",
          item: absoluteUrl("/#services"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: page.title,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <main id="page-top" className="bg-white text-[#0b2344]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-sm font-black tracking-[0.18em] text-[#143a6b]">
              行政書士アーチ事務所
            </span>
            <span className="text-xs font-bold text-slate-500">
              ビザ申請・在留資格専門サポート
            </span>
          </Link>
          <div className="hidden items-center gap-5 md:flex">
            <a href={phoneHref} className="text-xl font-black text-[#143a6b]">
              {phoneDisplay}
            </a>
            <a
              href="/contact"
              className="rounded-full bg-[#143a6b] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0b2344]"
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
          <li>
            <Link href="/#services" className="text-[#143a6b] transition hover:text-[#0b2344]">
              サービス一覧
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-300">
            /
          </li>
          <li aria-current="page" className="text-slate-700">
            {page.title}
          </li>
        </ol>
      </nav>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#dcecff] lg:grid-cols-[1fr_0.85fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">{page.eyebrow}</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#143a6b] sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 text-lg font-black leading-8 text-[#0b2344] sm:text-2xl">
              {page.lead}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">{page.description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="rounded-full bg-[#143a6b] px-7 py-4 text-center text-sm font-black text-white transition hover:bg-[#0b2344]"
              >
                無料相談を予約する
              </a>
              <Link
                href="/#services"
                className="rounded-full border border-[#143a6b]/25 bg-white px-7 py-4 text-center text-sm font-black text-[#143a6b] transition hover:bg-[#f4f8ff]"
              >
                サービス一覧へ戻る
              </Link>
            </div>
          </div>
          <div className="flex items-center bg-[#143a6b] p-6 text-white sm:p-10">
            <div className="w-full rounded-[24px] border border-white/15 bg-white/10 p-6">
              <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">PRICE</p>
              <p className="mt-4 text-4xl font-black">{page.price}</p>
              <p className="mt-4 text-sm leading-7 text-blue-50">{page.priceNote}</p>
              <a
                href={phoneHref}
                className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-[#143a6b] transition hover:bg-[#eef6ff]"
              >
                電話で相談する
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="OVERVIEW" title="このビザの概要">
        <div className="space-y-4">
          {page.overview.map((item) => (
            <p key={item} className="rounded-2xl bg-[#f8fbff] p-5 text-sm leading-7 text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </Section>

      <Section eyebrow="REQUIREMENTS" title="主な要件" muted>
        <BulletGrid items={page.requirements} />
      </Section>

      <Section eyebrow="DOCUMENTS" title="必要書類">
        <BulletGrid items={page.documents} />
      </Section>

      <Section eyebrow="RISK" title="よくある不許可理由" muted>
        <BulletGrid items={page.refusalReasons} />
      </Section>

      <Section eyebrow="SUPPORT" title="当事務所のサポート内容">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {page.support.map((item, index) => (
            <article key={item} className="border-t-4 border-[#143a6b] bg-[#f8fbff] p-5">
              <p className="text-sm font-black text-[#caa15a]">0{index + 1}</p>
              <h3 className="mt-3 text-lg font-black leading-7 text-[#143a6b]">{item}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="PRICE" title="料金" muted>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-2 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <span className="text-lg font-black text-[#143a6b]">{page.title}申請サポート</span>
            <span className="text-3xl font-black text-[#143a6b]">{page.price}</span>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">{page.priceNote}</p>
      </Section>

      <Section eyebrow="FAQ" title="よくある質問">
        <div className="space-y-4">
          {page.faqs.map((faq) => (
            <details key={faq.q} className="group rounded-2xl bg-[#f8fbff] p-5 shadow-sm">
              <summary className="cursor-pointer list-none text-lg font-black text-[#143a6b]">
                Q. {faq.q}
              </summary>
              <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-7 text-slate-600">
                A. {faq.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <section id="contact" className="bg-[#143a6b] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-white/15 bg-white/10 p-8 text-center shadow-2xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">CONTACT</p>
          <h2 className="mt-3 text-3xl font-black">{page.title}の無料相談はこちら</h2>
          <p className="mt-4 text-3xl font-black">{phoneDisplay}</p>
          <p className="mt-3 text-sm leading-7 text-blue-50">
            現在の状況を確認し、許可の見込み、必要書類、進め方をわかりやすく整理します。
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
              メールで問い合わせる
            </a>
          </div>
        </div>
      </section>
      <BackToTopButton />
    </main>
  );
}
