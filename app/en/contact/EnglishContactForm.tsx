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
  "Temporary Visitor",
  "Student",
  "Engineer/Specialist in Humanities/International Services",
  "Dependent",
  "Spouse of Japanese National",
  "Permanent Resident",
  "Long-Term Resident",
  "Business Manager",
  "Other",
];

function validate(values: Values) {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please check the email address format.";
  }
  if (!values.phone.trim()) errors.phone = "Please enter your phone number.";
  if (!values.nationality.trim()) errors.nationality = "Please enter your nationality.";
  if (!values.status.trim()) errors.status = "Please select your current status.";
  if (!values.message.trim()) errors.message = "Please enter your consultation details.";

  return errors;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-sm font-black text-[#143a6b]">
      {children}
      <span className="rounded-full bg-[#e96078]/10 px-2 py-1 text-xs font-black text-[#e3425d]">
        Required
      </span>
    </span>
  );
}

export function EnglishContactForm() {
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
      throw new Error("Could not load reCAPTCHA. Please reload the page.");
    }

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha?.ready(() => {
        window.grecaptcha
          ?.execute(recaptchaSiteKey, { action: "contact" })
          .then(resolve)
          .catch(() => reject(new Error("reCAPTCHA verification failed.")));
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

      setSubmitError("Could not send your message. Please try again later.");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not send your message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_16px_40px_rgba(11,35,68,0.08)] sm:p-10">
        <p className="text-sm font-black tracking-[0.2em] text-[#caa15a]">THANK YOU</p>
        <h1 className="mt-4 text-3xl font-black text-[#143a6b] sm:text-4xl">
          Your message has been sent
        </h1>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          We will review your inquiry and contact you shortly.
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
            Send Another Message
          </button>
          <Link
            href="/en"
            className="rounded-full border border-[#143a6b]/25 px-7 py-4 text-sm font-black text-[#143a6b] transition hover:bg-[#f4f8ff]"
          >
            Back to Home
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
            {submitError || "Please check the required fields."}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <FieldLabel>Name</FieldLabel>
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
            <FieldLabel>Email Address</FieldLabel>
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
            <FieldLabel>Phone Number</FieldLabel>
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
            <FieldLabel>Nationality</FieldLabel>
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
            <FieldLabel>Current Residence Status</FieldLabel>
            <select
              name="status"
              value={values.status}
              onChange={(event) => updateField("status", event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#143a6b] focus:ring-4 focus:ring-[#143a6b]/10"
            >
              <option value="">Please select</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && <p className="mt-2 text-xs font-bold text-[#e3425d]">{errors.status}</p>}
          </label>

          <label className="block md:col-span-2">
            <FieldLabel>Consultation Details</FieldLabel>
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
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          <p className="text-xs leading-6 text-slate-500">
            We use your inquiry only to respond to your consultation request.
          </p>
        </div>
      </form>
    </>
  );
}
