import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '../../store/useCourseStore';
import { courseData, type CourseLevel } from '../../content/course-data';
import LockBadge from '../ui/LockBadge';
import { CheckCircle2, Lock as LockIcon } from 'lucide-react';

export default function LevelSelector() {
  const { currentLevel, unlockedLevels, quizScores, setLevel } = useCourseStore();

  const levels: CourseLevel[] = ['basic', 'fundamental', 'jagoan'];

  const levelInfo: Record<CourseLevel, { emoji: string; color: string }> = {
    basic: { emoji: '⭐', color: 'accent-blue' },
    fundamental: { emoji: '🚀', color: 'accent-sage' },
    jagoan: { emoji: '👑', color: 'accent-coral' },
  };

  return (
    <div className="min-h-screen bg-pastel-cream py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text-primary mb-4">
            Pilih Level Kamu
          </h2>
          <p className="text-xl text-text-secondary">
            Selesaikan level untuk unlock berikutnya
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level, index) => {
            const isUnlocked = unlockedLevels.includes(level);
            const score = quizScores[level];
            const isCompleted = score !== undefined && score >= 70;
            const info = levelInfo[level];
            const module = courseData[level];

            return (
              <motion.div
                key={level}
                className={`
                  relative bg-white rounded-3xl shadow-soft p-8
                  ${isUnlocked ? 'hover:shadow-lift hover:-translate-y-2 cursor-pointer' : ''}
                  transition-all duration-300
                `}
                onClick={() => isUnlocked && setLevel(level)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={isUnlocked ? { scale: 1.02 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
              >
                {/* Lock Overlay */}
                <AnimatePresence>
                  {!isUnlocked && (
                    <LockBadge
                      isLocked={true}
                      reason={`Selesaikan ${levels[index - 1]} dulu`}
                    />
                  )}
                </AnimatePresence>

                {/* Content */}
                <div className="text-center">
                  {/* Icon */}
                  <div
                    className={`
                      w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-4
                      ${isUnlocked ? 'bg-pastel-sage/30' : 'bg-gray-100'}
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-10 h-10 text-accent-sage" />
                    ) : (
                      info.emoji
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-2xl font-heading font-bold mb-2 ${
                      isUnlocked ? 'text-text-primary' : 'text-text-muted'
                    }`}
                  >
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm mb-4">
                    {module.description}
                  </p>

                  {/* Status */}
                  <div className="flex items-center justify-center gap-2">
                    {isUnlocked ? (
                      isCompleted ? (
                        <span className="text-accent-sage font-semibold text-sm">
                          ✅ Selesai ({score}%)
                        </span>
                      ) : (
                        <span className="text-accent-blue font-semibold text-sm">
                          Mulai →
                        </span>
                      )
                    ) : (
                      <span className="text-text-muted font-semibold text-sm flex items-center gap-1">
                        <LockIcon className="w-4 h-4" />
                        Terkunci
                      </span>
                    )}
                  </div>

                  {/* Card Count */}
                  {isUnlocked && (
                    <p className="text-text-muted text-xs mt-4">
                      {module.cards.length} kartu materi
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
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => window.history.back()}
            className="text-text-muted hover:text-accent-blue font-medium transition-colors"
          >
            ← Kembali
          </button>
        </motion.div>
      </div>
    </div>
  );
}
