import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "../services/api";

export type User = {
    id: number;
    email: string;
    name?: string;
    nativeLanguage?: string;
    role: "USER" | "ADMIN";
};

type AuthContextValue = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, rememberMe?: boolean, displayName?: string) => Promise<void>;
    logout: () => void;
    refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

// Token storage keys
const TOKEN_KEY = "auth_token";
const DISPLAY_NAME_PREFIX = "user_display_name";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user;

    // Fetch user data using token
    async function fetchUser(displayName?: string) {
        const token = getToken();
        if (!token) {
            setUser(null);
            return;
        }

        try {
            const userData = await getCurrentUser(token);
            const savedDisplayName = localStorage.getItem(getDisplayNameKey(userData.id));
            const nextUser = {
                ...userData,
                name: userData.name || displayName || savedDisplayName || "",
            };
            if (displayName) {
                localStorage.setItem(getDisplayNameKey(userData.id), displayName);
            }
            setUser(nextUser);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            // Token might be expired or invalid
            removeToken();
            setUser(null);
        }
    }

    // On app mount, try to restore session from localStorage
    useEffect(() => {
        (async () => {
            try {
                await fetchUser();
            } catch (error) {
                console.error("Session restore failed:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    // Login: save token and fetch user data
    const login = async (token: string, rememberMe?: boolean, displayName?: string): Promise<void> => {
        setIsLoading(true);
        try {
            saveToken(token, rememberMe);
            await fetchUser(displayName);
        } finally {
            setIsLoading(false);
        }
    };

    // Logout: clear token and user data
    const logout = () => {
        removeToken();
        setUser(null);
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated,
            isLoading,
            login,
            logout,
            refresh: fetchUser,
        }),
        [user, isAuthenticated, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}

// Token management helpers
export function saveToken(token: string, remember: boolean = true) {
    if (remember) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        sessionStorage.setItem(TOKEN_KEY, token);
    }
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
}

export function getUserDisplayName(user: User | null) {
    return user?.name?.trim() || user?.email?.split("@")[0] || "User";
}

function getDisplayNameKey(userId: number | string) {
    return `${DISPLAY_NAME_PREFIX}:${userId}`;
}
