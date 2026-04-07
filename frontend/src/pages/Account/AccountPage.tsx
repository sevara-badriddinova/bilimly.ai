import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../hooks/useProgress';
import i18n from '../../i18n';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
  { code: 'uz', flag: '🇺🇿', label: "O'zbek" },
];

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 800, 1200];
function getLevel(xp: number) {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  return Math.min(level, LEVEL_THRESHOLDS.length);
}
function getLevelProgress(xp: number) {
  const level = getLevel(xp);
  const current = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const next = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[level - 1];
  return Math.round(((xp - current) / (next - current)) * 100);
}

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { lessonsCompleted, wordsLearned, xpEarned, currentStreak, longestStreak, resetProgress } = useProgress();
  const [showReset, setShowReset] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language?.slice(0, 2) || 'en');

  const name = user?.name || user?.email?.split('@')[0] || 'Student';
  const email = user?.email || '';
  const level = getLevel(xpEarned);
  const levelPct = getLevelProgress(xpEarned);
  const joined = 'April 2025'; // placeholder — would come from user.createdAt

  const switchLang = (code: string) => {
    i18n.changeLanguage(code);
    setCurrentLang(code);
  };

  const handleReset = () => {
    resetProgress();
    setShowReset(false);
  };

  const STATS = [
    { icon: '📖', value: String(lessonsCompleted), label: 'Lessons Done' },
    { icon: '🧠', value: String(wordsLearned), label: 'Words Learned' },
    { icon: '🔥', value: String(currentStreak), label: 'Current Streak' },
    { icon: '🏆', value: String(longestStreak), label: 'Best Streak' },
    { icon: '⚡', value: String(xpEarned), label: 'Total XP' },
    { icon: '🎯', value: `Level ${level}`, label: 'Current Level' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="text-xs font-semibold hover:opacity-70 transition-opacity" style={{ color: '#0EA5C9' }}>
            ← Back
          </button>
          <h1 className="text-xl font-extrabold" style={{ color: '#0D1B2A' }}>My Account</h1>
        </div>

        {/* Profile card */}
        <div className="rounded-2xl p-6 mb-4" style={{ background: '#0D1B2A' }}>
          <div className="flex items-center gap-4 mb-5">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0"
              style={{ background: 'linear-gradient(135deg, #0EA5C9, #8B5CF6)', color: 'white' }}>
              {name[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="font-extrabold text-lg text-white truncate">{name}</h2>
              <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>{email}</p>
              <span className="inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-semibold"
                style={{ background: 'rgba(14,165,201,0.2)', color: '#38BDF8' }}>
                {user?.role === 'ADMIN' ? '⭐ Admin' : '🎓 Student'}
              </span>
            </div>
          </div>

          {/* Level progress */}
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">Level {level}</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{xpEarned} XP</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0EA5C9, #8B5CF6)' }}
                initial={{ width: 0 }}
                animate={{ width: `${levelPct}%` }}
                transition={{ duration: 1, delay: 0.3 }} />
            </div>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {levelPct}% to Level {level + 1}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {STATS.map(({ icon, value, label }) => (
            <div key={label} className="rounded-2xl p-3 sm:p-4 text-center"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)' }}>
              <div className="text-xl mb-1">{icon}</div>
              <div className="text-base sm:text-lg font-extrabold" style={{ color: '#0D1B2A' }}>{value}</div>
              <div className="text-xs leading-tight mt-0.5" style={{ color: '#94A3B8' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Language */}
        <div className="rounded-2xl p-5 mb-4" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)' }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: '#0D1B2A' }}>App Language</h3>
          <div className="flex gap-2 flex-wrap">
            {LANGUAGES.map(({ code, flag, label }) => (
              <button key={code} onClick={() => switchLang(code)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: currentLang === code ? '#0D1B2A' : 'rgba(0,0,0,0.04)',
                  color: currentLang === code ? 'white' : '#374151',
                  border: `1px solid ${currentLang === code ? '#0D1B2A' : 'rgba(0,0,0,0.08)'}`,
                }}>
                {flag} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Account info */}
        <div className="rounded-2xl p-5 mb-4" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)' }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: '#0D1B2A' }}>Account Info</h3>
          <div className="space-y-3">
            {[
              { label: 'Email', value: email },
              { label: 'Member since', value: joined },
              { label: 'Account type', value: user?.role === 'ADMIN' ? 'Administrator' : 'Student' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2"
                style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>{label}</span>
                <span className="text-sm font-semibold truncate ml-4" style={{ color: '#0D1B2A' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-2xl p-5 mb-4" style={{ background: 'white', border: '1px solid rgba(239,68,68,0.15)' }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: '#DC2626' }}>Danger Zone</h3>
          {!showReset ? (
            <button onClick={() => setShowReset(true)}
              className="text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.2)' }}>
              Reset Progress
            </button>
          ) : (
            <div className="rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p className="text-sm mb-3" style={{ color: '#DC2626' }}>
                This will reset all your XP, streaks, and lesson progress. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setShowReset(false)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: 'rgba(0,0,0,0.05)', color: '#374151' }}>
                  Cancel
                </button>
                <button onClick={handleReset}
                  className="flex-1 py-2 rounded-xl text-sm font-bold"
                  style={{ background: '#DC2626', color: 'white' }}>
                  Yes, Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sign out */}
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="w-full py-3 rounded-2xl text-sm font-bold transition-all hover:scale-[1.01]"
          style={{ background: '#0D1B2A', color: 'white' }}>
          Sign Out
        </button>
      </motion.div>
    </div>
  );
}