import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Lock, CheckCircle2, Zap } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Pill, SectionHeading, Progress } from "@/components/ui-kit";
import { IconBadge } from "@/components/icon-badge";
import { LESSONS, getLessonText } from "@/data/lessons";

const LEVEL_KEYS = ["all", "beginner", "intermediate", "advanced"] as const;
const LEVEL_NAME_MAP: Record<string, (typeof LEVEL_KEYS)[number]> = {
  "Boshlang'ich": "beginner",
  "O'rta": "intermediate",
  "Yuqori": "advanced",
};

export default function Grammar() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;
  const [level, setLevel] = useState<(typeof LEVEL_KEYS)[number]>("all");
  const [q, setQ] = useState("");
  const grammarLessons = LESSONS.filter((l) => l.category === "Grammatika");
  const filtered = grammarLessons.filter((l) => {
    if (level !== "all" && LEVEL_NAME_MAP[l.level] !== level) return false;
    const text = getLessonText(l, language);
    if (q && !(text.title + l.title).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  const completed = grammarLessons.filter((l) => l.status === "completed").length;

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow={t("grammar.eyebrow")}
        title={t("grammar.title")}
        description={t("grammar.subtitle")}
      />

      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("grammar.completed")}</p>
          <p className="text-display mt-2 text-3xl text-primary">{completed} / {grammarLessons.length}</p>
          <div className="mt-3"><Progress value={Math.round((completed / grammarLessons.length) * 100)} /></div>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("grammar.currentLevel")}</p>
          <p className="text-display mt-2 text-3xl">{t("levels.beginner")}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("grammar.levelHint")}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("grammar.today")}</p>
          <p className="text-display mt-2 text-3xl">+45 XP</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("grammar.todayMeta", { n: 2 })}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("grammar.searchPlaceholder")}
            className="w-full rounded-full border-2 border-foreground/10 bg-card py-2.5 pl-11 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {LEVEL_KEYS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${
                level === l
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-foreground/10 bg-card hover:border-primary/40"
              }`}
            >
              {t(`levels.${l}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l, i) => {
          const locked = l.status === "locked";
          const text = getLessonText(l, language);
          const inner = (
            <Card className={`relative h-full ${locked ? "opacity-60" : "hover:-translate-y-1 hover:border-primary"} ${l.status === "current" ? "border-primary shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]" : ""}`}>
              <div className="flex items-start justify-between">
                <IconBadge icon={l.icon} tone={l.status === "current" ? "primary" : l.status === "completed" ? "secondary" : "accent"} size="md" />
                {locked ? (
                  <Pill tone="muted"><Lock className="h-3 w-3" /></Pill>
                ) : l.status === "completed" ? (
                  <Pill tone="secondary"><CheckCircle2 className="h-3 w-3" /> {t("grammar.statusCompleted")}</Pill>
                ) : l.status === "current" ? (
                  <Pill tone="primary">{t("grammar.statusCurrent")}</Pill>
                ) : (
                  <Pill tone="accent">{t("grammar.statusNew")}</Pill>
                )}
              </div>
              <h3 className="text-display mt-4 text-xl leading-tight">{text.title}</h3>
              {language?.slice(0, 2) !== "en" && <p className="mt-1 text-sm italic text-muted-foreground">{l.title}</p>}
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{text.summary}</p>
              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <Pill>{t(`levels.${LEVEL_NAME_MAP[l.level] ?? "beginner"}`)}</Pill>
                <span className="ml-auto inline-flex items-center gap-1">{l.minutes} {t("common.minShort")} · <Zap className="h-3 w-3" />{l.xp}</span>
              </div>
            </Card>
          );
          return (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              {locked ? inner : <Link to={`/lessons/${l.id}`}>{inner}</Link>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
