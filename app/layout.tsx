import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "./_components/Analytics";
import { siteDescription, siteName, siteUrl } from "./_lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "行政書士アーチ事務所 | 全国対応のビザ申請サポート",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "ビザ申請",
    "在留資格",
    "行政書士",
    "配偶者ビザ",
    "就労ビザ",
    "永住申請",
    "帰化申請",
    "経営管理ビザ",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "行政書士アーチ事務所 | 全国対応のビザ申請サポート",
    description: siteDescription,
    url: "/",
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "行政書士アーチ事務所 | 全国対応のビザ申請サポート",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
