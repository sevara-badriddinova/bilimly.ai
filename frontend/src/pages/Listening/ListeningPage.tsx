import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SkillCard from '../../components/ui/SkillCard';
import { listeningLessons } from '../../data/listeningLessons';

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: '#10B981',
  intermediate: '#F59E0B',
  advanced: '#EC4899',
};

export default function ListeningPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">

      <motion.div className="mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#F59E0B' }}>
          <span>🎧</span> Listening
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold" style={{ color: '#0D1B2A' }}>Listening Practice</h1>
        <p className="text-sm mt-1" style={{ color: '#4A6280' }}>Train your ear for real English conversations</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listeningLessons.map((lesson, i) => (
          <SkillCard
            key={lesson.id}
            icon={lesson.icon || '🎵'}
            title={lesson.title}
            subtitle={lesson.titleUz}
            desc={lesson.description}
            meta={`🎧 ${lesson.exercises?.length ?? 0} exercises · ${lesson.estimatedTime} min`}
            color={DIFFICULTY_COLOR[lesson.difficulty] ?? '#F59E0B'}
            index={i}
            onClick={() => navigate(`/listening/${lesson.id}`)}
          />
        ))}
      </div>

      <motion.div
        className="mt-8 rounded-2xl p-6"
        style={{ background: '#0D1B2A' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="font-bold text-white text-sm mb-3">💡 Listening Tips</h3>
        <ul className="space-y-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <li>• Listen to each audio multiple times before answering</li>
          <li>• Focus on key words and context clues</li>
          <li>• Don't worry if you don't understand everything at first</li>
          <li>• Check transcripts after answering to learn new phrases</li>
        </ul>
      </motion.div>
    </div>
  );
}