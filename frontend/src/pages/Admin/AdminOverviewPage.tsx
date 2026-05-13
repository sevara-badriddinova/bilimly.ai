import {useEffect, useState} from "react";
import {getAdminOverview} from "@/services/adminApi";
import type {AdminOverview} from "@/services/adminApi";
import {AdminHeader, ErrorPanel, formatBytes, LoadingPanel, StatCard} from "./admin-ui";

export default function AdminOverviewPage() {
    const [data, setData] = useState<AdminOverview | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getAdminOverview().then(setData).catch((err) => setError(err.message));
    }, []);

    return (
        <div>
            <AdminHeader title="Admin Overview" description="Operational snapshot for users, TTS cache, AI access, and backend health."/>
            {error && <ErrorPanel message={error}/>} 
            {!data && !error && <LoadingPanel/>}
            {data && (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="Total users" value={data.users.total} detail={`${data.users.learners} learners`}/>
                    <StatCard label="Admins" value={data.users.admins}/>
                    <StatCard label="TTS cache" value={data.tts.cacheFiles} detail={formatBytes(data.tts.cacheSizeBytes)}/>
                    <StatCard label="Storage" value={data.tts.storageWritable ? "Writable" : "Blocked"} detail={data.system.audioPublicPath}/>
                    <StatCard label="AI provider" value={data.ai.provider}/>
                    <StatCard label="AI examples" value={data.ai.examplesAdminProtected ? "Admin-only" : "Review"}/>
                    <StatCard label="Backend" value={data.system.backend}/>
                    <StatCard label="ffmpeg" value={data.tts.ffmpegConfigured ? "Configured" : "Missing"}/>
                </div>
            )}
        </div>
    );
}
