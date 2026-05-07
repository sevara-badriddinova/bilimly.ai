import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import humoBird from "@/assets/humo-bird.png";
import ikatBorder from "@/assets/ikat-border.png";
import { LanguageSwitcher } from "@/components/language-switcher";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Bilimly.ai" },
      { name: "description", content: "Sign in to your Bilimly.ai account and continue learning English." },
      { property: "og:title", content: "Sign in — Bilimly.ai" },
      { property: "og:description", content: "Sign in to your Bilimly.ai account." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  return <AuthShell mode="signin" />;
}

export function AuthShell({ mode }: { mode: "signin" | "signup" }) {
  const { t } = useTranslation();
  const isSignup = mode === "signup";
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
            <GraduationCap size={20} strokeWidth={2.25} />
          </span>
          <span className="text-display text-2xl font-semibold">
            bilimly<span className="text-primary">.</span>ai
          </span>
        </Link>
        <LanguageSwitcher />
      </header>

      <main className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-6 md:grid-cols-2 md:pt-12">
        {/* Left visual */}
        <div className="relative hidden md:block">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[2rem] opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.80 0.16 80 / 0.6), transparent 70%)" }}
          />
          <div className="relative rounded-[1.75rem] border-2 border-foreground/10 bg-card p-10 shadow-[10px_10px_0_0_oklch(0.30_0.10_280)]">
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
          <div className="rounded-[1.75rem] border-2 border-foreground/10 bg-card p-8 shadow-[10px_10px_0_0_oklch(0.30_0.10_280)] md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {isSignup ? t("auth.signupBadge") : t("auth.signinBadge")}
            </span>

            <h1 className="text-display mt-5 text-4xl leading-[1.05] sm:text-5xl">
              {isSignup ? t("auth.signupTitle") : t("auth.signinTitle")}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {isSignup ? t("auth.signupSubtitle") : t("auth.signinSubtitle")}
            </p>

            {/* Social */}
            <div className="mt-7 grid gap-3">
              <SocialButton provider="google" label={t("auth.google")} />
              <SocialButton provider="apple" label={t("auth.apple")} />
            </div>

            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              {t("auth.or")}
              <span className="h-px flex-1 bg-border" />
            </div>

            <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
              {isSignup && (
                <Field label={t("auth.name")} type="text" placeholder={t("auth.namePh")} />
              )}
              <Field label={t("auth.email")} type="email" placeholder="aziz@example.com" />
              <Field
                label={t("auth.password")}
                type="password"
                placeholder="••••••••"
                hint={!isSignup ? <Link to="/signin" className="text-primary hover:underline">{t("auth.forgot")}</Link> : null}
              />

              {isSignup && (
                <div>
                  <label className="text-sm font-semibold">{t("auth.nativeLang")}</label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <LangChip code="UZ" label="O'zbek" active />
                    <LangChip code="RU" label="Русский" />
                    <LangChip code="EN" label="English" />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]"
              >
                {isSignup ? t("auth.submitSignup") : t("auth.submitSignin")}
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
              {t("auth.terms")} <a href="#" className="underline">{t("auth.termsLink")}</a> {t("auth.and")}{" "}
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
}: {
  label: string;
  type: string;
  placeholder?: string;
  hint?: React.ReactNode;
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
        className="mt-1.5 w-full rounded-xl border-2 border-foreground/10 bg-background px-4 py-3 text-sm transition focus:border-primary focus:outline-none"
      />
    </label>
  );
}

function LangChip({ code, label, active }: { code: string; label: string; active?: boolean }) {
  return (
    <button
      type="button"
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

function SocialButton({ provider, label }: { provider: "google" | "apple"; label: string }) {
  const isGoogle = provider === "google";
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-foreground/10 bg-card px-5 py-3 text-sm font-semibold transition hover:border-foreground/30 hover:bg-muted"
    >
      {isGoogle ? <GoogleIcon /> : <AppleIcon />}
      {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C41.4 35.8 44 30.3 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}
