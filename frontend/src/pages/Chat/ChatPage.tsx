import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Send, Sparkles, Plus, MessageSquare } from "lucide-react";
import { Card, Pill } from "@/components/ui-kit";
import humoBird from "@/assets/humo-bird.png";

type Msg = { id: string; role: "user" | "assistant"; content: string; correction?: { wrong: string; right: string; note: string } };

export default function Coach() {
  const { t } = useTranslation();

  const SUGGESTIONS = useMemo(() => [
    t("coach.sample.q1"),
    t("coach.sample.q2"),
    t("coach.sample.q3"),
    t("coach.sample.q4"),
  ], [t]);

  const HISTORY = useMemo(() => [
    { id: "1", title: t("coach.history1"), time: t("coach.timeToday"), active: true },
    { id: "2", title: t("coach.history2"), time: t("coach.timeYesterday") },
    { id: "3", title: t("coach.history3"), time: t("coach.timeDaysAgo", { n: 2 }) },
    { id: "4", title: t("coach.history4"), time: t("coach.timeWeekAgo") },
  ], [t]);

  const SEED: Msg[] = useMemo(() => [
    { id: "m1", role: "assistant", content: t("coach.greeting") },
  ], [t]);

  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", content };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: Msg = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: t("coach.reply"),
        correction: content.toLowerCase().includes("i is")
          ? { wrong: "I is", right: "I am", note: t("coach.correctionNote") }
          : undefined,
      };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 1100);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr] md:h-[calc(100vh-3rem)]">
      {/* History sidebar */}
      <aside className="hidden md:flex flex-col rounded-2xl border-2 border-foreground/10 bg-card p-4">
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[3px_3px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-1px] hover:translate-y-[-1px]">
          <Plus className="h-4 w-4" /> {t("coach.newChat")}
        </button>
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("coach.history")}</p>
        <div className="mt-2 flex-1 space-y-1 overflow-y-auto">
          {HISTORY.map((h) => (
            <button
              key={h.id}
              className={`flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                h.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{h.title}</p>
                <p className="text-xs opacity-60">{h.time}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat */}
      <div className="flex h-[calc(100vh-12rem)] flex-col rounded-2xl border-2 border-foreground/10 bg-card md:h-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border p-4">
          <div className="flex items-center gap-3">
            <img src={humoBird} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <div>
              <p className="text-display text-lg leading-tight">Humo AI</p>
              <p className="text-xs text-muted-foreground">{t("coach.subtitle")}</p>
            </div>
          </div>
          <Pill tone="primary"><Sparkles className="h-3 w-3" /> AI</Pill>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`whitespace-pre-line rounded-2xl px-4 py-3 leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm border-2 border-foreground/10 bg-background"
                    }`}
                  >
                    {m.content.split(/\*\*(.*?)\*\*/g).map((part, i) => (
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                    ))}
                  </div>
                  {m.correction && (
                    <Card className="mt-2 border-primary bg-primary/5 p-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t("coach.correctionLabel")}</p>
                      <p className="mt-1.5 text-sm">
                        <span className="line-through opacity-60">{m.correction.wrong}</span>{" "}
                        <span className="font-semibold text-primary">→ {m.correction.right}</span>
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{m.correction.note}</p>
                    </Card>
                  )}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border-2 border-foreground/10 bg-background px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-primary"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="border-t border-border p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("coach.suggestions")}</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border-2 border-foreground/10 bg-background px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:bg-primary/5"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border p-3">
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 rounded-xl border-2 border-foreground/10 bg-background p-1.5 focus-within:border-primary"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("coach.placeholder")}
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
