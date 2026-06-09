"use client";

import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/layout/PageWrapper";

const PetaMap = dynamic(() => import("@/components/map/PetaMap"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <PageWrapper contained={false} padded={false}>
      <PetaMap />
    </PageWrapper>
  );
}
