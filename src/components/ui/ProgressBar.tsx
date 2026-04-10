import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: 'blue' | 'sage' | 'coral';
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  current,
  total,
  color = 'sage',
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  const colorClasses = {
    blue: 'bg-accent-blue',
    sage: 'bg-accent-sage',
    coral: 'bg-accent-coral',
  };

  const bgColorClasses = {
    blue: 'bg-pastel-blue',
    sage: 'bg-pastel-sage',
    coral: 'bg-pastel-coral',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-text-muted mb-2">
          <span>Progress</span>
          <span>{current}/{total}</span>
        </div>
      )}
      <div className={`h-3 ${bgColorClasses[color]} rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
