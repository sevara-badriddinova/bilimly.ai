import { Link } from "react-router-dom";
import { Flame, Zap, Lock, Check, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LESSONS, getLessonCategory, getLessonLevel, getLessonText, type Lesson } from "@/data/lessons";
import { INITIAL_USER_PROGRESS } from "@/data/progress";
import { IconBadge } from "@/components/icon-badge";
import { LanguageSwitcher } from "@/components/language-switcher";
import humoBird from "@/assets/humo-bird.png";
import ikatBorder from "@/assets/ikat-border.png";
import anorMotif from "@/assets/anor-motif.png";

const CATEGORY_KEYS = ["all", "grammar", "vocabulary", "speaking", "listening"] as const;
const CATEGORY_NAV_KEY: Record<(typeof CATEGORY_KEYS)[number], string> = {
  all: "lessonsPage.allCategory",
  grammar: "nav.grammar",
  vocabulary: "nav.vocabulary",
  speaking: "nav.speaking",
  listening: "nav.listening",
};

export default function LessonsPage() {
  const { t } = useTranslation();
  const progress = INITIAL_USER_PROGRESS;
  const completed = progress.completedLessonIds.length;
  const total = LESSONS.length;
  const pct = Math.round((completed / total) * 100);

  // Group by unit
  const units = Array.from(new Set(LESSONS.map((l) => l.unit))).sort();

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

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap size={20} strokeWidth={2.25} />
          </span>
          <span className="text-display text-2xl font-semibold">
            bilimly<span className="text-primary">.</span>ai
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground transition">{t("nav.home")}</Link>
          <Link to="/lessons" className="font-semibold text-foreground">{t("nav.lessons")}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link to="/signin" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
            {t("nav.signIn")}
          </Link>
        </div>
      </header>

      {/* Hero / progress */}
      <section className="mx-auto max-w-6xl px-6 pt-6 pb-12 md:pt-12">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {t("lessonsPage.eyebrow")}
            </span>
            <h1 className="text-display mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              {t("lessonsPage.title")}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              {t("lessonsPage.subtitle")}
            </p>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <Stat n={`${completed}/${total}`} label={t("lessonsPage.completed")} />
              <span className="h-8 w-px bg-border" />
              <Stat n={String(progress.xpToday)} label={t("dashboard.xpToday")} />
              <span className="h-8 w-px bg-border" />
              <Stat n={String(progress.streakDays)} label={t("dashboard.streakLabel")} icon={Flame} />
            </div>

            {/* Progress bar */}
            <div className="mt-6 max-w-md">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span>{t("lessonsPage.overall")}</span>
                <span className="font-semibold text-primary">{pct}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full border-2 border-foreground/10 bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.80 0.16 80 / 0.6), transparent 70%)" }}
            />
            <img src={humoBird} alt="" width={220} height={220} className="h-52 w-52 object-contain drop-shadow-md" />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORY_KEYS.map((c, i) => (
            <button
              key={c}
              className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${
                i === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-foreground/10 bg-card hover:border-primary/40"
              }`}
            >
              {t(CATEGORY_NAV_KEY[c])}
            </button>
          ))}
        </div>
      </section>

      {/* Units */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {units.map((unit) => {
          const items = LESSONS.filter((l) => l.unit === unit);
          return (
            <div key={unit} className="mb-14">
              <div className="mb-6 flex items-baseline gap-4">
                <span className="text-display text-5xl text-primary/30">{String(unit).padStart(2, "0")}</span>
                <h2 className="text-display text-2xl md:text-3xl">{t("lessonsPage.unit", { n: unit })}</h2>
                <span className="text-sm text-muted-foreground">
                  {t("lessonsPage.unitCount", { n: items.length })}
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {items.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={{
                      ...lesson,
                      status: progress.completedLessonIds.includes(lesson.id)
                        ? "completed"
                        : lesson.id === progress.currentLessonId
                          ? "current"
                          : lesson.status === "completed"
                            ? "available"
                            : lesson.status,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-foreground/10 bg-secondary p-10 text-secondary-foreground md:p-16">
          <img
            src={anorMotif}
            alt=""
            aria-hidden
            loading="lazy"
            className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rotate-12 opacity-90"
          />
          <div className="relative max-w-xl">
            <h2 className="text-display md:text-5xl text-3xl">
              {t("lessonsPage.ctaTitle")}
            </h2>
            <p className="mt-4 text-lg opacity-80">
              {t("lessonsPage.ctaBody")}
            </p>
            <Link
              to="/lessons/03-to-be"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-[4px_4px_0_0_oklch(0.45_0.17_22)] transition hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              {t("lessonsPage.ctaButton")}
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <span>© 2026 Bilimly.ai · Made with care in Tampa</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ n, label, icon: Icon }: { n: string; label: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div>
      <div className="text-display text-2xl font-semibold inline-flex items-center gap-1.5">
        {Icon && <Icon className="h-5 w-5 text-primary" />} {n}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;
  const text = getLessonText(lesson, language);
  const isLocked = lesson.status === "locked";
  const isCurrent = lesson.status === "current";
  const isCompleted = lesson.status === "completed";

  const card = (
    <div
      className={`group relative h-full rounded-2xl border-2 bg-card p-6 transition ${
        isLocked
          ? "border-foreground/10 opacity-60"
          : isCurrent
          ? "border-primary shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]"
          : "border-foreground/10 hover:-translate-y-1 hover:border-primary hover:shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]"
      }`}
    >
      <div className="flex items-start justify-between">
        <IconBadge icon={lesson.icon} tone={isCurrent ? "primary" : isCompleted ? "secondary" : "accent"} size="md" />
        <StatusBadge status={lesson.status} />
      </div>

      <h3 className="text-display mt-4 text-xl leading-tight">{text.title}</h3>
      {language?.slice(0, 2) !== "en" && <p className="mt-1 text-sm italic text-muted-foreground">{lesson.title}</p>}
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{text.summary}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
        <Tag>{getLessonCategory(lesson, language)}</Tag>
        <Tag>{getLessonLevel(lesson, language)}</Tag>
        <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
          {lesson.minutes} {t("common.minShort")} · <Zap className="h-3 w-3" />{lesson.xp} XP
        </span>
      </div>

      {isCurrent && (
        <div className="absolute -right-2 -top-2 rotate-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-md">
          {t("lessonsPage.continueRibbon")}
        </div>
      )}
      {isCompleted && (
        <div className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-md">
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </div>
      )}
    </div>
  );

  if (isLocked) return <div className="cursor-not-allowed">{card}</div>;

  return (
    <Link to={`/lessons/${lesson.id}`} className="block">
      {card}
    </Link>
  );
}

function StatusBadge({ status }: { status: Lesson["status"] }) {
  const { t } = useTranslation();
  if (status === "completed")
    return <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">{t("lessonsPage.statusCompleted")}</span>;
  if (status === "current")
    return <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{t("lessonsPage.statusCurrent")}</span>;
  if (status === "locked")
    return <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground"><Lock className="h-3 w-3" /></span>;
  return <span className="rounded-full bg-accent/30 px-2.5 py-1 text-xs font-semibold text-accent-foreground">{t("lessonsPage.statusNew")}</span>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-foreground/15 bg-background px-2.5 py-1 font-medium">
      {children}
    </span>
  );
}
