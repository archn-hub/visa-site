export const siteName = "行政書士アーチ事務所";
export const siteDescription =
  "配偶者ビザ、就労ビザ、技術・人文知識・国際業務、永住申請、帰化申請、経営管理ビザを全国対応でサポートする行政書士事務所です。";
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? vercelProductionUrl ?? "http://localhost:3000";
export const phoneDisplay = "0120-77-9885";
export const phoneHref = "tel:0120779885";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
