import { motion } from 'framer-motion';
import BlobButton from '../ui/BlobButton';
import { useCourseStore } from '../../store/useCourseStore';
import { modeDescriptions, type LearningMode } from '../../content/course-data';
import { X } from 'lucide-react';

export default function ModeSelection() {
  const { setMode, setShowModeSelection } = useCourseStore();

  const handleSelectMode = (mode: LearningMode) => {
    setMode(mode);
  };

  const handleClose = () => {
    setShowModeSelection(false);
  };

  const modes: LearningMode[] = ['curated', 'path', 'story'];

  return (
    <motion.div
      className="fixed inset-0 bg-pastel-cream/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        onClick={handleClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center hover:shadow-lift hover:-translate-y-1 transition-all"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-6 h-6 text-text-secondary" />
      </motion.button>

      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text-primary mb-4">
            Pilih Mode Belajarmu
          </h2>
          <p className="text-xl text-text-secondary">
            Sesuaikan dengan gaya belajarmu
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {modes.map((mode, index) => {
            const modeInfo = modeDescriptions[mode];
            return (
              <motion.div
                key={mode}
                className="bg-white rounded-3xl shadow-soft p-8 hover:shadow-lift hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                onClick={() => handleSelectMode(mode)}
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-5xl mb-4">{modeInfo.icon}</div>
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  {modeInfo.title}
                </h3>
                <p className="text-text-secondary mb-6">
                  {modeInfo.description}
                </p>
                <BlobButton variant="primary" size="md" className="w-full">
                  Pilih Mode Ini
                </BlobButton>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
