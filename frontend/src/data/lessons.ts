import type {LucideIcon} from "lucide-react";
import {
    Type,
    Hand,
    Sparkles,
    Hash,
    Sun,
    Users,
    RefreshCw,
    Scroll,
    Trophy,
    GitBranch,
} from "lucide-react";

export type Lesson = {
    id: string;
    unit: number;
    title: string;
    titleUz: string;
    level: "Boshlang'ich" | "O'rta" | "Yuqori";
    category: "Grammatika" | "Lug'at" | "Gapirish" | "Tinglash";
    minutes: number;
    xp: number;
    summary: string;
    status: "completed" | "current" | "locked" | "available";
    icon: LucideIcon;
};

export const LESSONS: Lesson[] = [
    {
        id: "01-alphabet",
        unit: 1,
        title: "The Alphabet",
        titleUz: "Alifbo",
        level: "Boshlang'ich",
        category: "Lug'at",
        minutes: 8,
        xp: 20,
        summary: "26 ta harfni o'rganamiz va talaffuzni mashq qilamiz.",
        status: "completed",
        icon: Type
    },
    {
        id: "02-greetings",
        unit: 1,
        title: "Greetings & Introductions",
        titleUz: "Salomlashish va tanishuv",
        level: "Boshlang'ich",
        category: "Gapirish",
        minutes: 10,
        xp: 30,
        summary: "Hello, Hi, Nice to meet you — birinchi suhbatlar.",
        status: "completed",
        icon: Hand
    },
    {
        id: "03-to-be",
        unit: 1,
        title: "Verb 'to be'",
        titleUz: "'To be' fe'li",
        level: "Boshlang'ich",
        category: "Grammatika",
        minutes: 12,
        xp: 40,
        summary: "I am, you are, he/she is — eng muhim fe'l.",
        status: "current",
        icon: Sparkles
    },
    {
        id: "04-numbers",
        unit: 2,
        title: "Numbers 1–100",
        titleUz: "Sonlar 1–100",
        level: "Boshlang'ich",
        category: "Lug'at",
        minutes: 9,
        xp: 25,
        summary: "Sonlarni aytish va yozish.",
        status: "available",
        icon: Hash
    },
    {
        id: "05-present-simple",
        unit: 2,
        title: "Present Simple",
        titleUz: "Hozirgi oddiy zamon",
        level: "Boshlang'ich",
        category: "Grammatika",
        minutes: 14,
        xp: 45,
        summary: "Har kuni qiladigan ishlar haqida gapirish.",
        status: "available",
        icon: Sun
    },
    {
        id: "06-family",
        unit: 2,
        title: "Family Vocabulary",
        titleUz: "Oila so'zlari",
        level: "Boshlang'ich",
        category: "Lug'at",
        minutes: 10,
        xp: 30,
        summary: "Mother, father, brother — oila a'zolari.",
        status: "locked",
        icon: Users
    },
    {
        id: "07-present-cont",
        unit: 3,
        title: "Present Continuous",
        titleUz: "Hozirgi davomiy zamon",
        level: "O'rta",
        category: "Grammatika",
        minutes: 15,
        xp: 50,
        summary: "I am learning English right now.",
        status: "locked",
        icon: RefreshCw
    },
    {
        id: "08-past-simple",
        unit: 3,
        title: "Past Simple",
        titleUz: "O'tgan oddiy zamon",
        level: "O'rta",
        category: "Grammatika",
        minutes: 16,
        xp: 55,
        summary: "Kechagi voqealar haqida gapirish.",
        status: "locked",
        icon: Scroll
    },
    {
        id: "09-present-perfect",
        unit: 4,
        title: "Present Perfect",
        titleUz: "Hozirgi tugallangan zamon",
        level: "O'rta",
        category: "Grammatika",
        minutes: 18,
        xp: 60,
        summary: "I have learned 50 words! — natija va tajriba.",
        status: "locked",
        icon: Trophy
    },
    {
        id: "10-conditionals",
        unit: 5,
        title: "Conditionals (If…)",
        titleUz: "Shartli gaplar",
        level: "Yuqori",
        category: "Grammatika",
        minutes: 20,
        xp: 70,
        summary: "If I had time, I would travel.",
        status: "locked",
        icon: GitBranch
    },
];

type Lang = "en" | "uz" | "ru";

const LESSON_I18N: Record<string, Record<Lang, { title: string; summary: string }>> = {
    "01-alphabet": {
        en: {title: "The Alphabet", summary: "Learn the 26 letters and practice pronunciation."},
        uz: {title: "Alifbo", summary: "26 ta harfni o'rganamiz va talaffuzni mashq qilamiz."},
        ru: {title: "Алфавит", summary: "Изучаем 26 букв и тренируем произношение."},
    },
    "02-greetings": {
        en: {title: "Greetings & Introductions", summary: "Hello, Hi, Nice to meet you — your first conversations."},
        uz: {title: "Salomlashish va tanishuv", summary: "Hello, Hi, Nice to meet you — birinchi suhbatlar."},
        ru: {title: "Приветствия и знакомство", summary: "Hello, Hi, Nice to meet you — первые диалоги."},
    },
    "03-to-be": {
        en: {title: "Verb 'to be'", summary: "I am, you are, he/she is — the most important verb."},
        uz: {title: "'To be' fe'li", summary: "I am, you are, he/she is — eng muhim fe'l."},
        ru: {title: "Глагол 'to be'", summary: "I am, you are, he/she is — самый важный глагол."},
    },
    "04-numbers": {
        en: {title: "Numbers 1-100", summary: "Say and write numbers confidently."},
        uz: {title: "Sonlar 1-100", summary: "Sonlarni aytish va yozish."},
        ru: {title: "Числа 1-100", summary: "Учимся уверенно произносить и писать числа."},
    },
    "05-present-simple": {
        en: {title: "Present Simple", summary: "Talk about routines and things you do every day."},
        uz: {title: "Hozirgi oddiy zamon", summary: "Har kuni qiladigan ishlar haqida gapirish."},
        ru: {title: "Present Simple", summary: "Говорим о привычках и ежедневных действиях."},
    },
    "06-family": {
        en: {title: "Family Vocabulary", summary: "Mother, father, brother — family members."},
        uz: {title: "Oila so'zlari", summary: "Mother, father, brother — oila a'zolari."},
        ru: {title: "Семейная лексика", summary: "Mother, father, brother — члены семьи."},
    },
    "07-present-cont": {
        en: {title: "Present Continuous", summary: "I am learning English right now."},
        uz: {title: "Hozirgi davomiy zamon", summary: "I am learning English right now."},
        ru: {title: "Present Continuous", summary: "I am learning English right now."},
    },
    "08-past-simple": {
        en: {title: "Past Simple", summary: "Talk about yesterday and completed past events."},
        uz: {title: "O'tgan oddiy zamon", summary: "Kechagi voqealar haqida gapirish."},
        ru: {title: "Past Simple", summary: "Говорим о вчерашних и завершённых событиях."},
    },
    "09-present-perfect": {
        en: {title: "Present Perfect", summary: "I have learned 50 words! — results and experience."},
        uz: {title: "Hozirgi tugallangan zamon", summary: "I have learned 50 words! — natija va tajriba."},
        ru: {title: "Present Perfect", summary: "I have learned 50 words! — результат и опыт."},
    },
    "10-conditionals": {
        en: {title: "Conditionals (If...)", summary: "If I had time, I would travel."},
        uz: {title: "Shartli gaplar", summary: "If I had time, I would travel."},
        ru: {title: "Условные предложения", summary: "If I had time, I would travel."},
    },
};

const LEVEL_I18N: Record<Lesson["level"], Record<Lang, string>> = {
    "Boshlang'ich": {en: "Beginner", uz: "Boshlang'ich", ru: "Начальный"},
    "O'rta": {en: "Intermediate", uz: "O'rta", ru: "Средний"},
    "Yuqori": {en: "Advanced", uz: "Yuqori", ru: "Продвинутый"},
};

const CATEGORY_I18N: Record<Lesson["category"], Record<Lang, string>> = {
    Grammatika: {en: "Grammar", uz: "Grammatika", ru: "Грамматика"},
    "Lug'at": {en: "Vocabulary", uz: "Lug'at", ru: "Словарь"},
    Gapirish: {en: "Speaking", uz: "Gapirish", ru: "Разговор"},
    Tinglash: {en: "Listening", uz: "Tinglash", ru: "Аудирование"},
};

export function getUiLang(language?: string): Lang {
    const short = language?.slice(0, 2).toLowerCase();
    return short === "uz" || short === "ru" ? short : "en";
}

export function getLessonText(lesson: Lesson, language?: string) {
    const lang = getUiLang(language);
    return LESSON_I18N[lesson.id]?.[lang] ?? {title: lesson.title, summary: lesson.summary};
}

export function getLessonLevel(lesson: Lesson, language?: string) {
    return LEVEL_I18N[lesson.level][getUiLang(language)];
}

export function getLessonCategory(lesson: Lesson, language?: string) {
    return CATEGORY_I18N[lesson.category][getUiLang(language)];
}

export function getLesson(id: string): Lesson | undefined {
    return LESSONS.find((l) => l.id === id);
}

export function getNextLesson(id: string): Lesson | undefined {
    const idx = LESSONS.findIndex((l) => l.id === id);
    return idx >= 0 ? LESSONS[idx + 1] : undefined;
}

export function getPrevLesson(id: string): Lesson | undefined {
    const idx = LESSONS.findIndex((l) => l.id === id);
    return idx > 0 ? LESSONS[idx - 1] : undefined;
}
