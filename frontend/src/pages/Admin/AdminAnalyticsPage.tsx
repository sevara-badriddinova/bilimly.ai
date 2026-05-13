import {useEffect, useMemo, useState} from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {getAdminAnalytics} from "@/services/adminApi";
import type {AdminAnalytics} from "@/services/adminApi";
import {AdminHeader, ErrorPanel, LoadingPanel, StatCard} from "./admin-ui";

const rangeOptions = [7, 30, 60, 90];

export default function AdminAnalyticsPage() {
    const [days, setDays] = useState(30);
    const [data, setData] = useState<AdminAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        getAdminAnalytics(days)
            .then((next) => {
                setData(next);
                setError("");
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [days]);

    const dauChart = useMemo(() => data?.dau.map((point) => ({
        ...point,
        label: new Date(point.date).toLocaleDateString(undefined, {month: "short", day: "numeric"}),
    })) ?? [], [data]);

    const retentionRows = data?.retention.filter((row) => row.cohortSize > 0).slice(-14).reverse() ?? [];

    return (
        <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
                <AdminHeader title="Analytics" description="Daily active users, cohort retention, and active-user breakdowns."/>
                <div className="flex rounded-lg border border-border bg-card p-1">
                    {rangeOptions.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setDays(option)}
                            className={`rounded-md px-3 py-1.5 text-sm font-semibold ${days === option ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                        >
                            {option}d
                        </button>
                    ))}
                </div>
            </div>

            {error && <ErrorPanel message={error}/>} 
            {loading && <LoadingPanel/>}

            {data && !loading && !error && (
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <StatCard label="DAU today" value={data.summary.activeUsersToday}/>
                        <StatCard label="Average DAU" value={data.summary.averageDau}/>
                        <StatCard label="Range activity" value={data.summary.activeUsersInRange} detail={`${data.summary.days} day total across daily rows`}/>
                    </div>

                    <section className="rounded-lg border border-border bg-card p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Daily Active Users</h2>
                            <span className="text-xs text-muted-foreground">Unique signed-in users per UTC day</span>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dauChart} margin={{left: 8, right: 16, top: 10, bottom: 0}}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-border"/>
                                    <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12}/>
                                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12}/>
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="activeUsers" name="Active users" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.18)" strokeWidth={2}/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <div className="grid gap-6 xl:grid-cols-2">
                        <BreakdownChart title="By Native Language" data={data.byNativeLanguage}/>
                        <BreakdownChart title="By Role" data={data.byRole}/>
                    </div>

                    <section className="overflow-hidden rounded-lg border border-border bg-card">
                        <div className="border-b border-border p-4">
                            <h2 className="text-lg font-semibold">Retention Cohorts</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Percentage of users active again after their cohort day.</p>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="p-3">Cohort date</th>
                                <th className="p-3 text-right">Users</th>
                                <th className="p-3 text-right">D1</th>
                                <th className="p-3 text-right">D7</th>
                                <th className="p-3 text-right">D14</th>
                            </tr>
                            </thead>
                            <tbody>
                            {retentionRows.map((row) => (
                                <tr key={row.cohortDate} className="border-t border-border">
                                    <td className="p-3">{new Date(row.cohortDate).toLocaleDateString()}</td>
                                    <td className="p-3 text-right tabular-nums">{row.cohortSize}</td>
                                    <td className="p-3 text-right tabular-nums">{row.day1Retention}%</td>
                                    <td className="p-3 text-right tabular-nums">{row.day7Retention}%</td>
                                    <td className="p-3 text-right tabular-nums">{row.day14Retention}%</td>
                                </tr>
                            ))}
                            {!retentionRows.length && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No retention cohorts yet.</td></tr>}
                            </tbody>
                        </table>
                    </section>
                </div>
            )}
        </div>
    );
}

function BreakdownChart({title, data}: { title: string; data: Array<{ segment: string; activeUsers: number }> }) {
    return (
        <section className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-4 text-lg font-semibold">{title}</h2>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{left: 8, right: 16, top: 10, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border"/>
                        <XAxis dataKey="segment" tickLine={false} axisLine={false} fontSize={12}/>
                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12}/>
                        <Tooltip/>
                        <Bar dataKey="activeUsers" name="Active users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
