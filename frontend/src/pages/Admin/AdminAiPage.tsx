import {useEffect, useState} from "react";
import {getAiSummary} from "@/services/adminApi";
import {AdminHeader, ErrorPanel, LoadingPanel} from "./admin-ui";

export default function AdminAiPage() {
    const [data, setData] = useState<Record<string, unknown> | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getAiSummary().then(setData).catch((err) => setError(err.message));
    }, []);

    return (
        <div>
            <AdminHeader title="AI" description="Provider status and AI admin controls. Detailed metrics can be added after persistent usage logging."/>
            {error && <ErrorPanel message={error}/>} 
            {!data && !error && <LoadingPanel/>}
            {data && <pre className="overflow-auto rounded-lg border border-border bg-card p-4 text-sm">{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
