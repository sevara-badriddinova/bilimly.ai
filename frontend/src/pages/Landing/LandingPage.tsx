import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Flame, Zap, GraduationCap, UserCircle} from "lucide-react";
import humoBird from "@/assets/humo-bird.png";
import ikatBorder from "@/assets/ikat-border.png";
import anorMotif from "@/assets/anor-motif.png";
import {LanguageSwitcher} from "@/components/language-switcher";
import {useAuth} from "@/context/AuthContext";

const LANGS = ["O'zbek", "Русский", "English"] as const;

export default function Index() {
    const {t} = useTranslation();
    const {isAuthenticated, isLoading, user} = useAuth();
    const [langIdx, setLangIdx] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setLangIdx((i) => (i + 1) % LANGS.length), 2200);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Top ornament strip */}
            <div
                aria-hidden
                className="h-3 w-full opacity-70"
                style={{
                    backgroundImage: `url(${ikatBorder})`,
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "auto 100%",
                    height: "18px",
                }}
            />

            {/* Nav */}
            <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap size={20} strokeWidth={2.25}/>
          </span>
                    <span className="text-display text-2xl font-semibold">
            bilimly<span className="text-primary">.</span>ai
          </span>
                </div>
                <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                    <a href="#how" className="hover:text-foreground transition">{t("nav.howItWorks")}</a>
                </nav>
                <div className="flex items-center gap-2">
                    <LanguageSwitcher/>
                    {isLoading ? (
                        <span className="h-9 w-20 rounded-full bg-muted" aria-hidden/>
                    ) : isAuthenticated ? (
                        <Link
                            to="/app/profile"
                            aria-label={t("nav.profile", "Profile")}
                            title={user?.email || t("nav.profile", "Profile")}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-90"
                        >
                            <UserCircle className="h-5 w-5"/>
                        </Link>
                    ) : (
                        <Link to="/signin"
                              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
                            {t("common.signIn")}
                        </Link>
                    )}
                </div>
            </header>

            {/* Hero */}
            <section className="relative mx-auto max-w-6xl px-6 pt-10 pb-24 md:pt-20">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    <div>
            <span
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"/>
                {t("landing.badge")}
            </span>

                        <h1 className="mt-6 text-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl break-words">
                            {t("landing.heroLine1")}
                            <br/>
                            {t("landing.heroLine2")}{" "}
                            <span className="relative inline-block">
                <span
                    key={langIdx}
                    className="text-primary italic"
                    style={{animation: "fadeIn 600ms ease"}}
                >
                  {LANGS[langIdx]}
                </span>
                <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                    aria-hidden
                >
                  <path
                      d="M2 8 Q 50 0, 100 6 T 198 4"
                      stroke="oklch(0.80 0.16 80)"
                      strokeWidth="3"
                      strokeLinecap="round"
                  />
                </svg>
              </span>
                            <br/>
                            {t("landing.heroLine3")}
                        </h1>

                        <p className="mt-6 max-w-md text-lg text-muted-foreground">
                            {t("landing.heroSubtitle")}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link to="/signup"
                                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]">
                                {t("landing.ctaPrimary")}
                                <span className="transition group-hover:translate-x-1">→</span>
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center gap-8 text-sm">
                            <Stat n="100+" label={t("landing.students")}/>
                            <span className="h-8 w-px bg-border"/>
                            <Stat n="3" label={t("landing.languages")}/>
                            <span className="h-8 w-px bg-border"/>
                            <Stat n="500+" label={t("landing.lessons")}/>
                        </div>
                    </div>

                    {/* Right column — Chat demo card */}
                    <div className="relative">
                        <div
                            aria-hidden
                            className="absolute -inset-6 -z-10 rounded-[2rem] opacity-30 blur-2xl"
                            style={{background: "radial-gradient(circle, oklch(0.80 0.16 80 / 0.6), transparent 70%)"}}
                        />
                        <div
                            className="relative rounded-[1.75rem] border-2 border-foreground/10 bg-card p-6 shadow-[10px_10px_0_0_oklch(0.30_0.10_280)]">
                            <img
                                src={anorMotif}
                                alt=""
                                aria-hidden
                                loading="lazy"
                                className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rotate-[-12deg] opacity-90"
                            />
                            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                  {t("landing.todaysLesson")}
                </span>
                                <span
                                    className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {t("landing.grammarTag")}
                </span>
                            </div>

                            <div className="my-5 grid place-items-center">
                                <img
                                    src={humoBird}
                                    alt="Bilimly Humo bird mascot"
                                    width={220}
                                    height={220}
                                    className="h-48 w-48 object-contain drop-shadow-md"
                                />
                            </div>

                            <ChatBubble side="left">
                                <span className="text-muted-foreground">{t("landing.chatQuestion")}</span>
                            </ChatBubble>
                            <ChatBubble side="right">
                                <strong>Present Perfect</strong> — {t("landing.chatAnswer")} <em>I have learned 50
                                words!</em>
                            </ChatBubble>

                            <div className="mt-6 space-y-3">
                                <ProgressRow label={t("landing.progress.grammar")} value={72}/>
                                <ProgressRow label={t("landing.progress.vocab")} value={58}/>
                                <ProgressRow label={t("landing.progress.speaking")} value={45}/>
                            </div>

                            <div className="mt-5 flex items-center justify-between rounded-xl bg-secondary/10 p-3">
                                <div className="flex items-center gap-1.5 text-sm font-semibold text-secondary">
                                    <Zap className="h-4 w-4"/> 240 {t("landing.xpToday")}
                                </div>
                                <span
                                    className="text-xs font-medium text-muted-foreground">{t("landing.levelLabel")} 5</span>
                            </div>
                        </div>

                        <div
                            className="absolute -right-3 -top-3 inline-flex items-center gap-1.5 rotate-6 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-md">
                            <Flame className="h-4 w-4"/> {t("landing.streakBadge", {count: 7})}
                        </div>
                    </div>
                </div>
            </section>

            <div
                aria-hidden
                className="w-full opacity-90"
                style={{
                    backgroundImage: `url(${ikatBorder})`,
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "auto 100%",
                    height: "44px",
                }}
            />

            {/* How it works */}
            <section id="how" className="mx-auto max-w-6xl px-6 py-24">
                <div className="mb-14 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t("landing.howEyebrow")}
          </span>
                    <h2 className="mt-3 text-display md:text-5xl text-3xl">
                        {t("landing.howTitle")}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {t("landing.howSubtitle")}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Step n="01" title={t("landing.steps.one.title")} body={t("landing.steps.one.body")}/>
                    <Step n="02" title={t("landing.steps.two.title")} body={t("landing.steps.two.body")}/>
                    <Step n="03" title={t("landing.steps.three.title")} body={t("landing.steps.three.body")}/>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-6xl px-6 pb-24">
                <div
                    className="relative overflow-hidden rounded-[2rem] border-2 border-foreground/10 bg-secondary p-10 text-secondary-foreground md:p-16">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-25"
                        style={{
                            backgroundImage: `url(${ikatBorder})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <img
                        src={anorMotif}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rotate-12 opacity-90"
                    />
                    <div className="relative max-w-xl">
                        <h2 className="text-display md:text-5xl text-3xl">
                            {t("landing.ctaTitle")}
                        </h2>
                        <p className="mt-4 text-lg opacity-80">
                            {t("landing.ctaBody")}
                        </p>
                        <Link to="/signup"
                              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-[4px_4px_0_0_oklch(0.45_0.17_22)] transition hover:translate-x-[-2px] hover:translate-y-[-2px]">
                            {t("landing.ctaButton")}
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-border">
                <div
                    className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
                    <span>{t("landing.footer")}</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-foreground">{t("landing.privacy")}</a>
                        <a href="#" className="hover:text-foreground">{t("landing.terms")}</a>
                        <a href="#" className="hover:text-foreground">{t("landing.contact")}</a>
                    </div>
                </div>
            </footer>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

function Stat({n, label}: { n: string; label: string }) {
    return (
        <div>
            <div className="text-display text-2xl font-semibold">{n}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        </div>
    );
}

function ChatBubble({side, children}: { side: "left" | "right"; children: React.ReactNode }) {
    const isLeft = side === "left";
    return (
        <div className={`mb-2 flex ${isLeft ? "justify-start" : "justify-end"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    isLeft
                        ? "rounded-bl-sm bg-muted text-foreground"
                        : "rounded-br-sm bg-primary text-primary-foreground"
                }`}
            >
                {children}
            </div>
        </div>
    );
}

function ProgressRow({label, value}: { label: string; value: number }) {
    return (
        <div className="flex items-center gap-3 text-sm">
            <span className="w-24 text-muted-foreground">{label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full rounded-full bg-primary"
                    style={{width: `${value}%`}}
                />
            </div>
            <span className="w-10 text-right font-semibold tabular-nums">{value}%</span>
        </div>
    );
}

function Step({n, title, body}: { n: string; title: string; body: string }) {
    return (
        <div
            className="group relative rounded-2xl border-2 border-foreground/10 bg-card p-7 transition hover:-translate-y-1 hover:border-primary hover:shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]">
            <div className="text-display text-5xl text-primary/20 transition group-hover:text-primary/40">
                {n}
            </div>
            <h3 className="mt-4 text-display text-2xl">{title}</h3>
            <p className="mt-2 text-muted-foreground">{body}</p>
        </div>
    );
}
