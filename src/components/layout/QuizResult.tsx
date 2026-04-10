import { motion, AnimatePresence } from 'framer-motion';
import StarRating from '../ui/StarRating';
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
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-lift max-w-md w-full p-8 md:p-12 text-center"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Icon */}
        <motion.div
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
        >
          {passed ? (
            <div className="w-full h-full bg-pastel-sage rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-accent-sage" />
            </div>
          ) : (
            <div className="w-full h-full bg-pastel-coral rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-accent-coral" />
            </div>
          )}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl font-heading font-extrabold text-text-primary mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {passed ? 'Selamat!' : 'Belum Lulus'}
        </motion.h2>

        {/* Message */}
        <motion.p
          className="text-text-secondary mb-6"
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
          className="mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="text-5xl font-heading font-extrabold text-accent-blue mb-2">
            {score}%
          </div>
          <StarRating score={stars} size="lg" />
        </motion.div>

        {/* Actions */}
        <AnimatePresence>
          {passed ? (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-accent-sage font-semibold mb-4">
                ✨ Level berikutnya terbuka!
              </p>
              <BlobButton
                variant="sage"
                size="lg"
                onClick={onNextLevel}
                className="w-full"
              >
                Lanjut Level Berikutnya →
              </BlobButton>
              <button
                onClick={onBackToLevels}
                className="w-full text-text-muted hover:text-accent-blue font-medium transition-colors"
              >
                Kembali ke Pilihan Level
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {attempts < maxAttempts ? (
                <>
                  <p className="text-text-muted text-sm mb-4">
                    Percobaan {attempts}/{maxAttempts}
                  </p>
                  <BlobButton
                    variant="accent"
                    size="lg"
                    onClick={onRetry}
                    className="w-full"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Coba Lagi
                  </BlobButton>
                </>
              ) : (
                <>
                  <p className="text-text-muted mb-4">
                    Kamu sudah mencoba {maxAttempts}x. Pelajari materi lagi ya!
                  </p>
                  <BlobButton
                    variant="secondary"
                    size="lg"
                    onClick={onBackToLevels}
                    className="w-full"
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
  );
}
