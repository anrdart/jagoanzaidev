import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BlobButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'sage';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function BlobButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: BlobButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-accent-blue text-white hover:bg-accent-blue/90 border-2 border-transparent',
    secondary: 'bg-white text-accent-blue border-2 border-accent-blue/20 hover:border-accent-blue hover:shadow-soft',
    accent: 'bg-accent-coral text-white hover:bg-accent-coral/90 border-2 border-transparent',
    sage: 'bg-accent-sage text-white hover:bg-accent-sage/90 border-2 border-transparent',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-heading font-bold rounded-3xl shadow-soft
        inline-flex items-center justify-center gap-2
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 600, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}
