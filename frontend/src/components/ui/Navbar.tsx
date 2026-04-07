import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    // useTranslation re-renders when language changes — gives us reactive currentLang
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const currentLang = i18n.language?.slice(0, 2) || 'en';
    const switchLanguage = (lng: string) => i18n.changeLanguage(lng);

    return (
        <header className="w-full sticky top-0 z-50 transition-all duration-300"
            style={{
                background: scrolled ? 'rgba(13,27,42,0.97)' : '#0D1B2A',
                backdropFilter: 'blur(12px)',
                borderBottom: scrolled ? '1px solid rgba(14,165,201,0.15)' : '1px solid transparent',
            }}>
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
                <Link to={isAuthenticated ? "/dashboard" : "/"} aria-label="Bilimly.ai home">
                    <Logo />
                </Link>

                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Language selector */}
                    <select
                        className="appearance-none cursor-pointer text-xs font-semibold px-2 sm:px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 hover:border-teal-400/50 hover:text-white transition-all outline-none"
                        value={currentLang}
                        onChange={(e) => switchLanguage(e.target.value)}
                    >
                        <option value="en">🇬🇧 EN</option>
                        <option value="ru">🇷🇺 RU</option>
                        <option value="uz">🇺🇿 UZ</option>
                    </select>

                    {isAuthenticated ? (
                        <button
                            onClick={() => { logout(); navigate("/"); }}
                            className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-lg transition-all hover:scale-105"
                            style={{ background: '#F59E0B', color: '#0D1B2A' }}>
                            {t("signOut")}
                        </button>
                    ) : (
                        <NavLink to="/auth/sign-in"
                            className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-lg transition-all"
                            style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}>
                            {t("signIn")}
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
}