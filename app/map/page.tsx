"use client";

import dynamic from "next/dynamic";

const PetaMap = dynamic(() => import("@/components/map/PetaMap"), {
  ssr: false,
});

export default function MapPage() {
  return <PetaMap />;
}
