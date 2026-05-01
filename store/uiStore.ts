import { create } from "zustand";
import type { LaporanFilterValues } from "@/schemas";

// ─── Types ────────────────────────────────────────────────────────────────────

type LaporanFormStep = 1 | 2 | 3;

interface UiState {
    // ── Form Laporan Multi-Step ──────────────────────────────────────────────
    laporanFormStep: LaporanFormStep;
    setLaporanFormStep: (step: LaporanFormStep) => void;
    nextLaporanStep: () => void;
    prevLaporanStep: () => void;
    resetLaporanStep: () => void;

    // ── Filter Laporan ───────────────────────────────────────────────────────
    activeFilter: LaporanFilterValues;
    setActiveFilter: (filter: LaporanFilterValues) => void;
    resetActiveFilter: () => void;

    // ── Bottom Sheet / Modal ─────────────────────────────────────────────────
    isFilterSheetOpen: boolean;
    setFilterSheetOpen: (open: boolean) => void;

    isDeleteModalOpen: boolean;
    deletingReportId: string | null;
    openDeleteModal: (reportId: string) => void;
    closeDeleteModal: () => void;
}

// ─── Default Filter ───────────────────────────────────────────────────────────

const DEFAULT_FILTER: LaporanFilterValues = {
    status: "active",
};

// ─── Store ────────────────────────────────────────────────────────────────────
// Tidak di-persist — UI state selalu fresh saat halaman di-load ulang.

export const useUiStore = create<UiState>()((set, get) => ({
    // ── Form Laporan Multi-Step ──────────────────────────────────────────────
    laporanFormStep: 1,

    setLaporanFormStep: (step) => set({ laporanFormStep: step }),

    nextLaporanStep: () => {
        const current = get().laporanFormStep;
        if (current < 3) set({ laporanFormStep: (current + 1) as LaporanFormStep });
    },

    prevLaporanStep: () => {
        const current = get().laporanFormStep;
        if (current > 1) set({ laporanFormStep: (current - 1) as LaporanFormStep });
    },

    resetLaporanStep: () => set({ laporanFormStep: 1 }),

    // ── Filter Laporan ───────────────────────────────────────────────────────
    activeFilter: DEFAULT_FILTER,

    setActiveFilter: (filter) => set({ activeFilter: filter }),

    resetActiveFilter: () => set({ activeFilter: DEFAULT_FILTER }),

    // ── Bottom Sheet / Modal ─────────────────────────────────────────────────
    isFilterSheetOpen: false,
    setFilterSheetOpen: (open) => set({ isFilterSheetOpen: open }),

    isDeleteModalOpen: false,
    deletingReportId: null,

    openDeleteModal: (reportId) =>
        set({ isDeleteModalOpen: true, deletingReportId: reportId }),

    closeDeleteModal: () =>
        set({ isDeleteModalOpen: false, deletingReportId: null }),
}));