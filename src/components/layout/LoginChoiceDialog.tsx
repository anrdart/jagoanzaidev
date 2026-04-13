import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useCourseStore } from '../../store/useCourseStore';
import { authClient, emailOtp, getSession } from '../../lib/auth-client';
import { Rocket, Lock, ArrowRight, Mail, Loader2, X, Eye, EyeOff } from 'lucide-react';

type LoginStep = 'choice' | 'email-form' | 'verify-email' | 'loading';
type AuthMode = 'signin' | 'signup';

export default function LoginChoiceDialog() {
  const { isLoggedIn, login } = useCourseStore();
  const [show, setShow] = useState(false);
  const [isCourseFlow, setIsCourseFlow] = useState(false);
  const [targetRoute, setTargetRoute] = useState('');
  const [step, setStep] = useState<LoginStep>('choice');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState('');

  const navigateToTarget = useCallback(() => {
    if (targetRoute) {
      window.location.href = targetRoute;
    }
  }, [targetRoute]);

  const close = useCallback(() => {
    setShow(false);
    setStep('choice');
    setAuthMode('signin');
    setError('');
    setEmail('');
    setName('');
    setPassword('');
    setOtp('');
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      if (isLoggedIn) return;
      if (show) return;
      const ce = e as CustomEvent;
      setIsCourseFlow(!!ce.detail?.fromCourse);
      setTargetRoute(ce.detail?.targetRoute || '');
      setShow(true);
    };
    window.addEventListener('open-login', handler);
    return () => window.removeEventListener('open-login', handler);
  }, [isLoggedIn, show]);

  useEffect(() => {
    if (isLoggedIn) return;
    if (show) return;
    if (sessionStorage.getItem('login-dismissed')) return;
    const timer = setTimeout(() => {
      setIsCourseFlow(false);
      setShow(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [isLoggedIn, show]);

  const dismiss = () => {
    sessionStorage.setItem('login-dismissed', 'true');
    close();
    if (isCourseFlow) navigateToTarget();
  };

  const handleLoginClick = () => {
    setAuthMode('signin');
    setStep('email-form');
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setStep('email-form');
  };

  const handleBackToChoice = () => {
    setStep('choice');
    setAuthMode('signin');
    setError('');
  };

  const navigateAfterLogin = () => {
    sessionStorage.setItem('login-dismissed', 'true');
    close();
    if (isCourseFlow) navigateToTarget();
  };

  const sendOtp = async () => {
    try {
      await emailOtp.sendVerificationOtp({
        email,
        type: 'email-verification',
      });
    } catch {}
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleEmailSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email tidak valid. Cek lagi ya!');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setStep('loading');
    setError('');

    try {
      if (authMode === 'signup') {
        await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split('@')[0],
        });

        await sendOtp();
        setStep('verify-email');
        startResendCooldown();
      } else {
        await authClient.signIn.email({
          email,
          password,
        });

        const result = await getSession();
        const user = result.data?.user;
        if (user) {
          login(user.id, user.email);
        }
        navigateAfterLogin();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal. Coba lagi nanti ya!';

      if (
        message.toLowerCase().includes('email not verified') ||
        message.toLowerCase().includes('verify your email') ||
        message.toLowerCase().includes('email verification') ||
        message.toLowerCase().includes('user already') ||
        message.toLowerCase().includes('already registered')
      ) {
        setError('');
        try {
          await sendOtp();
          startResendCooldown();
        } catch {}
        setStep('verify-email');
      } else {
        setError(message);
        setStep('email-form');
      }
    }
  };

  const handleVerifyOtp = async (e: { preventDefault(): void }) => {
    e.preventDefault();

    if (otp.length < 6) {
      setError('Masukkan 6 digit kode verifikasi.');
      return;
    }

    setStep('loading');
    setError('');

    try {
      await emailOtp.verifyEmail({
        email,
        otp,
      });

      const result = await getSession();
      const user = result.data?.user;
      if (user) {
        login(user.id, user.email);
      }
      navigateAfterLogin();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Kode verifikasi salah. Coba lagi!';
      setError(message);
      setStep('verify-email');
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError('');
    try {
      await sendOtp();
      startResendCooldown();
    } catch {
      setError('Gagal mengirim ulang kode. Coba lagi nanti.');
    }
  };

  const handleGoogleLogin = async () => {
    setStep('loading');
    setError('');

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: window.location.origin,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal login dengan Google.';
      setError(message);
      setStep('choice');
    }
  };

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-lift max-w-lg w-full p-8 md:p-12 relative"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {!isCourseFlow && (
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pastel-slate flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-pastel-slate/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
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
                <motion.div
                  className="bg-pastel-cream rounded-2xl p-6 cursor-pointer hover:shadow-soft transition-all"
                  onClick={dismiss}
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
                        Sudah punya akun? Masuk di sini
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-accent-sage" />
                  </div>
                </motion.div>

                <motion.div
                  className="bg-pastel-blue rounded-2xl p-6 cursor-pointer hover:shadow-soft transition-all"
                  onClick={handleSignUpClick}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-accent-blue" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
                        Daftar Akun Baru
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Belum punya akun? Daftar gratis
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-accent-blue" />
                  </div>
                </motion.div>

                <div className="pt-2">
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-pastel-slate hover:border-accent-sage/30 rounded-2xl py-4 font-medium text-text-primary transition-all hover:shadow-soft"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Masuk dengan Google
                  </button>
                </div>
              </div>

              <p className="text-center text-sm text-text-muted mt-6">
                Kamu bisa login nanti kalau mau simpan ke cloud
              </p>
            </motion.div>
          )}

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
                  {authMode === 'signin' ? 'Masuk dengan Email' : 'Daftar Akun Baru'}
                </h2>
                <p className="text-text-secondary text-sm">
                  {authMode === 'signin'
                    ? 'Masuk untuk menyimpan progress belajarmu'
                    : 'Buat akun gratis untuk mulai belajar'}
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama panggilan kamu"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-pastel-slate focus:border-accent-sage focus:outline-none transition-colors"
                    />
                  </div>
                )}

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

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                    Password <span className="text-accent-coral">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      required
                      minLength={6}
                      className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-pastel-slate focus:border-accent-sage focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
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
                  {authMode === 'signin' ? 'Masuk' : 'Daftar'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-pastel-slate" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-text-muted">atau</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-pastel-slate hover:border-accent-sage/30 rounded-2xl py-4 font-medium text-text-primary transition-all hover:shadow-soft"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {authMode === 'signin' ? 'Masuk' : 'Daftar'} dengan Google
              </button>

              <p className="text-center text-sm text-text-muted mt-6">
                {authMode === 'signin' ? (
                  <>Belum punya akun? <button type="button" onClick={() => { setAuthMode('signup'); setError(''); }} className="text-accent-sage font-semibold hover:underline">Daftar di sini</button></>
                ) : (
                  <>Sudah punya akun? <button type="button" onClick={() => { setAuthMode('signin'); setError(''); }} className="text-accent-sage font-semibold hover:underline">Masuk di sini</button></>
                )}
              </p>
            </motion.div>
          )}

          {step === 'verify-email' && (
            <motion.div
              key="verify-email"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-accent-blue" />
                </div>
                <h2 className="text-2xl font-heading font-extrabold text-text-primary mb-2">
                  Verifikasi Email
                </h2>
                <p className="text-text-secondary text-sm">
                  Kami sudah kirim kode 6 digit ke
                </p>
                <p className="text-text-primary font-semibold text-sm mt-1">{email}</p>
                <p className="text-text-muted text-xs mt-2">
                  {authMode === 'signup'
                    ? 'Masukkan kode untuk menyelesaikan pendaftaran akun'
                    : 'Email sudah terdaftar, verifikasi untuk melanjutkan'}
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-text-primary mb-2">
                    Kode Verifikasi <span className="text-accent-coral">*</span>
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Masukkan 6 digit kode"
                    required
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-pastel-slate focus:border-accent-blue focus:outline-none transition-colors text-center text-2xl tracking-[0.5em] font-mono"
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
                  Verifikasi
                </button>
              </form>

              <div className="text-center mt-6">
                {resendCooldown > 0 ? (
                  <p className="text-sm text-text-muted">
                    Kirim ulang kode dalam {resendCooldown} detik
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="text-sm text-accent-sage font-semibold hover:underline"
                  >
                    Kirim ulang kode verifikasi
                  </button>
                )}
              </div>

              <button
                onClick={() => { setStep('email-form'); setError(''); }}
                className="w-full text-center text-sm text-text-muted hover:text-text-secondary mt-4 transition-colors"
              >
                Ganti alamat email
              </button>
            </motion.div>
          )}

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
