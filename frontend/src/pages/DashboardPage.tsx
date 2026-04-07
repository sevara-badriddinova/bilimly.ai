import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';

const MODULES = [
  { to: '/grammar', icon: '✍️', label: 'Grammar', desc: '150+ interactive exercises', color: '#0EA5C9', bg: 'rgba(14,165,201,0.08)', border: 'rgba(14,165,201,0.2)' },
  { to: '/vocabulary', icon: '📚', label: 'Vocabulary', desc: '250+ essential words', color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
  { to: '/speaking', icon: '🗣️', label: 'Speaking', desc: 'Guided pronunciation exercises', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
  { to: '/listening', icon: '🎧', label: 'Listening', desc: 'Comprehension audio exercises', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  { to: '/chat', icon: '💬', label: 'AI Tutor Chat', desc: 'Practice with your AI tutor', color: '#EC4899', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.2)' },
  { to: null, icon: '📊', label: 'Progress', desc: 'Track your journey', color: '#94A3B8', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.15)', disabled: true },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const name = user?.email?.split('@')[0] || 'Student';
  const { lessonsCompleted, wordsLearned, xpEarned, currentStreak } = useProgress();

  const STATS = [
    { value: String(lessonsCompleted), label: 'Lessons Done', icon: '📖' },
    { value: String(wordsLearned), label: 'Words Learned', icon: '🧠' },
    { value: String(currentStreak), label: 'Day Streak', icon: '🔥' },
    { value: String(xpEarned), label: 'XP Earned', icon: '⚡' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <motion.div className="mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl lg:text-3xl font-extrabold" style={{ color: '#0D1B2A' }}>
          Welcome back, <span style={{ color: '#0EA5C9' }}>{name}</span> 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: '#4A6280' }}>Ready to improve your English today?</p>
      </motion.div>

      {/* Live stats */}
      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
        {STATS.map(({ value, label, icon }) => (
          <div key={label} className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <span className="text-2xl">{icon}</span>
            <div>
              <div className="text-xl font-extrabold" style={{ color: '#0D1B2A' }}>{value}</div>
              <div className="text-xs" style={{ color: '#94A3B8' }}>{label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Modules */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#94A3B8' }}>Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod) => (
            <motion.div key={mod.label}
              onClick={() => !mod.disabled && mod.to && navigate(mod.to)}
              whileHover={!mod.disabled ? { y: -3 } : {}}
              whileTap={!mod.disabled ? { scale: 0.98 } : {}}
              className="rounded-2xl p-5 transition-shadow"
              style={{ background: 'white', border: `1px solid ${mod.border}`, cursor: mod.disabled ? 'default' : 'pointer', opacity: mod.disabled ? 0.5 : 1, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: mod.bg }}>{mod.icon}</div>
              <h3 className="font-bold text-base mb-1" style={{ color: '#0D1B2A' }}>{mod.label}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{mod.desc}</p>
              {mod.disabled && <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(148,163,184,0.15)', color: '#94A3B8' }}>Coming soon</span>}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Continue banner */}
      <motion.div className="mt-8 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: '#0D1B2A' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#38BDF8' }}>Continue where you left off</div>
          <h3 className="text-white font-bold text-lg">Present Simple Tense</h3>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Grammar · Lesson 1 of 3</p>
        </div>
        <button onClick={() => navigate('/grammar/present-simple')}
          className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #0EA5C9, #0284C7)', color: 'white' }}>
          Continue →
        </button>
      </motion.div>
    </div>
  );
}