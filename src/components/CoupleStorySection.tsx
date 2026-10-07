import React from 'react';
import { Heart, Sparkles, Home, Phone, Users } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingDetails';

export const CoupleStorySection: React.FC = () => {
  const { groom, bride } = WEDDING_DATA.couple;

  return (
    <section id="couple" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#ECE2D0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635]">
            Two Families, One Auspicious Union
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] mt-2 text-balance">
            Meet the Bride & Groom
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] mt-2">
            With the sacred blessings of our revered ancestors, parents, and beloved elders.
          </p>
        </div>

        {/* Two Column Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom Profile Card */}
          <div className="bg-[#FFFDF9] border border-[#E3D8C8] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C5A059]/20 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B2635] mb-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>The Beloved Groom</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8B2635]">
                {groom.name}
              </h3>

              <div className="mt-4 p-4 bg-[#FAF7F2] border border-[#EBE0D2] rounded-xl space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-[#3B2D22]">Parents: </span>
                  <span className="text-[#5D4F44]">{groom.parents}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#3B2D22]">Ancestral Home: </span>
                  <span className="text-[#5D4F44]">{groom.native}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#3B2D22]">Sharing Happiness: </span>
                  <span className="text-[#5D4F44]">{groom.brother}</span>
                </div>
              </div>

              {/* Lineage & Ancestral Blessings */}
              <div className="mt-4 space-y-2 text-xs text-[#5D4F44] leading-relaxed">
                <p className="font-semibold text-[#3B2D22]">Ancestral Lineage:</p>
                <p>
                  • <strong>Paternal:</strong> Grandson of {groom.grandparentsPaternal} ({groom.grandparentsPaternalHouse})
                </p>
                <p>
                  • <strong>Maternal:</strong> Grandson of {groom.grandparentsMaternal} ({groom.grandparentsMaternalHouse})
                </p>
              </div>
            </div>

            {/* Departure Note */}
            <div className="mt-6 pt-4 border-t border-[#ECE2D0] flex items-center justify-between text-xs text-[#735E50]">
              <div className="flex items-center gap-1.5 font-medium">
                <Home className="w-4 h-4 text-[#8B2635]" />
                <span>Departs {groom.departureTime} from {groom.departurePoint}</span>
              </div>
            </div>
          </div>

          {/* Bride Profile Card */}
          <div className="bg-[#FFFDF9] border border-[#E3D8C8] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C5A059]/20 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B2635] mb-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>The Beloved Bride</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8B2635]">
                {bride.name}
              </h3>

              <div className="mt-4 p-4 bg-[#FAF7F2] border border-[#EBE0D2] rounded-xl space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-[#3B2D22]">Parents: </span>
                  <span className="text-[#5D4F44]">{bride.parents}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#3B2D22]">Family Residence: </span>
                  <span className="text-[#5D4F44]">{bride.native}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#3B2D22]">Native Region: </span>
                  <span className="text-[#5D4F44]">Kunnamthanam / Ithithanam</span>
                </div>
              </div>

              {/* Lineage & Ancestral Blessings */}
              <div className="mt-4 space-y-2 text-xs text-[#5D4F44] leading-relaxed">
                <p className="font-semibold text-[#3B2D22]">Ancestral Lineage:</p>
                <p>
                  • <strong>Paternal:</strong> Granddaughter of {bride.grandparentsPaternal}
                </p>
                <p>
                  • <strong>Maternal:</strong> Granddaughter of {bride.grandparentsMaternal} ({bride.grandparentsMaternalPlace})
                </p>
              </div>
            </div>

            {/* Wedding Sanctum Connection */}
            <div className="mt-6 pt-4 border-t border-[#ECE2D0] flex items-center justify-between text-xs text-[#735E50]">
              <div className="flex items-center gap-1.5 font-medium">
                <Heart className="w-4 h-4 text-[#8B2635]" />
                <span>Wedding at Madathilkavu Bhagavathi Temple, Kunnamthanam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
