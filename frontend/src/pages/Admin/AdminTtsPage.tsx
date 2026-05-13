import {useEffect, useState} from "react";
import {deleteTtsCacheItem, getTtsCache, getTtsSummary} from "@/services/adminApi";
import type {TtsCacheItem, TtsSummary} from "@/services/adminApi";
import {AdminHeader, ErrorPanel, formatBytes, LoadingPanel, StatCard} from "./admin-ui";

export default function AdminTtsPage() {
    const [summary, setSummary] = useState<TtsSummary | null>(null);
    const [items, setItems] = useState<TtsCacheItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = () => {
        setLoading(true);
        Promise.all([getTtsSummary(), getTtsCache()])
            .then(([nextSummary, nextItems]) => {
                setSummary(nextSummary);
                setItems(nextItems);
                setError("");
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => load(), []);

    const remove = async (cacheKey: string) => {
        if (!window.confirm(`Delete cached audio ${cacheKey}?`)) return;
        await deleteTtsCacheItem(cacheKey);
        load();
    };

    return (
        <div>
            <AdminHeader title="TTS Cache" description="Inspect generated listening audio and remove stale cache files."/>
            {error && <ErrorPanel message={error}/>} 
            {loading && <LoadingPanel/>}
            {summary && !loading && (
                <>
                    <div className="mb-6 grid gap-4 md:grid-cols-4">
                        <StatCard label="Files" value={summary.cacheFiles}/>
                        <StatCard label="Size" value={formatBytes(summary.cacheSizeBytes)}/>
                        <StatCard label="Storage" value={summary.storageWritable ? "Writable" : "Blocked"}/>
                        <StatCard label="Public path" value={summary.publicPath}/>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-border bg-card">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted text-xs uppercase text-muted-foreground"><tr><th className="p-3">Cache key</th><th className="p-3">Size</th><th className="p-3">Modified</th><th className="p-3 text-right">Action</th></tr></thead>
                            <tbody>
                            {items.map((item) => (
                                <tr key={item.cacheKey} className="border-t border-border">
                                    <td className="p-3 font-mono text-xs">{item.cacheKey}</td>
                                    <td className="p-3">{formatBytes(item.sizeBytes)}</td>
                                    <td className="p-3">{new Date(item.lastModifiedAt).toLocaleString()}</td>
                                    <td className="p-3 text-right"><button onClick={() => remove(item.cacheKey)} className="rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10">Delete</button></td>
                                </tr>
                            ))}
                            {!items.length && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No cached audio files found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
