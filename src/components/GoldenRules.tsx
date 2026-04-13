import { Globe, Home, Building2, ArrowDown } from 'lucide-react';

export default function GoldenRules() {
  return (
    <section className="py-16 md:py-24 bg-pastel-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 md:px-5 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
              <span className="text-xl md:text-2xl">✨</span>
              <span className="text-text-secondary font-medium text-sm md:text-base">Materi Utama</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary mb-3 md:mb-4">
              3 Aturan Emas
            </h2>
            <p className="text-base md:text-xl text-text-secondary max-w-2xl mx-auto px-2">
              Tiga langkah penting yang harus kamu pahami buat jadi jagoan server!
            </p>
          </div>

          {/* Timeline/Grid Layout */}
          <div className="space-y-6 md:space-y-8">
            {/* Rule 1 */}
            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute left-6 md:left-1/2 top-20 md:top-24 w-0.5 h-full bg-pastel-slate -translate-x-1/2 hidden md:block"></div>

              <div className="bg-white rounded-2xl md:rounded-3xl shadow-soft p-5 md:p-8 lg:p-12 hover:shadow-lift transition-all duration-200 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                  {/* Rule Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-accent-blue text-white rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-extrabold shadow-soft">
                      1
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-text-primary mb-1 md:mb-2">
                      Kenalan sama Domain
                    </h3>
                    <p className="text-accent-blue font-semibold text-sm md:text-base lg:text-lg mb-4 md:mb-6">
                      (Alamat Rumah)
                    </p>

                    {/* Analogy Box */}
                    <div className="bg-pastel-blue rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <Globe className="w-5 h-5 md:w-6 md:h-6 text-accent-blue" />
                        </div>
                        <p className="text-text-secondary text-sm md:text-base lg:text-lg leading-relaxed">
                          Domain itu kayak{' '}
                          <span className="font-bold text-text-primary">alamat rumah</span> (misal: <span className="font-mono bg-white px-2 py-0.5 md:py-1 rounded-lg text-accent-blue text-xs md:text-sm">namakamu.com</span>).
                          Kalau nggak ada alamat, orang nggak bakal tahu cara mampir ke rumah (website) kamu.
                        </p>
                      </div>
                    </div>

                    {/* Tip Box */}
                    <div className="bg-pastel-slate rounded-xl md:rounded-2xl p-3 md:p-5">
                      <div className="flex items-start gap-2 md:gap-3">
                        <span className="text-xl md:text-2xl">💡</span>
                        <div>
                          <p className="font-bold text-text-primary mb-1 text-sm md:text-base">Tips Jagoan:</p>
                          <p className="text-text-secondary text-sm md:text-base">Pilih nama yang gampang diingat dan nggak ribet. Pendek, jelas, dan unik!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow Connector for Mobile */}
            <div className="flex justify-center md:hidden">
              <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-pastel-sage" />
            </div>

            {/* Rule 2 */}
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-20 md:top-24 w-0.5 h-full bg-pastel-slate -translate-x-1/2 hidden md:block"></div>

              <div className="bg-white rounded-2xl md:rounded-3xl shadow-soft p-5 md:p-8 lg:p-12 hover:shadow-lift transition-all duration-200 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                  {/* Rule Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-accent-sage text-white rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-extrabold shadow-soft">
                      2
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-text-primary mb-1 md:mb-2">
                      Memahami Hosting
                    </h3>
                    <p className="text-accent-sage font-semibold text-sm md:text-base lg:text-lg mb-4 md:mb-6">
                      (Tanah & Bangunan)
                    </p>

                    {/* Analogy Box */}
                    <div className="bg-pastel-sage rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <Home className="w-5 h-5 md:w-6 md:h-6 text-accent-sage" />
                        </div>
                        <p className="text-text-secondary text-sm md:text-base lg:text-lg leading-relaxed">
                          Hosting itu ibarat{' '}
                          <span className="font-bold text-text-primary">tanah tempat rumahmu dibangun</span>.
                          Di sinilah kamu naruh semua barang (foto, teks, video) biar bisa dilihat orang lain.
                        </p>
                      </div>
                    </div>

                    {/* Shared Hosting Explanation */}
                    <div className="bg-pastel-coral/50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-pastel-coral">
                      <div className="flex items-start gap-2 md:gap-3">
                        <span className="text-xl md:text-2xl">🏢</span>
                        <div>
                          <p className="font-bold text-text-primary mb-1 md:mb-2 text-sm md:text-base">Apa itu Shared Hosting?</p>
                          <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                            Ibarat <span className="font-semibold">ngekos</span>. Murah, tapi fasilitas dibagi-bagi sama tetangga.
                            Kalau tetangga berisik (traffic naik), kosan kamu bisa{' '}
                            <span className="font-bold text-accent-coral">ikutan lambat</span>. Cocok buat pemula!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow Connector for Mobile */}
            <div className="flex justify-center md:hidden">
              <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-pastel-coral" />
            </div>

            {/* Rule 3 */}
            <div className="relative">
              <div className="bg-pastel-coral/20 rounded-2xl md:rounded-3xl shadow-soft p-5 md:p-8 lg:p-12 hover:shadow-lift transition-all duration-200 hover:-translate-y-1 border-2 border-pastel-coral/30">
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                  {/* Rule Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-accent-coral text-white rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-extrabold shadow-soft">
                      3
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Hero Badge */}
                    <div className="inline-flex items-center gap-1.5 md:gap-2 bg-accent-coral text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4">
                      <span>🚀</span>
                      LEVEL UP!
                    </div>

                    <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-text-primary mb-1 md:mb-2">
                      Naik Level ke VPS
                    </h3>
                    <p className="text-accent-coral font-semibold text-xs md:text-sm lg:text-lg mb-4 md:mb-6">
                      (Virtual Private Server - Apartemen Pribadi)
                    </p>

                    {/* Analogy Box */}
                    <div className="bg-pastel-coral/50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border-2 border-pastel-coral">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 md:w-6 md:h-6 text-accent-coral" />
                        </div>
                        <p className="text-text-secondary text-sm md:text-base lg:text-lg leading-relaxed">
                          VPS itu ibarat{' '}
                          <span className="font-bold text-text-primary">nyewa apartemen studio</span>.
                          Fasilitas punya sendiri, nggak bagi-bagi. Kamu bebas{' '}
                          <span className="font-bold text-accent-coral">renovasi</span> (install aplikasi) sesuka hati!
                        </p>
                      </div>
                    </div>

                    {/* Why Jagoan Box */}
                    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-soft">
                      <div className="flex items-start gap-2 md:gap-3">
                        <span className="text-xl md:text-2xl">⭐</span>
                        <div>
                          <p className="font-bold text-text-primary mb-1 md:mb-2 text-sm md:text-base">Kenapa buat "Jagoan"?</p>
                          <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                            Cocok buat website yang udah mulai{' '}
                            <span className="font-semibold text-accent-coral">ramai pengunjung</span> dan butuh{' '}
                            <span className="font-semibold text-accent-coral">performa kencang</span>{' '}
                            tanpa gangguan tetangga. Ini level selanjutnya setelah kamu jago shared hosting!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Encouragement Box */}
          <div className="mt-10 md:mt-16 text-center px-4">
            <div className="inline-block bg-white rounded-2xl md:rounded-3xl shadow-soft p-5 md:p-8 max-w-2xl">
              <p className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                🎉 Selamat! Kamu udah ngerti dasarnya!
              </p>
              <p className="text-text-secondary text-sm md:text-base">
                Tiga aturan ini adalah fondasi buat kamu jadi jagoan server. Lanjut eksplorasi lebih dalam!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
