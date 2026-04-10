import { Coffee, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-white py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl mb-8">
              <Coffee className="w-6 h-6 text-pastel-coral" />
              <span className="text-xl font-semibold">
                Dikelola dengan ☕ oleh Jagoan Zaidev
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
              Siap jadi ahli server selanjutnya?
            </h3>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Belajar server nggak harus serius dan tegang. Di sini kita belajar sambil santai,
              pake bahasa yang gampang dimengerti. Yuk mulai perjalananmu!
            </p>
          </div>

          {/* Divider */}
          <div className="border-b border-white/10 mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-white/50 text-sm">
              © {currentYear} Jagoan Zaidev. Dibuat dengan ❤️ buat pemula di seluruh Indonesia.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300"
            >
              <span>Kembali ke atas</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
