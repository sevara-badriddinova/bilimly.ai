import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {
    Flame,
    Trophy,
    Target,
    BookOpen,
    Sparkles,
    Headphones,
    Mic,
    Zap,
    Gem,
    Star,
    Hand,
    type LucideIcon,
} from "lucide-react";
import {Card, Pill, Progress, Stat, PrimaryButton} from "@/components/ui-kit";
import {IconBadge, type IconTone} from "@/components/icon-badge";
import {getUserDisplayName, useAuth} from "@/context/AuthContext";
import {useUserProgress} from "@/data/progress";
import {LESSONS, getLessonText} from "@/data/lessons";
import {loadPlacementResult} from "@/data/placement";
import humoBird from "@/assets/humo-bird.png";

type LessonFlowState = {
    step?: "learn" | "practice" | "done";
    practiceIndex?: number;
    selected?: number | null;
    revealed?: boolean;
};

const LESSON_FLOW_PREFIX = "bilimly_lesson_flow";

const SKILLS = [
    {id: "grammar", labelKey: "nav.grammar", icon: BookOpen, to: "/app/lessons?category=grammar", tone: "primary" as IconTone},
    {id: "vocab", labelKey: "nav.vocabulary", icon: Sparkles, to: "/app/vocabulary", tone: "secondary" as IconTone},
    {id: "listening", labelKey: "nav.listening", icon: Headphones, to: "/app/listening", tone: "accent" as IconTone},
    {id: "speaking", labelKey: "nav.speaking", icon: Mic, to: "/app/speaking", tone: "primary" as IconTone},
];

const ACHIEVEMENTS: {
    icon: LucideIcon;
    labelKey: string;
    labelParams?: Record<string, unknown>;
    earned: boolean;
    tone: IconTone
}[] = [
    {icon: Flame, labelKey: "profile.streakChip", labelParams: {n: 7}, earned: false, tone: "accent"},
    {icon: Trophy, labelKey: "achievements.first100", earned: false, tone: "primary"},
    {icon: BookOpen, labelKey: "achievements.tenLessons", earned: false, tone: "secondary"},
    {icon: Target, labelKey: "achievements.perfectWeek", earned: false, tone: "primary"},
    {icon: Gem, labelKey: "achievements.xp1000", earned: false, tone: "secondary"},
    {icon: Star, labelKey: "achievements.streak30", earned: false, tone: "accent"},
];

export default function Dashboard() {
    const {t, i18n} = useTranslation();
    const {user} = useAuth();
    const {progress} = useUserProgress(user?.id);
    const language = i18n.resolvedLanguage || i18n.language;
    const recentLessons = progress.recentLessons
        .map((id) => LESSONS.find((lesson) => lesson.id === id))
        .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));
    const placement = loadPlacementResult(user?.id);
    const nextAction = getDashboardNextAction(progress, user?.id, language, t);
    const dailyGoalProgress = progress.dailyGoalXp > 0 ? Math.round((progress.xpToday / progress.dailyGoalXp) * 100) : 0;
    const dailyGoalRemaining = Math.max(progress.dailyGoalXp - progress.xpToday, 0);
    const displayName = getUserDisplayName(user);

    return (
        <div className="space-y-8">
            {/* Welcome header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        {t("dashboard.greeting", {name: displayName})} <Hand className="h-3.5 w-3.5"/>
                    </p>
                    <h1 className="text-display mt-2 text-3xl leading-tight md:text-4xl">
                        {t("dashboard.title")}
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Flame className="h-5 w-5 text-accent-foreground"/>
                        <Stat n={String(progress.streakDays)} label={t("dashboard.streak")}/>
                    </div>
                    <span className="h-10 w-px bg-border"/>
                    <Stat n={String(progress.xpToday)} label={t("dashboard.xpToday")} accent/>
                    <span className="h-10 w-px bg-border"/>
                    <Stat n={String(progress.level)} label={t("dashboard.level")}/>
                </div>
            </div>

            {/* Continue learning hero */}
            <Card variant="raised" className="relative overflow-hidden p-0">
                <img
                    src={humoBird}
                    alt=""
                    width={200}
                    height={200}
                    className="pointer-events-none absolute -right-7 -bottom-8 hidden h-48 w-48 object-contain opacity-90 md:block"
                />
                <div className="relative grid gap-6 p-7 md:grid-cols-[1fr_auto] md:p-9">
                    <div className="max-w-2xl">
                        <Pill tone="primary">
                            {nextAction.kind === "placement" ? <Target className="h-3 w-3"/> : <Flame className="h-3 w-3"/>}
                            {nextAction.badge}
                        </Pill>
                        <h2 className="text-display mt-4 text-3xl leading-tight md:text-5xl">{nextAction.title}</h2>
                        <p className="mt-3 text-lg text-muted-foreground">{nextAction.meta}</p>
                        <div className="mt-6 max-w-xl">
                            <Progress value={nextAction.progress} label={nextAction.progressLabel}/>
                        </div>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link to={nextAction.to} className="inline-block">
                                <PrimaryButton>{nextAction.cta}</PrimaryButton>
                            </Link>
                            {nextAction.kind !== "placement" && !placement && (
                                <Link to="/app/lessons?placement=1" className="text-sm font-semibold text-primary hover:underline">
                                    {t("dashboard.recommendation.checkLevelLink")}
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="hidden w-48 self-end rounded-2xl border-2 border-foreground/10 bg-background/70 p-4 md:block">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("dashboard.recommendation.nextStep")}</p>
                        <p className="text-display mt-2 text-xl leading-tight">{nextAction.cardTitle}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{nextAction.cardMeta}</p>
                    </div>
                </div>
            </Card>

            {/* Daily goal + achievements */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary"/>
                        <span
                            className="text-xs font-semibold uppercase tracking-widest text-primary">{t("dashboard.dailyGoal")}</span>
                    </div>
                    <p className="text-display mt-3 text-3xl">{progress.xpToday} / {progress.dailyGoalXp} XP</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.goalRemaining", {xp: dailyGoalRemaining})}</p>
                    <div className="mt-4">
                        <Progress value={dailyGoalProgress}/>
                    </div>
                </Card>

                <Card className="md:col-span-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-primary"/>
                            <span
                                className="text-xs font-semibold uppercase tracking-widest text-primary">{t("dashboard.achievements")}</span>
                        </div>
                        <Link to="/app/profile" className="text-xs font-semibold text-primary hover:underline">
                            {t("common.viewAll")} →
                        </Link>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {ACHIEVEMENTS.map((a) => (
                            <motion.div
                                key={a.labelKey}
                                whileHover={{y: -3}}
                                className={`flex flex-col items-center gap-2 rounded-xl border-2 border-foreground/10 p-3 text-center ${
                                    a.earned ? "bg-card" : "opacity-40 grayscale"
                                }`}
                            >
                                <IconBadge icon={a.icon} tone={a.tone} size="sm" hover={false}/>
                                <span
                                    className="line-clamp-2 text-[10px] font-semibold leading-tight">{a.labelParams ? t(a.labelKey, a.labelParams) : t(a.labelKey)}</span>
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
                                <motion.div whileHover={{y: -4}} transition={{type: "spring", stiffness: 300}}>
                                    <Card className="hover:border-primary">
                                        <IconBadge icon={s.icon} tone={s.tone} size="md" hover={false}/>
                                        <p className="text-display mt-4 text-lg">{t(s.labelKey)}</p>
                                        <div className="mt-3">
                                            <Progress value={progress.skills[s.id as keyof typeof progress.skills]}/>
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
                    <Link to="/app/lessons" className="text-sm font-semibold text-primary hover:underline">
                        {t("common.viewAll")} →
                    </Link>
                </div>
                <div className="grid gap-3">
                    {recentLessons.map((r) => (
                        <Link key={r.id} to={`/app/lessons/${r.id}`}>
                            <motion.div whileHover={{x: 4}}>
                                <Card className="flex items-center gap-4 hover:border-primary">
                                    <IconBadge icon={r.icon} tone={r.tone} size="md" hover={false}/>
                                    <div className="flex-1">
                                        <p className="text-display text-lg leading-tight">{getLessonText(r, language).title}</p>
                                        {language?.slice(0, 2) !== "en" &&
                                            <p className="text-sm italic text-muted-foreground">{r.title}</p>}
                                    </div>
                                    <div className="text-right">
                                        <Pill tone="accent"><Zap className="h-3 w-3"/> {r.xp} XP</Pill>
                                        <p className="mt-1 text-xs text-muted-foreground">{t("coach.timeToday")}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        </Link>
                    ))}
                    {recentLessons.length === 0 && (
                        <Card className="text-sm text-muted-foreground">
                            {t("dashboard.noRecent", "No lessons completed yet. Start your first lesson to see progress here.")}
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

function getDashboardNextAction(progress: ReturnType<typeof useUserProgress>["progress"], userId: number | string | undefined, language: string, t: ReturnType<typeof useTranslation>["t"]) {
    const hasAnyProgress = progress.completedLessonIds.length > 0
        || progress.recentLessons.length > 0
        || progress.totalXp > 0
        || progress.xpToday > 0
        || progress.lessonProgress > 0;
    const placement = loadPlacementResult(userId);
    const recommendedLesson = placement?.recommendedLessonIds
        .map((id) => LESSONS.find((lesson) => lesson.id === id))
        .find(Boolean);

    if (!hasAnyProgress && !placement) {
        return {
            kind: "placement" as const,
            badge: t("dashboard.recommendation.placementBadge"),
            title: t("dashboard.recommendation.placementTitle"),
            meta: t("dashboard.recommendation.placementMeta"),
            progress: 0,
            progressLabel: t("dashboard.recommendation.placementProgress"),
            to: "/app/lessons?placement=1",
            cta: t("dashboard.recommendation.placementCta"),
            cardTitle: t("dashboard.recommendation.placementCardTitle"),
            cardMeta: t("dashboard.recommendation.placementCardMeta"),
        };
    }

    const lesson = LESSONS.find((item) => item.id === progress.currentLessonId)
        || recommendedLesson
        || LESSONS.find((item) => !progress.completedLessonIds.includes(item.id))
        || LESSONS[0];
    const lessonText = getLessonText(lesson, language);
    const flow = loadDashboardLessonFlow(lesson.id, userId);
    const inLessonProgress = progress.completedLessonIds.includes(lesson.id)
        ? 100
        : getFlowProgress(flow, progress.lessonProgress);
    const kind = inLessonProgress > 0 ? "continue" as const : "suggest" as const;

    return {
        kind,
        badge: kind === "continue" ? t("dashboard.recommendation.continueBadge") : t("dashboard.recommendation.suggestedBadge"),
        title: kind === "continue"
            ? t("dashboard.recommendation.continueTitle", {lesson: lessonText.title})
            : t("dashboard.recommendation.suggestedTitle", {lesson: lessonText.title}),
        meta: t("dashboard.recommendation.lessonMeta", {category: lesson.category, minutes: lesson.minutes, xp: lesson.xp}),
        progress: inLessonProgress,
        progressLabel: kind === "continue" ? t("dashboard.lessonProgress") : t("dashboard.recommendation.startProgress"),
        to: `/app/lessons/${lesson.id}`,
        cta: kind === "continue" ? t("dashboard.continueCta") : t("dashboard.recommendation.startLessonCta"),
        cardTitle: lessonText.title,
        cardMeta: lessonText.summary,
    };
}

function loadDashboardLessonFlow(lessonId: string, userId?: number | string): LessonFlowState {
    try {
        const owner = userId === undefined || userId === null ? "guest" : userId;
        const saved = localStorage.getItem(`${LESSON_FLOW_PREFIX}:${owner}:${lessonId}`);
        return saved ? JSON.parse(saved) as LessonFlowState : {};
    } catch {
        return {};
    }
}

function getFlowProgress(flow: LessonFlowState, fallback: number) {
    if (flow.step === "done") return 100;
    if (flow.step === "practice") return Math.min(95, 45 + Math.max(0, Number(flow.practiceIndex) || 0) * 15 + (flow.revealed ? 10 : 0));
    if (flow.step === "learn") return 20;
    return Math.max(0, Math.min(100, fallback));
}
