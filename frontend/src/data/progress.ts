import {useEffect, useMemo, useState} from "react";

export type SkillId = "grammar" | "vocab" | "listening" | "speaking";

const PROGRESS_PREFIX = "bilimly_progress";

export const INITIAL_USER_PROGRESS = {
    streakDays: 0,
    xpToday: 0,
    totalXp: 0,
    level: 0,
    lessonsCompleted: 0,
    currentLessonId: "01-alphabet",
    dailyGoalXp: 300,
    lessonProgress: 0,
    completedLessonIds: [] as string[],
    recentLessons: [] as string[],
    skills: {
        grammar: 0,
        vocab: 0,
        listening: 0,
        speaking: 0,
    },
    speaking: {
        scores: [] as number[],
        recordedSeconds: 0,
        scenariosCompleted: 0,
    },
    listening: {
        completedTrackIds: [] as string[],
        listenedSeconds: 0,
    },
    vocabulary: {
        savedWords: [] as string[],
        reviewedWords: [] as string[],
        activeCategory: "daily",
    },
};

export type UserProgress = typeof INITIAL_USER_PROGRESS;

export function getProgressKey(userId?: number | string | null) {
    return userId === undefined || userId === null ? PROGRESS_PREFIX : `${PROGRESS_PREFIX}:${userId}`;
}

export function loadProgress(userId?: number | string | null): UserProgress {
    const key = getProgressKey(userId);
    try {
        const saved = localStorage.getItem(key) || localStorage.getItem(PROGRESS_PREFIX);
        if (!saved) return INITIAL_USER_PROGRESS;
        return mergeProgress(JSON.parse(saved));
    } catch {
        return INITIAL_USER_PROGRESS;
    }
}

export function saveProgress(progress: UserProgress, userId?: number | string | null) {
    localStorage.setItem(getProgressKey(userId), JSON.stringify(progress));
}

export function resetStoredProgress(userId?: number | string) {
    if (userId !== undefined) {
        localStorage.removeItem(getProgressKey(userId));
        return;
    }

    Object.keys(localStorage)
        .filter((key) => key === PROGRESS_PREFIX || key.startsWith(`${PROGRESS_PREFIX}:`))
        .forEach((key) => localStorage.removeItem(key));
    sessionStorage.removeItem(PROGRESS_PREFIX);
}

export function useUserProgress(userId?: number | string | null) {
    const [progress, setProgress] = useState<UserProgress>(() => loadProgress(userId));
    const key = useMemo(() => getProgressKey(userId), [userId]);

    useEffect(() => {
        setProgress(loadProgress(userId));
    }, [key, userId]);

    const updateProgress = (updater: (progress: UserProgress) => UserProgress) => {
        setProgress((current) => {
            const next = updater(current);
            saveProgress(next, userId);
            return next;
        });
    };

    const completeSkillPractice = (
        skill: SkillId,
        options: {
            xp?: number;
            lessonId?: string;
            score?: number;
            recordedSeconds?: number;
            listenedSeconds?: number
        } = {}
    ) => {
        updateProgress((current) => {
            const next = mergeProgress(current);
            const xp = options.xp ?? 10;
            next.xpToday += xp;
            next.totalXp += xp;
            next.level = Math.floor(next.totalXp / 500);
            next.lessonsCompleted += options.lessonId && next.completedLessonIds.includes(options.lessonId) ? 0 : 1;
            next.skills[skill] = Math.min(100, Math.max(next.skills[skill], next.skills[skill] + 8));

            if (options.lessonId && !next.completedLessonIds.includes(options.lessonId)) {
                next.completedLessonIds = [options.lessonId, ...next.completedLessonIds];
                next.recentLessons = [options.lessonId, ...next.recentLessons.filter((id) => id !== options.lessonId)].slice(0, 5);
            }

            if (skill === "speaking") {
                if (typeof options.score === "number") {
                    next.speaking.scores = [options.score, ...next.speaking.scores].slice(0, 20);
                }
                next.speaking.recordedSeconds += options.recordedSeconds ?? 0;
                next.speaking.scenariosCompleted += 1;
            }

            if (skill === "listening") {
                if (options.lessonId && !next.listening.completedTrackIds.includes(options.lessonId)) {
                    next.listening.completedTrackIds = [options.lessonId, ...next.listening.completedTrackIds];
                }
                next.listening.listenedSeconds += options.listenedSeconds ?? 0;
            }

            return next;
        });
    };

    return {progress, updateProgress, completeSkillPractice};
}

function mergeProgress(value: unknown): UserProgress {
    const saved = value && typeof value === "object" ? value as Partial<UserProgress> : {};
    return {
        ...INITIAL_USER_PROGRESS,
        ...saved,
        skills: {
            ...INITIAL_USER_PROGRESS.skills,
            ...saved.skills,
        },
        speaking: {
            ...INITIAL_USER_PROGRESS.speaking,
            ...saved.speaking,
        },
        listening: {
            ...INITIAL_USER_PROGRESS.listening,
            ...saved.listening,
        },
        vocabulary: {
            ...INITIAL_USER_PROGRESS.vocabulary,
            ...saved.vocabulary,
        },
        completedLessonIds: saved.completedLessonIds ?? [],
        recentLessons: saved.recentLessons ?? [],
    };
}
