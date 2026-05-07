import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Bell, Globe, Lock, User as UserIcon, Moon, Sun, LogOut } from "lucide-react";
import { Card, SectionHeading } from "@/components/ui-kit";
import { changeLanguage } from "@/i18n";
import { supportedLanguages } from "@/i18n/resources";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2);
  const [dark, setDark] = useState(false);
  const [notifs, setNotifs] = useState({ daily: true, streak: true, marketing: false });

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={t("settings.eyebrow")} title={t("settings.title")} />

      <Group icon={UserIcon} title={t("settings.account")}>
        <Row label={t("settings.accountName")} value="Aziz Karimov" />
        <Row label={t("settings.accountEmail")} value="aziz@example.com" />
        <Row label={t("settings.accountPassword")} value="••••••••" action={t("settings.accountChange")} />
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
              >
                {l}
              </button>
            ))}
          </div>
        </Row>
      </Group>

      <Group icon={dark ? Moon : Sun} title={t("settings.appearance")}>
        <Row label={t("settings.darkMode")}>
          <Toggle on={dark} onChange={setDark} />
        </Row>
      </Group>

      <Group icon={Bell} title={t("settings.notifications")}>
        <Row label={t("settings.notifDaily")}>
          <Toggle on={notifs.daily} onChange={(v) => setNotifs((n) => ({ ...n, daily: v }))} />
        </Row>
        <Row label={t("settings.notifStreak")}>
          <Toggle on={notifs.streak} onChange={(v) => setNotifs((n) => ({ ...n, streak: v }))} />
        </Row>
        <Row label={t("settings.notifMarketing")}>
          <Toggle on={notifs.marketing} onChange={(v) => setNotifs((n) => ({ ...n, marketing: v }))} />
        </Row>
      </Group>

      <Group icon={Lock} title={t("settings.security")}>
        <Row label={t("settings.twoFactor")} value={t("settings.twoFactorOff")} action={t("settings.twoFactorEnable")} />
        <Row label={t("settings.devices")} value={t("settings.devicesValue", { n: 2 })} action={t("settings.view")} />
      </Group>

      <Card className="flex flex-wrap items-center justify-between gap-3 border-destructive/30">
        <div>
          <p className="text-display text-lg">{t("settings.signOutTitle")}</p>
          <p className="text-sm text-muted-foreground">{t("settings.signOutBody")}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border-2 border-destructive/30 bg-destructive/5 px-5 py-2.5 text-sm font-semibold text-destructive transition hover:bg-destructive/10">
          <LogOut className="h-4 w-4" /> {t("settings.signOut")}
        </button>
      </Card>
    </div>
  );
}

function Group({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-display text-xl">{title}</h3>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </Card>
  );
}

function Row({ label, value, action, children }: { label: string; value?: string; action?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div>
        <p className="font-medium">{label}</p>
        {value && <p className="text-sm text-muted-foreground">{value}</p>}
      </div>
      {children ?? (action && <button className="text-sm font-semibold text-primary hover:underline">{action}</button>)}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 rounded-full border-2 transition ${on ? "border-primary bg-primary" : "border-foreground/15 bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all ${on ? "left-5" : "left-0.5"}`}
      />
    </button>
  );
}
