import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
    user: UserProfile | null;
    isLoggedIn: boolean;

    // Actions
    setUser: (user: UserProfile) => void;
    clearUser: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────
// Persist hanya data user (bukan token — token ada di cookie httpOnly).
// Sehingga saat refresh halaman, user tidak perlu fetch /auth/me lagi
// kecuali cookie sudah expired.

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,

            setUser: (user) => set({ user, isLoggedIn: true }),

            clearUser: () => set({ user: null, isLoggedIn: false }),
        }),
        {
            name: "temukan-auth", // key di localStorage
            // Hanya persist field yang diperlukan
            partialize: (state) => ({
                user: state.user,
                isLoggedIn: state.isLoggedIn,
            }),
        }
    )
);