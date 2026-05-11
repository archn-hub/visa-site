import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type ContactValues = {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  status: string;
  message: string;
};

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

function getString(formData: FormData, key: keyof ContactValues) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validate(values: ContactValues) {
  const errors: Partial<Record<keyof ContactValues, string>> = {};

  if (!values.name) errors.name = "名前を入力してください。";
  if (!values.email) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "メールアドレスの形式を確認してください。";
  }
  if (!values.phone) errors.phone = "電話番号を入力してください。";
  if (!values.nationality) errors.nationality = "国籍を入力してください。";
  if (!values.status) errors.status = "現在の在留資格を選択してください。";
  if (!values.message) errors.message = "相談内容を入力してください。";

  return errors;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmail(values: ContactValues) {
  const rows = [
    ["名前", values.name],
    ["メールアドレス", values.email],
    ["電話番号", values.phone],
    ["国籍", values.nationality],
    ["現在の在留資格", values.status],
    ["相談内容", values.message],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="width: 160px; padding: 12px; text-align: left; background: #f4f8ff; border: 1px solid #dbe4f0;">${escapeHtml(label)}</th>
          <td style="padding: 12px; border: 1px solid #dbe4f0; white-space: pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return {
    subject: `【ビザ相談】${values.name}様からのお問い合わせ`,
    text,
    html: `
      <div style="font-family: Arial, sans-serif; color: #0b2344;">
        <h1 style="font-size: 20px;">お問い合わせが届きました</h1>
        <table style="border-collapse: collapse; width: 100%; max-width: 720px;">${htmlRows}</table>
      </div>`,
  };
}

async function sendEmail(values: ContactValues) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("メール送信に必要な環境変数が設定されていません。");
  }

  const email = buildEmail(values);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: values.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`メール送信に失敗しました: ${body}`);
  }
}

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) return;
  if (!token) {
    throw new Error("reCAPTCHAトークンがありません。");
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  if (!response.ok) {
    throw new Error("reCAPTCHA検証に失敗しました。");
  }

  const result = (await response.json()) as RecaptchaResponse;
  const threshold = Number(process.env.RECAPTCHA_SCORE_THRESHOLD ?? "0.5");

  if (!result.success || result.action !== "contact" || (result.score ?? 0) < threshold) {
    throw new Error("reCAPTCHA検証に失敗しました。");
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const values: ContactValues = {
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    nationality: getString(formData, "nationality"),
    status: getString(formData, "status"),
    message: getString(formData, "message"),
  };
  const isFetchRequest = request.headers.get("x-contact-form") === "fetch";
  const errors = validate(values);

  if (Object.keys(errors).length > 0) {
    if (isFetchRequest) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }
    redirect("/contact");
  }

  try {
    const recaptchaToken = formData.get("recaptchaToken");
    await verifyRecaptcha(typeof recaptchaToken === "string" ? recaptchaToken : "");
    await sendEmail(values);
  } catch (error) {
    console.error(error);
    if (isFetchRequest) {
      return NextResponse.json(
        { ok: false, message: "送信できませんでした。時間をおいて再度お試しください。" },
        { status: 500 },
      );
    }
    redirect("/contact?error=send");
  }

  if (isFetchRequest) {
    return NextResponse.json({ ok: true });
  }

  redirect("/contact/thanks");
}
