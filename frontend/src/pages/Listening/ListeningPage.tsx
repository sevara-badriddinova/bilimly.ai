import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Play,
  Pause,
  Headphones,
  CheckCircle2,
  Coffee,
  BriefcaseBusiness,
  Plane,
  Cpu,
  Sunrise,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Card, Pill, SectionHeading, Progress } from "@/components/ui-kit";
import { IconBadge, type IconTone } from "@/components/icon-badge";

const LEVEL_KEYS = ["all", "beginner", "intermediate", "advanced"] as const;
const LEVEL_MAP: Record<string, (typeof LEVEL_KEYS)[number]> = {
  "Boshlang'ich": "beginner",
  "O'rta": "intermediate",
  "Yuqori": "advanced",
};

type Track = {
  id: number;
  title: string;
  titleUz: string;
  level: string;
  duration: string;
  icon: LucideIcon;
  tone: IconTone;
  completed: boolean;
  current?: boolean;
};

const TRACKS: Track[] = [
  { id: 1, title: "Coffee Shop Conversation", titleUz: "Kafedagi suhbat", level: "Boshlang'ich", duration: "3:24", icon: Coffee, tone: "accent", completed: true },
  { id: 2, title: "Tech Interview Tips", titleUz: "IT intervyu maslahatlar", level: "O'rta", duration: "8:12", icon: BriefcaseBusiness, tone: "secondary", completed: true },
  { id: 3, title: "Travel in London", titleUz: "Londonga sayohat", level: "Boshlang'ich", duration: "5:40", icon: Plane, tone: "primary", completed: false, current: true },
  { id: 4, title: "AI and the Future", titleUz: "AI va kelajak", level: "Yuqori", duration: "12:05", icon: Cpu, tone: "secondary", completed: false },
  { id: 5, title: "Daily Routines Podcast", titleUz: "Kundalik tartiblar", level: "Boshlang'ich", duration: "4:18", icon: Sunrise, tone: "accent", completed: false },
  { id: 6, title: "Business English Pro", titleUz: "Biznes ingliz", level: "Yuqori", duration: "15:32", icon: BarChart3, tone: "primary", completed: false },
];

const TRANSCRIPT = [
  { time: "0:00", en: "Hi, can I get a large cappuccino, please?", uz: "Salom, kattaroq kapuchino bera olasizmi?", active: false },
  { time: "0:05", en: "Of course. Would you like it for here or to go?", uz: "Albatta. Bu yerdami yoki olib ketish uchunmi?", active: true },
  { time: "0:09", en: "To go, please. And one croissant.", uz: "Olib ketish uchun, iltimos. Va bitta kruassan.", active: false },
  { time: "0:13", en: "That'll be six pounds fifty.", uz: "Olti funt ellik bo'ladi.", active: false },
];

export default function Listening() {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [level, setLevel] = useState<(typeof LEVEL_KEYS)[number]>("all");
  const filtered = TRACKS.filter((tr) => level === "all" || LEVEL_MAP[tr.level] === level);
  const current = TRACKS.find((tr) => tr.current) ?? TRACKS[0];

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow={t("listening.eyebrow")}
        title={t("listening.title")}
        description={t("listening.subtitle")}
      />

      <Card variant="raised" className="md:p-8">
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          <IconBadge icon={current.icon} tone={current.tone} size="lg" hover={false} className="h-32 w-32 rounded-2xl" />

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Pill tone="primary"><Headphones className="h-3 w-3" /> {t("listening.nowPlaying")}</Pill>
              <Pill>{t(`levels.${LEVEL_MAP[current.level] ?? "beginner"}`)}</Pill>
            </div>
            <h2 className="text-display mt-3 text-2xl">{current.titleUz}</h2>
            <p className="text-sm italic text-muted-foreground">{current.title}</p>

            <div className="mt-auto pt-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[3px_3px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-1px] hover:translate-y-[-1px]"
                >
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                </button>
                <div className="flex-1">
                  <Progress value={playing ? 38 : 28} />
                </div>
                <span className="font-mono text-sm text-muted-foreground">1:32 / {current.duration}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-foreground/10 bg-background p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t("listening.transcript")}</p>
            <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">{t("listening.hideTranslation")}</button>
          </div>
          <div className="space-y-3">
            {TRANSCRIPT.map((tr, i) => (
              <motion.div
                key={i}
                animate={{ opacity: tr.active ? 1 : 0.55 }}
                className={`rounded-xl p-3 transition ${tr.active ? "bg-primary/10" : ""}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{tr.time}</span>
                  <p className="flex-1 text-sm leading-relaxed">{tr.en}</p>
                </div>
                <p className="ml-10 mt-1 text-sm italic text-muted-foreground">{tr.uz}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        {LEVEL_KEYS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${
              level === l ? "border-primary bg-primary text-primary-foreground" : "border-foreground/10 bg-card hover:border-primary/40"
            }`}
          >
            {t(`levels.${l}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((tr, i) => (
          <motion.div
            key={tr.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -3 }}
          >
            <Card className="flex items-center gap-4 hover:border-primary cursor-pointer">
              <IconBadge icon={tr.icon} tone={tr.tone} size="md" hover={false} className="shrink-0 h-16 w-16 rounded-2xl" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Pill>{t(`levels.${LEVEL_MAP[tr.level] ?? "beginner"}`)}</Pill>
                  <span className="text-xs text-muted-foreground">{tr.duration}</span>
                </div>
                <p className="text-display mt-1.5 truncate text-lg leading-tight">{tr.titleUz}</p>
                <p className="truncate text-sm italic text-muted-foreground">{tr.title}</p>
              </div>
              {tr.completed ? (
                <CheckCircle2 className="h-6 w-6 text-secondary" />
              ) : (
                <button className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:scale-105">
                  <Play className="ml-0.5 h-4 w-4" />
                </button>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
