import {Link, useLocation, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    LayoutDashboard,
    BookOpen,
    PanelLeftClose,
    PanelLeftOpen,
    Sparkles,
    Headphones,
    Mic,
    MessageCircle,
    User,
    Settings,
    Flame,
    GraduationCap,
    LogOut,
    ShieldCheck,
} from "lucide-react";
import humoBird from "@/assets/humo-bird.png";
import {LanguageSwitcher} from "@/components/language-switcher";
import {getUserDisplayName, useAuth} from "@/context/AuthContext";

const SIDEBAR_KEY = "app_sidebar_hidden";

type NavItem = {
    to: string;
    labelKey: string;
    icon: React.ComponentType<{ className?: string }>;
    exact?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
    {to: "/app", labelKey: "nav.dashboard", icon: LayoutDashboard, exact: true},
    {to: "/app/lessons", labelKey: "nav.lessons", icon: BookOpen},
    {to: "/app/vocabulary", labelKey: "nav.vocabulary", icon: Sparkles},
    {to: "/app/listening", labelKey: "nav.listening", icon: Headphones},
    {to: "/app/speaking", labelKey: "nav.speaking", icon: Mic},
    {to: "/app/coach", labelKey: "nav.coach", icon: MessageCircle},
];

export const SECONDARY_NAV: NavItem[] = [
    {to: "/app/profile", labelKey: "nav.profile", icon: User},
    {to: "/app/settings", labelKey: "nav.settings", icon: Settings},
];

export function AppShell({children}: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto flex max-w-[1400px]">
                <Sidebar/>
                <main className="flex-1 px-4 pb-28 pt-6 md:px-8 md:pb-10">
                    <motion.div
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.35, ease: "easeOut"}}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
            <BottomNav/>
        </div>
    );
}

function Sidebar() {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {user, logout} = useAuth();
    const displayName = getUserDisplayName(user);
    const [sidebarHidden, setSidebarHidden] = useState(false);

    useEffect(() => {
        setSidebarHidden(localStorage.getItem(SIDEBAR_KEY) === "true");
    }, []);

    const toggleSidebar = () => {
        setSidebarHidden((current) => {
            const next = !current;
            localStorage.setItem(SIDEBAR_KEY, String(next));
            return next;
        });
    };

    const handleLogout = () => {
        logout();
        navigate("/signin", {replace: true});
    };

    return (
        <aside
            className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-card/40 px-3 py-6 transition-[width] duration-200 md:flex ${sidebarHidden ? "w-20" : "w-64"}`}>
            <div className={`flex items-center gap-2 px-1 ${sidebarHidden ? "justify-center" : "justify-between"}`}>
                {!sidebarHidden && <Link to="/" className="flex min-w-0 items-center gap-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap size={20} strokeWidth={2.25}/>
        </span>
                    <span className="truncate text-display text-xl font-semibold">
          bilimly<span className="text-primary">.</span>ai
        </span>
                </Link>}
                <button
                    type="button"
                    onClick={toggleSidebar}
                    aria-label={sidebarHidden ? "Show sidebar" : "Hide sidebar"}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                    {sidebarHidden ? <PanelLeftOpen className="h-4 w-4"/> : <PanelLeftClose className="h-4 w-4"/>}
                </button>
            </div>

            <nav className="mt-8 flex flex-1 flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                    <NavLink key={item.to} item={item} pathname={pathname} collapsed={sidebarHidden}/>
                ))}
                <div className="my-3 h-px bg-border"/>
                {SECONDARY_NAV.map((item) => (
                    <NavLink key={item.to} item={item} pathname={pathname} collapsed={sidebarHidden}/>
                ))}
                {user?.role === "ADMIN" && (
                    <NavLink key="/admin" item={{to: "/admin", labelKey: "Admin", icon: ShieldCheck}} pathname={pathname} collapsed={sidebarHidden}/>
                )}
            </nav>

            {!sidebarHidden && <div className="mt-4 px-1">
                <LanguageSwitcher className="w-full justify-center"/>
            </div>}

            {!sidebarHidden && <div className="mt-4 rounded-2xl border-2 border-foreground/10 bg-card p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("nav.profile")}</p>
                <p className="text-display mt-1 truncate text-lg leading-tight">{displayName}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>}

            <button
                type="button"
                onClick={handleLogout}
                title={t("settings.signOut")}
                className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm font-semibold text-destructive transition hover:bg-destructive/10 ${sidebarHidden ? "h-10 px-0" : ""}`}
            >
                <LogOut className="h-4 w-4"/>
                {!sidebarHidden && t("settings.signOut")}
            </button>

            {!sidebarHidden && <div className="relative mt-4 overflow-hidden rounded-2xl border-2 border-foreground/10 bg-card p-4">
                <img src={humoBird} alt="" width={80} height={80}
                     className="absolute -right-3 -bottom-3 h-20 w-20 opacity-90"/>
                <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary"><Flame
                    className="h-3.5 w-3.5"/> {t("dashboard.streak", "Day streak")}</p>
                <p className="text-display mt-1 text-lg leading-tight">{t("dashboard.keepStreak", "Keep your streak!")}</p>
            </div>}
        </aside>
    );
}

function NavLink({
                     item,
                     pathname,
                     collapsed = false,
                 }: {
    item: { to: string; labelKey: string; icon: React.ComponentType<{ className?: string }>; exact?: boolean };
    pathname: string;
    collapsed?: boolean;
}) {
    const {t} = useTranslation();
    const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
    const Icon = item.icon;
    const label = t(item.labelKey);
    return (
        <Link
            to={item.to as never}
            title={collapsed ? label : undefined}
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${collapsed ? "justify-center" : ""} ${
                active ? "text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
        >
            {active && (
                <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{type: "spring", stiffness: 300, damping: 30}}
                />
            )}
            <Icon className="relative h-4 w-4"/>
            {!collapsed && <span className="relative truncate">{label}</span>}
        </Link>
    );
}

function BottomNav() {
    const {pathname} = useLocation();
    const {t} = useTranslation();
    const items = NAV_ITEMS.slice(0, 5);
    return (
        <nav
            className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground/10 bg-card/95 backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
                {items.map((item) => {
                    const Icon = item.icon;
                    const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
                    return (
                        <Link
                            key={item.to}
                            to={item.to as never}
                            className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-medium transition ${
                                active ? "text-primary" : "text-muted-foreground"
                            }`}
                        >
                            <Icon className="h-5 w-5"/>
                            <span className="truncate">{t(item.labelKey)}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
