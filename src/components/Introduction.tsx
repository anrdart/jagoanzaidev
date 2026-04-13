import { Server, HelpCircle } from 'lucide-react';

export default function Introduction() {
  return (
    <section id="pengenalan" className="py-16 md:py-24 bg-pastel-sage">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 md:px-5 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-accent-sage" />
              <span className="text-text-secondary font-medium text-sm md:text-base">Pengenalan</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 md:mb-6">
              Apa sih itu<span className="text-accent-sage"> Server</span>?
            </h2>
          </div>

          {/* Main Content Card */}
          <div className="card bg-white p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              {/* Icon/Illustration */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-pastel-sage rounded-2xl md:rounded-3xl flex items-center justify-center shadow-soft">
                  <Server className="w-12 h-12 md:w-16 md:h-16 text-text-primary" strokeWidth={1.5} />
                </div>
              </div>

              {/* Description */}
              <div className="flex-1">
                <p className="text-base md:text-xl lg:text-2xl text-text-secondary leading-relaxed">
                  Bayangkan{' '}
                  <span className="font-bold text-text-primary">server</span>{' '}
                  itu seperti sebuah{' '}
                  <span className="font-bold text-accent-coral">komputer super</span>{' '}
                  yang nyala <span className="font-bold text-accent-blue">24 jam nonstop</span>{' '}
                  buat nyimpen semua data website kamu, biar bisa diakses orang dari seluruh dunia kapan aja.
                </p>
              </div>
            </div>

            {/* Fun fact box */}
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-pastel-slate">
              <div className="bg-pastel-blue rounded-xl md:rounded-2xl p-4 md:p-6">
                <p className="text-text-secondary text-sm md:text-base lg:text-lg">
                  <span className="font-bold text-text-primary">Fun fact:</span> Setiap kali kamu buka website,
                  sebenarnya kamu lagi "nengok" ke server yang menyimpan website tersebut. Keren kan?
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="text-center mt-8 md:mt-12">
            <p className="text-text-muted mb-4 text-sm md:text-base">Siap buat naik level? Lanjut ke 3 aturan emasnya 👇</p>
          </div>
        </div>
      </div>
    </section>
  );
}
