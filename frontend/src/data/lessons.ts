import type { LucideIcon } from "lucide-react";
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
  { id: "01-alphabet", unit: 1, title: "The Alphabet", titleUz: "Alifbo", level: "Boshlang'ich", category: "Lug'at", minutes: 8, xp: 20, summary: "26 ta harfni o'rganamiz va talaffuzni mashq qilamiz.", status: "completed", icon: Type },
  { id: "02-greetings", unit: 1, title: "Greetings & Introductions", titleUz: "Salomlashish va tanishuv", level: "Boshlang'ich", category: "Gapirish", minutes: 10, xp: 30, summary: "Hello, Hi, Nice to meet you — birinchi suhbatlar.", status: "completed", icon: Hand },
  { id: "03-to-be", unit: 1, title: "Verb 'to be'", titleUz: "'To be' fe'li", level: "Boshlang'ich", category: "Grammatika", minutes: 12, xp: 40, summary: "I am, you are, he/she is — eng muhim fe'l.", status: "current", icon: Sparkles },
  { id: "04-numbers", unit: 2, title: "Numbers 1–100", titleUz: "Sonlar 1–100", level: "Boshlang'ich", category: "Lug'at", minutes: 9, xp: 25, summary: "Sonlarni aytish va yozish.", status: "available", icon: Hash },
  { id: "05-present-simple", unit: 2, title: "Present Simple", titleUz: "Hozirgi oddiy zamon", level: "Boshlang'ich", category: "Grammatika", minutes: 14, xp: 45, summary: "Har kuni qiladigan ishlar haqida gapirish.", status: "available", icon: Sun },
  { id: "06-family", unit: 2, title: "Family Vocabulary", titleUz: "Oila so'zlari", level: "Boshlang'ich", category: "Lug'at", minutes: 10, xp: 30, summary: "Mother, father, brother — oila a'zolari.", status: "locked", icon: Users },
  { id: "07-present-cont", unit: 3, title: "Present Continuous", titleUz: "Hozirgi davomiy zamon", level: "O'rta", category: "Grammatika", minutes: 15, xp: 50, summary: "I am learning English right now.", status: "locked", icon: RefreshCw },
  { id: "08-past-simple", unit: 3, title: "Past Simple", titleUz: "O'tgan oddiy zamon", level: "O'rta", category: "Grammatika", minutes: 16, xp: 55, summary: "Kechagi voqealar haqida gapirish.", status: "locked", icon: Scroll },
  { id: "09-present-perfect", unit: 4, title: "Present Perfect", titleUz: "Hozirgi tugallangan zamon", level: "O'rta", category: "Grammatika", minutes: 18, xp: 60, summary: "I have learned 50 words! — natija va tajriba.", status: "locked", icon: Trophy },
  { id: "10-conditionals", unit: 5, title: "Conditionals (If…)", titleUz: "Shartli gaplar", level: "Yuqori", category: "Grammatika", minutes: 20, xp: 70, summary: "If I had time, I would travel.", status: "locked", icon: GitBranch },
];

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
