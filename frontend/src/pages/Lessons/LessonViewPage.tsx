import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Zap, Flame, Check, X, Lightbulb, ArrowLeft } from "lucide-react";
import { getLesson, getNextLesson, getPrevLesson } from "@/data/lessons";
import { IconBadge } from "@/components/icon-badge";
import ikatBorder from "@/assets/ikat-border.png";
import humoBird from "@/assets/humo-bird.png";
import anorMotif from "@/assets/anor-motif.png";

function ErrorView({ message }: { message: string }) {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-display text-3xl">{t("lessonPlayer.errorTitle")}</h1>
      <p className="mt-2 text-muted-foreground">{message}</p>
      <Link to="/lessons" className="mt-6 inline-block text-primary hover:underline">← {t("lessonPlayer.backToLessons")}</Link>
    </div>
  );
}

function NotFoundView() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-display text-4xl">{t("lessonPlayer.notFound")}</h1>
      <Link to="/lessons" className="mt-6 inline-block text-primary hover:underline">← {t("lessonPlayer.backToLessons")}</Link>
    </div>
  );
}

export default function LessonPage() {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const lesson = getLesson(id);
  if (!lesson) return <NotFoundView />;
  const next = getNextLesson(lesson.id);
  const prev = getPrevLesson(lesson.id);

  const [step, setStep] = useState<"learn" | "practice" | "done">("learn");
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Sample quiz
  const question = {
    prompt: t("lessonPlayer.question"),
    options: [
      "She are a student.",
      "She is a student.",
      "She am a student.",
      "She be a student.",
    ],
    correct: 1,
    explain: t("lessonPlayer.explain"),
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="w-full opacity-90"
        style={{
          backgroundImage: `url(${ikatBorder})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          height: "18px",
        }}
      />

      {/* Lesson top bar */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link to="/lessons" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("lessonPlayer.backToLessons")}
        </Link>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span>{t("lessonPlayer.unit", { n: lesson.unit })}</span>
          <span>·</span>
          <span className="text-primary font-semibold">{lesson.category}</span>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-accent-foreground">
          <Zap className="h-3 w-3" /> {lesson.xp} XP
        </div>
      </header>

      {/* Progress bar */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: step === "learn" ? "33%" : step === "practice" ? "66%" : "100%" }}
          />
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Title */}
        <div className="mb-10 flex items-start gap-5">
          <IconBadge icon={lesson.icon} tone="primary" size="lg" hover={false} />
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{lesson.level}</p>
            <h1 className="text-display mt-1 text-4xl leading-[1.05] md:text-5xl">{lesson.titleUz}</h1>
            <p className="mt-1 text-lg italic text-muted-foreground">{lesson.title}</p>
            <p className="mt-3 max-w-2xl text-muted-foreground">{lesson.summary}</p>
          </div>
        </div>

        {/* Step tabs */}
        <div className="mb-8 flex gap-2 rounded-2xl border-2 border-foreground/10 bg-card p-1.5">
          <StepTab active={step === "learn"} onClick={() => setStep("learn")}>
            1 · {t("lessonPlayer.steps.learn")}
          </StepTab>
          <StepTab active={step === "practice"} onClick={() => setStep("practice")}>
            2 · {t("lessonPlayer.steps.practice")}
          </StepTab>
          <StepTab active={step === "done"} onClick={() => setStep("done")}>
            3 · {t("lessonPlayer.steps.done")}
          </StepTab>
        </div>

        {step === "learn" && <LearnSection lesson={lesson} />}

        {step === "practice" && (
          <div className="rounded-[1.75rem] border-2 border-foreground/10 bg-card p-6 shadow-[10px_10px_0_0_oklch(0.30_0.10_280)] md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
              {t("lessonPlayer.practice")} · {t("lessonPlayer.practiceCount")}
            </span>
            <h2 className="text-display mt-4 text-2xl md:text-3xl">{question.prompt}</h2>

            <div className="mt-6 grid gap-3">
              {question.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === question.correct;
                let cls = "border-foreground/10 hover:border-primary/40";
                if (revealed && isSelected && isCorrect) cls = "border-secondary bg-secondary/10";
                else if (revealed && isSelected && !isCorrect) cls = "border-primary bg-primary/10";
                else if (revealed && isCorrect) cls = "border-secondary";
                else if (isSelected) cls = "border-primary bg-primary/5";

                return (
                  <button
                    key={i}
                    onClick={() => !revealed && setSelected(i)}
                    className={`rounded-2xl border-2 px-5 py-4 text-left text-base font-medium transition ${cls}`}
                  >
                    <span className="mr-3 inline-block w-6 text-muted-foreground">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div className="mt-6 rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-5">
                <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-secondary">
                  {selected === question.correct ? <><Check className="h-4 w-4" /> {t("lessonPlayer.correct")}</> : <><X className="h-4 w-4" /> {t("lessonPlayer.wrong")}</>}
                </p>
                <p className="mt-2 text-foreground">{question.explain}</p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep("learn")}
                className="rounded-full border-2 border-foreground/10 bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted"
              >
                ← {t("common.back")}
              </button>
              {!revealed ? (
                <button
                  disabled={selected === null}
                  onClick={() => setRevealed(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                  {t("lessonPlayer.check")}
                </button>
              ) : (
                <button
                  onClick={() => setStep("done")}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  {t("common.continue")} →
                </button>
              )}
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-foreground/10 bg-card p-8 text-center shadow-[10px_10px_0_0_oklch(0.30_0.10_280)] md:p-12">
            <img
              src={anorMotif}
              alt=""
              aria-hidden
              loading="lazy"
              className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rotate-[-12deg] opacity-90"
            />
            <img
              src={humoBird}
              alt=""
              width={180}
              height={180}
              className="mx-auto h-40 w-40 object-contain drop-shadow-md"
            />
            <h2 className="text-display mt-6 text-3xl md:text-4xl">{t("lessonPlayer.congrats")}</h2>
            <p className="mt-2 text-muted-foreground">{t("lessonPlayer.congratsBody")}</p>

            <div className="mx-auto mt-6 flex max-w-sm items-center justify-around rounded-2xl border-2 border-foreground/10 bg-background p-4">
              <Reward label={t("lessonPlayer.rewardXp")} value={`+${lesson.xp}`} />
              <span className="h-10 w-px bg-border" />
              <Reward label={t("lessonPlayer.rewardTime")} value={`${lesson.minutes} ${t("common.minShort")}`} />
              <span className="h-10 w-px bg-border" />
              <Reward label={t("lessonPlayer.rewardStreak")} value="8" icon={Flame} />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/lessons"
                className="rounded-full border-2 border-foreground/10 bg-card px-6 py-3 text-sm font-semibold hover:bg-muted"
              >
                {t("lessonPlayer.backList")}
              </Link>
              {next && (
                <Link
                  to={`/lessons/${next.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  {t("lessonPlayer.nextLesson")}: {next.titleUz} →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Prev / Next nav */}
        <div className="mt-10 flex items-center justify-between gap-4">
          {prev ? (
            <Link
              to={`/lessons/${prev.id}`}
              className="group flex-1 rounded-2xl border-2 border-foreground/10 bg-card p-4 transition hover:border-primary"
            >
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("lessonPlayer.prev")}</div>
              <div className="text-display mt-1 text-lg">{prev.titleUz}</div>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              to={`/lessons/${next.id}`}
              className="group flex-1 rounded-2xl border-2 border-foreground/10 bg-card p-4 text-right transition hover:border-primary"
            >
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("lessonPlayer.next")}</div>
              <div className="text-display mt-1 text-lg">{next.titleUz}</div>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </main>
    </div>
  );
}

function StepTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

function LearnSection({ lesson }: { lesson: { titleUz: string; title: string } }) {
  const { t } = useTranslation();
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-[1.75rem] border-2 border-foreground/10 bg-card p-6 shadow-[6px_6px_0_0_oklch(0.30_0.10_280)] md:col-span-2 md:p-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
          {t("lessonPlayer.explanation")}
        </span>
        <h2 className="text-display mt-3 text-2xl md:text-3xl">{t("lessonPlayer.toBeTitle")}</h2>
        <p className="mt-4 text-muted-foreground">
          {t("lessonPlayer.toBeIntro")}
        </p>

        <div className="mt-6 grid gap-3">
          <Rule subject="I" form="am" example="I am a student." translation="Men talabaman." />
          <Rule subject="You / We / They" form="are" example="They are friends." translation="Ular do'st." />
          <Rule subject="He / She / It" form="is" example="She is happy." translation="U xursand." />
        </div>

        <div className="mt-6 rounded-2xl border-2 border-accent/40 bg-accent/10 p-5">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-accent-foreground"><Lightbulb className="h-4 w-4" /> {t("lessonPlayer.tip")}</p>
          <p className="mt-2 text-foreground">
            <strong>I'm</strong> = I am, <strong>you're</strong> = you are, <strong>she's</strong> = she is.
          </p>
        </div>
      </div>

      {/* Side panel — AI tutor */}
      <div className="rounded-[1.75rem] border-2 border-foreground/10 bg-card p-6 shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]">
        <div className="flex items-center gap-2">
          <img src={humoBird} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
          <div>
            <div className="text-sm font-semibold">Humo AI</div>
            <div className="text-xs text-muted-foreground">{t("lessonPlayer.tutor")}</div>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm">
          <ChatBubble side="left">{t("lessonPlayer.tutorPrompt")}</ChatBubble>
        </div>

        <input
          placeholder={t("lessonPlayer.askPlaceholder")}
          className="mt-5 w-full rounded-xl border-2 border-foreground/10 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  );
}

function Rule({ subject, form, example, translation }: { subject: string; form: string; example: string; translation: string }) {
  return (
    <div className="rounded-2xl border-2 border-foreground/10 bg-background p-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-display text-xl">{subject}</span>
        <span className="text-muted-foreground">+</span>
        <span className="rounded-full bg-primary/10 px-3 py-0.5 font-mono text-primary">{form}</span>
      </div>
      <p className="mt-2 italic">{example}</p>
      <p className="text-sm text-muted-foreground">{translation}</p>
    </div>
  );
}

function ChatBubble({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  const isLeft = side === "left";
  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-relaxed ${
          isLeft ? "rounded-bl-sm bg-muted text-foreground" : "rounded-br-sm bg-primary text-primary-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Reward({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div>
      <div className="text-display text-xl inline-flex items-center gap-1.5">
        {Icon && <Icon className="h-4 w-4 text-accent-foreground" />} {value}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
