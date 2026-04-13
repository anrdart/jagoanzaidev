import { Rocket, Sparkles, LogIn, User } from 'lucide-react';
import { useCourseStore } from '../store/useCourseStore';

export default function Hero() {
  const { setShowModeSelection, isLoggedIn, userEmail } = useCourseStore();

  const handleStartLearning = () => {
    setShowModeSelection(true);
  };

  const openLogin = () => {
    sessionStorage.removeItem('login-dismissed');
    window.dispatchEvent(new CustomEvent('open-login'));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-pastel-slate relative overflow-hidden">
      <div className="fixed top-4 right-4 z-20">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
            <User className="w-4 h-4 text-accent-sage" />
            <span className="text-sm font-medium text-text-primary truncate max-w-[140px]">{userEmail}</span>
          </div>
        ) : (
          <button
            onClick={openLogin}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all text-text-secondary hover:text-accent-blue"
          >
            <LogIn className="w-4 h-4" />
            <span className="text-sm font-medium">Masuk</span>
          </button>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pastel-mint rounded-full opacity-60 blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pastel-coral rounded-full opacity-50 blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-pastel-blue rounded-full opacity-40 blur-xl animate-float"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-soft">
            <Sparkles className="w-5 h-5 text-accent-coral" />
            <span className="text-text-secondary font-medium">Belajar server dari nol, tanpa ribet!</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary leading-tight mb-6">
            Selamat Datang di{' '}
            <span className="relative inline-block">
              <span className="text-accent-blue">
                Jagoan Zaidev
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="#d4765c" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-10 max-w-3xl mx-auto">
            Tempat paling asik dan gampang dipahami buat kamu yang mau belajar server dari{' '}
            <span className="font-bold text-accent-coral">N-O-L</span>. Nggak perlu jago IT buat mulai!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStartLearning}
              className="btn-primary flex items-center gap-3 text-lg"
            >
              <Rocket className="w-5 h-5" />
              Mulai Belajar Sekarang
            </button>
            <a href="#pengenalan" className="text-text-muted hover:text-accent-blue font-medium transition-colors duration-200">
              Pelajari dulu ah ↓
            </a>
          </div>

          {/* Floating illustration elements */}
          <div className="mt-16 flex justify-center gap-8 flex-wrap">
            <div className="bg-white rounded-2xl px-6 py-4 shadow-soft flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
              <div className="w-12 h-12 bg-pastel-sage rounded-xl flex items-center justify-center">
                <span className="text-2xl">🖥️</span>
              </div>
              <span className="font-semibold text-text-primary">Server</span>
            </div>
            <div className="bg-white rounded-2xl px-6 py-4 shadow-soft flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
              <div className="w-12 h-12 bg-pastel-coral rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌐</span>
              </div>
              <span className="font-semibold text-text-primary">Domain</span>
            </div>
            <div className="bg-white rounded-2xl px-6 py-4 shadow-soft flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200">
              <div className="w-12 h-12 bg-pastel-blue rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <span className="font-semibold text-text-primary">Hosting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
