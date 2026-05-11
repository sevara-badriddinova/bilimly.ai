import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Menu, UserCircle, X} from "lucide-react";
import {getUserDisplayName, useAuth} from "../../context/AuthContext";
import {Button} from "./button";
import {changeLanguage} from "@/i18n";

export default function Navbar() {
    const {isAuthenticated, isLoading, user} = useAuth();
    const {t, i18n} = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const currentLang = i18n.language?.slice(0, 2) || "en";
    const switchLanguage = (lng: string) => changeLanguage(lng);
    const navItems = [
        {label: t("howItWorks.badge", "How it works"), href: "/#how-it-works"},
        {label: t("lessons", "Lessons"), href: isAuthenticated ? "/lessons" : "/#learning-path"},
        {label: "Pricing", href: "/pricing"},
    ];

    return (
        <header
            className="sticky top-0 z-50 w-full transition-all duration-300"
            style={{
                background: scrolled ? "rgba(13,27,42,0.94)" : "rgba(13,27,42,0.82)",
                backdropFilter: "blur(14px)",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
                <Link
                    to={isAuthenticated ? "/dashboard" : "/"}
                    aria-label="Bilimly.ai home"
                    className="flex min-w-0 items-center gap-3"
                    onClick={() => setMenuOpen(false)}
                >
                    <div
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/10 shadow-[0_12px_36px_rgba(14,165,201,0.18)]">
                        <img src="/logo2.png" alt="" className="h-8 w-8 object-contain"/>
                    </div>
                    <div className="leading-none">
            <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              Bilimly<span className="text-[#FFB703]">.ai</span>
            </span>
                        <span
                            className="mt-1 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200/60 sm:block">
              AI English coach
            </span>
                    </div>
                </Link>

                <div className="hidden items-center gap-8 lg:flex">
                    {navItems.map((item) => (
                        <a key={item.label} href={item.href}
                           className="text-sm font-semibold text-white/72 transition hover:text-white">
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                    <select
                        aria-label="Select language"
                        className="h-10 cursor-pointer appearance-none rounded-full border border-white/15 bg-white/10 px-3 text-xs font-bold text-white/82 outline-none transition hover:border-sky-300/50 hover:text-white"
                        value={currentLang}
                        onChange={(e) => switchLanguage(e.target.value)}
                    >
                        <option value="en">EN</option>
                        <option value="ru">RU</option>
                        <option value="uz">UZ</option>
                    </select>

                    {isLoading ? (
                        <div className="h-10 w-24 rounded-full bg-white/10" aria-hidden/>
                    ) : isAuthenticated ? (
                        <NavLink
                            to="/app/profile"
                            aria-label={t("nav.profile", "Profile")}
                            title={getUserDisplayName(user)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-sky-300/50 hover:bg-white/15"
                        >
                            <UserCircle className="h-6 w-6"/>
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to="/auth/sign-in"
                                     className="h-10 rounded-full px-4 py-2 text-sm font-bold text-white/78 transition hover:text-white">
                                {t("signIn")}
                            </NavLink>
                            <Button asChild
                                    className="h-10 rounded-full bg-[#0EA5C9] px-5 text-sm font-black text-white shadow-[0_12px_30px_rgba(14,165,201,0.28)] hover:bg-[#0284C7]">
                                <NavLink to="/auth/sign-up">{t("hero.cta", "Start free")}</NavLink>
                            </Button>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white transition hover:bg-white/15 sm:hidden"
                >
                    {menuOpen ? <X size={18}/> : <Menu size={18}/>}
                </button>
            </nav>

            {menuOpen && (
                <div className="border-t border-white/10 px-4 pb-4 sm:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-3">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="rounded-xl px-3 py-3 text-sm font-bold text-white/78 transition hover:bg-white/10 hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="mt-2 flex items-center gap-2">
                            {["en", "ru", "uz"].map((lng) => (
                                <button
                                    key={lng}
                                    type="button"
                                    onClick={() => switchLanguage(lng)}
                                    className={`h-9 flex-1 rounded-full text-xs font-black uppercase transition ${
                                        currentLang === lng ? "bg-white text-[#0D1B2A]" : "bg-white/10 text-white/70"
                                    }`}
                                >
                                    {lng}
                                </button>
                            ))}
                        </div>
                        {isLoading ? (
                            <div className="mt-2 h-11 rounded-full bg-white/10" aria-hidden/>
                        ) : isAuthenticated ? (
                            <div className="mt-2">
                                <NavLink
                                    to="/app/profile"
                                    onClick={() => setMenuOpen(false)}
                                    aria-label={t("nav.profile", "Profile")}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white"
                                >
                                    <UserCircle className="h-6 w-6"/>
                                </NavLink>
                            </div>
                        ) : (
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <NavLink to="/auth/sign-in" onClick={() => setMenuOpen(false)}
                                         className="rounded-full border border-white/14 px-4 py-3 text-center text-sm font-bold text-white">
                                    {t("signIn")}
                                </NavLink>
                                <NavLink to="/auth/sign-up" onClick={() => setMenuOpen(false)}
                                         className="rounded-full bg-[#0EA5C9] px-4 py-3 text-center text-sm font-black text-white">
                                    {t("hero.cta", "Start free")}
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
