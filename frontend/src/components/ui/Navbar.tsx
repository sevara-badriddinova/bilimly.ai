import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const switchLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="w-full sticky top-0 z-50" style={{ background: "#003f88" }}>
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                <Link to="/" aria-label="Bilimly.ai home">
                    <Logo />
                </Link>

                <div className="flex gap-3 text-white font-medium">
                    <button onClick={() => switchLanguage("uz")}>UZ</button>
                    <button onClick={() => switchLanguage("ru")}>RU</button>
                    <button onClick={() => switchLanguage("en")}>EN</button>
                </div>

                <div className="hidden md:flex items-center gap-6 text-white/90 text-sm font-medium">
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/dashboard">{t("dashboard")}</NavLink>
                            <NavLink to="/chat">{t("chat")}</NavLink>
                            <button
                                onClick={handleLogout}
                                className="ml-4 bg-[#FFB703] text-[#023047] px-3 py-1 rounded-lg font-semibold"
                            >
                                {t("signOut")}
                            </button>
                        </>
                    ) : (
                        <NavLink to="/auth/sign-in">{t("signIn")}</NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
}
