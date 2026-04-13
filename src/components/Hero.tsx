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
      <div className="fixed top-3 md:top-4 right-3 md:right-4 z-20">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-soft">
            <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent-sage" />
            <span className="text-xs md:text-sm font-medium text-text-primary truncate max-w-[100px] md:max-w-[140px]">{userEmail}</span>
          </div>
        ) : (
          <button
            onClick={openLogin}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all text-text-secondary hover:text-accent-blue"
          >
            <LogIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-medium">Masuk</span>
          </button>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 md:w-32 md:h-32 bg-pastel-mint rounded-full opacity-60 blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-28 h-28 md:w-40 md:h-40 bg-pastel-coral rounded-full opacity-50 blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 md:w-24 md:h-24 bg-pastel-blue rounded-full opacity-40 blur-xl animate-float"></div>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 shadow-soft">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent-coral" />
            <span className="text-text-secondary font-medium text-sm md:text-base">Belajar server dari nol, tanpa ribet!</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-text-primary leading-tight mb-4 md:mb-6">
            Selamat Datang di{' '}
            <span className="relative inline-block">
              <span className="text-accent-blue">
                Jagoan Zaidev
              </span>
              <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full" height="8" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="#d4765c" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base md:text-xl lg:text-2xl text-text-secondary leading-relaxed mb-6 md:mb-10 max-w-3xl mx-auto px-2">
            Tempat paling asik dan gampang dipahami buat kamu yang mau belajar server dari{' '}
            <span className="font-bold text-accent-coral">N-O-L</span>. Nggak perlu jago IT buat mulai!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <button
              onClick={handleStartLearning}
              className="btn-primary flex items-center gap-2 md:gap-3 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              <Rocket className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Mulai Belajar Sekarang</span>
              <span className="sm:hidden">Mulai Belajar</span>
            </button>
            <a href="#pengenalan" className="text-text-muted hover:text-accent-blue font-medium transition-colors duration-200 text-sm md:text-base">
              Pelajari dulu ah ↓
            </a>
          </div>

          {/* Floating illustration elements */}
          <div className="mt-10 md:mt-16 flex justify-center gap-3 md:gap-8 flex-wrap px-2">
            <div className="bg-white rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-4 shadow-soft flex items-center gap-2 md:gap-3 hover:-translate-y-1 transition-transform duration-200">
              <div className="w-9 h-9 md:w-12 md:h-12 bg-pastel-sage rounded-xl flex items-center justify-center">
                <span className="text-xl md:text-2xl">🖥️</span>
              </div>
              <span className="font-semibold text-text-primary text-sm md:text-base">Server</span>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-4 shadow-soft flex items-center gap-2 md:gap-3 hover:-translate-y-1 transition-transform duration-200">
              <div className="w-9 h-9 md:w-12 md:h-12 bg-pastel-coral rounded-xl flex items-center justify-center">
                <span className="text-xl md:text-2xl">🌐</span>
              </div>
              <span className="font-semibold text-text-primary text-sm md:text-base">Domain</span>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-4 shadow-soft flex items-center gap-2 md:gap-3 hover:-translate-y-1 transition-transform duration-200">
              <div className="w-9 h-9 md:w-12 md:h-12 bg-pastel-blue rounded-xl flex items-center justify-center">
                <span className="text-xl md:text-2xl">🏠</span>
              </div>
              <span className="font-semibold text-text-primary text-sm md:text-base">Hosting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
