"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ArrowRight, Share2, User } from "lucide-react";
import type { Report } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  missing: {
    label: "Hilang",
    className: "bg-red-500 text-white",
  },
  found: {
    label: "Ditemukan",
    className: "bg-emerald-500 text-white",
  },
};

const GENDER_LABEL: Record<string, string> = {
  male: "Laki-laki",
  female: "Perempuan",
  unknown: "Tidak diketahui",
};

function formatTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} mnt lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ReportCardProps {
  laporan: Report;
}

export function ReportCard({ laporan }: ReportCardProps) {
  const typeConfig = TYPE_CONFIG[laporan.type];

  return (
    <Link
      href={`/report/${laporan.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-stone-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Foto */}
      <div
        className="relative w-full overflow-hidden bg-stone-100"
        style={{ aspectRatio: "3/4" }}
      >
        {laporan.photo_url ? (
          <Image
            src={laporan.photo_url}
            alt={laporan.name ?? "Foto laporan"}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <User size={48} className="text-stone-300" />
          </div>
        )}

        {/* Type badge — atas kiri */}
        <span
          className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] md:text-[11px] font-bold tracking-wide uppercase shadow-sm ${typeConfig.className}`}
        >
          {typeConfig.label}
        </span>

        {/* Share button — atas kanan */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (navigator.share) {
              navigator.share({
                title: laporan.name ?? "Laporan",
                url: `/report/${laporan.id}`,
              });
            }
          }}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-stone-600 backdrop-blur-sm transition hover:bg-white hover:text-orange-500 shadow-sm"
          aria-label="Bagikan"
        >
          <Share2 size={13} />
        </button>

        {/* Resolved overlay */}
        {laporan.status === "resolved" && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/50">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-stone-700 shadow-sm">
              ✓ Sudah Ditemukan
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3.5 md:p-4">
        {/* Nama */}
        <h3 className="text-sm md:text-base font-extrabold text-stone-900 line-clamp-1 group-hover:text-orange-500 transition-colors">
          {laporan.name ?? "Nama tidak diketahui"}
        </h3>

        {/* Gender & Umur */}
        <p className="text-[11px] md:text-xs text-stone-400 font-medium mt-0.5">
          {GENDER_LABEL[laporan.gender]}
          {laporan.estimated_age ? ` · ${laporan.estimated_age} Thn` : ""}
        </p>

        {/* Lokasi */}
        <p className="flex items-center gap-1.5 text-xs md:text-sm text-stone-600 mt-2.5">
          <MapPin size={13} className="shrink-0 text-orange-500" />
          <span className="line-clamp-1">
            {laporan.last_seen_location}, {laporan.city}
          </span>
        </p>

        {/* Footer: waktu + arrow */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-3 mt-3">
          <p className="flex items-center gap-1.5 text-[10px] md:text-xs text-stone-400">
            <Clock size={12} className="shrink-0" />
            Update {formatTimeAgo(laporan.created_at)}
          </p>
          <span className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function ReportCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm animate-pulse">
      <div
        className="w-full bg-stone-100"
        style={{ aspectRatio: "3/4" }}
      />
      <div className="flex flex-col p-3.5 md:p-4 gap-2.5">
        {/* Nama skeleton */}
        <div className="h-4 w-3/4 rounded-full bg-stone-100" />
        {/* Gender & Age skeleton */}
        <div className="h-3 w-1/2 rounded-full bg-stone-100" />
        {/* Lokasi skeleton */}
        <div className="h-4 w-5/6 rounded-full bg-stone-100 mt-1" />
        {/* Divider + Footer skeleton */}
        <div className="border-t border-stone-100 pt-3 mt-1 flex justify-between items-center">
          <div className="h-3 w-1/3 rounded-full bg-stone-100" />
          <div className="h-6 w-6 rounded-full bg-stone-100" />
        </div>
      </div>
    </div>
  );
}
