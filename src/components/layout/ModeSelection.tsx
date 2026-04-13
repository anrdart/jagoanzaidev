import { motion } from 'framer-motion';
import BlobButton from '../ui/BlobButton';
import { useCourseStore } from '../../store/useCourseStore';
import { modeDescriptions, type LearningMode } from '../../content/course-data';
import { X } from 'lucide-react';

export default function ModeSelection() {
  const { showModeSelection, setMode, setShowModeSelection, isLoggedIn } = useCourseStore();

  if (!showModeSelection) return null;

  const handleSelectMode = (mode: LearningMode) => {
    setMode(mode);
    setShowModeSelection(false);

    const routeMap: Record<LearningMode, string> = {
      path: '/path',
      curated: '/curated',
      story: '/story',
    };

    if (!isLoggedIn) {
      window.dispatchEvent(new CustomEvent('open-login', { detail: { fromCourse: true, targetRoute: routeMap[mode] } }));
    } else {
      window.location.href = routeMap[mode];
    }
  };

  const handleClose = () => {
    setShowModeSelection(false);
  };

  const modes: LearningMode[] = ['curated', 'path', 'story'];

  return (
    <motion.div
      className="fixed inset-0 bg-pastel-cream/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        onClick={handleClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-soft flex items-center justify-center hover:shadow-lift hover:-translate-y-1 transition-all"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-5 h-5 md:w-6 md:h-6 text-text-secondary" />
      </motion.button>

      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-extrabold text-text-primary mb-2 md:mb-4">
            Pilih Mode Belajarmu
          </h2>
          <p className="text-base md:text-xl text-text-secondary">
            Sesuaikan dengan gaya belajarmu
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {modes.map((mode, index) => {
            const modeInfo = modeDescriptions[mode];
            return (
              <motion.div
                key={mode}
                className="bg-white rounded-2xl md:rounded-3xl shadow-soft p-5 md:p-8 hover:shadow-lift hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-200 cursor-pointer"
                onClick={() => handleSelectMode(mode)}
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.08,
                  type: 'spring',
                  stiffness: 400,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl md:text-5xl mb-3 md:mb-4">{modeInfo.icon}</div>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-2">
                  {modeInfo.title}
                </h3>
                <p className="text-text-secondary text-sm md:text-base mb-4 md:mb-6">
                  {modeInfo.description}
                </p>
                <BlobButton variant="primary" size="md" className="w-full text-sm md:text-base">
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
