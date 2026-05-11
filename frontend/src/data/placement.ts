import type { Lesson } from "@/data/lessons";

export type PlacementLevel = "Beginner" | "Intermediate" | "Advanced";
export type WeakArea = "grammar" | "vocab" | "listening" | "speaking";

export type PlacementAnswer = 0 | 1 | 2;

export type PlacementQuestion = {
  id: string;
  area: WeakArea;
  prompt: string;
  options: [string, string, string];
  correct: PlacementAnswer;
};

export type PlacementResult = {
  level: PlacementLevel;
  weakAreas: WeakArea[];
  grammarWeaknesses: string[];
  vocabularyWeaknesses: string[];
  listeningWeaknesses: string[];
  speakingWeaknesses: string[];
  recommendedLessonIds: string[];
  completedAt: string;
};

const PLACEMENT_PREFIX = "bilimly_placement";

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: "grammar-to-be",
    area: "grammar",
    prompt: "Choose the correct sentence.",
    options: ["She are a student.", "She is a student.", "She am a student."],
    correct: 1,
  },
  {
    id: "grammar-present-simple",
    area: "grammar",
    prompt: "Choose the correct routine sentence.",
    options: ["He speaks English.", "He speak English.", "He speaking English."],
    correct: 0,
  },
  {
    id: "vocab-family",
    area: "vocab",
    prompt: "What does 'sister' mean?",
    options: ["Opa/singil", "Ota", "Aka/uka"],
    correct: 0,
  },
  {
    id: "vocab-numbers",
    area: "vocab",
    prompt: "How do you write 35?",
    options: ["thirteen-five", "thirty-five", "three-five"],
    correct: 1,
  },
  {
    id: "listening-main-idea",
    area: "listening",
    prompt: "When listening feels difficult, what should you catch first?",
    options: ["Every single word", "The main idea", "Only grammar rules"],
    correct: 1,
  },
  {
    id: "speaking-confidence",
    area: "speaking",
    prompt: "Best first speaking goal?",
    options: ["Speak perfectly", "Say short clear sentences", "Avoid mistakes forever"],
    correct: 1,
  },
];

export function getPlacementKey(userId?: number | string | null) {
  return userId === undefined || userId === null ? PLACEMENT_PREFIX : `${PLACEMENT_PREFIX}:${userId}`;
}

export function loadPlacementResult(userId?: number | string | null): PlacementResult | null {
  try {
    const saved = localStorage.getItem(getPlacementKey(userId)) || localStorage.getItem(PLACEMENT_PREFIX);
    return saved ? JSON.parse(saved) as PlacementResult : null;
  } catch {
    return null;
  }
}

export function savePlacementResult(result: PlacementResult, userId?: number | string | null) {
  localStorage.setItem(getPlacementKey(userId), JSON.stringify(result));
}

export function scorePlacement(answers: Record<string, PlacementAnswer>, lessons: Lesson[]): PlacementResult {
  const missedAreas = new Set<WeakArea>();
  let correctCount = 0;

  PLACEMENT_QUESTIONS.forEach((question) => {
    if (answers[question.id] === question.correct) {
      correctCount += 1;
    } else {
      missedAreas.add(question.area);
    }
  });

  const level: PlacementLevel =
    correctCount <= 2 ? "Beginner" : correctCount <= 4 ? "Intermediate" : "Advanced";
  const weakAreas = Array.from(missedAreas);
  const recommendedLessonIds = recommendLessons(weakAreas, level, lessons);

  return {
    level,
    weakAreas,
    grammarWeaknesses: weakAreas.includes("grammar") ? ["to be", "present simple", "sentence structure"] : [],
    vocabularyWeaknesses: weakAreas.includes("vocab") ? ["family words", "numbers", "daily vocabulary"] : [],
    listeningWeaknesses: weakAreas.includes("listening") ? ["main idea", "keyword recognition"] : [],
    speakingWeaknesses: weakAreas.includes("speaking") ? ["short answers", "confidence", "sentence fluency"] : [],
    recommendedLessonIds,
    completedAt: new Date().toISOString(),
  };
}

function recommendLessons(weakAreas: WeakArea[], level: PlacementLevel, lessons: Lesson[]) {
  const categoryPriority: Record<WeakArea, Lesson["category"][]> = {
    grammar: ["Grammatika"],
    vocab: ["Lug'at"],
    listening: ["Tinglash", "Lug'at"],
    speaking: ["Gapirish", "Grammatika"],
  };
  const levelPriority: Record<PlacementLevel, Lesson["level"][]> = {
    Beginner: ["Boshlang'ich"],
    Intermediate: ["O'rta", "Boshlang'ich"],
    Advanced: ["Yuqori", "O'rta"],
  };

  const preferredCategories = weakAreas.flatMap((area) => categoryPriority[area]);
  const ranked = [...lessons].sort((a, b) => {
    const aCategory = preferredCategories.includes(a.category) ? 0 : 1;
    const bCategory = preferredCategories.includes(b.category) ? 0 : 1;
    const aLevel = levelPriority[level].includes(a.level) ? 0 : 1;
    const bLevel = levelPriority[level].includes(b.level) ? 0 : 1;
    return aCategory - bCategory || aLevel - bLevel || a.unit - b.unit;
  });

  return ranked.slice(0, 3).map((lesson) => lesson.id);
}
