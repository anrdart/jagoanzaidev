import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useCourseStore } from '../../store/useCourseStore';
import { Rocket, Lock, ArrowRight, Mail, Loader2 } from 'lucide-react';

type LoginStep = 'choice' | 'email-form' | 'loading';

export default function LoginChoiceDialog() {
  const { setShowLoginChoice, setShowCourse, login } = useCourseStore();
  const [step, setStep] = useState<LoginStep>('choice');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleNoLogin = () => {
    setShowLoginChoice(false);
    setShowCourse(true);
  };

  const handleLoginClick = () => {
    setStep('email-form');
  };

  const handleBackToChoice = () => {
    setStep('choice');
    setError('');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email tidak valid. Cek lagi ya!');
      return;
    }

    setStep('loading');

    try {
      // TODO: Implement actual API call to Neon backend
      // For now, simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate successful login
      const userId = `user-${Date.now()}`;
      login(userId, email);
      setShowLoginChoice(false);
      setShowCourse(true);
    } catch (err) {
      setError('Gagal login. Coba lagi nanti ya!');
      setStep('email-form');
    }
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
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Choice */}
          {step === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                  onClick={handleLoginClick}
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
          )}

          {/* Step 2: Email Form */}
          {step === 'email-form' && (
            <motion.div
              key="email-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <button
                onClick={handleBackToChoice}
                className="text-text-muted hover:text-accent-sage font-medium mb-6 flex items-center gap-2 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Kembali
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent-sage/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-accent-sage" />
                </div>
                <h2 className="text-2xl font-heading font-extrabold text-text-primary mb-2">
                  Masuk dengan Email
                </h2>
                <p className="text-text-secondary text-sm">
                  Masukin email kamu buat mulai simpan progress
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
                    Nama (opsional)
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama kamu"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-pastel-slate focus:border-accent-sage focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email <span className="text-accent-coral">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@contoh.com"
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-pastel-slate focus:border-accent-sage focus:outline-none transition-colors"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-accent-coral text-sm text-center bg-pastel-coral/20 rounded-xl p-3"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full bg-accent-sage text-white font-heading font-bold py-4 rounded-2xl shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all"
                >
                  Masuk & Mulai Belajar
                </button>
              </form>

              <p className="text-center text-xs text-text-muted mt-6">
                Kami akan mengirimkan magic link ke email kamu (coming soon)
              </p>
            </motion.div>
          )}

          {/* Step 3: Loading */}
          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <Loader2 className="w-16 h-16 text-accent-sage mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-heading font-bold text-text-primary mb-2">
                Sedang memproses...
              </h2>
              <p className="text-text-secondary">
                Bentar ya, lagi nyiapin materi buat kamu!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
