import React from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingDetails';

interface CardShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CardShowcaseModal: React.FC<CardShowcaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#FAF6EE] border-4 border-[#C5A059] rounded-2xl shadow-2xl p-6 sm:p-10 text-[#2C241E]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#5D4F44] hover:text-[#8B2635] transition-colors border border-[#D9CABB] cursor-pointer"
          aria-label="Close card viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Traditional Gold Borders & Peacock Header Motif */}
        <div className="text-center pb-6 border-b border-[#E3D8C8]">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#8B2635]">
            Sacred Wedding Invitation
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8B2635] mt-1">
            Jishnu Vikraman Pillai & K.S. Praveena
          </h3>
          <p className="text-xs text-[#735E50] mt-1">
            Original Invitation Card Layout & Lineage Details
          </p>
        </div>

        {/* Faithfully transcribed card body */}
        <div className="my-6 space-y-6 text-center text-sm sm:text-base leading-relaxed">
          {/* Host details */}
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#3B2D22]">
              K. P. VIKRAMAN PILLAI
            </h4>
            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#3B2D22]">
              R. LATHA KURUP
            </h4>
            <p className="text-xs sm:text-sm text-[#5D4F44]">
              Kizhakkupurathu, Kollaka P.O., Karunagappally
            </p>
            <p className="text-xs font-mono text-[#8B2635]">
              Ph: 9656795970, 8547303310
            </p>
          </div>

          <div className="py-2">
            <p className="font-traditional text-lg italic text-[#6B5A4E]">
              Together with Our Families
            </p>
            <p className="text-sm font-traditional italic text-[#4A3D34]">
              We cordially invite you and your family to grace the wedding ceremony of our beloved son
            </p>
          </div>

          {/* Groom details & lineage */}
          <div className="bg-[#FFFDF9] border border-[#E8DCC8] rounded-xl p-5 shadow-xs">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8B2635]">
              Jishnu Vikraman Pillai
            </h3>
            <p className="text-xs text-[#5D4F44] mt-2 max-w-xl mx-auto leading-relaxed">
              (Grand S/o. Late. Mr. Prabhakaran Pillai & Late. Mrs. Bharathi Amma
              <br />
              Kizhakkupurathu, Kollaka P.O., Karunagappally
              <br />
              and Late. Mr. Viswanatha Kurup & Late. Mrs. Rajamma Amma
              <br />
              Mulamoottil House, Sasthamkotta P.O., Karunagappally)
            </p>
          </div>

          <div className="font-traditional text-xl italic font-semibold text-[#C5A059]">
            with
          </div>

          {/* Bride details & lineage */}
          <div className="bg-[#FFFDF9] border border-[#E8DCC8] rounded-xl p-5 shadow-xs">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8B2635]">
              K.S. Praveena
            </h3>
            <p className="text-xs text-[#5D4F44] mt-2 max-w-xl mx-auto leading-relaxed">
              (Grand D/o. Mr. K. V. Narayana Pillai & Late. Mrs. M. K. Saraswathi Amma &
              <br />
              Late. Mr. Nanukkuttan Nair & Mrs. Vijayamma, Ithithanam
              <br />
              D/o. Late. Mr. Sajikumar K. N. & Mrs. Prasannakumari P. N.
              <br />
              Kochuzhathil, Kunnamthanam)
            </p>
          </div>

          {/* Date, Muhurtham & Venue Box */}
          <div className="border-t border-[#E3D8C8] pt-6 space-y-3">
            <div className="inline-block bg-[#F0E6D8] border border-[#D9CABB] rounded-xl px-6 py-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-[#735E50]">
                SUNDAY, 06 DECEMBER 2026
              </p>
              <p className="text-xs text-[#5D4F44] mt-0.5">
                (20th Vrichikam 1202)
              </p>
              <p className="text-base sm:text-lg font-bold text-[#8B2635] mt-2">
                Muhoortham: Between 11:50 am & 12:10 pm
              </p>
            </div>

            <div className="pt-2">
              <p className="font-serif font-bold text-lg text-[#2C241E]">
                @ Madathilkavu Bhagavathi Temple, Kunnamthanam
              </p>
              <p className="text-xs text-[#5D4F44] mt-1">
                Sharing Our Happiness : Vishnu Vikraman Pillai & Family
              </p>
              <p className="text-xs font-semibold text-[#8B2635] mt-1">
                Groom&apos;s party leaves at 8:00 AM from C. N. Junction
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-[#E3D8C8] pt-4 flex items-center justify-between">
          <p className="text-xs text-[#735E50]">
            Physical card verified & digitized
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] rounded-lg transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
