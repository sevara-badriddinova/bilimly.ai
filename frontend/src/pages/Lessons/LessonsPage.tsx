import {Link} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {Flame, Zap, Lock, Check, GraduationCap, UserCircle, SlidersHorizontal, Target, X} from "lucide-react";
import {useTranslation} from "react-i18next";
import {LESSONS, getLessonCategory, getLessonLevel, getLessonText, type Lesson} from "@/data/lessons";
import {useUserProgress} from "@/data/progress";
import {
    loadPlacementResult,
    PLACEMENT_QUESTIONS,
    savePlacementResult,
    scorePlacement,
    type PlacementAnswer,
    type PlacementQuestion,
    type PlacementResult
} from "@/data/placement";
import {IconBadge} from "@/components/icon-badge";
import {LanguageSwitcher} from "@/components/language-switcher";
import {useAuth} from "@/context/AuthContext";
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
    const {t} = useTranslation();
    const {user, isAuthenticated, isLoading} = useAuth();
    const {progress} = useUserProgress(user?.id);
    const [placement, setPlacement] = useState<PlacementResult | null>(() => loadPlacementResult(user?.id));
    const [showPlacement, setShowPlacement] = useState(false);
    const completed = progress.completedLessonIds.length;
    const total = LESSONS.length;
    const pct = Math.round((completed / total) * 100);
    const recommendedLessons = useMemo(
        () => placement?.recommendedLessonIds
            .map((lessonId) => LESSONS.find((lesson) => lesson.id === lessonId))
            .filter((lesson): lesson is Lesson => Boolean(lesson)) ?? [],
        [placement]
    );
    const recommendedLessonIds = useMemo(() => new Set(recommendedLessons.map((lesson) => lesson.id)), [recommendedLessons]);
    const startLesson = recommendedLessons[0] || LESSONS.find((lesson) => lesson.id === progress.currentLessonId) || LESSONS[0];

    useEffect(() => {
        setPlacement(loadPlacementResult(user?.id));
    }, [user?.id]);

    function handlePlacementComplete(result: PlacementResult) {
        savePlacementResult(result, user?.id);
        setPlacement(result);
        setShowPlacement(false);
    }

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
            <GraduationCap size={20} strokeWidth={2.25}/>
          </span>
                    <span className="text-display text-2xl font-semibold">
            bilimly<span className="text-primary">.</span>ai
          </span>
                </Link>
                <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                    <Link to="/" className="hover:text-foreground transition">{t("nav.home", "Home")}</Link>
                    <Link to="/lessons" className="font-semibold text-foreground">{t("nav.lessons", "Lessons")}</Link>
                </nav>
                <div className="flex items-center gap-3">
                    <LanguageSwitcher/>
                    {isLoading ? (
                        <span className="h-9 w-20 rounded-full bg-muted" aria-hidden/>
                    ) : isAuthenticated ? (
                        <Link
                            to="/app/profile"
                            aria-label={t("nav.profile", "Profile")}
                            title={user?.email || t("nav.profile", "Profile")}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-90"
                        >
                            <UserCircle className="h-5 w-5"/>
                        </Link>
                    ) : (
                        <Link to="/signin"
                              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
                            {t("nav.signIn", "Sign in")}
                        </Link>
                    )}
                </div>
            </header>

            {/* Hero / progress */}
            <section className="mx-auto max-w-6xl px-6 pt-6 pb-12 md:pt-12">
                <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
                    <div>
            <span
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"/>
                {t("lessonsPage.eyebrow")}
            </span>
                        <h1 className="text-display mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                            {t("lessonsPage.title")}
                        </h1>
                        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                            {t("lessonsPage.subtitle")}
                        </p>
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to={`/lessons/${startLesson.id}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-black text-primary-foreground shadow-[5px_5px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_oklch(0.30_0.10_280)]"
                            >
                                {t("lessonsPage.ctaButton")} · {getLessonText(startLesson).title}
                                <span>→</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setShowPlacement(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/30 bg-primary/5 px-6 py-4 text-sm font-bold text-primary transition hover:border-primary/60 hover:bg-primary/10"
                            >
                                <SlidersHorizontal className="h-4 w-4"/>
                                {placement ? t("placement.retake", "Retake placement") : t("placement.start", "Find my level")}
                            </button>
                        </div>

                        {/* Stats row */}
                        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
                            <Stat n={`${completed}/${total}`} label={t("lessonsPage.completed")}/>
                            <span className="h-8 w-px bg-border"/>
                            <Stat n={String(progress.xpToday)} label={t("dashboard.xpToday")}/>
                            <span className="h-8 w-px bg-border"/>
                            <Stat n={String(progress.streakDays)} label={t("dashboard.streakLabel", "Streak")} icon={Flame}/>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-6 max-w-md">
                            <div
                                className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                                <span>{t("lessonsPage.overall")}</span>
                                <span className="font-semibold text-primary">{pct}%</span>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full border-2 border-foreground/10 bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary transition-all"
                                    style={{width: `${pct}%`}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden md:block">
                        <div
                            aria-hidden
                            className="absolute -inset-6 -z-10 rounded-full opacity-40 blur-3xl"
                            style={{background: "radial-gradient(circle, oklch(0.80 0.16 80 / 0.6), transparent 70%)"}}
                        />
                        <img src={humoBird} alt="" width={220} height={220}
                             className="h-52 w-52 object-contain drop-shadow-md"/>
                    </div>
                </div>
            </section>

            {placement && (
                <section className="mx-auto max-w-6xl px-6 pb-6">
                    <div className="rounded-[1.5rem] border-2 border-primary/20 bg-primary/5 p-5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                                    <Target className="h-4 w-4"/>
                                    {t("placement.plan", "Personalized plan")}
                                </p>
                                <h2 className="text-display mt-2 text-2xl">
                                    {t("placement.level", "Level")}: {placement.level}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {placement.weakAreas.length
                                        ? t("placement.focus", "Focus areas") + ": " + placement.weakAreas.join(", ")
                                        : t("placement.noWeakness", "No major weak areas found. Keep building momentum.")}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPlacement(true)}
                                className="rounded-full border-2 border-primary/30 bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                            >
                                {t("placement.adjust", "Adjust")}
                            </button>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                            {recommendedLessons.map((lesson) => (
                                <Link
                                    key={lesson.id}
                                    to={`/lessons/${lesson.id}`}
                                    className="rounded-2xl border-2 border-foreground/10 bg-card p-4 transition hover:-translate-y-1 hover:border-primary"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                                        {getLessonCategory(lesson)}
                                    </p>
                                    <p className="text-display mt-1 text-lg">{getLessonText(lesson).title}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">{lesson.minutes} {t("common.minShort")} · {lesson.xp} XP</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
                                <span
                                    className="text-display text-5xl text-primary/30">{String(unit).padStart(2, "0")}</span>
                                <h2 className="text-display text-2xl md:text-3xl">{t("lessonsPage.unit", {n: unit})}</h2>
                                <span className="text-sm text-muted-foreground">
                  {t("lessonsPage.unitCount", {n: items.length})}
                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {items.map((lesson) => (
                                    <LessonCard
                                        key={lesson.id}
                                        recommended={recommendedLessonIds.has(lesson.id)}
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
                <div
                    className="relative overflow-hidden rounded-[2rem] border-2 border-foreground/10 bg-secondary p-10 text-secondary-foreground md:p-16">
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
                <div
                    className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
                    <span>© 2026 Bilimly.ai · Made with care in Tampa</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-foreground">Privacy</a>
                        <a href="#" className="hover:text-foreground">Terms</a>
                    </div>
                </div>
            </footer>

            {showPlacement && (
                <PlacementModal
                    onClose={() => setShowPlacement(false)}
                    onComplete={handlePlacementComplete}
                />
            )}
        </div>
    );
}

function Stat({n, label, icon: Icon}: {
    n: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>
}) {
    return (
        <div>
            <div className="text-display text-2xl font-semibold inline-flex items-center gap-1.5">
                {Icon && <Icon className="h-5 w-5 text-primary"/>} {n}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        </div>
    );
}

function LessonCard({lesson, recommended = false}: { lesson: Lesson; recommended?: boolean }) {
    const {t, i18n} = useTranslation();
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
                    : recommended
                        ? "border-primary shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]"
                    : isCurrent
                        ? "border-primary shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]"
                        : "border-foreground/10 hover:-translate-y-1 hover:border-primary hover:shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]"
            }`}
        >
            <div className="flex items-start justify-between">
                <IconBadge icon={lesson.icon} tone={isCurrent ? "primary" : isCompleted ? "secondary" : "accent"}
                           size="md"/>
                <StatusBadge status={lesson.status}/>
            </div>

            <h3 className="text-display mt-4 text-xl leading-tight">{text.title}</h3>
            {language?.slice(0, 2) !== "en" &&
                <p className="mt-1 text-sm italic text-muted-foreground">{lesson.title}</p>}
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{text.summary}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
                <Tag>{getLessonCategory(lesson, language)}</Tag>
                <Tag>{getLessonLevel(lesson, language)}</Tag>
                <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
          {lesson.minutes} {t("common.minShort")} · <Zap className="h-3 w-3"/>{lesson.xp} XP
        </span>
            </div>

            {isCurrent && (
                <div
                    className="absolute -right-2 -top-2 rotate-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-md">
                    {t("lessonsPage.continueRibbon")}
                </div>
            )}
            {recommended && !isCurrent && !isCompleted && (
                <div
                    className="absolute -right-2 -top-2 rotate-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-md">
                    {t("placement.recommended", "Recommended")}
                </div>
            )}
            {isCompleted && (
                <div
                    className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-md">
                    <Check className="h-4 w-4" strokeWidth={2.5}/>
                </div>
            )}
            {!isLocked && (
                <div className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[3px_3px_0_0_oklch(0.30_0.10_280)] transition group-hover:translate-x-[-1px] group-hover:translate-y-[-1px]">
                    {isCurrent ? t("lessonsPage.continueRibbon") : t("lessonsPage.startLesson", "Start lesson")}
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

function StatusBadge({status}: { status: Lesson["status"] }) {
    const {t} = useTranslation();
    if (status === "completed")
        return <span
            className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">{t("lessonsPage.statusCompleted")}</span>;
    if (status === "current")
        return <span
            className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{t("lessonsPage.statusCurrent")}</span>;
    if (status === "locked")
        return <span
            className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground"><Lock
            className="h-3 w-3"/></span>;
    return <span
        className="rounded-full bg-accent/30 px-2.5 py-1 text-xs font-semibold text-accent-foreground">{t("lessonsPage.statusNew")}</span>;
}

function Tag({children}: { children: React.ReactNode }) {
    return (
        <span className="rounded-full border border-foreground/15 bg-background px-2.5 py-1 font-medium">
      {children}
    </span>
    );
}

function PlacementModal({
                            onClose,
                            onComplete,
                        }: {
    onClose: () => void;
    onComplete: (result: PlacementResult) => void;
}) {
    const {t} = useTranslation();
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, PlacementAnswer>>({});
    const question = PLACEMENT_QUESTIONS[index];
    const selected = question ? answers[question.id] : undefined;
    const progress = Math.round(((index + 1) / PLACEMENT_QUESTIONS.length) * 100);

    function choose(answer: PlacementAnswer) {
        if (!question) return;
        const nextAnswers = {...answers, [question.id]: answer};
        setAnswers(nextAnswers);

        window.setTimeout(() => {
            if (index < PLACEMENT_QUESTIONS.length - 1) {
                setIndex((current) => current + 1);
            } else {
                onComplete(scorePlacement(nextAnswers, LESSONS));
            }
        }, 180);
    }

    if (!question) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end bg-foreground/50 p-0 backdrop-blur-sm sm:items-center sm:p-6">
            <div className="mx-auto w-full max-w-2xl rounded-t-[1.75rem] border-2 border-foreground/10 bg-background p-6 shadow-2xl sm:rounded-[1.75rem] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                            {t("placement.eyebrow", "Placement")}
                        </p>
                        <h2 className="text-display mt-2 text-3xl">
                            {t("placement.title", "Find your best starting point")}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {t("placement.subtitle", "Six quick questions personalize level, grammar, vocabulary, listening, and speaking practice.")}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label={t("common.close", "Close")}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-foreground/10 bg-card transition hover:bg-muted"
                    >
                        <X className="h-4 w-4"/>
                    </button>
                </div>

                <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                        <span>{index + 1}/{PLACEMENT_QUESTIONS.length}</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary transition-all" style={{width: `${progress}%`}}/>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border-2 border-foreground/10 bg-card p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">{question.area}</p>
                    <h3 className="text-display mt-2 text-2xl">{question.prompt}</h3>
                    <div className="mt-5 grid gap-3">
                        {question.options.map((option, optionIndex) => {
                            const value = optionIndex as PlacementAnswer;
                            const active = selected === value;
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => choose(value)}
                                    className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
                                        active
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-foreground/10 bg-background hover:border-primary/40"
                                    }`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
