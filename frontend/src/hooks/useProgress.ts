import { useState, useEffect, useCallback } from 'react';
import { getToken } from '../context/AuthContext';

interface ProgressData {
  lessonsCompleted: string[];  // lesson IDs
  wordsLearned: number;
  xpEarned: number;
  lastActiveDate: string;      // ISO date string YYYY-MM-DD
  currentStreak: number;
  longestStreak: number;
}

const STORAGE_KEY = 'bilimly_progress';

function today() {
  return new Date().toISOString().split('T')[0];
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    lessonsCompleted: [],
    wordsLearned: 0,
    xpEarned: 0,
    lastActiveDate: '',
    currentStreak: 0,
    longestStreak: 0,
  };
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function updateStreak(data: ProgressData): ProgressData {
  const t = today();
  if (data.lastActiveDate === t) return data; // already updated today

  let streak = data.currentStreak;
  if (data.lastActiveDate === yesterday()) {
    streak += 1; // consecutive day
  } else if (data.lastActiveDate !== t) {
    streak = 1; // streak broken, start fresh
  }

  return {
    ...data,
    lastActiveDate: t,
    currentStreak: streak,
    longestStreak: Math.max(streak, data.longestStreak),
  };
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  // Update streak on mount (new session = new day potentially)
  useEffect(() => {
    setProgress(prev => {
      const updated = updateStreak(prev);
      saveProgress(updated);
      return updated;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, xpReward: number = 20) => {
    setProgress(prev => {
      if (prev.lessonsCompleted.includes(lessonId)) return prev; // already done
      const updated: ProgressData = {
        ...updateStreak(prev),
        lessonsCompleted: [...prev.lessonsCompleted, lessonId],
        xpEarned: prev.xpEarned + xpReward,
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const addWords = useCallback((count: number) => {
    setProgress(prev => {
      const updated = { ...prev, wordsLearned: prev.wordsLearned + count };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh: ProgressData = {
      lessonsCompleted: [],
      wordsLearned: 0,
      xpEarned: 0,
      lastActiveDate: today(),
      currentStreak: 1,
      longestStreak: 1,
    };
    saveProgress(fresh);
    setProgress(fresh);
  }, []);

  return {
    lessonsCompleted: progress.lessonsCompleted.length,
    wordsLearned: progress.wordsLearned,
    xpEarned: progress.xpEarned,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    isLessonDone: (id: string) => progress.lessonsCompleted.includes(id),
    completeLesson,
    addWords,
    resetProgress,
  };
}