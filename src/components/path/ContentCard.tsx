import { motion } from 'framer-motion';
import type { CourseCard as CourseCardType } from '../../content/course-data';

interface ContentCardProps {
  card: CourseCardType;
  currentIndex: number;
  totalCards: number;
}

export default function ContentCard({
  card,
  currentIndex,
  totalCards,
}: ContentCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl md:rounded-3xl shadow-lift p-5 md:p-8 lg:p-12"
      initial={{ x: 300, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: -300, opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
    >
      {/* Icon */}
      {card.icon && (
        <div className="w-14 h-14 md:w-20 md:h-20 bg-pastel-blue rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-4xl mb-4 md:mb-6 mx-auto md:mx-0">
          {card.icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-3 md:mb-4">
        {card.title}
      </h3>

      {/* Content */}
      <div className="space-y-3 md:space-y-4 text-text-secondary">
        {card.content.map((paragraph, index) => (
          <p key={index} className="text-base md:text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Source */}
      {card.source && (
        <div className="mt-4 md:mt-6 inline-flex items-center gap-2 bg-pastel-sage px-3 md:px-4 py-1.5 md:py-2 rounded-full">
          <span className="text-xs md:text-sm text-accent-sage font-medium">
            📚 {card.source}
          </span>
        </div>
      )}

      {/* Card Number Badge */}
      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-pastel-slate flex items-center justify-between">
        <span className="text-xs md:text-sm text-text-muted">
          {currentIndex + 1}/{totalCards}
        </span>
        <div className="flex gap-0.5 md:gap-1 flex-wrap justify-end max-w-[60%]">
          {Array.from({ length: Math.min(totalCards, 10) }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                i === currentIndex ? 'bg-accent-sage' : 'bg-pastel-slate'
              }`}
            />
          ))}
          {totalCards > 10 && (
            <span className="text-xs text-text-muted ml-1">+{totalCards - 10}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
