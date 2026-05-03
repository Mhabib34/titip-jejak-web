import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";

// ─── Instance ─────────────────────────────────────────────────────────────────

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
    withCredentials: true, // kirim cookie httpOnly otomatis (auth web)
    headers: {
        "Content-Type": "application/json",
        "X-Client-Type": "web",
    },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (process.env.NODE_ENV === "development") {
            console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Tangani 401 → coba refresh token sekali, lalu retry request asli.
// Kalau refresh juga gagal → clear auth store saja, JANGAN redirect global.
// Redirect ke /login hanya dilakukan oleh middleware untuk protected routes,
// atau oleh komponen/hook yang memang butuh auth.

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: AxiosError | null) {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(undefined);
    });
    failedQueue = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        const is401 = error.response?.status === 401;
        const isRefreshEndpoint = originalRequest.url?.includes("/auth/refresh");
        const alreadyRetried = originalRequest._retry;

        if (!is401 || isRefreshEndpoint || alreadyRetried) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(() => api(originalRequest))
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            await api.post("/auth/refresh");
            processQueue(null);
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError as AxiosError);

            // Refresh gagal → clear auth store saja.
            // Middleware akan redirect ke /login jika user mencoba akses protected route.
            // Halaman publik (home, laporan, dll) tetap bisa diakses tanpa login.
            if (typeof window !== "undefined") {
                useAuthStore.getState().clearUser();
            }

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;