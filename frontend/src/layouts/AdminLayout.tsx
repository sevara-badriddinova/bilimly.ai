import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import {BarChart3, Bot, Database, FileClock, LayoutDashboard, LineChart, LogOut, Settings, Users} from "lucide-react";
import {getUserDisplayName, useAuth} from "@/context/AuthContext";

const navItems = [
    {to: "/admin", label: "Overview", icon: LayoutDashboard, end: true},
    {to: "/admin/analytics", label: "Analytics", icon: LineChart},
    {to: "/admin/users", label: "Users", icon: Users},
    {to: "/admin/tts", label: "TTS", icon: Database},
    {to: "/admin/ai", label: "AI", icon: Bot},
    {to: "/admin/audit", label: "Audit", icon: FileClock},
    {to: "/admin/settings", label: "Settings", icon: Settings},
];

export default function AdminLayout() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/signin", {replace: true});
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto flex max-w-[1500px]">
                <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card/60 px-4 py-6 md:block">
                    <Link to="/admin" className="flex items-center gap-2 px-2 text-display text-xl font-semibold">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground"><BarChart3 className="h-5 w-5"/></span>
                        Admin
                    </Link>
                    <nav className="mt-8 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    className={({isActive}) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                                >
                                    <Icon className="h-4 w-4"/>
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </nav>
                    <div className="mt-8 rounded-lg border border-border bg-background p-3">
                        <p className="text-xs uppercase text-muted-foreground">Signed in</p>
                        <p className="mt-1 truncate text-sm font-semibold">{getUserDisplayName(user)}</p>
                        <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/30 px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
                    >
                        <LogOut className="h-4 w-4"/>
                        Sign out
                    </button>
                </aside>
                <main className="flex-1 px-4 py-6 md:px-8">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
