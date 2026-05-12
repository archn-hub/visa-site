import type { Metadata } from "next";
import Link from "next/link";
import { visaPagesEn } from "../_data/visaPagesEn";
import { absoluteUrl, phoneDisplay, phoneHref, siteName } from "../_lib/site";

export const metadata: Metadata = {
  title: "Japan Visa and Residence Status Support",
  description:
    "Gyoseishoshi Arch Office provides nationwide support for Japanese spouse visas, work visas, permanent residence, naturalization, and business manager visas in Japan.",
  alternates: {
    canonical: "/en",
    languages: {
      ja: "/",
      en: "/en",
      "zh-CN": "/zh-cn",
    },
  },
  openGraph: {
    title: "Japan Visa and Residence Status Support | Gyoseishoshi Arch Office",
    description:
      "Nationwide support for Japanese visa and residence status applications.",
    url: absoluteUrl("/en"),
    siteName,
    locale: "en_US",
    type: "website",
  },
};

const services = Object.values(visaPagesEn);

const strengths = [
  {
    title: "Lower Refusal Risk",
    text: "We identify weak points before filing and prepare explanations and supporting evidence.",
  },
  {
    title: "Nationwide Support",
    text: "Online consultation, mail, and electronic filing allow us to support clients across Japan.",
  },
  {
    title: "Clear Fees",
    text: "We explain the required procedures, fees, and possible additional costs in advance.",
  },
  {
    title: "Broad Experience",
    text: "We support individual and corporate applications, including work, Japanese spouse, PR, and business cases.",
  },
];

const flow = [
  ["01", "Free Consultation", "We review your current status, application goal, family, and employment situation."],
  ["02", "Strategy", "We organize eligibility, required documents, risks, and schedule."],
  ["03", "Documents", "We prepare application forms, statements, and supporting materials."],
  ["04", "Filing", "We support filing and respond to additional requests from Immigration."],
];

export default function EnglishHomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteName,
    description: "Nationwide support for Japanese visa and residence status applications.",
    url: absoluteUrl("/en"),
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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/en" className="flex flex-col leading-tight">
            <span className="text-sm font-black tracking-[0.18em] text-[#143a6b]">
              Gyoseishoshi Arch Office
            </span>
            <span className="text-xs font-bold text-slate-500">
              Japan visa and residence status support
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-[#caa15a] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#b58a42]"
            >
              日本語
            </Link>
            <Link href="/zh-cn" className="text-xs font-black text-[#143a6b]">
              简体中文
            </Link>
            <a href={phoneHref} className="hidden text-xl font-black text-[#143a6b] md:inline">
              {phoneDisplay}
            </a>
            <Link
              href="/en/contact"
              className="rounded-full bg-[#143a6b] px-4 py-2 text-sm font-black text-white transition hover:bg-[#0b2344]"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#dcecff] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="inline-block bg-[#143a6b] px-5 py-4 shadow-lg">
              <h1 className="text-2xl font-black leading-snug tracking-normal text-white sm:text-4xl">
                Japan Visa Applications
                <br />
                Handled by Professionals
              </h1>
            </div>
            <div className="mt-5 rounded-r-3xl bg-[#143a6b] p-5 text-white shadow-lg">
              <p className="text-lg font-black sm:text-2xl">
                Free initial consultation and clear fee guidance
              </p>
              <p className="mt-3 text-sm leading-7 text-blue-50">
                From Japanese spouse visas and work visas to permanent residence, naturalization,
                and business manager visas, we organize a clear path toward approval.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/en/contact"
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-[#143a6b] transition hover:bg-[#f4f8ff]"
                >
                  Request Consultation
                </Link>
                <a
                  href={phoneHref}
                  className="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-white/10"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-white/30 p-6 sm:p-10">
            <div className="rounded-[24px] border border-white/60 bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">SERVICES</p>
              <p className="mt-4 text-3xl font-black text-[#143a6b]">
                Nationwide immigration support
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                We work with foreign residents, families, entrepreneurs, and employers
                to prepare consistent, evidence-based applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#143a6b] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">STRENGTH</p>
          <h2 className="mt-3 text-3xl font-black">Why Choose Us</h2>
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
          <h2 className="mt-3 text-center text-3xl font-black text-[#143a6b]">Visa Services</h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/en/${service.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(11,35,68,0.08)] transition hover:-translate-y-1 hover:border-[#143a6b]/35 hover:shadow-[0_20px_48px_rgba(11,35,68,0.14)]"
              >
                <h3 className="text-xl font-black text-[#143a6b]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                <span className="mt-5 inline-flex text-sm font-black text-[#caa15a] transition group-hover:text-[#143a6b]">
                  View Details
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">PRICE</p>
          <h2 className="mt-3 text-3xl font-black text-[#143a6b]">Fee Guide</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {services.map((service) => (
              <div key={service.slug} className="grid gap-2 border-b border-slate-200 p-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                <span className="font-bold">{service.title}</span>
                <span className="text-2xl font-black text-[#143a6b]">{service.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Final fees depend on the case, family members, and additional materials. We provide a quote after consultation.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">FLOW</p>
          <h2 className="mt-3 text-3xl font-black text-[#143a6b]">Process</h2>
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
          <h2 className="mt-3 text-3xl font-black">Start with a consultation</h2>
          <p className="mt-4 text-3xl font-black">{phoneDisplay}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={phoneHref}
              className="rounded-full bg-white px-8 py-4 text-sm font-black text-[#143a6b] transition hover:bg-[#eef6ff]"
            >
              Call Us
            </a>
            <Link
              href="/en/contact"
              className="rounded-full bg-[#caa15a] px-8 py-4 text-sm font-black text-white transition hover:bg-[#b58a42]"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
