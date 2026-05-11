import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {GraduationCap} from "lucide-react";
import {useTranslation} from "react-i18next";
import humoBird from "@/assets/humo-bird.png";
import ikatBorder from "@/assets/ikat-border.png";
import {LanguageSwitcher} from "@/components/language-switcher";
import {loginUser, registerUser} from "@/services/api";
import {useAuth} from "@/context/AuthContext";
import {resetStoredProgress} from "@/data/progress";
import {resetStoredChatHistory} from "@/data/chatHistory";
import {changeLanguage} from "@/i18n";

type NativeLanguage = "uz" | "ru" | "en";

export default function SignInPage() {
    return <AuthShell mode="signin"/>;
}

export function AuthShell({mode}: { mode: "signin" | "signup" }) {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const {isAuthenticated, isLoading, login} = useAuth();
    const isSignup = mode === "signup";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nativeLanguage, setNativeLanguage] = useState<NativeLanguage>("uz");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const redirectFrom = (location.state as { from?: { pathname?: string; search?: string; hash?: string } } | null)?.from;
    const redirectTo = redirectFrom
        ? `${redirectFrom.pathname || "/app"}${redirectFrom.search || ""}${redirectFrom.hash || ""}`
        : "/app";

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate(redirectTo, {replace: true});
        }
    }, [isAuthenticated, isLoading, navigate, redirectTo]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const result = isSignup
                ? await registerUser(email.trim(), password, name.trim() || undefined, nativeLanguage)
                : await loginUser(email.trim(), password);

            if (isSignup) {
                resetStoredProgress();
                resetStoredChatHistory();
                changeLanguage(nativeLanguage);
            }

            await login(result.token, rememberMe, isSignup ? name.trim() : undefined);
            navigate(redirectTo, {replace: true});
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen overflow-hidden">
            <div
                aria-hidden
                className="w-full opacity-90"
                style={{
                    backgroundImage: `url(${ikatBorder})`,
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "auto 100%",
                    height: "18px",
                }}
            />

            <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap size={20} strokeWidth={2.25}/>
          </span>
                    <span className="text-display text-2xl font-semibold">
            bilimly<span className="text-primary">.</span>ai
          </span>
                </Link>
                <LanguageSwitcher/>
            </header>

            <main className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-6 md:grid-cols-2 md:pt-12">
                {/* Left visual */}
                <div className="relative hidden md:block">
                    <div
                        aria-hidden
                        className="absolute -inset-10 -z-10 rounded-[2rem] opacity-30 blur-3xl"
                        style={{background: "radial-gradient(circle, oklch(0.80 0.16 80 / 0.6), transparent 70%)"}}
                    />
                    <div
                        className="relative rounded-[1.75rem] border-2 border-foreground/10 bg-card p-10 shadow-[10px_10px_0_0_oklch(0.30_0.10_280)]">
                        <div className="grid place-items-center">
                            <img
                                src={humoBird}
                                alt="Humo bird mascot"
                                width={320}
                                height={320}
                                className="h-64 w-64 object-contain drop-shadow-md"
                            />
                        </div>
                        <p className="text-display mt-6 text-center text-3xl leading-tight">
                            {isSignup ? t("auth.signupHero") : t("auth.signinHero")}
                        </p>
                        <p className="mt-3 text-center text-muted-foreground">
                            {isSignup ? t("auth.signupHeroSub") : t("auth.signinHeroSub")}
                        </p>
                    </div>
                </div>

                {/* Right form */}
                <div className="relative">
                    <div
                        className="rounded-[1.75rem] border-2 border-foreground/10 bg-card p-8 shadow-[10px_10px_0_0_oklch(0.30_0.10_280)] md:p-10">
            <span
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"/>
                {isSignup ? t("auth.signupBadge") : t("auth.signinBadge")}
            </span>

                        <h1 className="text-display mt-5 text-4xl leading-[1.05] sm:text-5xl">
                            {isSignup ? t("auth.signupTitle") : t("auth.signinTitle")}
                        </h1>
                        <p className="mt-3 text-muted-foreground">
                            {isSignup ? t("auth.signupSubtitle") : t("auth.signinSubtitle")}
                        </p>

                        <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
                            {isSignup && (
                                <Field
                                    label={t("auth.name")}
                                    type="text"
                                    placeholder={t("auth.namePh")}
                                    value={name}
                                    onChange={setName}
                                />
                            )}
                            <Field
                                label={t("auth.email")}
                                type="email"
                                placeholder="aziz@example.com"
                                value={email}
                                onChange={setEmail}
                                autoComplete="email"
                                required
                            />
                            <Field
                                label={t("auth.password")}
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={setPassword}
                                autoComplete={isSignup ? "new-password" : "current-password"}
                                minLength={isSignup ? 8 : 6}
                                required
                                hint={!isSignup ? <Link to="/signin"
                                                        className="text-primary hover:underline">{t("auth.forgot")}</Link> : null}
                            />

                            {isSignup && (
                                <div>
                                    <label className="text-sm font-semibold">{t("auth.nativeLang")}</label>
                                    <div className="mt-2 grid grid-cols-3 gap-2">
                                        <LangChip code="uz" label="O'zbek" active={nativeLanguage === "uz"}
                                                  onClick={() => setNativeLanguage("uz")}/>
                                        <LangChip code="ru" label="Русский" active={nativeLanguage === "ru"}
                                                  onClick={() => setNativeLanguage("ru")}/>
                                        <LangChip code="en" label="English" active={nativeLanguage === "en"}
                                                  onClick={() => setNativeLanguage("en")}/>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div
                                    className="rounded-xl border-2 border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
                                    {error}
                                </div>
                            )}
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4"
                                />
                                Remember me
                            </label>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_oklch(0.30_0.10_280)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                            >
                                {isSubmitting ? t("common.loading", "Loading...") : isSignup ? t("auth.submitSignup") : t("auth.submitSignin")}
                                <span className="transition group-hover:translate-x-1">→</span>
                            </button>
                        </form>
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            {isSignup ? (
                                <>
                                    {t("auth.haveAccount")}{" "}
                                    <Link to="/signin" className="font-semibold text-primary hover:underline">
                                        {t("common.signIn")}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {t("auth.noAccount")}{" "}
                                    <Link to="/signup" className="font-semibold text-primary hover:underline">
                                        {t("common.signUp")}
                                    </Link>
                                </>
                            )}
                        </p>
                    </div>

                    {isSignup && (
                        <p className="mt-5 px-2 text-center text-xs text-muted-foreground">
                            {t("auth.terms")} <a href="#"
                                                 className="underline">{t("auth.termsLink")}</a> {t("auth.and")}{" "}
                            <a href="#" className="underline">{t("auth.privacyLink")}</a>.
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}

function Field({
                   label,
                   type,
                   placeholder,
                   hint,
                   value,
                   onChange,
                   autoComplete,
                   minLength,
                   required,
               }: {
    label: string;
    type: string;
    placeholder?: string;
    hint?: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
    autoComplete?: string;
    minLength?: number;
    required?: boolean;
}) {
    return (
        <label className="block">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{label}</span>
                {hint && <span className="text-xs">{hint}</span>}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                autoComplete={autoComplete}
                minLength={minLength}
                required={required}
                className="mt-1.5 w-full rounded-xl border-2 border-foreground/10 bg-background px-4 py-3 text-sm transition focus:border-primary focus:outline-none"
            />
        </label>
    );
}

function LangChip({code, label, active, onClick}: {
    code: NativeLanguage;
    label: string;
    active?: boolean;
    onClick: () => void
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`rounded-xl border-2 px-3 py-2 text-sm font-medium transition ${
                active
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-foreground/10 hover:border-primary/40"
            }`}
        >
            <div className="text-xs uppercase tracking-widest opacity-60">{code}</div>
            <div>{label}</div>
        </button>
    );
}
