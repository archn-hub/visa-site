"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Script from "next/script";

type Values = {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  status: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const initialValues: Values = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  status: "",
  message: "",
};

const statusOptions = [
  "短期滞在",
  "留学",
  "技术・人文知识・国际业务",
  "家族滞在",
  "特定技能",
  "日本人配偶者等",
  "永住者",
  "定住者",
  "经营・管理",
  "其他",
];

function validate(values: Values) {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "请输入姓名。";
  if (!values.email.trim()) {
    errors.email = "请输入邮箱地址。";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "请确认邮箱地址格式。";
  }
  if (!values.phone.trim()) errors.phone = "请输入电话号码。";
  if (!values.nationality.trim()) errors.nationality = "请输入国籍。";
  if (!values.status.trim()) errors.status = "请选择目前的在留资格。";
  if (!values.message.trim()) errors.message = "请输入咨询内容。";

  return errors;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-sm font-black text-[#143a6b]">
      {children}
      <span className="rounded-full bg-[#e96078]/10 px-2 py-1 text-xs font-black text-[#e3425d]">
        必填
      </span>
    </span>
  );
}

export function ChineseContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(name: keyof Values, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function getRecaptchaToken() {
    if (!recaptchaSiteKey) return "";
    if (!window.grecaptcha) {
      throw new Error("reCAPTCHA 未能加载。请刷新页面后再试。");
    }

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha?.ready(() => {
        window.grecaptcha
          ?.execute(recaptchaSiteKey, { action: "contact" })
          .then(resolve)
          .catch(() => reject(new Error("reCAPTCHA 验证失败。")));
      });
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      formData.set("recaptchaToken", await getRecaptchaToken());
      const response = await fetch("/contact/submit", {
        method: "POST",
        body: formData,
        headers: {
          "x-contact-form": "fetch",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setSubmitError("发送失败。请稍后再试。");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "发送失败。");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_16px_40px_rgba(11,35,68,0.08)] sm:p-10">
        <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">THANK YOU</p>
        <h1 className="mt-4 text-3xl font-black text-[#143a6b] sm:text-4xl">
          咨询内容已发送
        </h1>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          我们会确认内容后尽快与您联系。
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setValues(initialValues);
              setErrors({});
              setSubmitted(false);
            }}
            className="rounded-full bg-[#143a6b] px-7 py-4 text-sm font-black text-white transition hover:bg-[#0b2344]"
          >
            继续咨询
          </button>
          <Link
            href="/zh-cn"
            className="rounded-full border border-[#143a6b]/25 px-7 py-4 text-sm font-black text-[#143a6b] transition hover:bg-[#f4f8ff]"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}
      <form
        action="/contact/submit"
        method="post"
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(11,35,68,0.08)] sm:p-8"
      >
        {(Object.keys(errors).length > 0 || submitError) && (
          <div className="mb-6 rounded-2xl border border-[#e96078]/30 bg-[#e96078]/10 p-4 text-sm font-bold leading-7 text-[#b8324a]">
            {submitError || "请确认必填项目。"}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <FieldLabel>姓名</FieldLabel>
            <input
              name="name"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
              autoComplete="name"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            />
            {errors.name && <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.name}</p>}
          </label>

          <label className="block">
            <FieldLabel>邮箱地址</FieldLabel>
            <input
              name="email"
              type="text"
              inputMode="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
              autoComplete="email"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            />
            {errors.email && <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.email}</p>}
          </label>

          <label className="block">
            <FieldLabel>电话号码</FieldLabel>
            <input
              name="phone"
              type="tel"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              required
              autoComplete="tel"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            />
            {errors.phone && <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.phone}</p>}
          </label>

          <label className="block">
            <FieldLabel>国籍</FieldLabel>
            <input
              name="nationality"
              value={values.nationality}
              onChange={(event) => updateField("nationality", event.target.value)}
              required
              autoComplete="country-name"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            />
            {errors.nationality && (
              <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.nationality}</p>
            )}
          </label>

          <label className="block md:col-span-2">
            <FieldLabel>目前的在留资格</FieldLabel>
            <select
              name="status"
              value={values.status}
              onChange={(event) => updateField("status", event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            >
              <option value="">请选择</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.status}</p>}
          </label>

          <label className="block md:col-span-2">
            <FieldLabel>咨询内容</FieldLabel>
            <textarea
              name="message"
              value={values.message}
              onChange={(event) => updateField("message", event.target.value)}
              rows={8}
              required
              className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            />
            {errors.message && (
              <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.message}</p>
            )}
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-[#143a6b] px-8 py-4 text-sm font-black text-white transition hover:bg-[#0b2344] focus:outline-none focus:ring-4 focus:ring-[#caa15a]/30"
          >
            {isSubmitting ? "发送中..." : "发送咨询"}
          </button>
          <p className="text-xs leading-6 text-slate-500">
            您填写的信息仅用于回复本次咨询。
          </p>
        </div>
      </form>
    </>
  );
}
