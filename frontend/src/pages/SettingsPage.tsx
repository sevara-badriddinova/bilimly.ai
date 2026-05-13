import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Bell, Globe, Lock, User as UserIcon, Moon, Sun, LogOut, Monitor, CheckCircle2} from "lucide-react";
import {Card, SectionHeading} from "@/components/ui-kit";
import {changeLanguage} from "@/i18n";
import {supportedLanguages} from "@/i18n/resources";
import {getUserDisplayName, useAuth} from "@/context/AuthContext";
import {loadSettings, saveSettings, type AppSettings} from "@/data/settings";

export default function Settings() {
    const {t, i18n} = useTranslation();
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const lang = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2);
    const [settings, setSettings] = useState<AppSettings>(() => loadSettings(user?.id));
    const [message, setMessage] = useState("");
    const displayName = getUserDisplayName(user);
    const nativeLanguageLabel = t(`settings.languageNames.${user?.nativeLanguage || "uz"}`);
    const activeDeviceCount = 1;

    useEffect(() => {
        setSettings(loadSettings(user?.id));
    }, [user?.id]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", settings.darkMode);
        saveSettings(settings, user?.id);
    }, [settings, user?.id]);

    function updateSettings(updater: (current: AppSettings) => AppSettings, notice?: string) {
        setSettings((current) => updater(current));
        if (notice) {
            setMessage(notice);
            window.setTimeout(() => setMessage(""), 2200);
        }
    }

    function setNotification(key: keyof AppSettings["notifications"], value: boolean) {
        updateSettings(
            (current) => ({
                ...current,
                notifications: {...current.notifications, [key]: value},
            }),
            t("settings.saved")
        );
    }

    return (
        <div className="space-y-8">
            <SectionHeading eyebrow={t("settings.eyebrow")} title={t("settings.title")}/>

            {message && (
                <div className="flex items-center gap-2 rounded-2xl border-2 border-secondary/30 bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
                    <CheckCircle2 className="h-4 w-4"/>
                    {message}
                </div>
            )}

            <Group icon={UserIcon} title={t("settings.account")}>
                <Row label={t("settings.accountName")} value={displayName}/>
                <Row label={t("settings.accountEmail")} value={user?.email || ""}/>
                <Row label={t("settings.nativeLanguage")} value={nativeLanguageLabel}/>
                <Row
                    label={t("settings.accountPassword")}
                    value={t("settings.passwordManaged")}
                    action={t("settings.accountChange")}
                    onAction={() => setMessage(t("settings.passwordNotice"))}
                />
            </Group>

            <Group icon={Globe} title={t("settings.languageGroup")}>
                <Row label={t("settings.languageInterface")}>
                    <div className="flex gap-2">
                        {supportedLanguages.map((l) => (
                            <button
                                key={l}
                                onClick={() => changeLanguage(l)}
                                className={`rounded-full border-2 px-4 py-1.5 text-xs font-semibold uppercase transition ${
                                    lang === l
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-foreground/10 bg-card hover:border-primary/40"
                                }`}
                                aria-pressed={lang === l}
                                title={t(`settings.languageNames.${l}`)}
                            >
                                {t(`settings.languageNames.${l}`)}
                            </button>
                        ))}
                    </div>
                </Row>
            </Group>

            <Group icon={settings.darkMode ? Moon : Sun} title={t("settings.appearance")}>
                <Row label={t("settings.darkMode")}>
                    <Toggle
                        label={t("settings.darkMode")}
                        on={settings.darkMode}
                        onChange={(darkMode) => updateSettings((current) => ({...current, darkMode}), t("settings.saved"))}
                    />
                </Row>
            </Group>

            <Group icon={Bell} title={t("settings.notifications")}>
                <Row label={t("settings.notifDaily")}>
                    <Toggle label={t("settings.notifDaily")} on={settings.notifications.daily} onChange={(v) => setNotification("daily", v)}/>
                </Row>
                <Row label={t("settings.notifStreak")}>
                    <Toggle label={t("settings.notifStreak")} on={settings.notifications.streak} onChange={(v) => setNotification("streak", v)}/>
                </Row>
                <Row label={t("settings.notifMarketing")}>
                    <Toggle label={t("settings.notifMarketing")} on={settings.notifications.marketing} onChange={(v) => setNotification("marketing", v)}/>
                </Row>
            </Group>

            <Group icon={Lock} title={t("settings.security")}>
                <Row
                    label={t("settings.twoFactor")}
                    value={settings.twoFactorEnabled ? t("settings.twoFactorOn") : t("settings.twoFactorOff")}
                    action={settings.twoFactorEnabled ? t("settings.twoFactorDisable") : t("settings.twoFactorEnable")}
                    onAction={() => updateSettings(
                        (current) => ({...current, twoFactorEnabled: !current.twoFactorEnabled}),
                        settings.twoFactorEnabled ? t("settings.twoFactorDisabled") : t("settings.twoFactorEnabled")
                    )}
                />
                <Row
                    label={t("settings.devices")}
                    value={t("settings.devicesValue", {n: activeDeviceCount})}
                    action={settings.showDevices ? t("settings.hide") : t("settings.view")}
                    onAction={() => updateSettings((current) => ({...current, showDevices: !current.showDevices}))}
                />
                {settings.showDevices && (
                    <div className="rounded-2xl bg-muted/60 p-4">
                        <div className="flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-card">
                                <Monitor className="h-4 w-4 text-primary"/>
                            </span>
                            <div>
                                <p className="font-semibold">{t("settings.currentDevice")}</p>
                                <p className="text-sm text-muted-foreground">{t("settings.currentDeviceBody")}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Group>

            <Card className="flex flex-wrap items-center justify-between gap-3 border-destructive/30">
                <div>
                    <p className="text-display text-lg">{t("settings.signOutTitle")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.signOutBody")}</p>
                </div>
                <button
                    onClick={() => {
                        logout();
                        navigate("/signin", {replace: true});
                    }}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-destructive/30 bg-destructive/5 px-5 py-2.5 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
                >
                    <LogOut className="h-4 w-4"/> {t("settings.signOut")}
                </button>
            </Card>
        </div>
    );
}

function Group({icon: Icon, title, children}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    children: React.ReactNode
}) {
    return (
        <Card>
            <div className="mb-4 flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary"/>
                <h3 className="text-display text-xl">{title}</h3>
            </div>
            <div className="divide-y divide-border">{children}</div>
        </Card>
    );
}

function Row({label, value, action, onAction, children}: {
    label: string;
    value?: string;
    action?: string;
    onAction?: () => void;
    children?: React.ReactNode
}) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
                <p className="font-medium">{label}</p>
                {value && <p className="text-sm text-muted-foreground">{value}</p>}
            </div>
            {children ?? (action &&
                <button type="button" onClick={onAction} className="text-sm font-semibold text-primary hover:underline">{action}</button>)}
        </div>
    );
}

function Toggle({label, on, onChange}: { label: string; on: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            aria-label={label}
            aria-pressed={on}
            onClick={() => onChange(!on)}
            className={`relative h-7 w-12 rounded-full border-2 transition ${on ? "border-primary bg-primary" : "border-foreground/15 bg-muted"}`}
        >
      <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all ${on ? "left-5" : "left-0.5"}`}
      />
        </button>
    );
}
