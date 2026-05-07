import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Flame,
  Trophy,
  Target,
  ArrowRight,
  BookOpen,
  Sparkles,
  Headphones,
  Mic,
  Zap,
  Gem,
  Star,
  Hand,
  Type,
  type LucideIcon,
} from "lucide-react";
import { Card, Pill, Progress, Stat, PrimaryButton } from "@/components/ui-kit";
import { IconBadge, type IconTone } from "@/components/icon-badge";
import humoBird from "@/assets/humo-bird.png";

const SKILLS = [
  { id: "grammar", labelKey: "nav.grammar", icon: BookOpen, value: 72, to: "/app/grammar", tone: "primary" as IconTone },
  { id: "vocab", labelKey: "nav.vocabulary", icon: Sparkles, value: 58, to: "/app/vocabulary", tone: "secondary" as IconTone },
  { id: "listening", labelKey: "nav.listening", icon: Headphones, value: 41, to: "/app/listening", tone: "accent" as IconTone },
  { id: "speaking", labelKey: "nav.speaking", icon: Mic, value: 35, to: "/app/speaking", tone: "primary" as IconTone },
];

const RECENT: { id: string; title: string; titleUz: string; icon: LucideIcon; tone: IconTone; xp: number; timeKey: string }[] = [
  { id: "03-to-be", title: "Verb 'to be'", titleUz: "'To be' fe'li", icon: Sparkles, tone: "primary", xp: 40, timeKey: "coach.timeToday" },
  { id: "02-greetings", title: "Greetings", titleUz: "Salomlashish", icon: Hand, tone: "secondary", xp: 30, timeKey: "coach.timeYesterday" },
  { id: "01-alphabet", title: "Alphabet", titleUz: "Alifbo", icon: Type, tone: "accent", xp: 20, timeKey: "coach.timeDaysAgo" },
];

const ACHIEVEMENTS: { icon: LucideIcon; labelKey: string; labelParams?: Record<string, unknown>; earned: boolean; tone: IconTone }[] = [
  { icon: Flame, labelKey: "profile.streakChip", labelParams: { n: 7 }, earned: true, tone: "accent" },
  { icon: Trophy, labelKey: "achievements.first100", earned: true, tone: "primary" },
  { icon: BookOpen, labelKey: "achievements.tenLessons", earned: true, tone: "secondary" },
  { icon: Target, labelKey: "achievements.perfectWeek", earned: false, tone: "primary" },
  { icon: Gem, labelKey: "achievements.xp1000", earned: false, tone: "secondary" },
  { icon: Star, labelKey: "achievements.streak30", earned: false, tone: "accent" },
];

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("dashboard.greeting", { name: "Aziz" })} <Hand className="h-3.5 w-3.5" />
          </p>
          <h1 className="text-display mt-2 text-3xl leading-tight md:text-4xl">
            {t("dashboard.title")}
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-accent-foreground" />
            <Stat n="7" label={t("dashboard.streak")} />
          </div>
          <span className="h-10 w-px bg-border" />
          <Stat n="240" label={t("dashboard.xpToday")} accent />
          <span className="h-10 w-px bg-border" />
          <Stat n="5" label={t("dashboard.level")} />
        </div>
      </div>

      {/* Continue learning hero */}
      <Card variant="raised" className="relative overflow-hidden p-8 md:p-10">
        <img
          src={humoBird}
          alt=""
          width={200}
          height={200}
          className="pointer-events-none absolute -right-6 -bottom-6 hidden h-44 w-44 object-contain opacity-90 md:block"
        />
        <div className="relative max-w-xl">
          <Pill tone="primary"><Flame className="h-3 w-3" /> {t("dashboard.continueBadge")}</Pill>
          <h2 className="text-display mt-4 text-2xl md:text-3xl">{t("dashboard.continueTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("dashboard.continueMeta")}</p>
          <div className="mt-5 max-w-sm">
            <Progress value={60} label={t("dashboard.lessonProgress")} />
          </div>
          <Link to="/lessons/03-to-be" className="mt-6 inline-block">
            <PrimaryButton>
              {t("dashboard.continueBadge")} <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </Link>
        </div>
      </Card>

      {/* Daily goal + achievements */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("dashboard.dailyGoal")}</span>
          </div>
          <p className="text-display mt-3 text-3xl">240 / 300 XP</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.goalRemaining", { xp: 60 })}</p>
          <div className="mt-4">
            <Progress value={80} />
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("dashboard.achievements")}</span>
            </div>
            <Link to="/app/profile" className="text-xs font-semibold text-primary hover:underline">
              {t("common.viewAll")} →
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {ACHIEVEMENTS.map((a) => (
              <motion.div
                key={a.labelKey}
                whileHover={{ y: -3 }}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 border-foreground/10 p-3 text-center ${
                  a.earned ? "bg-card" : "opacity-40 grayscale"
                }`}
              >
                <IconBadge icon={a.icon} tone={a.tone} size="sm" hover={false} />
                <span className="line-clamp-2 text-[10px] font-semibold leading-tight">{a.labelParams ? t(a.labelKey, a.labelParams) : t(a.labelKey)}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-display mb-4 text-2xl">{t("dashboard.skills")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s) => {
            return (
              <Link key={s.id} to={s.to}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="hover:border-primary">
                    <IconBadge icon={s.icon} tone={s.tone} size="md" hover={false} />
                    <p className="text-display mt-4 text-lg">{t(s.labelKey)}</p>
                    <div className="mt-3">
                      <Progress value={s.value} />
                    </div>
                  </Card>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-display text-2xl">{t("dashboard.recent")}</h2>
          <Link to="/lessons" className="text-sm font-semibold text-primary hover:underline">
            {t("common.viewAll")} →
          </Link>
        </div>
        <div className="grid gap-3">
          {RECENT.map((r) => (
            <Link key={r.id} to={`/lessons/${r.id}`}>
              <motion.div whileHover={{ x: 4 }}>
                <Card className="flex items-center gap-4 hover:border-primary">
                  <IconBadge icon={r.icon} tone={r.tone} size="md" hover={false} />
                  <div className="flex-1">
                    <p className="text-display text-lg leading-tight">{r.titleUz}</p>
                    <p className="text-sm italic text-muted-foreground">{r.title}</p>
                  </div>
                  <div className="text-right">
                    <Pill tone="accent"><Zap className="h-3 w-3" /> {r.xp} XP</Pill>
                    <p className="mt-1 text-xs text-muted-foreground">{t(r.timeKey)}</p>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
