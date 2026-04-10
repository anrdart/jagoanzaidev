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
      className="bg-white rounded-3xl shadow-lift p-8 md:p-12"
      initial={{ x: 300, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: -300, opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
    >
      {/* Icon */}
      {card.icon && (
        <div className="w-20 h-20 bg-pastel-blue rounded-3xl flex items-center justify-center text-4xl mb-6 mx-auto md:mx-0">
          {card.icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
        {card.title}
      </h3>

      {/* Content */}
      <div className="space-y-4 text-text-secondary">
        {card.content.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Source */}
      {card.source && (
        <div className="mt-6 inline-flex items-center gap-2 bg-pastel-sage px-4 py-2 rounded-full">
          <span className="text-sm text-accent-sage font-medium">
            📚 Sumber: {card.source}
          </span>
        </div>
      )}

      {/* Card Number Badge */}
      <div className="mt-8 pt-6 border-t border-pastel-slate flex items-center justify-between">
        <span className="text-sm text-text-muted">
          Kartu {currentIndex + 1} dari {totalCards}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex ? 'bg-accent-sage' : 'bg-pastel-slate'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
