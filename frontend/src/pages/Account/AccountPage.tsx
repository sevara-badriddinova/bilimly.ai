import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Flame, Trophy, BookOpen, Zap, Target, Gem, Star, Crown, type LucideIcon } from "lucide-react";
import { Card, Pill, SectionHeading, Progress, PrimaryButton } from "@/components/ui-kit";
import { IconBadge, type IconTone } from "@/components/icon-badge";
import { getUserDisplayName, useAuth } from "@/context/AuthContext";
import { useUserProgress } from "@/data/progress";
import humoBird from "@/assets/humo-bird.png";

const ACHIEVEMENTS: { icon: LucideIcon; key: string; params?: Record<string, unknown>; earned: boolean; tone: IconTone }[] = [
  { icon: Flame, key: "profile.streakChip", params: { n: 7 }, earned: false, tone: "accent" },
  { icon: Trophy, key: "achievements.first100", earned: false, tone: "primary" },
  { icon: BookOpen, key: "achievements.tenLessons", earned: false, tone: "secondary" },
  { icon: Zap, key: "achievements.xp500", earned: false, tone: "accent" },
  { icon: Target, key: "achievements.perfectWeek", earned: false, tone: "primary" },
  { icon: Gem, key: "achievements.xp1000", earned: false, tone: "secondary" },
  { icon: Star, key: "achievements.streak30", earned: false, tone: "accent" },
  { icon: Crown, key: "achievements.allSections", earned: false, tone: "primary" },
];

const HISTORY: { date: string; title: string; xp: number }[] = [];

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { progress } = useUserProgress(user?.id);
  const earned = ACHIEVEMENTS.filter((a) => a.earned).length;
  const displayName = getUserDisplayName(user);
  const initials = displayName.slice(0, 1).toUpperCase() || "U";

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={t("profile.eyebrow")} title={t("profile.title")} />

      <Card variant="raised" className="md:p-8">
        <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="relative">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-display text-4xl text-primary">
              {initials}
            </div>
            <img src={humoBird} alt="" width={50} height={50} className="absolute -bottom-2 -right-2 h-12 w-12" />
          </div>
          <div>
            <h2 className="text-display text-3xl">{displayName}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill tone="primary">{t("profile.levelChip", { n: progress.level })}</Pill>
              <Pill tone="accent"><Flame className="h-3 w-3" /> {t("profile.streakChip", { n: progress.streakDays })}</Pill>
              <Pill>{t("profile.beginner")}</Pill>
            </div>
          </div>
          <PrimaryButton>{t("profile.edit")}</PrimaryButton>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { n: String(progress.xpToday), l: t("profile.xpToday") },
            { n: String(progress.totalXp), l: t("profile.xpTotal") },
            { n: String(progress.lessonsCompleted), l: t("profile.lessonsDone") },
            { n: String(progress.streakDays), l: t("profile.streakDays") },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border-2 border-foreground/10 bg-background p-4 text-center">
              <p className="text-display text-2xl text-primary">{s.n}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-display text-2xl">{t("profile.skillMastery")}</h3>
        <div className="mt-5 space-y-4">
          {[
            { l: t("nav.grammar"), v: progress.skills.grammar },
            { l: t("nav.vocabulary"), v: progress.skills.vocab },
            { l: t("nav.listening"), v: progress.skills.listening },
            { l: t("nav.speaking"), v: progress.skills.speaking },
          ].map((s) => (
            <Progress key={s.l} value={s.v} label={s.l} />
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-display text-2xl">{t("profile.achievements")}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t("profile.achievementsCount", { earned, total: ACHIEVEMENTS.length })}</p>
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 border-foreground/10 p-3 text-center ${a.earned ? "bg-card" : "opacity-40 grayscale"}`}
            >
              <IconBadge icon={a.icon} tone={a.tone} size="md" hover={false} />
              <span className="line-clamp-2 text-[10px] font-semibold leading-tight">{a.params ? t(a.key, a.params) : t(a.key)}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-display text-2xl">{t("profile.history")}</h3>
        <div className="mt-4 divide-y divide-border">
          {HISTORY.map((h) => (
            <div key={h.date} className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold">{h.title}</p>
                <p className="text-xs text-muted-foreground">{h.date}</p>
              </div>
              <Pill tone="accent"><Zap className="h-3 w-3" /> +{h.xp} XP</Pill>
            </div>
          ))}
          {HISTORY.length === 0 && (
            <p className="py-3 text-sm text-muted-foreground">
              {t("profile.noHistory", "No activity yet. Completed lessons will appear here.")}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
