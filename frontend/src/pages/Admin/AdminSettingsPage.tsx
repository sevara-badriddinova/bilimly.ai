import {AdminHeader} from "./admin-ui";

export default function AdminSettingsPage() {
    return (
        <div>
            <AdminHeader title="Admin Settings" description="Operational settings and deployment checks for the admin area."/>
            <div className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Next settings to implement</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>Admin provisioning workflow.</li>
                    <li>Role-change approval policy.</li>
                    <li>TTS cache storage provider settings.</li>
                    <li>AI usage limits and alert thresholds.</li>
                    <li>Audit retention period.</li>
                </ul>
            </div>
        </div>
    );
}
