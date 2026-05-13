import {useEffect, useState} from "react";
import {getAuditEvents} from "@/services/adminApi";
import type {AdminAuditEvent} from "@/services/adminApi";
import {AdminHeader, ErrorPanel, LoadingPanel} from "./admin-ui";

export default function AdminAuditPage() {
    const [events, setEvents] = useState<AdminAuditEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAuditEvents().then((page) => setEvents(page.items)).catch((err) => setError(err.message)).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <AdminHeader title="Audit Log" description="Recent administrative mutations and operational actions."/>
            {error && <ErrorPanel message={error}/>} 
            {loading && <LoadingPanel/>}
            {!loading && !error && (
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted text-xs uppercase text-muted-foreground"><tr><th className="p-3">Time</th><th className="p-3">Actor</th><th className="p-3">Action</th><th className="p-3">Summary</th></tr></thead>
                        <tbody>
                        {events.map((event) => (
                            <tr key={event.id} className="border-t border-border">
                                <td className="p-3 whitespace-nowrap">{new Date(event.createdAt).toLocaleString()}</td>
                                <td className="p-3">{event.actorEmail}</td>
                                <td className="p-3"><span className="rounded bg-muted px-2 py-1 text-xs font-semibold">{event.action}</span></td>
                                <td className="p-3">{event.summary}</td>
                            </tr>
                        ))}
                        {!events.length && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No audit events yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
