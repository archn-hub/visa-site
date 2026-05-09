import type { Metadata } from "next";
import { VisaDetailPage } from "../_components/VisaDetailPage";
import { visaPages } from "../_data/visaPages";
import { createVisaMetadata } from "../_lib/metadata";

const page = visaPages["engineer-visa"];

export const metadata: Metadata = createVisaMetadata(page);

export default function EngineerVisaPage() {
  return <VisaDetailPage page={page} />;
}
