import { motion, AnimatePresence } from 'framer-motion';
import StarRating from '../ui/StarRating';
import Confetti from '../ui/Confetti';
import { Trophy, XCircle, RotateCcw } from 'lucide-react';
import BlobButton from '../ui/BlobButton';

interface QuizResultProps {
  score: number;
  passingScore: number;
  level: string;
  onRetry: () => void;
  onNextLevel: () => void;
  onBackToLevels: () => void;
  attempts: number;
  maxAttempts: number;
}

export default function QuizResult({
  score,
  passingScore,
  level,
  onRetry,
  onNextLevel,
  onBackToLevels,
  attempts,
  maxAttempts,
}: QuizResultProps) {
  const passed = score >= passingScore;
  const stars = (score / 100) * 5;

  return (
    <>
      <Confetti active={passed} />
      <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl md:rounded-3xl shadow-lift max-w-md w-full p-6 md:p-8 lg:p-12 text-center"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Icon */}
        <motion.div
          className="w-16 h-16 md:w-24 md:h-24 mx-auto rounded-full flex items-center justify-center mb-4 md:mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
        >
          {passed ? (
            <div className="w-full h-full bg-pastel-sage rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 md:w-12 md:h-12 text-accent-sage" />
            </div>
          ) : (
            <div className="w-full h-full bg-pastel-coral rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 md:w-12 md:h-12 text-accent-coral" />
            </div>
          )}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-2xl md:text-3xl font-heading font-extrabold text-text-primary mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {passed ? 'Selamat!' : 'Belum Lulus'}
        </motion.h2>

        {/* Message */}
        <motion.p
          className="text-text-secondary text-sm md:text-base mb-4 md:mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {passed
            ? `Kamu lulus Level ${level}!`
            : `Butuh ${passingScore}% untuk lulus`}
        </motion.p>

        {/* Score */}
        <motion.div
          className="mb-4 md:mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="text-4xl md:text-5xl font-heading font-extrabold text-accent-blue mb-2">
            {score}%
          </div>
          <StarRating score={stars} size="md" />
        </motion.div>

        {/* Actions */}
        <AnimatePresence>
          {passed ? (
            <motion.div
              className="space-y-2 md:space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-accent-sage font-semibold mb-2 md:mb-4 text-sm md:text-base">
                ✨ Level berikutnya terbuka!
              </p>
              <BlobButton
                variant="sage"
                size="md"
                onClick={onNextLevel}
                className="w-full text-sm md:text-base"
              >
                <span className="hidden sm:inline">Lanjut Level Berikutnya</span>
                <span className="sm:hidden">Lanjut Level</span> →
              </BlobButton>
              <button
                onClick={onBackToLevels}
                className="w-full text-text-muted hover:text-accent-blue font-medium transition-colors text-sm md:text-base"
              >
                Kembali ke Pilihan Level
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-2 md:space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {attempts < maxAttempts ? (
                <>
                  <p className="text-text-muted text-xs md:text-sm mb-2 md:mb-4">
                    Percobaan {attempts}/{maxAttempts}
                  </p>
                  <BlobButton
                    variant="accent"
                    size="md"
                    onClick={onRetry}
                    className="w-full text-sm md:text-base"
                  >
                    <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                    Coba Lagi
                  </BlobButton>
                </>
              ) : (
                <>
                  <p className="text-text-muted text-xs md:text-sm mb-2 md:mb-4">
                    Kamu sudah mencoba {maxAttempts}x. Pelajari materi lagi ya!
                  </p>
                  <BlobButton
                    variant="secondary"
                    size="md"
                    onClick={onBackToLevels}
                    className="w-full text-sm md:text-base"
                  >
                    Kembali ke Materi
                  </BlobButton>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
    </>
  );
}
