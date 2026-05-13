import fs from "node:fs";
import path from "node:path";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://visa-site-qeif.vercel.app";
const root = process.cwd();

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function unique(items) {
  return Array.from(new Set(items));
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absoluteUrl(route) {
  return new URL(route, siteUrl).toString();
}

function slugsFromVisaData(filePath) {
  return unique(
    Array.from(read(filePath).matchAll(/slug:\s*"([^"]+)"/g), (match) => match[1]),
  );
}

function slugsFromKiji() {
  const kijiDir = path.join(root, "kiji");
  if (!fs.existsSync(kijiDir)) return [];

  return fs
    .readdirSync(kijiDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(kijiDir, file), "utf8");
      return source.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
    })
    .filter(Boolean);
}

const now = new Date().toISOString();
const routes = [
  "/",
  "/contact",
  "/en",
  "/en/contact",
  "/zh-cn",
  "/zh-cn/contact",
  ...slugsFromVisaData("app/_data/visaPages.ts").map((slug) => `/${slug}`),
  ...slugsFromVisaData("app/_data/visaPagesEn.ts").map((slug) => `/en/${slug}`),
  ...slugsFromVisaData("app/_data/visaPagesZhCn.ts").map((slug) => `/zh-cn/${slug}`),
  "/blog/ja",
  ...slugsFromKiji().map((slug) => `/blog/ja/${slug}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique(routes)
  .map(
    (route) => `  <url>
    <loc>${escapeXml(absoluteUrl(route))}</loc>
    <lastmod>${now}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
Sitemap: ${absoluteUrl("/sitemap-static.xml")}
`;

fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(root, "public", "sitemap-static.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(root, "public", "robots.txt"), robots, "utf8");
