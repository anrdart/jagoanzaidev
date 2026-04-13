import { motion, AnimatePresence } from 'framer-motion';
import { usePathStore } from '../../stores/pathStore';
import { courseData, COURSE_LEVELS, type CourseLevel } from '../../content/course-data';
import LockBadge from '../ui/LockBadge';
import { CheckCircle2, Lock as LockIcon } from 'lucide-react';

export default function LevelSelector() {
  const { unlockedLevels, quizScores, setLevel } = usePathStore();

  const levelInfo: Record<CourseLevel, { emoji: string; color: string }> = {
    basic: { emoji: '⭐', color: 'accent-blue' },
    fundamental: { emoji: '🚀', color: 'accent-sage' },
    jagoan: { emoji: '👑', color: 'accent-coral' },
  };

  return (
    <motion.div
      className="min-h-screen bg-pastel-cream overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Spacer for mobile navbar */}
      <div className="h-16 md:hidden" />
      <div className="min-h-screen py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-text-primary mb-3 md:mb-4">
            Pilih Level Kamu
          </h2>
          <p className="text-base md:text-xl text-text-secondary">
            Selesaikan level untuk unlock berikutnya
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {COURSE_LEVELS.map((level, index) => {
            const isUnlocked = unlockedLevels.includes(level);
            const score = quizScores[level];
            const isCompleted = score !== undefined && score >= 70;
            const info = levelInfo[level];
            const module = courseData[level];

            return (
              <motion.div
                key={level}
                className={`
                  relative bg-white rounded-2xl md:rounded-3xl shadow-soft p-5 md:p-6 lg:p-8
                  ${isUnlocked ? 'hover:shadow-lift hover:-translate-y-1 md:hover:-translate-y-2 cursor-pointer' : ''}
                  transition-all duration-200
                `}
                onClick={() => isUnlocked && setLevel(level)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={isUnlocked ? { scale: 1.02 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
              >
                {/* Lock Overlay */}
                <AnimatePresence>
                  {!isUnlocked && (
                    <LockBadge
                      isLocked={true}
                      reason={`Selesaikan ${COURSE_LEVELS[index - 1]} dulu`}
                    />
                  )}
                </AnimatePresence>

                {/* Content */}
                <div className="text-center">
                  {/* Icon */}
                  <div
                    className={`
                      w-14 h-14 md:w-20 md:h-20 mx-auto rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-4xl mb-3 md:mb-4
                      ${isUnlocked ? 'bg-pastel-sage/30' : 'bg-gray-100'}
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-7 h-7 md:w-10 md:h-10 text-accent-sage" />
                    ) : (
                      info.emoji
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-lg md:text-xl lg:text-2xl font-heading font-bold mb-2 ${
                      isUnlocked ? 'text-text-primary' : 'text-text-muted'
                    }`}
                  >
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                    {module.description}
                  </p>

                  {/* Status */}
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    {isUnlocked ? (
                      isCompleted ? (
                        <span className="text-accent-sage font-semibold text-xs md:text-sm">
                          ✅ Selesai ({score}%)
                        </span>
                      ) : (
                        <span className="text-accent-blue font-semibold text-xs md:text-sm">
                          Mulai →
                        </span>
                      )
                    ) : (
                      <span className="text-text-muted font-semibold text-xs md:text-sm flex items-center gap-1">
                        <LockIcon className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Terkunci</span>
                        <span className="sm:hidden">🔒</span>
                      </span>
                    )}
                  </div>

                  {/* Card Count */}
                  {isUnlocked && (
                    <p className="text-text-muted text-xs mt-3 md:mt-4">
                      {module.cards.length} kartu
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Back Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="/"
            className="text-text-muted hover:text-accent-blue font-medium transition-colors"
          >
            ← Kembali ke Beranda
          </a>
        </motion.div>
      </div>
      </div>
    </motion.div>
  );
}
