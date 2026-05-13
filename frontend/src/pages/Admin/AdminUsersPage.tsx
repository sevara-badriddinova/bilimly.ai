import {useEffect, useState} from "react";
import {getAdminUsers, updateAdminUserRole} from "@/services/adminApi";
import type {AdminUser} from "@/services/adminApi";
import {AdminHeader, ErrorPanel, LoadingPanel} from "./admin-ui";

export default function AdminUsersPage() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = () => {
        setLoading(true);
        getAdminUsers(query)
            .then((page) => {
                setUsers(page.items);
                setError("");
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        load();
    }, []);

    const changeRole = async (user: AdminUser) => {
        const nextRole = user.role === "ADMIN" ? "USER" : "ADMIN";
        const reason = window.prompt(`Reason for changing ${user.email} to ${nextRole}`) || "Admin dashboard role update";
        await updateAdminUserRole(user.id, nextRole, reason);
        load();
    };

    return (
        <div>
            <AdminHeader title="Users" description="Search users and manage admin role assignment with backend guardrails."/>
            <div className="mb-4 flex gap-2">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search email or name" className="w-full max-w-sm rounded-lg border border-border bg-background px-3 py-2 text-sm"/>
                <button onClick={load} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Search</button>
            </div>
            {error && <ErrorPanel message={error}/>} 
            {loading && <LoadingPanel/>}
            {!loading && !error && (
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted text-xs uppercase text-muted-foreground">
                        <tr><th className="p-3">User</th><th className="p-3">Language</th><th className="p-3">Role</th><th className="p-3 text-right">Action</th></tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t border-border">
                                <td className="p-3"><div className="font-medium">{user.name || "Unnamed"}</div><div className="text-xs text-muted-foreground">{user.email}</div></td>
                                <td className="p-3">{user.nativeLanguage}</td>
                                <td className="p-3"><span className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{user.role}</span></td>
                                <td className="p-3 text-right"><button onClick={() => changeRole(user)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted">Make {user.role === "ADMIN" ? "USER" : "ADMIN"}</button></td>
                            </tr>
                        ))}
                        {!users.length && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No users found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
