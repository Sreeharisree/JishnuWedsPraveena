import React from 'react';
import { Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingDetails';

export const CoupleStorySection: React.FC = () => {
  const { groom, bride } = WEDDING_DATA.couple;

  const GROOM_FAMILY_LOCAL = '/images/groom_family.jpg';
  const GROOM_FAMILY_FALLBACK = 'https://lh3.googleusercontent.com/d/1KtcuEOyUhP4Nb1mZwcasyN1NjVc7H8o_=w1600';

  const BRIDE_FAMILY_LOCAL = '/images/bride_family.jpg';
  const BRIDE_FAMILY_FALLBACK = 'https://lh3.googleusercontent.com/d/10YdJSY7lf3GrwKer6D9O9V_uKClwWS5J=w1600';

  return (
    <section id="ceremony" className="py-10 md:py-16 bg-[#FAF7F2] dark:bg-[#120E0C] border-t border-[#ECE2D0] dark:border-[#261E1A] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635] dark:text-[#E88294]">
            Two Families, One Auspicious Union
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] dark:text-[#FAF5EE] mt-2 text-balance">
            Meet the Bride & Groom
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] dark:text-[#BFAFA2] mt-2">
            With the sacred blessings of our revered ancestors, parents, and beloved elders.
          </p>
        </div>

        {/* Two Column Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom Profile Card */}
          <div className="group bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F4E9D8] dark:from-[#1E1714] dark:via-[#191310] dark:to-[#140F0C] border border-[#D9CABB] dark:border-[#382B24] rounded-3xl shadow-sm dark:shadow-xl hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
            <div>
              {/* Top: Prominent, Crystal-Clear Groom Family Photo */}
              <div className="relative w-full aspect-16/10 sm:aspect-16/9 overflow-hidden bg-[#E8DEC8] dark:bg-[#251D18]">
                <img
                  src={GROOM_FAMILY_LOCAL}
                  onError={(e) => {
                    if (e.currentTarget.src !== GROOM_FAMILY_FALLBACK) {
                      e.currentTarget.src = GROOM_FAMILY_FALLBACK;
                    }
                  }}
                  alt="Family of Jishnu Vikraman Pillai"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Smooth Gradient Transition from Photo to Card Body */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#FFFDF9] via-[#FFFDF9]/60 dark:from-[#1E1714] dark:via-[#1E1714]/60 to-transparent pointer-events-none" />
              </div>

              {/* Bottom: Gradient Filled Details Container */}
              <div className="p-6 sm:p-8 relative">
                {/* Subtle Auspicious Corner Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C5A059]/15 via-[#8B2635]/5 to-transparent rounded-bl-full pointer-events-none" />

                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8B2635] dark:text-[#E88294] mb-1">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>The Beloved Groom</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  <span className="name-shimmer">{groom.name}</span>
                </h3>

                {/* Parents & Residence Box */}
                <div className="p-4 bg-white/85 dark:bg-[#251D18]/90 backdrop-blur-xs border border-[#E4D8C7] dark:border-[#3D3027] rounded-2xl space-y-2 text-xs sm:text-sm shadow-xs">
                  <div>
                    <span className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Parents: </span>
                    <span className="text-[#4A3D34] dark:text-[#CBBBB0]">{groom.parents}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Ancestral Home: </span>
                    <span className="text-[#4A3D34] dark:text-[#CBBBB0]">{groom.native}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Sharing Happiness: </span>
                    <span className="text-[#4A3D34] dark:text-[#CBBBB0]">{groom.brother}</span>
                  </div>
                </div>

                {/* Lineage & Ancestral Blessings Box */}
                <div className="mt-3.5 space-y-2 text-xs text-[#4A3D34] dark:text-[#CBBBB0] leading-relaxed bg-white/85 dark:bg-[#251D18]/90 backdrop-blur-xs p-4 rounded-2xl border border-[#E4D8C7] dark:border-[#3D3027] shadow-xs">
                  <p className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Ancestral Lineage:</p>
                  <p>
                    • <strong>Paternal:</strong> Grandson of {groom.grandparentsPaternal} ({groom.grandparentsPaternalHouse})
                  </p>
                  <p>
                    • <strong>Maternal:</strong> Grandson of {groom.grandparentsMaternal} ({groom.grandparentsMaternalHouse})
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bride Profile Card */}
          <div className="group bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F4E9D8] dark:from-[#1E1714] dark:via-[#191310] dark:to-[#140F0C] border border-[#D9CABB] dark:border-[#382B24] rounded-3xl shadow-sm dark:shadow-xl hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
            <div>
              {/* Top: Prominent, Crystal-Clear Bride Family Photo */}
              <div className="relative w-full aspect-16/10 sm:aspect-16/9 overflow-hidden bg-[#E8DEC8] dark:bg-[#251D18]">
                <img
                  src={BRIDE_FAMILY_LOCAL}
                  onError={(e) => {
                    if (e.currentTarget.src !== BRIDE_FAMILY_FALLBACK) {
                      e.currentTarget.src = BRIDE_FAMILY_FALLBACK;
                    }
                  }}
                  alt="Family of K.S. Praveena"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Smooth Gradient Transition from Photo to Card Body */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#FFFDF9] via-[#FFFDF9]/60 dark:from-[#1E1714] dark:via-[#1E1714]/60 to-transparent pointer-events-none" />
              </div>

              {/* Bottom: Gradient Filled Details Container */}
              <div className="p-6 sm:p-8 relative">
                {/* Subtle Auspicious Corner Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C5A059]/15 via-[#8B2635]/5 to-transparent rounded-bl-full pointer-events-none" />

                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8B2635] dark:text-[#E88294] mb-1">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>The Beloved Bride</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  <span className="name-shimmer">{bride.name}</span>
                </h3>

                {/* Parents & Residence Box */}
                <div className="p-4 bg-white/85 dark:bg-[#251D18]/90 backdrop-blur-xs border border-[#E4D8C7] dark:border-[#3D3027] rounded-2xl space-y-2 text-xs sm:text-sm shadow-xs">
                  <div>
                    <span className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Parents: </span>
                    <span className="text-[#4A3D34] dark:text-[#CBBBB0]">{bride.parents}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Family Residence: </span>
                    <span className="text-[#4A3D34] dark:text-[#CBBBB0]">{bride.native}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Sharing Happiness: </span>
                    <span className="text-[#4A3D34] dark:text-[#CBBBB0]">{bride.brother}</span>
                  </div>
                </div>

                {/* Lineage & Ancestral Blessings Box */}
                <div className="mt-3.5 space-y-2 text-xs text-[#4A3D34] dark:text-[#CBBBB0] leading-relaxed bg-white/85 dark:bg-[#251D18]/90 backdrop-blur-xs p-4 rounded-2xl border border-[#E4D8C7] dark:border-[#3D3027] shadow-xs">
                  <p className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Ancestral Lineage:</p>
                  <p>
                    • <strong>Paternal:</strong> Granddaughter of {bride.grandparentsPaternal}
                  </p>
                  <p>
                    • <strong>Maternal:</strong> Granddaughter of {bride.grandparentsMaternal} ({bride.grandparentsMaternalPlace})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
