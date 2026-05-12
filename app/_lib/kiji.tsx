import fs from "node:fs";
import path from "node:path";

export type KijiArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  draft: boolean;
  body: string;
};

const kijiDir = path.join(process.cwd(), "kiji");

function parseFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: source };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    data[key] = value;
  }

  return {
    data,
    body: source.slice(match[0].length),
  };
}

export function getKijiArticles(): KijiArticle[] {
  if (!fs.existsSync(kijiDir)) return [];

  return fs
    .readdirSync(kijiDir)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b, "ja"))
    .map((file) => {
      const source = fs.readFileSync(path.join(kijiDir, file), "utf8");
      const { data, body } = parseFrontmatter(source);
      const fallbackSlug = file.replace(/^\d+_/, "").replace(/\.mdx$/, "").replace(/\s+\(1\)$/, "");

      return {
        slug: data.slug ?? fallbackSlug,
        title: data.title ?? fallbackSlug,
        description: data.description ?? "",
        category: data.category ?? "ビザ申請",
        draft: false,
        body,
      };
    });
}

export function getKijiArticle(slug: string) {
  return getKijiArticles().find((article) => article.slug === slug);
}

export function getServiceForCategory(category: string) {
  if (category.includes("永住")) {
    return { href: "/permanent-residence", label: "永住申請" };
  }
  if (category.includes("経営")) {
    return { href: "/business-manager", label: "経営管理ビザ" };
  }
  if (category.includes("帰化")) {
    return { href: "/naturalization", label: "帰化申請" };
  }
  if (category.includes("家族滞在")) {
    return { href: "/family-stay", label: "家族滞在ビザ" };
  }
  if (category.includes("特定技能")) {
    return { href: "/specified-skilled-worker", label: "特定技能ビザ" };
  }
  if (category.includes("技人国") || category.includes("就労") || category.includes("外国人雇用")) {
    return { href: "/engineer-visa", label: "就労ビザ・技人国ビザ" };
  }
  return { href: "/spouse-visa", label: "日本人配偶者ビザ申請" };
}

function renderInline(text: string) {
  const withoutLinks = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const parts = withoutLinks.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function isTableSeparator(line: string) {
  const cells = line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function renderTable(lines: string[], key: string) {
  const tableLines = lines
    .flatMap((line) => line.split(/\r?\n/))
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|") && !isTableSeparator(line));

  const rows = tableLines
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim()),
    );

  if (rows.length === 0) return null;
  const [head, ...body] = rows;

  return (
    <div key={key} className="my-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-[640px] w-full border-collapse text-left text-sm">
        <thead className="bg-[#f4f8ff] text-[#143a6b]">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="whitespace-normal border-b border-slate-200 px-4 py-3 align-top font-black">
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-slate-100 last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="whitespace-normal px-4 py-3 align-top leading-7 text-slate-700">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function calloutClass(type: string) {
  if (type === "danger") return "border-[#e96078]/30 bg-[#fff8fa] text-slate-700";
  if (type === "warning") return "border-[#caa15a]/40 bg-[#fff9ed] text-slate-700";
  return "border-[#143a6b]/15 bg-[#f4f8ff] text-slate-700";
}

export function RenderKijiBody({ body }: { body: string }) {
  const normalized = body
    .replace(/<TableOfContents\s*\/>/g, "")
    .replace(/<LeadText>([\s\S]*?)<\/LeadText>/g, ":::lead\n$1\n:::")
    .replace(/<AuthorNote>([\s\S]*?)<\/AuthorNote>/g, ":::author\n$1\n:::")
    .replace(/<Callout type=\"([^\"]+)\">([\s\S]*?)<\/Callout>/g, ":::callout-$1\n$2\n:::")
    .replace(/<FAQ>\s*<Question>([\s\S]*?)<\/Question>\s*<Answer>([\s\S]*?)<\/Answer>\s*<\/FAQ>/g, ":::faq\n$1\n---answer---\n$2\n:::");

  const blocks = normalized.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const rendered = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const key = `block-${index}`;

    if (block === "---") continue;
    if (block === ":::") continue;
    if (block.startsWith("# ")) continue;

    if (block.startsWith("## ")) {
      rendered.push(
        <h2 key={key} className="mt-12 text-2xl font-black leading-tight text-[#143a6b] sm:text-3xl">
          {renderInline(block.replace(/^##\s+/, ""))}
        </h2>,
      );
      continue;
    }

    if (block.startsWith("### ")) {
      rendered.push(
        <h3 key={key} className="mt-9 text-xl font-black leading-tight text-[#143a6b]">
          {renderInline(block.replace(/^###\s+/, ""))}
        </h3>,
      );
      continue;
    }

    if (block.startsWith(":::lead")) {
      rendered.push(
        <p key={key} className="rounded-[24px] bg-[#f8fbff] p-6 text-base font-bold leading-9 text-[#143a6b]">
          {renderInline(block.replace(/^:::lead\n?/, "").replace(/\n?:::$/, "").trim())}
        </p>,
      );
      continue;
    }

    if (block.startsWith(":::author")) {
      rendered.push(
        <div key={key} className="rounded-2xl border-l-4 border-[#caa15a] bg-white p-5 text-sm leading-8 text-slate-700 shadow-sm">
          {renderInline(block.replace(/^:::author\n?/, "").replace(/\n?:::$/, "").trim())}
        </div>,
      );
      continue;
    }

    if (block.startsWith(":::callout-")) {
      const type = block.match(/^:::callout-([^\n]+)/)?.[1] ?? "info";
      const text = block.replace(/^:::callout-[^\n]+\n?/, "").replace(/\n?:::$/, "").trim();
      rendered.push(
        <div key={key} className={`rounded-2xl border p-5 text-sm font-bold leading-8 ${calloutClass(type)}`}>
          {renderInline(text)}
        </div>,
      );
      continue;
    }

    if (block.startsWith(":::faq")) {
      const [question, answer] = block
        .replace(/^:::faq\n?/, "")
        .replace(/\n?:::$/, "")
        .split("---answer---")
        .map((part) => part.trim());
      rendered.push(
        <details key={key} className="rounded-2xl bg-[#f8fbff] p-5 shadow-sm">
          <summary className="cursor-pointer list-none text-lg font-black text-[#143a6b]">
            Q. {renderInline(question)}
          </summary>
          <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-8 text-slate-700">
            A. {renderInline(answer ?? "")}
          </p>
        </details>,
      );
      continue;
    }

    if (block.startsWith("|")) {
      rendered.push(renderTable(block.split(/\r?\n/), key));
      continue;
    }

    if (block.startsWith("- ")) {
      rendered.push(
        <ul key={key} className="my-5 space-y-3">
          {block.split(/\n/).map((item) => (
            <li key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 shadow-sm">
              {renderInline(item.replace(/^-\s+/, ""))}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(block)) {
      rendered.push(
        <ol key={key} className="my-5 space-y-3">
          {block.split(/\n/).map((item) => (
            <li key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 shadow-sm">
              {renderInline(item.replace(/^\d+\.\s+/, ""))}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    rendered.push(
      <p key={key} className="text-sm leading-8 text-slate-700 sm:text-base">
        {renderInline(block.replace(/\n/g, " "))}
      </p>,
    );
  }

  return <div className="space-y-5">{rendered}</div>;
}
