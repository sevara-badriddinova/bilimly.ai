import {Link, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {AnimatePresence, motion} from "framer-motion";
import {Zap, Flame, Check, X, Lightbulb, ArrowLeft} from "lucide-react";
import {
    getLesson,
    getLessonCategory,
    getLessonLevel,
    getLessonText,
    getNextLesson,
    getPrevLesson,
    LESSONS,
    type Lesson
} from "@/data/lessons";
import {IconBadge} from "@/components/icon-badge";
import {useAuth} from "@/context/AuthContext";
import {useUserProgress, type SkillId} from "@/data/progress";
import ikatBorder from "@/assets/ikat-border.png";
import humoBird from "@/assets/humo-bird.png";
import anorMotif from "@/assets/anor-motif.png";

type LessonStep = "learn" | "practice" | "done";

type LessonFlowState = {
    step: LessonStep;
    practiceIndex: number;
    selected: number | null;
    revealed: boolean;
};

type LessonDetail = {
    learnTitle: string;
    intro: string;
    points: { subject: string; form: string; example: string; translation: string }[];
    tip: React.ReactNode;
    question: {
        prompt: string;
        options: string[];
        correct: number;
        explain: string;
    };
};

const LESSON_FLOW_PREFIX = "bilimly_lesson_flow";

const LESSON_DETAILS: Record<string, LessonDetail> = {
    "01-alphabet": {
        learnTitle: "English alphabet sounds",
        intro: "English has 26 letters. The important part is not only the letter name, but the sound it usually makes in a word.",
        points: [
            {subject: "A", form: "/ei/", example: "A as in apple", translation: "A harfi: apple so'zida."},
            {subject: "B", form: "/bi:/", example: "B as in book", translation: "B harfi: book so'zida."},
            {subject: "C", form: "/si:/", example: "C as in cat", translation: "C harfi: cat so'zida."},
        ],
        tip: "Say the letter, then say a word with that letter. This makes spelling easier.",
        question: {
            prompt: "Which word starts with the letter B?",
            options: ["Apple", "Book", "Cat", "Dog"],
            correct: 1,
            explain: "Book starts with B.",
        },
    },
    "02-greetings": {
        learnTitle: "Greetings and first introductions",
        intro: "Use short, friendly phrases to start a conversation and introduce yourself.",
        points: [
            {subject: "Hello", form: "Hi", example: "Hello! / Hi!", translation: "Salom!"},
            {subject: "My name is", form: "+ name", example: "My name is Aziz.", translation: "Mening ismim Aziz."},
            {subject: "Nice to meet you", form: "polite", example: "Nice to meet you.", translation: "Tanishganimdan xursandman."},
        ],
        tip: "In casual speech, 'Hi' sounds more natural than 'Hello' with friends.",
        question: {
            prompt: "Which sentence introduces your name?",
            options: ["I name Aziz.", "My name is Aziz.", "Name my Aziz.", "I am name Aziz."],
            correct: 1,
            explain: "The natural phrase is: My name is Aziz.",
        },
    },
    "03-to-be": {
        learnTitle: "The forms of 'to be'",
        intro: "In English, 'to be' takes three different forms depending on the subject.",
        points: [
            {subject: "I", form: "am", example: "I am a student.", translation: "Men talabaman."},
            {subject: "You / We / They", form: "are", example: "They are friends.", translation: "Ular do'st."},
            {subject: "He / She / It", form: "is", example: "She is happy.", translation: "U xursand."},
        ],
        tip: <><strong>I'm</strong> = I am, <strong>you're</strong> = you are, <strong>she's</strong> = she is.</>,
        question: {
            prompt: "Which one is correct?",
            options: ["She are a student.", "She is a student.", "She am a student.", "She be a student."],
            correct: 1,
            explain: "With third-person singular (he / she / it) we use 'is'. So: She is a student.",
        },
    },
    "04-numbers": {
        learnTitle: "Numbers from 1 to 100",
        intro: "Learn the base numbers first, then combine tens and ones with a hyphen.",
        points: [
            {subject: "1-10", form: "basic", example: "one, two, three", translation: "bir, ikki, uch."},
            {subject: "20 / 30 / 40", form: "tens", example: "twenty, thirty, forty", translation: "yigirma, o'ttiz, qirq."},
            {subject: "21 / 35", form: "hyphen", example: "twenty-one, thirty-five", translation: "yigirma bir, o'ttiz besh."},
        ],
        tip: "Forty is spelled without the letter u, not 'fourty'.",
        question: {
            prompt: "How do you write 35 in English?",
            options: ["thirteen-five", "thirty-five", "three-five", "fivethirty"],
            correct: 1,
            explain: "35 is thirty-five.",
        },
    },
    "05-present-simple": {
        learnTitle: "Present Simple for routines",
        intro: "Use Present Simple for habits, routines, facts, and things that happen regularly.",
        points: [
            {subject: "I / You / We / They", form: "verb", example: "I study English.", translation: "Men ingliz tilini o'rganaman."},
            {subject: "He / She / It", form: "verb + s", example: "She studies English.", translation: "U ingliz tilini o'rganadi."},
            {subject: "Questions", form: "do / does", example: "Do you speak English?", translation: "Inglizcha gapirasizmi?"},
        ],
        tip: "For he, she, and it, remember the small '-s': works, studies, speaks.",
        question: {
            prompt: "Which sentence is correct?",
            options: ["He speak English.", "He speaks English.", "He speaking English.", "He are speak English."],
            correct: 1,
            explain: "With he / she / it in Present Simple, add -s: He speaks English.",
        },
    },
    "06-family": {
        learnTitle: "Family vocabulary",
        intro: "Use family words to describe people close to you.",
        points: [
            {subject: "Parents", form: "mother / father", example: "This is my mother.", translation: "Bu mening onam."},
            {subject: "Children", form: "son / daughter", example: "Her son is five.", translation: "Uning o'g'li besh yoshda."},
            {subject: "Siblings", form: "brother / sister", example: "I have one sister.", translation: "Mening bitta singlim/opam bor."},
        ],
        tip: "Sibling means brother or sister.",
        question: {
            prompt: "What does 'sister' mean?",
            options: ["Aka/uka", "Opa/singil", "Ota", "Ona"],
            correct: 1,
            explain: "Sister means opa or singil.",
        },
    },
    "07-present-cont": {
        learnTitle: "Present Continuous for now",
        intro: "Use Present Continuous for actions happening right now or around this moment.",
        points: [
            {subject: "I", form: "am + verb-ing", example: "I am learning.", translation: "Men o'rganyapman."},
            {subject: "You / We / They", form: "are + verb-ing", example: "They are reading.", translation: "Ular o'qishyapti."},
            {subject: "He / She / It", form: "is + verb-ing", example: "She is listening.", translation: "U tinglayapti."},
        ],
        tip: "Present Continuous usually answers: What is happening now?",
        question: {
            prompt: "Which sentence means the action is happening now?",
            options: ["I learn English every day.", "I am learning English now.", "I learned English.", "I will learn English."],
            correct: 1,
            explain: "I am learning English now uses am + verb-ing.",
        },
    },
    "08-past-simple": {
        learnTitle: "Past Simple for finished actions",
        intro: "Use Past Simple for actions that started and finished in the past.",
        points: [
            {subject: "Regular verbs", form: "verb + ed", example: "I watched a movie.", translation: "Men kino ko'rdim."},
            {subject: "Irregular verbs", form: "special form", example: "I went home.", translation: "Men uyga bordim."},
            {subject: "Time words", form: "yesterday", example: "She called yesterday.", translation: "U kecha qo'ng'iroq qildi."},
        ],
        tip: "Many common verbs are irregular: go -> went, eat -> ate, see -> saw.",
        question: {
            prompt: "Which sentence is Past Simple?",
            options: ["I go home yesterday.", "I went home yesterday.", "I am going home.", "I goes home."],
            correct: 1,
            explain: "The past form of go is went.",
        },
    },
    "09-present-perfect": {
        learnTitle: "Present Perfect for results and experience",
        intro: "Use Present Perfect when a past action connects to the present.",
        points: [
            {subject: "I / You / We / They", form: "have + V3", example: "I have finished.", translation: "Men tugatdim."},
            {subject: "He / She / It", form: "has + V3", example: "She has learned it.", translation: "U buni o'rgandi."},
            {subject: "Experience", form: "ever / never", example: "Have you ever tried it?", translation: "Buni sinab ko'rganmisiz?"},
        ],
        tip: "Present Perfect often uses already, yet, ever, never, and just.",
        question: {
            prompt: "Which sentence is Present Perfect?",
            options: ["She has finished her homework.", "She finished yesterday.", "She is finishing now.", "She finish homework."],
            correct: 0,
            explain: "Has + finished is Present Perfect.",
        },
    },
    "10-conditionals": {
        learnTitle: "Conditionals with if",
        intro: "Use conditionals to talk about results that depend on a condition.",
        points: [
            {subject: "Real future", form: "if + present, will", example: "If I study, I will pass.", translation: "O'qisam, o'taman."},
            {subject: "Imaginary now", form: "if + past, would", example: "If I had time, I would travel.", translation: "Vaqtim bo'lsa edi, sayohat qilardim."},
            {subject: "Advice", form: "if I were you", example: "If I were you, I would practice.", translation: "Sizning o'rningizda bo'lsam, mashq qilardim."},
        ],
        tip: "For imaginary advice, English often says: If I were you...",
        question: {
            prompt: "Which sentence gives an imaginary result?",
            options: ["If it rains, I will stay home.", "If I had time, I would travel.", "I study every day.", "She is reading."],
            correct: 1,
            explain: "If I had time, I would travel uses the imaginary conditional pattern.",
        },
    },
};

function getLessonDetail(lesson: Lesson): LessonDetail {
    return LESSON_DETAILS[lesson.id] ?? {
        learnTitle: lesson.title,
        intro: lesson.summary,
        points: [
            {subject: getLessonCategory(lesson), form: getLessonLevel(lesson), example: lesson.title, translation: lesson.titleUz},
        ],
        tip: "Read the example out loud, then make one sentence about yourself.",
        question: {
            prompt: "Which topic is this lesson about?",
            options: [lesson.title, "Verb 'to be'", "Numbers", "Family"],
            correct: 0,
            explain: `This lesson is about ${lesson.title}.`,
        },
    };
}

function buildPracticeQuestions(lesson: Lesson, detail: LessonDetail) {
    return [
        detail.question,
        {
            prompt: `Which example belongs to "${lesson.title}"?`,
            options: [
                detail.points[0]?.example || lesson.title,
                "She are a student.",
                "I will yesterday.",
            ],
            correct: 0,
            explain: `This example is part of the ${lesson.title} lesson.`,
        },
        {
            prompt: "What should you do next to remember this lesson?",
            options: [
                "Read once and stop",
                "Say one example out loud",
                "Skip practice",
            ],
            correct: 1,
            explain: "Speaking one example out loud helps move the idea from recognition to active use.",
        },
    ];
}

function getLessonFlowKey(lessonId: string, userId?: number | string | null) {
    const owner = userId === undefined || userId === null ? "guest" : userId;
    return `${LESSON_FLOW_PREFIX}:${owner}:${lessonId}`;
}

function loadLessonFlow(lessonId: string, userId?: number | string | null): LessonFlowState {
    try {
        const saved = localStorage.getItem(getLessonFlowKey(lessonId, userId));
        if (!saved) return {step: "learn", practiceIndex: 0, selected: null, revealed: false};
        const parsed = JSON.parse(saved) as Partial<LessonFlowState>;
        return {
            step: parsed.step === "practice" || parsed.step === "done" ? parsed.step : "learn",
            practiceIndex: Math.max(0, Number(parsed.practiceIndex) || 0),
            selected: typeof parsed.selected === "number" ? parsed.selected : null,
            revealed: Boolean(parsed.revealed),
        };
    } catch {
        return {step: "learn", practiceIndex: 0, selected: null, revealed: false};
    }
}

function saveLessonFlow(lessonId: string, userId: number | string | null | undefined, state: LessonFlowState) {
    localStorage.setItem(getLessonFlowKey(lessonId, userId), JSON.stringify(state));
}

function resetLessonFlow(lessonId: string, userId?: number | string | null) {
    localStorage.removeItem(getLessonFlowKey(lessonId, userId));
}

function getSkillForLesson(lesson: Lesson): SkillId {
    if (lesson.category === "Lug'at") return "vocab";
    if (lesson.category === "Tinglash") return "listening";
    if (lesson.category === "Gapirish") return "speaking";
    return "grammar";
}

function ErrorView({message}: { message: string }) {
    const {t} = useTranslation();
    return (
        <div className="mx-auto max-w-xl px-6 py-20 text-center">
            <h1 className="text-display text-3xl">{t("lessonPlayer.errorTitle")}</h1>
            <p className="mt-2 text-muted-foreground">{message}</p>
            <Link to="/lessons"
                  className="mt-6 inline-block text-primary hover:underline">← {t("lessonPlayer.backToLessons")}</Link>
        </div>
    );
}

function NotFoundView() {
    const {t} = useTranslation();
    return (
        <div className="mx-auto max-w-xl px-6 py-20 text-center">
            <h1 className="text-display text-4xl">{t("lessonPlayer.notFound")}</h1>
            <Link to="/lessons"
                  className="mt-6 inline-block text-primary hover:underline">← {t("lessonPlayer.backToLessons")}</Link>
        </div>
    );
}

export default function LessonPage() {
    const {t, i18n} = useTranslation();
    const {user} = useAuth();
    const {progress, updateProgress} = useUserProgress(user?.id);
    const language = i18n.resolvedLanguage || i18n.language;
    const {id = ""} = useParams();
    const lesson = getLesson(id);
    if (!lesson) return <NotFoundView/>;
    const next = getNextLesson(lesson.id);
    const prev = getPrevLesson(lesson.id);
    const lessonText = getLessonText(lesson, language);
    const lessonDetail = getLessonDetail(lesson);
    const practiceQuestions = useMemo(() => buildPracticeQuestions(lesson, lessonDetail), [lesson, lessonDetail]);
    const initialFlow = useMemo(() => loadLessonFlow(lesson.id, user?.id), [lesson.id, user?.id]);

    const [step, setStep] = useState<LessonStep>(initialFlow.step);
    const [practiceIndex, setPracticeIndex] = useState(initialFlow.practiceIndex);
    const [selected, setSelected] = useState<number | null>(initialFlow.selected);
    const [revealed, setRevealed] = useState(initialFlow.revealed);

    const boundedPracticeIndex = Math.min(practiceIndex, practiceQuestions.length - 1);
    const question = practiceQuestions[boundedPracticeIndex];
    const completed = progress.completedLessonIds.includes(lesson.id);

    useEffect(() => {
        const nextFlow = loadLessonFlow(lesson.id, user?.id);
        setStep(nextFlow.step);
        setPracticeIndex(nextFlow.practiceIndex);
        setSelected(nextFlow.selected);
        setRevealed(nextFlow.revealed);
    }, [lesson.id, user?.id]);

    useEffect(() => {
        saveLessonFlow(lesson.id, user?.id, {
            step,
            practiceIndex: boundedPracticeIndex,
            selected,
            revealed,
        });
    }, [boundedPracticeIndex, lesson.id, revealed, selected, step, user?.id]);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [step, boundedPracticeIndex]);

    function transitionTo(nextStep: LessonStep) {
        setStep(nextStep);
        if (nextStep === "practice") {
            setPracticeIndex(0);
            setSelected(null);
            setRevealed(false);
        }
        if (nextStep === "done" && !completed) {
            updateProgress((current) => {
                const nextProgress = {
                    ...current,
                    xpToday: current.xpToday + lesson.xp,
                    totalXp: current.totalXp + lesson.xp,
                    completedLessonIds: [lesson.id, ...current.completedLessonIds.filter((item) => item !== lesson.id)],
                    recentLessons: [lesson.id, ...current.recentLessons.filter((item) => item !== lesson.id)].slice(0, 5),
                    currentLessonId: next?.id || lesson.id,
                    lessonsCompleted: current.completedLessonIds.includes(lesson.id)
                        ? current.lessonsCompleted
                        : current.lessonsCompleted + 1,
                    skills: {
                        ...current.skills,
                        [getSkillForLesson(lesson)]: Math.min(100, current.skills[getSkillForLesson(lesson)] + 10),
                    },
                };
                nextProgress.level = Math.floor(nextProgress.totalXp / 500);
                nextProgress.lessonProgress = Math.min(100, Math.round((nextProgress.completedLessonIds.length / LESSONS.length) * 100));
                return nextProgress;
            });
        }
    }

    function continuePractice() {
        if (boundedPracticeIndex < practiceQuestions.length - 1) {
            setPracticeIndex((current) => current + 1);
            setSelected(null);
            setRevealed(false);
            return;
        }
        transitionTo("done");
    }

    const sectionProgress =
        step === "learn"
            ? 25
            : step === "practice"
                ? 35 + ((boundedPracticeIndex + (revealed ? 1 : 0.4)) / practiceQuestions.length) * 45
                : 100;

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
                <Link to="/lessons"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4"/> {t("lessonPlayer.backToLessons")}
                </Link>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <span>{t("lessonPlayer.unit", {n: lesson.unit})}</span>
                    <span>·</span>
                    <span className="text-primary font-semibold">{getLessonCategory(lesson, language)}</span>
                </div>
                <div
                    className="inline-flex items-center gap-1 rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-accent-foreground">
                    <Zap className="h-3 w-3"/> {lesson.xp} XP
                </div>
            </header>

            {/* Progress bar */}
            <div className="mx-auto max-w-5xl px-6">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{width: `${sectionProgress}%`}}
                    />
                </div>
            </div>

            <main className="mx-auto max-w-5xl px-6 py-10">
                {/* Title */}
                <div className="mb-10 flex items-start gap-5">
                    <IconBadge icon={lesson.icon} tone="primary" size="lg" hover={false}/>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">{getLessonLevel(lesson, language)}</p>
                        <h1 className="text-display mt-1 text-4xl leading-[1.05] md:text-5xl">{lessonText.title}</h1>
                        {language?.slice(0, 2) !== "en" &&
                            <p className="mt-1 text-lg italic text-muted-foreground">{lesson.title}</p>}
                        <p className="mt-3 max-w-2xl text-muted-foreground">{lessonText.summary}</p>
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

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${step}-${step === "practice" ? boundedPracticeIndex : "section"}`}
                        initial={{opacity: 0, y: 16}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -12}}
                        transition={{duration: 0.22, ease: "easeOut"}}
                    >
                        {step === "learn" && <LearnSection detail={lessonDetail} onContinue={() => transitionTo("practice")}/>}

                        {step === "practice" && (
                            <div
                        className="rounded-[1.75rem] border-2 border-foreground/10 bg-card p-6 shadow-[10px_10px_0_0_oklch(0.30_0.10_280)] md:p-10">
            <span
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
              {t("lessonPlayer.practice")} · {boundedPracticeIndex + 1}/{practiceQuestions.length}
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
                                    {selected === question.correct ? <><Check
                                        className="h-4 w-4"/> {t("lessonPlayer.correct")}</> : <><X
                                        className="h-4 w-4"/> {t("lessonPlayer.wrong")}</>}
                                </p>
                                <p className="mt-2 text-foreground">{question.explain}</p>
                            </div>
                        )}

                        <div className="mt-8 flex items-center justify-between">
                                <button
                                    onClick={() => transitionTo("learn")}
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
                                    onClick={continuePractice}
                                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px]"
                                >
                                    {boundedPracticeIndex < practiceQuestions.length - 1 ? t("common.continue") : t("lessonPlayer.steps.done")} →
                                </button>
                            )}
                        </div>
                    </div>
                        )}

                        {step === "done" && (
                            <div
                        className="relative overflow-hidden rounded-[1.75rem] border-2 border-foreground/10 bg-card p-8 text-center shadow-[10px_10px_0_0_oklch(0.30_0.10_280)] md:p-12">
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

                        <div
                            className="mx-auto mt-6 flex max-w-sm items-center justify-around rounded-2xl border-2 border-foreground/10 bg-background p-4">
                            <Reward label={t("lessonPlayer.rewardXp")} value={`+${lesson.xp}`}/>
                            <span className="h-10 w-px bg-border"/>
                            <Reward label={t("lessonPlayer.rewardTime")}
                                    value={`${lesson.minutes} ${t("common.minShort")}`}/>
                            <span className="h-10 w-px bg-border"/>
                            <Reward label={t("lessonPlayer.rewardStreak")} value="8" icon={Flame}/>
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
                                    onClick={() => resetLessonFlow(next.id, user?.id)}
                                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px]"
                                >
                                    {t("lessonPlayer.nextLesson")}: {getLessonText(next, language).title} →
                                </Link>
                            )}
                        </div>
                    </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Prev / Next nav */}
                <div className="mt-10 flex items-center justify-between gap-4">
                    {prev ? (
                        <Link
                            to={`/lessons/${prev.id}`}
                            className="group flex-1 rounded-2xl border-2 border-foreground/10 bg-card p-4 transition hover:border-primary"
                        >
                            <div
                                className="text-xs uppercase tracking-widest text-muted-foreground">{t("lessonPlayer.prev")}</div>
                            <div className="text-display mt-1 text-lg">{getLessonText(prev, language).title}</div>
                        </Link>
                    ) : <div className="flex-1"/>}
                    {next ? (
                        <Link
                            to={`/lessons/${next.id}`}
                            className="group flex-1 rounded-2xl border-2 border-foreground/10 bg-card p-4 text-right transition hover:border-primary"
                        >
                            <div
                                className="text-xs uppercase tracking-widest text-muted-foreground">{t("lessonPlayer.next")}</div>
                            <div className="text-display mt-1 text-lg">{getLessonText(next, language).title}</div>
                        </Link>
                    ) : <div className="flex-1"/>}
                </div>
            </main>
        </div>
    );
}

function StepTab({active, onClick, children}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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

function LearnSection({detail, onContinue}: { detail: LessonDetail; onContinue: () => void }) {
    const {t} = useTranslation();
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div
                className="rounded-[1.75rem] border-2 border-foreground/10 bg-card p-6 shadow-[6px_6px_0_0_oklch(0.30_0.10_280)] md:col-span-2 md:p-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
          {t("lessonPlayer.explanation")}
        </span>
                <h2 className="text-display mt-3 text-2xl md:text-3xl">{detail.learnTitle}</h2>
                <p className="mt-4 text-muted-foreground">
                    {detail.intro}
                </p>

                <div className="mt-6 grid gap-3">
                    {detail.points.map((point) => (
                        <Rule
                            key={`${point.subject}-${point.form}`}
                            subject={point.subject}
                            form={point.form}
                            example={point.example}
                            translation={point.translation}
                        />
                    ))}
                </div>

                <div className="mt-6 rounded-2xl border-2 border-accent/40 bg-accent/10 p-5">
                    <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-accent-foreground">
                        <Lightbulb className="h-4 w-4"/> {t("lessonPlayer.tip")}</p>
                    <p className="mt-2 text-foreground">
                        {detail.tip}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onContinue}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-[5px_5px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_oklch(0.30_0.10_280)] sm:w-auto"
                >
                    {t("lessonPlayer.steps.practice")} →
                </button>
            </div>

            {/* Side panel — AI tutor */}
            <div
                className="rounded-[1.75rem] border-2 border-foreground/10 bg-card p-6 shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]">
                <div className="flex items-center gap-2">
                    <img src={humoBird} alt="" width={40} height={40} className="h-10 w-10 object-contain"/>
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

function Rule({subject, form, example, translation}: {
    subject: string;
    form: string;
    example: string;
    translation: string
}) {
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

function ChatBubble({side, children}: { side: "left" | "right"; children: React.ReactNode }) {
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

function Reward({label, value, icon: Icon}: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>
}) {
    return (
        <div>
            <div className="text-display text-xl inline-flex items-center gap-1.5">
                {Icon && <Icon className="h-4 w-4 text-accent-foreground"/>} {value}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        </div>
    );
}
