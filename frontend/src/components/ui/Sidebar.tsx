import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import i18n from "../../i18n";

const NAV = [
  { to: "/dashboard", icon: "⊞", label: "Dashboard" },
  { to: "/grammar", icon: "✍️", label: "Grammar" },
  { to: "/vocabulary", icon: "📚", label: "Vocabulary" },
  { to: "/speaking", icon: "🗣️", label: "Speaking" },
  { to: "/listening", icon: "🎧", label: "Listening" },
  { to: "/chat", icon: "💬", label: "AI Chat" },
];

const LANGS = [
  { code: 'en', flag: '🇬🇧', short: 'EN' },
  { code: 'ru', flag: '🇷🇺', short: 'RU' },
  { code: 'uz', flag: '🇺🇿', short: 'UZ' },
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  // useTranslation() subscribes to language changes — re-renders when lang switches
  const { i18n: i18nInstance } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLang = i18nInstance.language?.slice(0, 2) || 'en';
  const switchLang = (code: string) => i18nInstance.changeLanguage(code);
  const name = user?.name || user?.email?.split('@')[0] || 'Student';

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-3 mb-8 flex items-center justify-between">
        <Logo />
        <button className="md:hidden text-white/50 hover:text-white text-lg"
          onClick={() => setMobileOpen(false)}>✕</button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {NAV.map(({ to, icon, label }) => (
          <NavLink key={to} to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`
            }
            style={({ isActive }) => isActive ? { background: 'rgba(14,165,201,0.15)', color: '#38BDF8' } : {}}>
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="mt-4 space-y-1 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Language switcher */}
        <div className="px-3 py-2">
          <p className="text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Language
          </p>
          <div className="flex gap-1">
            {LANGS.map(({ code, flag, short }) => (
              <button key={code} onClick={() => switchLang(code)}
                className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: currentLang === code ? 'rgba(14,165,201,0.25)' : 'rgba(255,255,255,0.05)',
                  color: currentLang === code ? '#38BDF8' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${currentLang === code ? 'rgba(14,165,201,0.3)' : 'transparent'}`,
                }}>
                {flag} {short}
              </button>
            ))}
          </div>
        </div>

        {/* User — no link, just display */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0"
            style={{ background: 'linear-gradient(135deg, #0EA5C9, #8B5CF6)', color: 'white' }}>
            {name[0].toUpperCase()}
          </div>
          <span className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>{name}</span>
        </div>

        {/* Sign out */}
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
          <span>↩</span> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: '#0D1B2A', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={() => setMobileOpen(true)}>
        <span className="text-white text-sm">☰</span>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col w-64 py-6 px-3 z-50"
            style={{ background: '#0D1B2A', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 py-6 px-3"
        style={{ background: '#0D1B2A', borderRight: '1px solid rgba(255,255,255,0.06)', minHeight: '100%' }}>
        <SidebarContent />
      </aside>
    </>
  );
}