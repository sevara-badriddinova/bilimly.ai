import {motion, AnimatePresence} from "framer-motion";
import {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Volume2,
    Bookmark,
    BookmarkCheck,
    RotateCcw,
    Sparkles,
    Home,
    Laptop,
    Plane,
    Utensils,
    BriefcaseBusiness,
    GraduationCap,
    ArrowRight,
    FlipHorizontal,
    type LucideIcon,
} from "lucide-react";
import {Card, Pill, SectionHeading, PrimaryButton, GhostButton, EmptyState} from "@/components/ui-kit";
import {IconBadge, type IconTone} from "@/components/icon-badge";
import {useAuth} from "@/context/AuthContext";
import {useUserProgress} from "@/data/progress";
import {getUiLang} from "@/data/lessons";

type CategoryId = "daily" | "tech" | "travel" | "food" | "business" | "academic";

type Category = {
    id: CategoryId;
    labelKey: string;
    icon: LucideIcon;
    tone: IconTone;
};

type VocabCard = {
    word: string;
    phon: string;
    uz: string;
    example: string;
    exampleUz: string;
};

const CATEGORIES: Category[] = [
    {id: "daily", labelKey: "vocabulary.categories.daily", icon: Home, tone: "primary"},
    {id: "tech", labelKey: "vocabulary.categories.tech", icon: Laptop, tone: "secondary"},
    {id: "travel", labelKey: "vocabulary.categories.travel", icon: Plane, tone: "accent"},
    {id: "food", labelKey: "vocabulary.categories.food", icon: Utensils, tone: "primary"},
    {id: "business", labelKey: "vocabulary.categories.business", icon: BriefcaseBusiness, tone: "secondary"},
    {id: "academic", labelKey: "vocabulary.categories.academic", icon: GraduationCap, tone: "accent"},
];

const DECKS: Record<CategoryId, VocabCard[]> = {
    daily: [
        {
            word: "Routine",
            phon: "/ruːˈtiːn/",
            uz: "Kundalik tartib",
            example: "My morning routine starts at seven.",
            exampleUz: "Mening ertalabki tartibim soat yettida boshlanadi."
        },
        {
            word: "Errand",
            phon: "/ˈerənd/",
            uz: "Mayda yumush",
            example: "I need to run an errand after work.",
            exampleUz: "Ishdan keyin bitta yumushni bajarishim kerak."
        },
        {
            word: "Neighbor",
            phon: "/ˈneɪbər/",
            uz: "Qoʻshni",
            example: "Our neighbor is very friendly.",
            exampleUz: "Qoʻshnimiz juda samimiy."
        },
        {
            word: "Tidy",
            phon: "/ˈtaɪdi/",
            uz: "Saranjom",
            example: "Keep your desk tidy.",
            exampleUz: "Stolingizni saranjom tuting."
        },
    ],
    tech: [
        {
            word: "Deploy",
            phon: "/dɪˈplɔɪ/",
            uz: "Ishga tushirmoq",
            example: "We deploy the app every Friday.",
            exampleUz: "Biz ilovani har juma ishga tushiramiz."
        },
        {
            word: "Bug",
            phon: "/bʌɡ/",
            uz: "Xato",
            example: "The developer fixed the login bug.",
            exampleUz: "Dasturchi kirish xatosini tuzatdi."
        },
        {
            word: "Feature",
            phon: "/ˈfiːtʃər/",
            uz: "Funksiya",
            example: "This feature helps users practice speaking.",
            exampleUz: "Bu funksiya foydalanuvchilarga gapirishni mashq qilishga yordam beradi."
        },
        {
            word: "Backup",
            phon: "/ˈbækʌp/",
            uz: "Zaxira nusxa",
            example: "Save a backup before updating.",
            exampleUz: "Yangilashdan oldin zaxira nusxa saqlang."
        },
    ],
    travel: [
        {
            word: "Departure",
            phon: "/dɪˈpɑːrtʃər/",
            uz: "Joʻnab ketish",
            example: "The departure gate changed.",
            exampleUz: "Joʻnab ketish darvozasi oʻzgardi."
        },
        {
            word: "Luggage",
            phon: "/ˈlʌɡɪdʒ/",
            uz: "Yuk",
            example: "My luggage is too heavy.",
            exampleUz: "Yukim juda ogʻir."
        },
        {
            word: "Reservation",
            phon: "/ˌrezərˈveɪʃən/",
            uz: "Band qilish",
            example: "I have a hotel reservation.",
            exampleUz: "Mehmonxonadan joy band qilganman."
        },
        {
            word: "Directions",
            phon: "/dəˈrekʃənz/",
            uz: "Yoʻnalish",
            example: "Could you give me directions?",
            exampleUz: "Menga yoʻnalishni aytib bera olasizmi?"
        },
    ],
    food: [
        {
            word: "Ingredient",
            phon: "/ɪnˈɡriːdiənt/",
            uz: "Masalliq",
            example: "Tomatoes are the main ingredient.",
            exampleUz: "Pomidor asosiy masalliq."
        },
        {
            word: "Receipt",
            phon: "/rɪˈsiːt/",
            uz: "Chek",
            example: "Can I have the receipt, please?",
            exampleUz: "Chekni bera olasizmi?"
        },
        {
            word: "Spicy",
            phon: "/ˈspaɪsi/",
            uz: "Achchiq",
            example: "This soup is too spicy.",
            exampleUz: "Bu shoʻrva juda achchiq."
        },
        {
            word: "Dessert",
            phon: "/dɪˈzɜːrt/",
            uz: "Shirinlik",
            example: "We ordered dessert after dinner.",
            exampleUz: "Kechki ovqatdan keyin shirinlik buyurtma qildik."
        },
    ],
    business: [
        {
            word: "Deadline",
            phon: "/ˈdedlaɪn/",
            uz: "Muddat",
            example: "The deadline is tomorrow morning.",
            exampleUz: "Muddat ertaga ertalab."
        },
        {
            word: "Client",
            phon: "/ˈklaɪənt/",
            uz: "Mijoz",
            example: "The client approved the design.",
            exampleUz: "Mijoz dizaynni tasdiqladi."
        },
        {
            word: "Budget",
            phon: "/ˈbʌdʒɪt/",
            uz: "Byudjet",
            example: "We need to discuss the budget.",
            exampleUz: "Byudjetni muhokama qilishimiz kerak."
        },
        {
            word: "Invoice",
            phon: "/ˈɪnvɔɪs/",
            uz: "Hisob-faktura",
            example: "Please send the invoice today.",
            exampleUz: "Iltimos, hisob-fakturani bugun yuboring."
        },
    ],
    academic: [
        {
            word: "Research",
            phon: "/rɪˈsɜːrtʃ/",
            uz: "Tadqiqot",
            example: "Her research focuses on language learning.",
            exampleUz: "Uning tadqiqoti til oʻrganishga qaratilgan."
        },
        {
            word: "Essay",
            phon: "/ˈeseɪ/",
            uz: "Insho",
            example: "The essay needs a clear conclusion.",
            exampleUz: "Inshoga aniq xulosa kerak."
        },
        {
            word: "Evidence",
            phon: "/ˈevɪdəns/",
            uz: "Dalil",
            example: "Use evidence to support your idea.",
            exampleUz: "Fikringizni qoʻllab-quvvatlash uchun dalil ishlating."
        },
        {
            word: "Lecture",
            phon: "/ˈlektʃər/",
            uz: "Maʼruza",
            example: "The lecture starts at ten.",
            exampleUz: "Maʼruza soat oʻnda boshlanadi."
        },
    ],
};

const VOCAB_RU: Record<string, { translation: string; example: string }> = {
    Routine: {translation: "Распорядок", example: "Мой утренний распорядок начинается в семь."},
    Errand: {translation: "Поручение", example: "Мне нужно выполнить поручение после работы."},
    Neighbor: {translation: "Сосед", example: "Наш сосед очень дружелюбный."},
    Tidy: {translation: "Аккуратный", example: "Держите свой стол в порядке."},
    Deploy: {translation: "Развернуть", example: "Мы разворачиваем приложение каждую пятницу."},
    Bug: {translation: "Ошибка", example: "Разработчик исправил ошибку входа."},
    Feature: {translation: "Функция", example: "Эта функция помогает пользователям тренировать речь."},
    Backup: {translation: "Резервная копия", example: "Сохраните резервную копию перед обновлением."},
    Departure: {translation: "Отправление", example: "Выход на посадку изменился."},
    Luggage: {translation: "Багаж", example: "Мой багаж слишком тяжёлый."},
    Reservation: {translation: "Бронирование", example: "У меня есть бронирование в отеле."},
    Directions: {translation: "Маршрут", example: "Не могли бы вы подсказать дорогу?"},
    Ingredient: {translation: "Ингредиент", example: "Помидоры — главный ингредиент."},
    Receipt: {translation: "Чек", example: "Можно мне чек, пожалуйста?"},
    Spicy: {translation: "Острый", example: "Этот суп слишком острый."},
    Dessert: {translation: "Десерт", example: "Мы заказали десерт после ужина."},
    Deadline: {translation: "Срок", example: "Срок — завтра утром."},
    Client: {translation: "Клиент", example: "Клиент одобрил дизайн."},
    Budget: {translation: "Бюджет", example: "Нам нужно обсудить бюджет."},
    Invoice: {translation: "Счёт", example: "Пожалуйста, отправьте счёт сегодня."},
    Research: {translation: "Исследование", example: "Её исследование посвящено изучению языков."},
    Essay: {translation: "Эссе", example: "Эссе нужен чёткий вывод."},
    Evidence: {translation: "Доказательство", example: "Используйте доказательства, чтобы поддержать свою идею."},
    Lecture: {translation: "Лекция", example: "Лекция начинается в десять."},
};

function getVocabText(card: VocabCard, language: string) {
    const lang = getUiLang(language);
    if (lang === "ru") {
        const ru = VOCAB_RU[card.word];
        return {translation: ru?.translation ?? card.uz, exampleTranslation: ru?.example ?? card.exampleUz};
    }
    return {translation: card.uz, exampleTranslation: card.exampleUz};
}

export default function Vocabulary() {
    const {t, i18n} = useTranslation();
    const language = i18n.resolvedLanguage || i18n.language;
    const {user} = useAuth();
    const {progress, updateProgress, completeSkillPractice} = useUserProgress(user?.id);
    const activeCategory = (progress.vocabulary.activeCategory as CategoryId) || "daily";
    const deck = DECKS[activeCategory];
    const [idx, setIdx] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const saved = useMemo(() => new Set(progress.vocabulary.savedWords), [progress.vocabulary.savedWords]);
    const card = deck[idx] ?? deck[0];
    const cardText = getVocabText(card, language);
    const activeCategoryMeta = CATEGORIES.find((category) => category.id === activeCategory) ?? CATEGORIES[0];
    const Icon = activeCategoryMeta.icon;

    const selectCategory = (categoryId: CategoryId) => {
        setIdx(0);
        setFlipped(false);
        updateProgress((current) => ({
            ...current,
            vocabulary: {
                ...current.vocabulary,
                activeCategory: categoryId,
            },
        }));
    };

    const speak = () => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${card.word}. ${card.example}`);
        utterance.lang = "en-US";
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    };

    const reviewWord = (word: string) => {
        updateProgress((current) => {
            const reviewedWords = current.vocabulary.reviewedWords.includes(word)
                ? current.vocabulary.reviewedWords
                : [word, ...current.vocabulary.reviewedWords];
            return {
                ...current,
                skills: {
                    ...current.skills,
                    vocab: Math.min(100, Math.max(current.skills.vocab, reviewedWords.length * 5)),
                },
                vocabulary: {
                    ...current.vocabulary,
                    reviewedWords,
                },
            };
        });
    };

    const next = () => {
        reviewWord(card.word);
        setFlipped(false);
        setTimeout(() => setIdx((i) => (i + 1) % deck.length), 120);
    };

    const toggleSave = () => {
        updateProgress((current) => {
            const exists = current.vocabulary.savedWords.includes(card.word);
            const savedWords = exists
                ? current.vocabulary.savedWords.filter((word) => word !== card.word)
                : [card.word, ...current.vocabulary.savedWords];
            return {
                ...current,
                vocabulary: {
                    ...current.vocabulary,
                    savedWords,
                },
            };
        });
        reviewWord(card.word);
    };

    const startDaily = () => {
        selectCategory("daily");
        completeSkillPractice("vocab", {xp: 10, lessonId: `vocab-daily-${new Date().toISOString().slice(0, 10)}`});
    };

    return (
        <div className="space-y-10">
            <SectionHeading
                eyebrow={t("vocabulary.eyebrow")}
                title={t("vocabulary.title")}
                description={t("vocabulary.subtitle")}
            />

            <Card variant="raised" className="relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <Pill tone="primary"><Sparkles className="h-3 w-3"/> {t("vocabulary.dailyPill")}</Pill>
                        <h2 className="text-display mt-3 text-2xl md:text-3xl">{t("vocabulary.dailyTitle")}</h2>
                        <p className="mt-1 text-muted-foreground">{t("vocabulary.dailyGoal")}</p>
                    </div>
                    <PrimaryButton onClick={startDaily}><Sparkles className="h-4 w-4"/> {t("vocabulary.start")}
                    </PrimaryButton>
                </div>
            </Card>

            <div>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-display text-2xl">{t("vocabulary.flashcards")}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {t(activeCategoryMeta.labelKey)} · {idx + 1} / {deck.length}
                        </p>
                    </div>
                    <Pill tone="primary"><Icon className="h-3 w-3"/> {t(activeCategoryMeta.labelKey)}</Pill>
                </div>

                <div className="mx-auto max-w-xl">
                    <motion.div
                        className="relative h-72 cursor-pointer [perspective:1000px]"
                        onClick={() => setFlipped((f) => !f)}
                    >
                        <motion.div
                            className="absolute inset-0 [transform-style:preserve-3d]"
                            animate={{rotateY: flipped ? 180 : 0}}
                            transition={{duration: 0.6}}
                        >
                            <div
                                className="absolute inset-0 grid place-items-center rounded-2xl border-2 border-foreground/10 bg-card p-8 text-center shadow-[6px_6px_0_0_oklch(0.30_0.10_280)] [backface-visibility:hidden]">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("vocabulary.tapToFlip")}</p>
                                    <p className="text-display mt-3 text-5xl">{card.word}</p>
                                    <p className="mt-2 font-mono text-muted-foreground">{card.phon}</p>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speak();
                                        }}
                                        className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-foreground/10 bg-background px-4 py-2 text-sm font-semibold hover:bg-muted"
                                    >
                                        <Volume2 className="h-4 w-4"/> {t("vocabulary.listen")}
                                    </button>
                                </div>
                            </div>
                            <div
                                className="absolute inset-0 grid place-items-center rounded-2xl border-2 border-primary bg-primary/5 p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-primary">{t("vocabulary.translation")}</p>
                                    <p className="text-display mt-3 text-4xl text-primary">{cardText.translation}</p>
                                    <p className="mt-5 italic">"{card.example}"</p>
                                    <p className="mt-1 text-sm text-muted-foreground">{cardText.exampleTranslation}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <GhostButton onClick={() => setFlipped((value) => !value)}>
                            <FlipHorizontal className="h-4 w-4"/> {t("vocabulary.tapToFlip")}
                        </GhostButton>
                        <GhostButton onClick={() => setFlipped(false)}>
                            <RotateCcw className="h-4 w-4"/> {t("vocabulary.retry")}
                        </GhostButton>
                        <GhostButton onClick={toggleSave}>
                            {saved.has(card.word) ? <BookmarkCheck className="h-4 w-4 fill-primary text-primary"/> :
                                <Bookmark className="h-4 w-4"/>}
                            {saved.has(card.word) ? t("vocabulary.saved") : t("vocabulary.save")}
                        </GhostButton>
                        <PrimaryButton onClick={next}>{t("vocabulary.next")} <ArrowRight
                            className="h-4 w-4"/></PrimaryButton>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-display mb-4 text-2xl">{t("vocabulary.topics")}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {CATEGORIES.map((c, i) => {
                            const count = DECKS[c.id].length;
                            const CategoryIcon = c.icon;
                            return (
                                <motion.div
                                    key={c.id}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: i * 0.04}}
                                    whileHover={{y: -4}}
                                >
                                    <button type="button" onClick={() => selectCategory(c.id)}
                                            className="block w-full text-left">
                                        <Card
                                            className={`hover:border-primary cursor-pointer ${activeCategory === c.id ? "border-primary" : ""}`}>
                                            <div className="flex items-start justify-between">
                                                <IconBadge icon={CategoryIcon} tone={c.tone} size="md"/>
                                                <Pill>{t("vocabulary.wordsCount", {n: count})}</Pill>
                                            </div>
                                            <p className="text-display mt-4 text-xl">{t(c.labelKey)}</p>
                                            <p className="mt-1 text-sm text-muted-foreground">{t("vocabulary.topicSubtitle")}</p>
                                        </Card>
                                    </button>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            <div>
                <h2 className="text-display mb-4 text-2xl">{t("vocabulary.savedHeading", {n: saved.size})}</h2>
                {saved.size === 0 ? (
                    <EmptyState
                        icon={<IconBadge icon={Bookmark} tone="muted" size="lg" hover={false}/>}
                        title={t("vocabulary.emptyTitle")}
                        description={t("vocabulary.emptyDesc")}
                    />
                ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                        {Array.from(saved).map((w) => (
                            <Card key={w} className="flex items-center justify-between py-3">
                                <span className="text-display text-lg">{w}</span>
                                <Pill tone="primary"><BookmarkCheck className="h-3 w-3"/> {t("vocabulary.savedTag")}
                                </Pill>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
