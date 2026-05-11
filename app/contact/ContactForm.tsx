"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  status: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const initialValues: FormValues = {
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
  "技術・人文知識・国際業務",
  "家族滞在",
  "日本人の配偶者等",
  "永住者",
  "定住者",
  "経営・管理",
  "その他",
];

function validate(values: FormValues) {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "名前を入力してください。";
  if (!values.email.trim()) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "メールアドレスの形式を確認してください。";
  }
  if (!values.phone.trim()) errors.phone = "電話番号を入力してください。";
  if (!values.nationality.trim()) errors.nationality = "国籍を入力してください。";
  if (!values.status.trim()) errors.status = "現在の在留資格を選択してください。";
  if (!values.message.trim()) errors.message = "相談内容を入力してください。";

  return errors;
}

function FieldLabel({ children, required = true }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-sm font-black text-[#143a6b]">
      {children}
      {required && (
        <span className="rounded-full bg-[#e96078]/10 px-2 py-1 text-xs font-black text-[#e3425d]">
          必須
        </span>
      )}
    </span>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function updateField(name: keyof FormValues, value: string) {
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
      throw new Error("reCAPTCHAを読み込めませんでした。ページを再読み込みしてください。");
    }

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha?.ready(() => {
        window.grecaptcha
          ?.execute(recaptchaSiteKey, { action: "contact" })
          .then(resolve)
          .catch(() => reject(new Error("reCAPTCHAの確認に失敗しました。")));
      });
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitting(true);
      const formData = new FormData(event.currentTarget);
      let response: Response;

      try {
        const recaptchaToken = await getRecaptchaToken();
        formData.set("recaptchaToken", recaptchaToken);
        response = await fetch("/contact/submit", {
          method: "POST",
          body: formData,
          headers: {
            "x-contact-form": "fetch",
          },
        });
      } catch (error) {
        setIsSubmitting(false);
        setSubmitError(
          error instanceof Error
            ? error.message
            : "reCAPTCHAの確認に失敗しました。時間をおいて再度お試しください。",
        );
        return;
      }

      setIsSubmitting(false);

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const result = await response.json().catch(() => null);
      if (result?.errors) {
        setErrors(result.errors);
      }
      setSubmitError(result?.message ?? "送信できませんでした。時間をおいて再度お試しください。");
    }
  }

  if (submitted) {
    return (
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_16px_40px_rgba(11,35,68,0.08)] sm:p-10">
          <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">THANK YOU</p>
          <h1 className="mt-4 text-3xl font-black text-[#143a6b] sm:text-4xl">
            お問い合わせを受け付けました
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            内容を確認し、担当者よりご連絡いたします。お急ぎの場合はお電話でもご相談ください。
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
              もう一度送信する
            </button>
            <Link
              href="/"
              className="rounded-full border border-[#143a6b]/25 px-7 py-4 text-sm font-black text-[#143a6b] transition hover:bg-[#f4f8ff]"
            >
              トップページへ戻る
            </Link>
          </div>
        </div>
      </section>
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
      {hasErrors && (
        <div className="mb-6 rounded-2xl border border-[#e96078]/30 bg-[#e96078]/10 p-4 text-sm font-bold leading-7 text-[#b8324a]">
          入力内容をご確認ください。必須項目が未入力、または形式が正しくない項目があります。
        </div>
      )}
      {submitError && (
        <div className="mb-6 rounded-2xl border border-[#e96078]/30 bg-[#e96078]/10 p-4 text-sm font-bold leading-7 text-[#b8324a]">
          {submitError}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <FieldLabel>名前</FieldLabel>
          <input
            name="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
          />
          {errors.name && <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.name}</p>}
        </label>

        <label className="block">
          <FieldLabel>メールアドレス</FieldLabel>
          <input
            name="email"
            type="text"
            inputMode="email"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
          />
          {errors.email && <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.email}</p>}
        </label>

        <label className="block">
          <FieldLabel>電話番号</FieldLabel>
          <input
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
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
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            aria-invalid={Boolean(errors.nationality)}
            autoComplete="country-name"
          />
          {errors.nationality && (
            <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.nationality}</p>
          )}
        </label>

        <label className="block md:col-span-2">
          <FieldLabel>現在の在留資格</FieldLabel>
          <select
            name="status"
            value={values.status}
            onChange={(event) => updateField("status", event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            aria-invalid={Boolean(errors.status)}
          >
            <option value="">選択してください</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.status}</p>}
        </label>

        <label className="block md:col-span-2">
          <FieldLabel>相談内容</FieldLabel>
          <textarea
            name="message"
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            rows={8}
            required
            className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            aria-invalid={Boolean(errors.message)}
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
          {isSubmitting ? "送信中..." : "送信する"}
        </button>
        <p className="text-xs leading-6 text-slate-500">
          送信内容は当事務所への相談対応のために使用します。確認後、担当者よりご連絡いたします。
        </p>
      </div>
      </form>
    </>
  );
}
