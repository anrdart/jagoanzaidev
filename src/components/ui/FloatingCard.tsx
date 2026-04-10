import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export default function FloatingCard({
  children,
  className = '',
  delay = 0,
  onClick,
}: FloatingCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`
        bg-white rounded-3xl shadow-soft p-8
        hover:shadow-lift hover:-translate-y-2
        transition-all duration-200 cursor-pointer
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}
