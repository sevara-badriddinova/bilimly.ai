import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;

    async function fetchUser() {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await axios.get("/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(res.data);
        } catch (err) {
            console.log("Not authenticated");
            setUser(null);
        }
    }

    // load user on mount
    useEffect(() => {
        fetchUser();
    }, []);

    // login helper
    const login = async(token: string) => {
        localStorage.setItem("token", token);
        await fetchUser();
    };

    // logout helper
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
