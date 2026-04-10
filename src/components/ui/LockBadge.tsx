import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface LockBadgeProps {
  isLocked: boolean;
  reason?: string;
  className?: string;
}

export default function LockBadge({ isLocked, reason, className = '' }: LockBadgeProps) {
  if (!isLocked) {
    return null;
  }

  return (
    <motion.div
      className={`
        absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl
        flex flex-col items-center justify-center gap-3
        ${className}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-pastel-coral rounded-2xl flex items-center justify-center">
          <Lock className="w-8 h-8 text-accent-coral" strokeWidth={2.5} />
        </div>
      </motion.div>
      <p className="text-text-muted font-heading font-semibold">
        {reason || 'Selesaikan level sebelumnya'}
      </p>
    </motion.div>
  );
}
