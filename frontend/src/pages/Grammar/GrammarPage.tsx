import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SkillCard from '../../components/ui/SkillCard';

const UNITS = [
  {
    id: 'present-simple',
    icon: '📅',
    title: 'Present Simple Tense',
    subtitle: 'Hozirgi oddiy zamon',
    desc: 'Learn to talk about habits, facts, and regular actions',
    lessons: 3,
    color: '#0EA5C9',
  },
  {
    id: 'past-simple',
    icon: '⏮️',
    title: 'Past Simple Tense',
    subtitle: "O'tgan oddiy zamon",
    desc: 'Talk about completed actions in the past',
    lessons: 3,
    color: '#8B5CF6',
  },
  {
    id: 'present-continuous',
    icon: '▶️',
    title: 'Present Continuous',
    subtitle: 'Hozirgi davomli zamon',
    desc: 'Talk about actions happening right now',
    lessons: 3,
    color: '#10B981',
  },
  {
    id: 'future-tenses',
    icon: '🔮',
    title: 'Future Tenses',
    subtitle: 'Kelasi zamon',
    desc: 'Talk about future plans and predictions',
    lessons: 2,
    color: '#F59E0B',
  },
  {
    id: 'modal-verbs',
    icon: '🎭',
    title: 'Modal Verbs',
    subtitle: "Modal fe'llar",
    desc: 'Express ability, permission, and obligation',
    lessons: 3,
    color: '#EC4899',
  },
];

export default function GrammarPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#0EA5C9' }}>
          <span>✍️</span> Grammar
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold" style={{ color: '#0D1B2A' }}>
          Grammar Lessons
        </h1>
        <p className="text-sm mt-1" style={{ color: '#4A6280' }}>
          Master English grammar step by step
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="rounded-2xl p-5 mb-8"
        style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: '#0D1B2A' }}>Overall Progress</span>
          <span className="text-xs font-bold" style={{ color: '#0EA5C9' }}>0 / {UNITS.length} units</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: '#E2EDF8' }}>
          <div className="h-full rounded-full w-0" style={{ background: 'linear-gradient(90deg, #0EA5C9, #38BDF8)' }} />
        </div>
      </motion.div>

      {/* Units grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {UNITS.map((unit, i) => (
          <SkillCard
            key={unit.id}
            icon={unit.icon}
            title={unit.title}
            subtitle={unit.subtitle}
            desc={unit.desc}
            meta={`📖 ${unit.lessons} lessons`}
            color={unit.color}
            index={i}
            onClick={() => navigate(`/grammar/${unit.id}`)}
          />
        ))}
      </div>

      {/* Tip banner */}
      <motion.div
        className="mt-8 rounded-2xl p-5 flex items-start gap-4"
        style={{ background: '#0D1B2A' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="text-2xl mt-0.5">💡</span>
        <div>
          <h4 className="font-bold text-white text-sm mb-1">Grammar Tip</h4>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Start with Present Simple — it's the foundation of English grammar. Practice 10 minutes a day for best results.
          </p>
        </div>
      </motion.div>
    </div>
  );
}