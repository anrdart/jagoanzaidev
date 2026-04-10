import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarRatingProps {
  score: number; // 0-5
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export default function StarRating({
  score,
  maxStars = 5,
  size = 'md',
  className = '',
  animate = true,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const filledStars = Math.round(score);
  const hasHalfStar = score % 1 >= 0.5;

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const isFilled = i < filledStars;
        const isHalf = !isFilled && i === filledStars && hasHalfStar;

        return (
          <motion.div
            key={i}
            initial={animate ? { scale: 0, rotate: -180 } : false}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: animate ? i * 0.1 : 0, type: 'spring' }}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isFilled
                  ? 'fill-yellow-400 text-yellow-400'
                  : isHalf
                  ? 'fill-yellow-400/50 text-yellow-400'
                  : 'fill-gray-200 text-gray-300'
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
