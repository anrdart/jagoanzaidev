import { motion } from 'framer-motion';
import { useCourseStore } from '../../store/useCourseStore';
import { Rocket, Lock, ArrowRight } from 'lucide-react';

export default function LoginChoiceDialog() {
  const { setShowLoginChoice, login } = useCourseStore();

  const handleNoLogin = () => {
    setShowLoginChoice(false);
  };

  const handleLogin = () => {
    // TODO: Implement actual login with Neon
    // For now, simulate login
    login('user-123', 'user@example.com');
    setShowLoginChoice(false);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-lift max-w-lg w-full p-8 md:p-12"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-extrabold text-text-primary mb-3">
            Simpan Progress Belajar?
          </h2>
          <p className="text-text-secondary">
            Pilih cara kamu ingin menyimpan progress belajar
          </p>
        </div>

        <div className="space-y-4">
          {/* No Login Option */}
          <motion.div
            className="bg-pastel-cream rounded-2xl p-6 cursor-pointer hover:shadow-soft transition-all"
            onClick={handleNoLogin}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Rocket className="w-7 h-7 text-accent-blue" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
                  Tanpa Login
                </h3>
                <p className="text-sm text-text-secondary">
                  Belajar langsung, progress tersimpan di browser
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-muted" />
            </div>
          </motion.div>

          {/* Login Option */}
          <motion.div
            className="bg-pastel-sage rounded-2xl p-6 cursor-pointer hover:shadow-soft transition-all"
            onClick={handleLogin}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent-sage/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-7 h-7 text-accent-sage" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
                  Login dengan Email
                </h3>
                <p className="text-sm text-text-secondary">
                  Simpan ke cloud, akses dari device manapun
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-accent-sage" />
            </div>
          </motion.div>
        </div>

        <p className="text-center text-sm text-text-muted mt-6">
          Kamu bisa login nanti kalau mau simpan ke cloud
        </p>
      </motion.div>
    </motion.div>
  );
}
