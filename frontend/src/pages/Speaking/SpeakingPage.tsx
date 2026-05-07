import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mic, Volume2, RotateCcw, ArrowRight, Briefcase, Coffee, Plane, GraduationCap } from "lucide-react";
import { Card, Pill, SectionHeading, GhostButton, Progress } from "@/components/ui-kit";

const SCENARIOS = [
  { id: "interview", icon: Briefcase, key: "interview", level: "intermediate", color: "text-primary", bg: "bg-primary/10" },
  { id: "cafe", icon: Coffee, key: "cafe", level: "beginner", color: "text-secondary", bg: "bg-secondary/10" },
  { id: "travel", icon: Plane, key: "travel", level: "beginner", color: "text-accent-foreground", bg: "bg-accent/30" },
  { id: "academic", icon: GraduationCap, key: "academic", level: "advanced", color: "text-primary", bg: "bg-primary/10" },
] as const;

export default function Speaking() {
  const { t } = useTranslation();
  const [recording, setRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const startStop = () => {
    if (recording) {
      setRecording(false);
      setScore(86);
    } else {
      setRecording(true);
      setScore(null);
    }
  };

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow={t("speaking.eyebrow")}
        title={t("speaking.title")}
        description={t("speaking.subtitle")}
      />

      <Card variant="raised" className="md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <Pill tone="primary">{t("speaking.todaysExercise")}</Pill>
            <h2 className="text-display mt-3 text-2xl md:text-3xl">{t("speaking.repeatPrompt")}</h2>
            <p className="mt-4 rounded-2xl border-2 border-foreground/10 bg-background p-5 text-xl italic">
              "{t("speaking.sample")}"
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("speaking.sampleTranslation")}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <GhostButton><Volume2 className="h-4 w-4" /> {t("speaking.listen")}</GhostButton>
              <GhostButton><RotateCcw className="h-4 w-4" /> {t("speaking.retry")}</GhostButton>
            </div>

            {score !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl border-2 border-secondary/40 bg-secondary/5 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-secondary">{t("speaking.scoreLabel")}</span>
                  <span className="text-display text-3xl text-secondary">{score}/100</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <div><span className="text-muted-foreground">{t("speaking.fluency")}</span><div className="font-semibold">88%</div></div>
                  <div><span className="text-muted-foreground">{t("speaking.accuracy")}</span><div className="font-semibold">82%</div></div>
                  <div><span className="text-muted-foreground">{t("speaking.pronunciation")}</span><div className="font-semibold">87%</div></div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="grid place-items-center">
            <button
              onClick={startStop}
              className="relative grid h-44 w-44 place-items-center rounded-full bg-primary text-primary-foreground shadow-[6px_6px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              {recording && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                </>
              )}
              <Mic className="relative h-16 w-16" />
            </button>
            <p className="mt-4 text-sm font-semibold">
              {recording ? t("speaking.recording") : t("speaking.tapMic")}
            </p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-display mb-4 text-2xl">{t("speaking.scenarios")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {SCENARIOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <Card className="flex items-start gap-4 hover:border-primary cursor-pointer">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${s.bg}`}>
                    <Icon className={`h-6 w-6 ${s.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-display text-lg">{t(`speaking.scenarioList.${s.key}.title`)}</h3>
                      <Pill>{t(`levels.${s.level}`)}</Pill>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{t(`speaking.scenarioList.${s.key}.body`)}</p>
                    <button className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                      {t("speaking.scenarioStart")} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("speaking.weeklyAvg")}</p>
          <p className="text-display mt-2 text-3xl text-primary">84/100</p>
          <Progress value={84} />
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("speaking.recordedMin")}</p>
          <p className="text-display mt-2 text-3xl">42</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("speaking.thisWeek")}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("speaking.scenariosDone")}</p>
          <p className="text-display mt-2 text-3xl">7</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("speaking.total")}</p>
        </Card>
      </div>
    </div>
  );
}
