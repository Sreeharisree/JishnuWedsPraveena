import React from 'react';
import { Phone, MessageCircle, Heart, MapPin, Users } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingDetails';

export const FamilyContactsSection: React.FC = () => {
  const { groom, bride } = WEDDING_DATA.couple;

  return (
    <section id="contacts" className="py-16 bg-[#FFFDF9] border-t border-[#ECE2D0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635]">
            Family Cordiality & Contact
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] mt-1">
            We Await to Welcome You
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5A4E] mt-1">
            Please feel free to connect with our family for travel queries or venue directions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Groom's Family Contacts */}
          <div className="bg-[#FAF7F2] border border-[#E3D8C8] rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-semibold text-[#8B2635] uppercase tracking-wider">
                Groom&apos;s Family & Hosts
              </span>
              <h3 className="font-serif text-lg font-bold text-[#2C241E] mt-1">
                K. P. Vikraman Pillai & R. Latha Kurup
              </h3>
              <p className="text-xs text-[#5D4F44]">
                Kizhakkupurathu, Kollaka P.O., Karunagappally
              </p>
              <p className="text-xs text-[#8B2635] font-medium mt-1">
                Sharing Happiness: Vishnu Vikraman Pillai & Family
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#ECE2D0]">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-[#3B2D22]">K. P. Vikraman Pillai: </span>
                  <span className="font-mono text-[#8B2635]">9656795970</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href="tel:9656795970"
                    className="p-1.5 rounded-lg bg-white border border-[#D9CABB] text-[#8B2635] hover:bg-[#8B2635] hover:text-white transition-colors"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/919656795970?text=Namaskaram,%20regarding%20the%20wedding%20of%20Jishnu%20and%20Praveena"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-[#3B2D22]">R. Latha Kurup: </span>
                  <span className="font-mono text-[#8B2635]">8547303310</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href="tel:8547303310"
                    className="p-1.5 rounded-lg bg-white border border-[#D9CABB] text-[#8B2635] hover:bg-[#8B2635] hover:text-white transition-colors"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/918547303310?text=Namaskaram,%20regarding%20the%20wedding%20of%20Jishnu%20and%20Praveena"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bride's Family Info */}
          <div className="bg-[#FAF7F2] border border-[#E3D8C8] rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-semibold text-[#8B2635] uppercase tracking-wider">
                Bride&apos;s Family & Venue Host
              </span>
              <h3 className="font-serif text-lg font-bold text-[#2C241E] mt-1">
                Late. Mr. Sajikumar K. N. & Mrs. Prasannakumari P. N.
              </h3>
              <p className="text-xs text-[#5D4F44]">
                Kochuzhathil, Kunnamthanam, Pathanamthitta
              </p>
              <p className="text-xs text-[#8B2635] font-medium mt-1">
                Solemnized at Madathilkavu Bhagavathi Temple
              </p>
            </div>

            <div className="pt-2 border-t border-[#ECE2D0] text-xs text-[#5D4F44] space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B2635] shrink-0" />
                <span>Wedding Venue: Madathilkavu Bhagavathi Temple, Kunnamthanam</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#8B2635] shrink-0" />
                <span>We eagerly await your presence and blessing on Sunday, 06 Dec 2026.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
