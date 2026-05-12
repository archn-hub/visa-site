import Image from "next/image";
import { lineOfficialUrl, wechatId, wechatQrPath } from "../_lib/site";

type Locale = "ja" | "en" | "zh";
type Tone = "light" | "dark";

const labels = {
  ja: {
    line: "LINEで相談",
    wechat: "WeChatで相談",
    id: "微信号",
    note: "WeChatでQRコードを読み取るか、上記IDを検索して追加してください。",
  },
  en: {
    line: "LINE Consultation",
    wechat: "WeChat Consultation",
    id: "WeChat ID",
    note: "Scan the QR code in WeChat or search this ID to add us.",
  },
  zh: {
    line: "LINE咨询",
    wechat: "微信咨询",
    id: "微信号",
    note: "请用微信扫描二维码，或搜索以上ID添加。",
  },
};

export function SocialContactButtons({
  locale,
  tone = "dark",
  className = "",
}: {
  locale: Locale;
  tone?: Tone;
  className?: string;
}) {
  const text = labels[locale];
  const lineClass =
    tone === "dark"
      ? "rounded-full bg-[#06c755] px-7 py-4 text-sm font-black text-white transition hover:bg-[#05a948]"
      : "rounded-full bg-[#06c755] px-7 py-4 text-sm font-black text-white transition hover:bg-[#05a948]";
  const wechatSummaryClass =
    tone === "dark"
      ? "cursor-pointer list-none rounded-full bg-[#1aad19] px-7 py-4 text-center text-sm font-black text-white transition hover:bg-[#148f14]"
      : "cursor-pointer list-none rounded-full bg-[#1aad19] px-7 py-4 text-center text-sm font-black text-white transition hover:bg-[#148f14]";
  const panelClass =
    tone === "dark"
      ? "mt-3 rounded-2xl bg-white p-4 text-left text-[#0b2344] shadow-xl"
      : "mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-left text-[#0b2344] shadow-sm";

  return (
    <div className={`flex flex-col justify-center gap-3 sm:flex-row ${className}`}>
      {lineOfficialUrl && (
        <a href={lineOfficialUrl} target="_blank" rel="noopener noreferrer" className={lineClass}>
          {text.line}
        </a>
      )}
      <details className="relative">
        <summary className={wechatSummaryClass}>{text.wechat}</summary>
        <div className={panelClass}>
          <div className="mx-auto mb-4 w-36 overflow-hidden rounded-xl bg-white p-2">
            <Image
              src={wechatQrPath}
              alt={text.wechat}
              width={218}
              height={300}
              className="h-auto w-full"
            />
          </div>
          <p className="text-xs font-black tracking-[0.18em] text-[#caa15a]">{text.id}</p>
          <p className="mt-2 text-2xl font-black">{wechatId}</p>
          <p className="mt-2 text-xs leading-6 text-slate-600">{text.note}</p>
        </div>
      </details>
    </div>
  );
}
