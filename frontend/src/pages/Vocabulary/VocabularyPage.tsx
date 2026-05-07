import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Volume2,
  Bookmark,
  RotateCcw,
  Sparkles,
  Home,
  Laptop,
  Plane,
  Utensils,
  BriefcaseBusiness,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Card, Pill, SectionHeading, PrimaryButton, GhostButton, EmptyState } from "@/components/ui-kit";
import { IconBadge, type IconTone } from "@/components/icon-badge";

type Category = {
  id: string;
  labelKey: string;
  count: number;
  icon: LucideIcon;
  tone: IconTone;
};

const CATEGORIES: Category[] = [
  { id: "daily", labelKey: "vocabulary.categories.daily", count: 124, icon: Home, tone: "primary" },
  { id: "tech", labelKey: "vocabulary.categories.tech", count: 86, icon: Laptop, tone: "secondary" },
  { id: "travel", labelKey: "vocabulary.categories.travel", count: 64, icon: Plane, tone: "accent" },
  { id: "food", labelKey: "vocabulary.categories.food", count: 92, icon: Utensils, tone: "primary" },
  { id: "business", labelKey: "vocabulary.categories.business", count: 78, icon: BriefcaseBusiness, tone: "secondary" },
  { id: "academic", labelKey: "vocabulary.categories.academic", count: 110, icon: GraduationCap, tone: "accent" },
];

const DECK = [
  { word: "Determined", phon: "/dɪˈtɜːmɪnd/", uz: "Qat'iyatli", example: "She is determined to learn English.", exampleUz: "U inglizchani o'rganishga qat'iyatli." },
  { word: "Fluent", phon: "/ˈfluːənt/", uz: "Ravon (gapiruvchi)", example: "He speaks fluent English.", exampleUz: "U ingliz tilida ravon gapiradi." },
  { word: "Curious", phon: "/ˈkjʊərɪəs/", uz: "Qiziquvchan", example: "Children are curious about everything.", exampleUz: "Bolalar har narsaga qiziquvchan." },
  { word: "Achieve", phon: "/əˈtʃiːv/", uz: "Erishmoq", example: "You can achieve your dreams.", exampleUz: "Siz orzularingizga erisha olasiz." },
];

export default function Vocabulary() {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const card = DECK[idx];

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i + 1) % DECK.length), 150);
  };

  const toggleSave = () => {
    setSaved((s) => {
      const n = new Set(s);
      n.has(card.word) ? n.delete(card.word) : n.add(card.word);
      return n;
    });
  };

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow={t("vocabulary.eyebrow")}
        title={t("vocabulary.title")}
        description={t("vocabulary.subtitle")}
      />

      {/* Daily challenge */}
      <Card variant="raised" className="relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Pill tone="primary"><Sparkles className="h-3 w-3" /> {t("vocabulary.dailyPill")}</Pill>
            <h2 className="text-display mt-3 text-2xl md:text-3xl">{t("vocabulary.dailyTitle")}</h2>
            <p className="mt-1 text-muted-foreground">{t("vocabulary.dailyGoal")}</p>
          </div>
          <PrimaryButton>{t("vocabulary.start")}</PrimaryButton>
        </div>
      </Card>

      {/* Flashcard */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-display text-2xl">{t("vocabulary.flashcards")}</h2>
          <span className="text-sm text-muted-foreground">{idx + 1} / {DECK.length}</span>
        </div>

        <div className="mx-auto max-w-xl">
          <motion.div
            className="relative h-72 cursor-pointer [perspective:1000px]"
            onClick={() => setFlipped((f) => !f)}
          >
            <motion.div
              className="absolute inset-0 [transform-style:preserve-3d]"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 grid place-items-center rounded-2xl border-2 border-foreground/10 bg-card p-8 text-center shadow-[6px_6px_0_0_oklch(0.30_0.10_280)] [backface-visibility:hidden]">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("vocabulary.tapToFlip")}</p>
                  <p className="text-display mt-3 text-5xl">{card.word}</p>
                  <p className="mt-2 font-mono text-muted-foreground">{card.phon}</p>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-foreground/10 bg-background px-4 py-2 text-sm font-semibold hover:bg-muted"
                  >
                    <Volume2 className="h-4 w-4" /> {t("vocabulary.listen")}
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 grid place-items-center rounded-2xl border-2 border-primary bg-primary/5 p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary">{t("vocabulary.translation")}</p>
                  <p className="text-display mt-3 text-4xl text-primary">{card.uz}</p>
                  <p className="mt-5 italic">"{card.example}"</p>
                  <p className="mt-1 text-sm text-muted-foreground">{card.exampleUz}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <GhostButton onClick={() => setFlipped(false)}>
              <RotateCcw className="h-4 w-4" /> {t("vocabulary.retry")}
            </GhostButton>
            <GhostButton onClick={toggleSave}>
              <Bookmark className={`h-4 w-4 ${saved.has(card.word) ? "fill-primary text-primary" : ""}`} />
              {saved.has(card.word) ? t("vocabulary.saved") : t("vocabulary.save")}
            </GhostButton>
            <PrimaryButton onClick={next}>{t("vocabulary.next")}</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-display mb-4 text-2xl">{t("vocabulary.topics")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <Card className="hover:border-primary cursor-pointer">
                  <div className="flex items-start justify-between">
                    <IconBadge icon={c.icon} tone={c.tone} size="md" />
                    <Pill>{t("vocabulary.wordsCount", { n: c.count })}</Pill>
                  </div>
                  <p className="text-display mt-4 text-xl">{t(c.labelKey)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("vocabulary.topicSubtitle")}</p>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Saved */}
      <div>
        <h2 className="text-display mb-4 text-2xl">{t("vocabulary.savedHeading", { n: saved.size })}</h2>
        {saved.size === 0 ? (
          <EmptyState
            icon={<IconBadge icon={Bookmark} tone="muted" size="lg" hover={false} />}
            title={t("vocabulary.emptyTitle")}
            description={t("vocabulary.emptyDesc")}
          />
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from(saved).map((w) => (
              <Card key={w} className="flex items-center justify-between py-3">
                <span className="text-display text-lg">{w}</span>
                <Pill tone="primary">{t("vocabulary.savedTag")}</Pill>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
