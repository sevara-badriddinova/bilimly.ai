// Lesson and Exercise Type Definitions

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-in-blank'
  | 'translation'
  | 'match-pairs'
  | 'speaking'
  | 'listening'
  | 'sentence-builder';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';

// Base Exercise Interface
export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  questionUz?: string; // Uzbek translation
  correctAnswer: string;
  explanation?: string;
  explanationUz?: string;
}

// Multiple Choice Exercise
export interface MultipleChoiceExercise extends Exercise {
  type: 'multiple-choice';
  options: string[];
}

// Fill in the Blank Exercise
export interface FillInBlankExercise extends Exercise {
  type: 'fill-in-blank';
  sentence: string; // Sentence with ___ for blank
  acceptableAnswers?: string[]; // Alternative correct answers
}

// Translation Exercise
export interface TranslationExercise extends Exercise {
  type: 'translation';
  sourceLanguage: 'en' | 'uz';
  targetLanguage: 'en' | 'uz';
}

// Match Pairs Exercise
export interface MatchPairsExercise extends Exercise {
  type: 'match-pairs';
  pairs: Array<{ left: string; right: string }>;
}

// Speaking Exercise
export interface SpeakingExercise extends Exercise {
  type: 'speaking';
  targetPhrase: string;
  audioUrl?: string; // URL to native pronunciation
  phoneticSpelling?: string;
}

// Listening Exercise
export interface ListeningExercise extends Exercise {
  type: 'listening';
  audioUrl: string;
  transcript?: string;
  options?: string[]; // For multiple choice listening
}

// Sentence Builder Exercise
export interface SentenceBuilderExercise extends Exercise {
  type: 'sentence-builder';
  words: string[]; // Shuffled words to arrange
}

// Union type for all exercises
export type AnyExercise =
  | MultipleChoiceExercise
  | FillInBlankExercise
  | TranslationExercise
  | MatchPairsExercise
  | SpeakingExercise
  | ListeningExercise
  | SentenceBuilderExercise;

// Lesson Interface
export interface Lesson {
  id: string;
  title: string;
  titleUz: string;
  description: string;
  descriptionUz: string;
  difficulty: DifficultyLevel;
  category: 'grammar' | 'vocabulary' | 'speaking' | 'listening';
  exercises: AnyExercise[];
  xpReward: number;
  estimatedTime: number; // in minutes
  prerequisites?: string[]; // IDs of lessons that must be completed first
  icon?: string; // Emoji or icon name
}

// Unit/Topic grouping multiple lessons
export interface Unit {
  id: string;
  title: string;
  titleUz: string;
  description: string;
  descriptionUz: string;
  lessons: Lesson[];
  icon?: string;
  order: number; // Display order
}

// Vocabulary Word
export interface VocabularyWord {
  id: string;
  word: string;
  translation: string; // Uzbek translation
  pronunciation: string; // Phonetic
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'other';
  example: string;
  exampleTranslation: string;
  imageUrl?: string;
  audioUrl?: string;
}

// Vocabulary Theme
export interface VocabularyTheme {
  id: string;
  title: string;
  titleUz: string;
  description: string;
  words: VocabularyWord[];
  icon?: string;
  difficulty: DifficultyLevel;
}

// User Progress
export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  completedAt?: Date;
  score?: number; // Percentage or points
  mistakes: number;
  xpEarned: number;
  timeSpent: number; // in seconds
}

// Session State (during active lesson)
export interface LessonSession {
  lessonId: string;
  currentExerciseIndex: number;
  answers: Array<{
    exerciseId: string;
    userAnswer: string;
    isCorrect: boolean;
    timeSpent: number;
  }>;
  hearts: number; // Remaining lives
  startTime: Date;
  xpEarned: number;
}

// User Stats
export interface UserStats {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  wordsLearned: number;
  hoursStudied: number;
  level: number;
}
