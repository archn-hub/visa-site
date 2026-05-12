import type { Metadata } from "next";
import { VisaDetailPage } from "../_components/VisaDetailPage";
import { visaPages } from "../_data/visaPages";
import { createVisaMetadata } from "../_lib/metadata";

const page = visaPages["specified-skilled-worker"];

export const metadata: Metadata = createVisaMetadata(page);

export default function SpecifiedSkilledWorkerPage() {
  return <VisaDetailPage page={page} />;
}
