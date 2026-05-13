import {getToken} from "@/context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "";

type PageResponse<T> = {
    items: T[];
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
};

export type AdminOverview = {
    users: { total: number; admins: number; learners: number };
    tts: { cacheFiles: number; cacheSizeBytes: number; storageWritable: boolean; ffmpegConfigured: boolean };
    ai: { provider: string; examplesAdminProtected: boolean };
    system: { backend: string; audioPublicPath: string };
};

export type AdminUser = {
    id: number;
    email: string;
    name: string;
    nativeLanguage: string;
    role: "USER" | "ADMIN";
};

export type TtsCacheItem = {
    cacheKey: string;
    audioUrl: string;
    sizeBytes: number;
    lastModifiedAt: string;
};

export type TtsSummary = {
    cacheFiles: number;
    cacheSizeBytes: number;
    storageWritable: boolean;
    storageDir: string;
    publicPath: string;
};

export type AdminAuditEvent = {
    id: number;
    actorUserId?: number;
    actorEmail: string;
    action: string;
    entityType: string;
    entityId?: string;
    summary: string;
    metadataJson?: string;
    ipAddress?: string;
    createdAt: string;
};

export type AdminAnalytics = {
    dau: Array<{ date: string; activeUsers: number }>;
    byNativeLanguage: Array<{ segment: string; activeUsers: number }>;
    byRole: Array<{ segment: string; activeUsers: number }>;
    retention: Array<{ cohortDate: string; cohortSize: number; day1Retention: number; day7Retention: number; day14Retention: number }>;
    summary: { activeUsersToday: number; activeUsersInRange: number; averageDau: number; days: number };
};

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/admin${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...init?.headers,
        },
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        if (res.status === 401) throw new Error("ADMIN_AUTH_REQUIRED");
        if (res.status === 403) throw new Error("ADMIN_FORBIDDEN");
        throw new Error(data.error || data.message || `Admin request failed: ${res.status}`);
    }
    return data as T;
}

export function getAdminOverview() {
    return adminFetch<AdminOverview>("/overview");
}

export function getAdminUsers(query = "", page = 0, size = 25) {
    const params = new URLSearchParams({query, page: String(page), size: String(size)});
    return adminFetch<PageResponse<AdminUser>>(`/users?${params}`);
}

export function updateAdminUserRole(id: number, role: "USER" | "ADMIN", reason: string) {
    return adminFetch<AdminUser>(`/users/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({role, reason}),
    });
}

export function getTtsSummary() {
    return adminFetch<TtsSummary>("/tts/summary");
}

export function getTtsCache() {
    return adminFetch<TtsCacheItem[]>("/tts/cache");
}

export function deleteTtsCacheItem(cacheKey: string) {
    return adminFetch<{ status: string }>(`/tts/cache/${encodeURIComponent(cacheKey)}`, {method: "DELETE"});
}

export function getAiSummary() {
    return adminFetch<Record<string, unknown>>("/ai/summary");
}

export function getAuditEvents(page = 0, size = 50) {
    const params = new URLSearchParams({page: String(page), size: String(size)});
    return adminFetch<PageResponse<AdminAuditEvent>>(`/audit?${params}`);
}

export function getAdminAnalytics(days = 30) {
    const params = new URLSearchParams({days: String(days)});
    return adminFetch<AdminAnalytics>(`/analytics?${params}`);
}
