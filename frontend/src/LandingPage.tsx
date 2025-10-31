import React from "react";
import { motion } from "framer-motion";

const brand = {
  deepBlue: "#00296b",
  skyBlue: "#003f88",
  softBlue: "#00509d",
  orange: "#fdc500",
  lightOrange: "#ffd500",
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay } },
});

export default function LandingPage() {
  const [lang, setLang] = React.useState<"EN" | "UZ">("EN");
  const [t, setT] = React.useState<Record<string, string>>({
    home: "Home",
    features: "Features",
    pricing: "Pricing",
    contact: "Contact",
    headline: "Master IELTS with AI – Learn Smarter, Not Harder",
    subtext: "Get personalized writing and speaking feedback instantly in English or Uzbek.",
    startFree: "Start Free Trial",
    login: "Log In",
    aiWriting: "AI Writing Grader",
    aiWritingDesc: "Get instant IELTS Task 1/2 feedback with band scores and grammar tips.",
    speakingCoach: "Speaking Coach",
    speakingCoachDesc: "Upload your speech and get AI evaluation on pronunciation, fluency, and grammar.",
    tracker: "Progress Tracker",
    trackerDesc: "Monitor your IELTS improvement with personalized study plans.",
    choosePlan: "Choose Your Plan",
    free: "Free",
    freeNote: "Limited daily uses",
    pro: "Pro",
    proNote: "Full access, billed monthly",
    getStarted: "Get Started",
    testimonials: "What students say",
    quote1: "Scored Band 7 thanks to IELTS.AI!",
    quote2: "My speaking improved in two weeks.",
    quote3: "Clear feedback and easy progress tracking.",
    footerLove: "Made with ❤️ in Uzbekistan",
    privacy: "Privacy Policy",
    terms: "Terms",
    footerContact: "Contact",
  });

  React.useEffect(() => {
    const locale = lang.toLowerCase();
    fetch(`/api/i18n/${locale}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) setT(data);
      })
      .catch(() => {
        // keep defaults on error
      });
  }, [lang]);

  return (
    <div className="min-h-screen w-full bg-[#00296b] text-white selection:bg-[#ffd500]/40 selection:text-[#00296b]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/5">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center shadow-md"
              style={{ background: brand.skyBlue }}
            >
              <span className="text-white font-extrabold">AI</span>
            </div>
            <span
              className="text-lg sm:text-xl font-extrabold tracking-tight"
              style={{ color: '#ffffff' }}
            >
              IELTS.AI Tutor
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium hover:opacity-80 text-white">
              {t.home}
            </a>
            <a href="#features" className="text-sm font-medium hover:opacity-80 text-white">
              {t.features}
            </a>
            <a href="#pricing" className="text-sm font-medium hover:opacity-80 text-white">
              {t.pricing}
            </a>
            <a href="#contact" className="text-sm font-medium hover:opacity-80 text-white">
              {t.contact}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Switch language"
              onClick={() => setLang((p) => (p === "EN" ? "UZ" : "EN"))}
              className="rounded-full border px-3 py-1 text-xs font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{
                borderColor: brand.skyBlue,
                color: brand.skyBlue,
              }}
            >
              {lang} / {lang === "EN" ? "UZ" : "EN"}
            </button>
            <a
              href="#login"
              className="hidden sm:inline-flex rounded-full border px-4 py-2 text-sm font-semibold"
              style={{ borderColor: brand.skyBlue, color: brand.skyBlue }}
            >
              {t.login}
            </a>
            <a
              href="#start"
              className="inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#FB8500]/30 transition-transform hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: brand.orange, color: brand.deepBlue }}
            >
              {t.startFree}
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${brand.skyBlue}, ${brand.deepBlue})` }}
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40"
          style={{ background: brand.lightOrange }} />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ background: brand.orange }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp(0.1)}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              {t.headline}
            </h1>
            <p className="mt-4 text-base sm:text-lg max-w-xl text-white/80">
              {t.subtext}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#start"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold shadow-lg shadow-[#FFB703]/30"
                style={{ background: brand.lightOrange, color: brand.deepBlue }}
              >
                {t.startFree}
              </a>
              <a
                href="#login"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold border"
                style={{ borderColor: brand.lightOrange, color: brand.lightOrange }}
              >
                {t.login}
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex items-center gap-4 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full" style={{ background: brand.lightOrange }} />
              <span>Real-time AI feedback</span>
              <span className="h-2 w-2 rounded-full" style={{ background: brand.lightOrange }} />
              <span>Bilingual support (EN / UZ)</span>
              <span className="h-2 w-2 rounded-full" style={{ background: brand.lightOrange }} />
              <span>Mobile-friendly</span>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={scaleIn(0.2)}
          >
            <div className="mx-auto max-w-md">
              <div
                className="rounded-2xl p-5 shadow-2xl ring-1"
                style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(142,202,230,0.35))", borderColor: 'rgba(2,48,71,0.08)' }}
              >
                {/* 3D-style flat illustration (SVG) */}
                <svg
                  viewBox="0 0 800 520"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Student with AI tutor illustration"
                >
                  <defs>
                    <linearGradient id="grad1" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor={brand.skyBlue} />
                      <stop offset="100%" stopColor={brand.softBlue} />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor={brand.orange} />
                      <stop offset="100%" stopColor={brand.lightOrange} />
                    </linearGradient>
                  </defs>
                  {/* Laptop */}
                  <rect x="180" y="220" rx="16" ry="16" width="440" height="260" fill="url(#grad1)"></rect>
                  <rect x="200" y="240" rx="10" ry="10" width="400" height="200" fill="#E3F2F9"></rect>
                  <rect x="200" y="240" rx="10" ry="10" width="400" height="28" fill="#CDEAF6"></rect>
                  <circle cx="214" cy="254" r="6" fill="#FF6565" />
                  <circle cx="234" cy="254" r="6" fill="#FFC24A" />
                  <circle cx="254" cy="254" r="6" fill="#59D37D" />
                  {/* Chat bubbles */}
                  <rect x="220" y="290" rx="10" ry="10" width="230" height="40" fill="#123043" opacity="0.9"></rect>
                  <rect x="220" y="345" rx="10" ry="10" width="180" height="40" fill="#123043" opacity="0.9"></rect>
                  <rect x="420" y="395" rx="10" ry="10" width="160" height="40" fill="#163F58" opacity="0.9"></rect>
                  {/* AI avatar */}
                  <circle cx="540" cy="320" r="28" fill="url(#grad2)"></circle>
                  <rect x="525" y="350" width="30" height="8" rx="4" fill="white" opacity="0.85"></rect>
                  {/* Student figure */}
                  <circle cx="130" cy="230" r="38" fill="#FFD8A8"></circle>
                  <rect x="95" y="265" rx="14" ry="14" width="70" height="120" fill="#234E6E"></rect>
                  <rect x="120" y="385" rx="12" ry="12" width="260" height="30" fill="#1B3E57"></rect>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24" style={{ background: brand.skyBlue }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp(0)}
          >
            {t.features}
          </motion.h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "✍️", title: t.aiWriting, desc: t.aiWritingDesc },
              { icon: "🎙️", title: t.speakingCoach, desc: t.speakingCoachDesc },
              { icon: "📊", title: t.tracker, desc: t.trackerDesc },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="group rounded-2xl p-6 shadow-lg ring-1 transition-all hover:-translate-y-1"
                style={{
                  background: brand.softBlue,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  borderColor: "rgba(255,255,255,0.12)",
                  color: '#ffffff'
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp(0.05 * i)}
              >
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                  style={{ background: "white", color: brand.deepBlue }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  {f.desc}
                </p>

                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(120deg, ${brand.orange}22, ${brand.lightOrange}22)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-24" style={{ background: brand.deepBlue }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp(0)}
          >
            {t.choosePlan}
          </motion.h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Free */}
            <motion.div
              className="rounded-2xl p-6 shadow-lg ring-1"
              style={{ background: brand.softBlue, borderColor: "rgba(255,255,255,0.2)", color: '#ffffff' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp(0.05)}
            >
              <h3 className="text-xl font-extrabold" style={{ color: brand.deepBlue }}>
                {t.free}
              </h3>
              <p className="mt-1 text-sm text-white/80">{t.freeNote}</p>
              <div className="mt-4 text-3xl font-extrabold">$0</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Daily writing checks</li>
                <li>• Speaking evaluations (limited)</li>
                <li>• Progress overview</li>
              </ul>
              <a
                href="#start"
                className="mt-6 inline-flex rounded-full px-5 py-3 text-sm font-bold"
                style={{ background: brand.lightOrange, color: brand.deepBlue }}
              >
                {t.getStarted}
              </a>
            </motion.div>

            {/* Pro */}
            <motion.div
              className="relative rounded-2xl p-6 shadow-xl ring-2"
              style={{
                background: `linear-gradient(160deg, ${brand.softBlue}, ${brand.skyBlue})`,
                borderColor: brand.lightOrange,
                color: '#ffffff'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp(0.1)}
            >
              <div className="absolute -top-3 right-4 rounded-full px-3 py-1 text-xs font-bold text-[#023047]" style={{ background: brand.lightOrange }}>
                Popular
              </div>
              <h3 className="text-xl font-extrabold" style={{ color: brand.deepBlue }}>
                {t.pro}
              </h3>
              <p className="mt-1 text-sm text-white/80">{t.proNote}</p>
              <div className="mt-4 text-3xl font-extrabold">$12<span className="text-base font-semibold">/mo</span></div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Unlimited writing grading</li>
                <li>• Unlimited speaking coaching</li>
                <li>• Detailed analytics + study plan</li>
                <li>• Priority support</li>
              </ul>
              <a
                href="#start"
                className="mt-6 inline-flex rounded-full px-5 py-3 text-sm font-bold shadow-md"
                style={{ background: brand.orange, color: brand.deepBlue }}
              >
                {t.getStarted}
              </a>

              {/* Payment Icons */}
              <div className="mt-6 flex items-center gap-4 text-xs text-[#0F172A]/70">
                <PaymeIcon />
                <ClickIcon />
                <StripeIcon />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24" style={{ background: brand.skyBlue }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp(0)}
          >
            {t.testimonials}
          </motion.h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[t.quote1, t.quote2, t.quote3].map((q, i) => (
              <motion.figure
                key={q}
                className="rounded-2xl p-6 shadow-lg ring-1"
                style={{ background: brand.softBlue, borderColor: "rgba(255,255,255,0.2)", color: '#ffffff' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp(0.05 * i)}
              >
                <blockquote className="text-sm text-white/90">
                  “{q}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#219EBC] to-[#8ECAE6]" />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Student
                    </div>
                    <div className="text-xs text-white/80">IELTS Learner</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10" style={{ background: brand.deepBlue }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: brand.skyBlue }}
                >
                  <span className="text-white font-extrabold">AI</span>
                </div>
                <span
                  className="text-lg font-extrabold tracking-tight text-white"
                >
                  IELTS.AI Tutor
                </span>
              </div>
              <p className="mt-4 text-sm text-white/80 max-w-sm">
                {t.subtext}
              </p>
              <p className="mt-4 text-sm text-white/90">{t.footerLove}</p>
              <div className="mt-4 flex items-center gap-4">
                <TelegramIcon />
                <InstagramIcon />
                <YouTubeIcon />
              </div>
            </div>

            <div>
              <div className="text-sm font-bold mb-3 text-white">
                {t.contact}
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="hover:opacity-80" href="mailto:hello@ielts.ai">hello@ielts.ai</a>
                </li>
                <li>
                  <a className="hover:opacity-80" href="tel:+998901234567">+998 90 123 45 67</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-bold mb-3 text-white">
                Legal
              </div>
              <ul className="space-y-2 text-sm">
                <li><a className="hover:opacity-80" href="#privacy">{t.privacy}</a></li>
                <li><a className="hover:opacity-80" href="#terms">{t.terms}</a></li>
                <li><a className="hover:opacity-80" href="#contact">{t.footerContact}</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-xs text-white/70">
            © {new Date().getFullYear()} IELTS.AI Tutor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Icons (inline SVG, lightweight) */
function TelegramIcon() {
  return (
    <a
      aria-label="Telegram"
      href="https://t.me/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:opacity-90"
      style={{ background: "#229ED9" }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
        <path d="M9.999 15.2 9.9 18.1c.3 0 .5-.1.7-.3l1.6-1.5 3.3 2.4c.6.3 1 .1 1.2-.6l2.2-10.3c.2-.9-.3-1.3-1.1-1l-13 5c-.9.3-.9.8-.2 1l3.3 1 .7 3.4c.1.4.2.5.5.6z" />
      </svg>
    </a>
  );
}
function InstagramIcon() {
  return (
    <a
      aria-label="Instagram"
      href="https://instagram.com/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:opacity-90 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
      </svg>
    </a>
  );
}
function YouTubeIcon() {
  return (
    <a
      aria-label="YouTube"
      href="https://youtube.com/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:opacity-90"
      style={{ background: "#FF0000" }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
        <path d="M23.5 7.2s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.1-1C17.6 3.5 12 3.5 12 3.5h0s-5.6 0-8.5.4c-.4.1-1.3.1-2.1 1-.7.7-.9 2.3-.9 2.3S0 9.1 0 11v2c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 1.8.9 2.3 1 1.7.2 7 .4 8.6.4h0c0 0 5.6 0 8.5-.4.4-.1 1.3-.1 2.1-1 .7-.7.9-2.3.9-2.3S24 12.9 24 11V9c0-1.9-.5-1.8-.5-1.8zM9.5 9.8l6.3 3.2-6.3 3.2V9.8z" />
      </svg>
    </a>
  );
}

/* Local market trust icons */
function PaymeIcon() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[#0F172A]/70 text-xs"
      style={{ borderColor: "rgba(2,48,71,0.15)" }}
      title="Payme"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#00B3FF]">
        <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 5h3v3h-3v7h-2V10H8V7h3V5h2v2z" />
      </svg>
      Payme
    </div>
  );
}
function ClickIcon() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[#0F172A]/70 text-xs"
      style={{ borderColor: "rgba(2,48,71,0.15)" }}
      title="Click"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#2AC670]">
        <path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm1 14.5-3.5-2L7 16V9l2.5-1.5L13 9v7.5zM17 9v6l-2 .9V9.9L17 9z" />
      </svg>
      Click
    </div>
  );
}
function StripeIcon() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[#0F172A]/70 text-xs"
      style={{ borderColor: "rgba(2,48,71,0.15)" }}
      title="Stripe"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#635BFF]">
        <path d="M12 2C6.5 2 5 4.9 5 7.4c0 4.7 7.1 4 7.1 5.8 0 .7-.6 1-1.5 1-1.3 0-3-.4-4.4-1.1l-.8 3.2c1.6.7 3.1 1.1 5.2 1.2v2.5h3V15c0-4.9-7.1-4.1-7.1-5.9 0-.5.4-.9 1.4-.9 1 .1 2.4.5 3.6 1l.7-3.1C14.2 5.6 13.1 5.2 12 5.1V2z" />
      </svg>
      Stripe
    </div>
  );
}
