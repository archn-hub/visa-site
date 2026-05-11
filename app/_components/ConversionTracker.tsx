"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const googleAdsConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export function ConversionTracker() {
  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("event", "generate_lead", {
      event_category: "contact",
      event_label: "contact_form",
    });

    if (googleAdsId && googleAdsConversionLabel) {
      window.gtag("event", "conversion", {
        send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
      });
    }
  }, []);

  return null;
}
