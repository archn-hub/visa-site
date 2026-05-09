import type { Metadata } from "next";
import { VisaDetailPage } from "../_components/VisaDetailPage";
import { visaPages } from "../_data/visaPages";
import { createVisaMetadata } from "../_lib/metadata";

const page = visaPages["business-manager"];

export const metadata: Metadata = createVisaMetadata(page);

export default function BusinessManagerPage() {
  return <VisaDetailPage page={page} />;
}
