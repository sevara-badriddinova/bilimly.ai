export function AdminHeader({title, description}: { title: string; description?: string }) {
    return (
        <div className="mb-6">
            <h1 className="text-display text-3xl font-semibold tracking-normal">{title}</h1>
            {description && <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{description}</p>}
        </div>
    );
}

export function StatCard({label, value, detail}: { label: string; value: string | number; detail?: string }) {
    return (
        <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
            {detail && <p className="mt-1 text-xs text-muted-foreground">{detail}</p>}
        </div>
    );
}

export function LoadingPanel() {
    return <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">Loading...</div>;
}

export function ErrorPanel({message}: { message: string }) {
    return <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">{message}</div>;
}

export function formatBytes(value: number) {
    if (!Number.isFinite(value) || value <= 0) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    let size = value;
    let unit = 0;
    while (size >= 1024 && unit < units.length - 1) {
        size /= 1024;
        unit += 1;
    }
    return `${size.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}
