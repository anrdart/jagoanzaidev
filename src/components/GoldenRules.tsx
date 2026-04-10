import { Globe, Home, Building2, ArrowDown } from 'lucide-react';

export default function GoldenRules() {
  return (
    <section className="py-24 bg-pastel-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
              <span className="text-2xl">✨</span>
              <span className="text-text-secondary font-medium">Materi Utama</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">
              3 Aturan Emas
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Tiga langkah penting yang harus kamu pahami buat jadi jagoan server!
            </p>
          </div>

          {/* Timeline/Grid Layout */}
          <div className="space-y-8">
            {/* Rule 1 */}
            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute left-8 md:left-1/2 top-24 w-0.5 h-full bg-pastel-slate -translate-x-1/2 hidden md:block"></div>

              <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 hover:shadow-lift transition-all duration-200 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Rule Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-accent-blue text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-soft">
                      1
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
                      Kenalan sama Domain
                    </h3>
                    <p className="text-accent-blue font-semibold text-lg mb-6">
                      (Alamat Rumah)
                    </p>

                    {/* Analogy Box */}
                    <div className="bg-pastel-blue rounded-2xl p-6 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                          <Globe className="w-6 h-6 text-accent-blue" />
                        </div>
                        <p className="text-text-secondary text-lg leading-relaxed">
                          Domain itu kayak{' '}
                          <span className="font-bold text-text-primary">alamat rumah</span> (misal: <span className="font-mono bg-white px-2 py-1 rounded-lg text-accent-blue">namakamu.com</span>).
                          Kalau nggak ada alamat, orang nggak bakal tahu cara mampir ke rumah (website) kamu.
                        </p>
                      </div>
                    </div>

                    {/* Tip Box */}
                    <div className="bg-pastel-slate rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <div>
                          <p className="font-bold text-text-primary mb-1">Tips Jagoan:</p>
                          <p className="text-text-secondary">Pilih nama yang gampang diingat dan nggak ribet. Pendek, jelas, dan unik!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow Connector for Mobile */}
            <div className="flex justify-center md:hidden">
              <ArrowDown className="w-8 h-8 text-pastel-sage" />
            </div>

            {/* Rule 2 */}
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-24 w-0.5 h-full bg-pastel-slate -translate-x-1/2 hidden md:block"></div>

              <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 hover:shadow-lift transition-all duration-200 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Rule Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-accent-sage text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-soft">
                      2
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
                      Memahami Hosting
                    </h3>
                    <p className="text-accent-sage font-semibold text-lg mb-6">
                      (Tanah & Bangunan)
                    </p>

                    {/* Analogy Box */}
                    <div className="bg-pastel-sage rounded-2xl p-6 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                          <Home className="w-6 h-6 text-accent-sage" />
                        </div>
                        <p className="text-text-secondary text-lg leading-relaxed">
                          Hosting itu ibarat{' '}
                          <span className="font-bold text-text-primary">tanah tempat rumahmu dibangun</span>.
                          Di sinilah kamu naruh semua barang (foto, teks, video) biar bisa dilihat orang lain.
                        </p>
                      </div>
                    </div>

                    {/* Shared Hosting Explanation */}
                    <div className="bg-pastel-coral/50 rounded-2xl p-6 border-2 border-pastel-coral">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🏢</span>
                        <div>
                          <p className="font-bold text-text-primary mb-2">Apa itu Shared Hosting?</p>
                          <p className="text-text-secondary leading-relaxed">
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
              <ArrowDown className="w-8 h-8 text-pastel-coral" />
            </div>

            {/* Rule 3 */}
            <div className="relative">
              <div className="bg-pastel-coral/20 rounded-3xl shadow-soft p-8 md:p-12 hover:shadow-lift transition-all duration-200 hover:-translate-y-1 border-2 border-pastel-coral/30">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Rule Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-accent-coral text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-soft">
                      3
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Hero Badge */}
                    <div className="inline-flex items-center gap-2 bg-accent-coral text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                      <span>🚀</span>
                      LEVEL UP!
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
                      Naik Level ke VPS
                    </h3>
                    <p className="text-accent-coral font-semibold text-lg mb-6">
                      (Virtual Private Server - Apartemen Pribadi)
                    </p>

                    {/* Analogy Box */}
                    <div className="bg-pastel-coral/50 rounded-2xl p-6 mb-6 border-2 border-pastel-coral">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-accent-coral" />
                        </div>
                        <p className="text-text-secondary text-lg leading-relaxed">
                          VPS itu ibarat{' '}
                          <span className="font-bold text-text-primary">nyewa apartemen studio</span>.
                          Fasilitas punya sendiri, nggak bagi-bagi. Kamu bebas{' '}
                          <span className="font-bold text-accent-coral">renovasi</span> (install aplikasi) sesuka hati!
                        </p>
                      </div>
                    </div>

                    {/* Why Jagoan Box */}
                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">⭐</span>
                        <div>
                          <p className="font-bold text-text-primary mb-2">Kenapa buat "Jagoan"?</p>
                          <p className="text-text-secondary leading-relaxed">
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
          <div className="mt-16 text-center">
            <div className="inline-block bg-white rounded-3xl shadow-soft p-8 max-w-2xl">
              <p className="text-2xl font-bold text-text-primary mb-2">
                🎉 Selamat! Kamu udah ngerti dasarnya!
              </p>
              <p className="text-text-secondary">
                Tiga aturan ini adalah fondasi buat kamu jadi jagoan server. Lanjut eksplorasi lebih dalam!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
