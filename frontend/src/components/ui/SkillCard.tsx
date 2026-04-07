import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Supports BOTH the new prop shape AND the old shape from existing pages
interface SkillCardProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  meta?: string;
  color?: string;
  onClick?: () => void;
  index?: number;

  id?: string;
  titleUz?: string;
  description?: string;
  lessonsCount?: number;
  wordsCount?: number;
  path?: string;
  progress?: number;
  isLocked?: boolean;
}

export default function SkillCard(props: SkillCardProps) {
  const navigate = useNavigate();

  // Normalize both prop shapes into one
  const icon = props.icon ?? '📖';
  const title = props.title ?? '';
  const subtitle = props.subtitle ?? props.titleUz;
  const desc = props.desc ?? props.description ?? '';
  const meta =
    props.meta ??
    (props.lessonsCount != null
        ? `📖 ${props.lessonsCount} lessons`
        : props.wordsCount != null
        ? `📝 ${props.wordsCount} words`
        : undefined);
  const color = props.color ?? '#0EA5C9';
  const index = props.index ?? 0;
  const handleClick = props.onClick ?? (props.path ? () => navigate(props.path!) : undefined);

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={handleClick ? { y: -3 } : {}}
      whileTap={handleClick ? { scale: 0.98 } : {}}
      className="rounded-2xl p-5"
      style={{
        background: 'white',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        cursor: handleClick ? 'pointer' : 'default',
      }}
    >
      {/* Icon circle */}
      <div
        className="text-2xl mb-4 w-12 h-12 flex items-center justify-center rounded-xl"
        style={{ background: `${color}15` }}
      >
        {icon}
      </div>

      <h3 className="font-bold text-base mb-0.5" style={{ color: '#0D1B2A' }}>{title}</h3>

      {subtitle && (
        <p className="text-xs italic mb-1.5" style={{ color }}>
          {subtitle}
        </p>
      )}

      <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{desc}</p>

      {meta && (
        <div className="mt-3 text-xs font-medium" style={{ color: '#94A3B8' }}>{meta}</div>
      )}

      {/* Progress bar for old-style pages that pass progress prop */}
      {props.progress != null && props.progress > 0 && (
        <div className="mt-3 h-1.5 rounded-full" style={{ background: '#E2EDF8' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${props.progress}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          />
        </div>
      )}
    </motion.div>
  );
}