import type { Metadata } from "next";
import { VisaDetailPage } from "../_components/VisaDetailPage";
import { visaPages } from "../_data/visaPages";
import { createVisaMetadata } from "../_lib/metadata";

const page = visaPages["permanent-residence"];

export const metadata: Metadata = createVisaMetadata(page);

export default function PermanentResidencePage() {
  return <VisaDetailPage page={page} />;
}
