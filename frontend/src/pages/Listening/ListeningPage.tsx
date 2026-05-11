import {motion} from "framer-motion";
import {useEffect, useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Play,
    Pause,
    Headphones,
    CheckCircle2,
    Circle,
    Coffee,
    BriefcaseBusiness,
    Plane,
    Cpu,
    Sunrise,
    BarChart3,
    type LucideIcon,
} from "lucide-react";
import {Card, Pill, SectionHeading, Progress} from "@/components/ui-kit";
import {IconBadge, type IconTone} from "@/components/icon-badge";
import {getToken, useAuth} from "@/context/AuthContext";
import {useUserProgress} from "@/data/progress";
import {getUiLang} from "@/data/lessons";
import {generateTts, resolveApiUrl} from "@/services/api";

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
    seconds: number;
    icon: LucideIcon;
    tone: IconTone;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
};

const TRACKS: Track[] = [
    {
        id: 1,
        title: "Coffee Shop Conversation",
        titleUz: "Kafedagi suhbat",
        level: "Boshlang'ich",
        duration: "3:24",
        seconds: 204,
        icon: Coffee,
        tone: "accent",
        question: "What did the customer order?",
        options: ["A cappuccino and a croissant", "Tea and a sandwich", "Only a croissant", "Coffee for here"],
        answer: "A cappuccino and a croissant",
        explanation: "The customer asks for a large cappuccino to go and one croissant.",
    },
    {
        id: 2,
        title: "Tech Interview Tips",
        titleUz: "IT intervyu maslahatlar",
        level: "O'rta",
        duration: "8:12",
        seconds: 492,
        icon: BriefcaseBusiness,
        tone: "secondary",
        question: "What is the main advice in the interview conversation?",
        options: ["Explain your projects clearly", "Memorize every answer", "Avoid asking questions", "Speak as fast as possible"],
        answer: "Explain your projects clearly",
        explanation: "The conversation focuses on explaining your work with clear examples.",
    },
    {
        id: 3,
        title: "Travel in London",
        titleUz: "Londonga sayohat",
        level: "Boshlang'ich",
        duration: "5:40",
        seconds: 340,
        icon: Plane,
        tone: "primary",
        question: "What kind of conversation is practiced?",
        options: ["Travel and directions", "Ordering dinner", "A job interview", "A school exam"],
        answer: "Travel and directions",
        explanation: "This track practices travel phrases and asking for help while moving around London.",
    },
    {
        id: 4,
        title: "AI and the Future",
        titleUz: "AI va kelajak",
        level: "Yuqori",
        duration: "12:05",
        seconds: 725,
        icon: Cpu,
        tone: "secondary",
        question: "What is the topic of the conversation?",
        options: ["Artificial intelligence and future work", "Cooking at home", "Airport security", "Buying clothes"],
        answer: "Artificial intelligence and future work",
        explanation: "The track is about AI and how it may change future work.",
    },
    {
        id: 5,
        title: "Daily Routines Podcast",
        titleUz: "Kundalik tartiblar",
        level: "Boshlang'ich",
        duration: "4:18",
        seconds: 258,
        icon: Sunrise,
        tone: "accent",
        question: "Which language area does this podcast practice?",
        options: ["Daily routines", "Advanced finance", "Academic writing", "Weather reports"],
        answer: "Daily routines",
        explanation: "The track practices common phrases for everyday routines.",
    },
    {
        id: 6,
        title: "Business English Pro",
        titleUz: "Biznes ingliz",
        level: "Yuqori",
        duration: "15:32",
        seconds: 932,
        icon: BarChart3,
        tone: "primary",
        question: "What is the focus of this listening track?",
        options: ["Professional business English", "Basic alphabet sounds", "Restaurant menus", "Vacation photos"],
        answer: "Professional business English",
        explanation: "This track focuses on formal business vocabulary and professional situations.",
    },
];

const TRACK_TEXT: Record<number, Record<"en" | "uz" | "ru", {
    title: string;
    question: string;
    options: string[];
    explanation: string
}>> = {
    1: {
        en: {
            title: "Coffee Shop Conversation",
            question: "What did the customer order?",
            options: ["A cappuccino and a croissant", "Tea and a sandwich", "Only a croissant", "Coffee for here"],
            explanation: "The customer asks for a large cappuccino to go and one croissant."
        },
        uz: {
            title: "Kafedagi suhbat",
            question: "Mijoz nima buyurtma qildi?",
            options: ["Kapuchino va kruassan", "Choy va sendvich", "Faqat kruassan", "Shu yerda ichiladigan qahva"],
            explanation: "Mijoz olib ketish uchun katta kapuchino va bitta kruassan so'raydi."
        },
        ru: {
            title: "Разговор в кофейне",
            question: "Что заказал клиент?",
            options: ["Капучино и круассан", "Чай и сэндвич", "Только круассан", "Кофе на месте"],
            explanation: "Клиент просит большой капучино с собой и один круассан."
        },
    },
    2: {
        en: {
            title: "Tech Interview Tips",
            question: "What is the main advice in the interview conversation?",
            options: ["Explain your projects clearly", "Memorize every answer", "Avoid asking questions", "Speak as fast as possible"],
            explanation: "The conversation focuses on explaining your work with clear examples."
        },
        uz: {
            title: "IT intervyu maslahatlar",
            question: "Intervyu suhbatidagi asosiy maslahat nima?",
            options: ["Loyihalaringizni aniq tushuntiring", "Har bir javobni yodlang", "Savol bermang", "Iloji boricha tez gapiring"],
            explanation: "Suhbat ishlaringizni aniq misollar bilan tushuntirishga qaratilgan."
        },
        ru: {
            title: "Советы для IT-интервью",
            question: "Какой главный совет в разговоре про интервью?",
            options: ["Чётко объясняйте свои проекты", "Выучите все ответы", "Не задавайте вопросы", "Говорите как можно быстрее"],
            explanation: "Разговор о том, как объяснять свою работу на понятных примерах."
        },
    },
    3: {
        en: {
            title: "Travel in London",
            question: "What kind of conversation is practiced?",
            options: ["Travel and directions", "Ordering dinner", "A job interview", "A school exam"],
            explanation: "This track practices travel phrases and asking for help while moving around London."
        },
        uz: {
            title: "Londonga sayohat",
            question: "Qanday suhbat mashq qilinadi?",
            options: ["Sayohat va yo'nalish so'rash", "Kechki ovqat buyurtma qilish", "Ish intervyusi", "Maktab imtihoni"],
            explanation: "Bu trek sayohat iboralari va Londonda yordam so'rashni mashq qiladi."
        },
        ru: {
            title: "Путешествие в Лондоне",
            question: "Какой тип разговора тренируется?",
            options: ["Путешествие и маршруты", "Заказ ужина", "Собеседование", "Школьный экзамен"],
            explanation: "Трек тренирует фразы для путешествий и просьбы о помощи в Лондоне."
        },
    },
    4: {
        en: {
            title: "AI and the Future",
            question: "What is the topic of the conversation?",
            options: ["Artificial intelligence and future work", "Cooking at home", "Airport security", "Buying clothes"],
            explanation: "The track is about AI and how it may change future work."
        },
        uz: {
            title: "AI va kelajak",
            question: "Suhbat mavzusi nima?",
            options: ["Sun'iy intellekt va kelajakdagi ish", "Uyda ovqat pishirish", "Aeroport xavfsizligi", "Kiyim sotib olish"],
            explanation: "Trek AI va uning kelajakdagi ishni qanday o'zgartirishi haqida."
        },
        ru: {
            title: "ИИ и будущее",
            question: "Какая тема разговора?",
            options: ["Искусственный интеллект и работа будущего", "Готовка дома", "Безопасность в аэропорту", "Покупка одежды"],
            explanation: "Трек о том, как ИИ может изменить работу в будущем."
        },
    },
    5: {
        en: {
            title: "Daily Routines Podcast",
            question: "Which language area does this podcast practice?",
            options: ["Daily routines", "Advanced finance", "Academic writing", "Weather reports"],
            explanation: "The track practices common phrases for everyday routines."
        },
        uz: {
            title: "Kundalik tartiblar",
            question: "Bu podkast qaysi til mavzusini mashq qiladi?",
            options: ["Kundalik tartiblar", "Murakkab moliya", "Akademik yozuv", "Ob-havo xabarlari"],
            explanation: "Trek kundalik tartiblar uchun keng ishlatiladigan iboralarni mashq qiladi."
        },
        ru: {
            title: "Подкаст о распорядке дня",
            question: "Какую языковую тему тренирует этот подкаст?",
            options: ["Повседневный распорядок", "Сложные финансы", "Академическое письмо", "Прогноз погоды"],
            explanation: "Трек тренирует частые фразы для повседневного распорядка."
        },
    },
    6: {
        en: {
            title: "Business English Pro",
            question: "What is the focus of this listening track?",
            options: ["Professional business English", "Basic alphabet sounds", "Restaurant menus", "Vacation photos"],
            explanation: "This track focuses on formal business vocabulary and professional situations."
        },
        uz: {
            title: "Biznes ingliz",
            question: "Bu tinglash trekining asosiy mavzusi nima?",
            options: ["Professional biznes ingliz tili", "Alifbo tovushlari", "Restoran menyulari", "Ta'til rasmlari"],
            explanation: "Bu trek rasmiy biznes lug'ati va professional vaziyatlarga qaratilgan."
        },
        ru: {
            title: "Деловой английский Pro",
            question: "На чём сфокусирован этот трек?",
            options: ["Профессиональный деловой английский", "Звуки алфавита", "Меню ресторанов", "Фото из отпуска"],
            explanation: "Трек посвящён официальной деловой лексике и профессиональным ситуациям."
        },
    },
};

const LISTENING_UI = {
    en: {
        check: "Comprehension check",
        ready: "Ready",
        listenFirst: "Listen first",
        correct: "Correct. ",
        wrong: "Not quite. ",
        loading: "Preparing audio...",
        error: "Audio could not play. Please try again.",
        authRequired: "Please sign in again to load audio.",
        cached: "Cached audio",
    },
    uz: {
        check: "Tushunishni tekshirish",
        ready: "Tayyor",
        listenFirst: "Avval tinglang",
        correct: "To'g'ri. ",
        wrong: "Noto'g'ri. ",
        loading: "Audio tayyorlanmoqda...",
        error: "Audioni ijro qilib bo'lmadi. Qayta urinib ko'ring.",
        authRequired: "Audioni yuklash uchun qayta kiring.",
        cached: "Keshlangan audio",
    },
    ru: {
        check: "Проверка понимания",
        ready: "Готово",
        listenFirst: "Сначала прослушайте",
        correct: "Верно. ",
        wrong: "Не совсем. ",
        loading: "Готовим аудио...",
        error: "Не удалось воспроизвести аудио. Попробуйте ещё раз.",
        authRequired: "Войдите снова, чтобы загрузить аудио.",
        cached: "Аудио из кэша",
    },
};

const TRANSCRIPT = [
    {
        time: "0:00",
        en: "Hi, can I get a large cappuccino, please?",
        uz: "Salom, kattaroq kapuchino bera olasizmi?",
        ru: "Здравствуйте, можно мне большой капучино, пожалуйста?"
    },
    {
        time: "0:05",
        en: "Of course. Would you like it for here or to go?",
        uz: "Albatta. Bu yerdami yoki olib ketish uchunmi?",
        ru: "Конечно. Здесь или с собой?"
    },
    {
        time: "0:09",
        en: "To go, please. And one croissant.",
        uz: "Olib ketish uchun, iltimos. Va bitta kruassan.",
        ru: "С собой, пожалуйста. И один круассан."
    },
    {
        time: "0:13",
        en: "That'll be six pounds fifty.",
        uz: "Olti funt ellik bo'ladi.",
        ru: "С вас шесть фунтов пятьдесят."
    },
];

function transcriptText(track: Track) {
    return `${track.title}. ${TRANSCRIPT.map((line) => line.en).join(" ")}`;
}

function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
}

export default function Listening() {
    const {t, i18n} = useTranslation();
    const lang = getUiLang(i18n.resolvedLanguage || i18n.language);
    const {user} = useAuth();
    const {progress, completeSkillPractice} = useUserProgress(user?.id);
    const [playing, setPlaying] = useState(false);
    const [loadingAudio, setLoadingAudio] = useState(false);
    const [audioError, setAudioError] = useState("");
    const [audioCached, setAudioCached] = useState<boolean | null>(null);
    const [level, setLevel] = useState<(typeof LEVEL_KEYS)[number]>("all");
    const [currentId, setCurrentId] = useState(TRACKS[0].id);
    const [elapsed, setElapsed] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const activeTrackRef = useRef<number | null>(null);
    const completedRef = useRef(new Set<string>());
    const filtered = TRACKS.filter((tr) => level === "all" || LEVEL_MAP[tr.level] === level);
    const completedIds = progress.listening.completedTrackIds;
    const current = TRACKS.find((tr) => tr.id === currentId) ?? TRACKS[0];
    const currentText = TRACK_TEXT[current.id][lang];
    const skillProgress = Math.round((completedIds.length / TRACKS.length) * 100);
    const listenedMinutes = Math.round(progress.listening.listenedSeconds / 60);
    const activeTranscriptIndex = Math.min(TRANSCRIPT.length - 1, Math.floor((elapsed / Math.max(current.seconds, 1)) * TRANSCRIPT.length));

    useEffect(() => {
        return () => {
            cleanupAudio();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    useEffect(() => {
        completedRef.current = new Set(completedIds);
    }, [completedIds]);

    const markComplete = (track: Track) => {
        const lessonId = `listening-${track.id}`;
        if (!completedRef.current.has(lessonId)) {
            completedRef.current.add(lessonId);
            completeSkillPractice("listening", {
                xp: 20,
                lessonId,
                listenedSeconds: track.seconds,
            });
        }
    };

    const resetQuiz = () => {
        setSelectedAnswer("");
        setShowResult(false);
        setHasPlayed(false);
    };

    const cleanupAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
            audioRef.current.load();
            audioRef.current = null;
        }
        activeTrackRef.current = null;
    };

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
    };

    const stopAudio = () => {
        cleanupAudio();
        stopTimer();
        setPlaying(false);
    };

    const startProgressTimer = (audio: HTMLAudioElement, track: Track) => {
        stopTimer();
        timerRef.current = setInterval(() => {
            setElapsed(Math.min(track.seconds, Math.floor(audio.currentTime)));
        }, 250);
    };

    const playAudio = async (track = current) => {
        if (activeTrackRef.current === track.id && audioRef.current && audioRef.current.paused) {
            try {
                await audioRef.current.play();
                startProgressTimer(audioRef.current, track);
                setPlaying(true);
            } catch {
                setAudioError(LISTENING_UI[lang].error);
            }
            return;
        }

        stopAudio();
        setCurrentId(track.id);
        setElapsed(0);
        setAudioError("");
        setAudioCached(null);
        if (track.id !== current.id) {
            resetQuiz();
        }

        const token = getToken();

        setLoadingAudio(true);
        try {
            const response = await generateTts(token ?? "", `listening-${track.id}`, transcriptText(track));
            const audio = new Audio(resolveApiUrl(response.audioUrl));
            audio.preload = "auto";
            audioRef.current = audio;
            activeTrackRef.current = track.id;
            setAudioCached(response.cached);

            audio.onloadedmetadata = () => {
                if (Number.isFinite(audio.duration) && audio.duration > 0) {
                    setElapsed(Math.min(track.seconds, Math.floor(audio.currentTime)));
                }
            };
            audio.ontimeupdate = () => {
                setElapsed(Math.min(track.seconds, Math.floor(audio.currentTime)));
            };
            audio.onended = () => {
                stopTimer();
                setElapsed(track.seconds);
                setPlaying(false);
                setHasPlayed(true);
            };
            audio.onerror = () => {
                stopTimer();
                setPlaying(false);
                setAudioError(LISTENING_UI[lang].error);
            };

            await audio.play();
            startProgressTimer(audio, track);
            setPlaying(true);
        } catch (error) {
            setAudioError(error instanceof Error && error.message === "AUTH_REQUIRED"
                ? LISTENING_UI[lang].authRequired
                : LISTENING_UI[lang].error);
        } finally {
            setLoadingAudio(false);
        }
    };

    const toggleAudio = () => {
        if (playing) {
            audioRef.current?.pause();
            stopTimer();
            setPlaying(false);
        } else {
            playAudio();
        }
    };

    const chooseTrack = (track: Track) => {
        stopAudio();
        setCurrentId(track.id);
        setElapsed(0);
        setAudioError("");
        setAudioCached(null);
        resetQuiz();
    };

    const answerQuiz = (option: string) => {
        if (showResult) return;
        setSelectedAnswer(option);
        setShowResult(true);
        if (option === current.answer) {
            markComplete(current);
        }
    };

    return (
        <div className="space-y-10">
            <SectionHeading
                eyebrow={t("listening.eyebrow")}
                title={t("listening.title")}
                description={t("listening.subtitle")}
            />

            <Card variant="raised" className="md:p-8">
                <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                    <IconBadge icon={current.icon} tone={current.tone} size="lg" hover={false}
                               className="h-32 w-32 rounded-2xl"/>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <Pill tone="primary"><Headphones className="h-3 w-3"/> {t("listening.nowPlaying")}</Pill>
                            <Pill>{t(`levels.${LEVEL_MAP[current.level] ?? "beginner"}`)}</Pill>
                        </div>
                        <h2 className="text-display mt-3 text-2xl">{currentText.title}</h2>
                        {lang !== "en" && <p className="text-sm italic text-muted-foreground">{current.title}</p>}

                        <div className="mt-auto pt-5">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleAudio}
                                    disabled={loadingAudio}
                                    className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[3px_3px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:cursor-wait disabled:opacity-60"
                                >
                                    {playing ? <Pause className="h-5 w-5"/> : <Play className="ml-0.5 h-5 w-5"/>}
                                </button>
                                <div className="flex-1">
                                    <Progress value={Math.round((elapsed / current.seconds) * 100)}/>
                                </div>
                                <span
                                    className="font-mono text-sm text-muted-foreground">{formatTime(elapsed)} / {current.duration}</span>
                            </div>
                            {(loadingAudio || audioError || audioCached !== null) && (
                                <p className={`mt-3 text-sm ${audioError ? "text-destructive" : "text-muted-foreground"}`}>
                                    {audioError || (loadingAudio ? LISTENING_UI[lang].loading : audioCached ? LISTENING_UI[lang].cached : "")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-2xl border-2 border-foreground/10 bg-background p-5">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t("listening.transcript")}</p>
                        <Pill>{completedIds.length} / {TRACKS.length}</Pill>
                    </div>
                    <div className="space-y-3">
                        {TRANSCRIPT.map((tr, i) => (
                            <motion.div
                                key={i}
                                animate={{opacity: i === activeTranscriptIndex ? 1 : 0.55}}
                                className={`rounded-xl p-3 transition ${i === activeTranscriptIndex ? "bg-primary/10" : ""}`}
                            >
                                <div className="flex items-baseline gap-3">
                                    <span className="font-mono text-xs text-muted-foreground">{tr.time}</span>
                                    <p className="flex-1 text-sm leading-relaxed">{tr.en}</p>
                                </div>
                                {lang !== "en" &&
                                    <p className="ml-10 mt-1 text-sm italic text-muted-foreground">{tr[lang]}</p>}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border-2 border-foreground/10 bg-background p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-primary">{LISTENING_UI[lang].check}</p>
                            <h3 className="mt-1 font-semibold">{currentText.question}</h3>
                        </div>
                        <Pill
                            tone={hasPlayed || elapsed > 0 ? "primary" : "muted"}>{hasPlayed ? LISTENING_UI[lang].ready : LISTENING_UI[lang].listenFirst}</Pill>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {currentText.options.map((option, optionIndex) => {
                            const rawOption = current.options[optionIndex];
                            const isCorrect = showResult && rawOption === current.answer;
                            const isWrong = showResult && selectedAnswer === rawOption && rawOption !== current.answer;
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => answerQuiz(rawOption)}
                                    disabled={!hasPlayed && elapsed === 0}
                                    className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                        isCorrect
                                            ? "border-secondary bg-secondary/10 text-secondary"
                                            : isWrong
                                                ? "border-destructive/40 bg-destructive/5 text-destructive"
                                                : "border-foreground/10 hover:border-primary/40"
                                    }`}
                                >
                                    {isCorrect ? <CheckCircle2 className="h-4 w-4"/> : <Circle className="h-4 w-4"/>}
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                    {showResult && (
                        <p className={`mt-3 text-sm ${selectedAnswer === current.answer ? "text-secondary" : "text-destructive"}`}>
                            {selectedAnswer === current.answer ? LISTENING_UI[lang].correct : LISTENING_UI[lang].wrong}{currentText.explanation}
                        </p>
                    )}
                </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("nav.listening")}</p>
                    <p className="text-display mt-2 text-3xl text-primary">{skillProgress}%</p>
                    <Progress value={skillProgress}/>
                </Card>
                <Card>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("speaking.recordedMin")}</p>
                    <p className="text-display mt-2 text-3xl">{listenedMinutes}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t("speaking.total")}</p>
                </Card>
            </div>

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
                {filtered.map((tr, i) => {
                    const completed = completedIds.includes(`listening-${tr.id}`);
                    const text = TRACK_TEXT[tr.id][lang];
                    return (
                        <motion.div
                            key={tr.id}
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: i * 0.04}}
                            whileHover={{y: -3}}
                        >
                            <Card onClick={() => chooseTrack(tr)}
                                  className={`flex items-center gap-4 hover:border-primary cursor-pointer ${current.id === tr.id ? "border-primary" : ""}`}>
                                <IconBadge icon={tr.icon} tone={tr.tone} size="md" hover={false}
                                           className="shrink-0 h-16 w-16 rounded-2xl"/>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <Pill>{t(`levels.${LEVEL_MAP[tr.level] ?? "beginner"}`)}</Pill>
                                        <span className="text-xs text-muted-foreground">{tr.duration}</span>
                                    </div>
                                    <p className="text-display mt-1.5 truncate text-lg leading-tight">{text.title}</p>
                                    {lang !== "en" &&
                                        <p className="truncate text-sm italic text-muted-foreground">{tr.title}</p>}
                                </div>
                                {completed ? (
                                    <CheckCircle2 className="h-6 w-6 text-secondary"/>
                                ) : (
                                    <button type="button" onClick={(event) => {
                                        event.stopPropagation();
                                        playAudio(tr);
                                    }}
                                            disabled={loadingAudio && current.id === tr.id}
                                            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:scale-105 disabled:cursor-wait disabled:opacity-60">
                                        <Play className="ml-0.5 h-4 w-4"/>
                                    </button>
                                )}
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
