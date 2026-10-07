import React from 'react';
import { WEDDING_DATA } from '../data/weddingDetails';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#ECE2D0] py-10 text-center text-xs text-[#735E50]">
      <div className="max-w-4xl mx-auto px-4 space-y-2">
        <p className="font-serif text-base font-bold text-[#8B2635]">
          Jishnu Vikraman Pillai & K.S. Praveena
        </p>
        <p className="text-xs text-[#5D4F44]">
          Sunday, 06 December 2026 (20th Vrichikam 1202) • Madathilkavu Bhagavathi Temple, Kunnamthanam
        </p>
        <p className="text-[11px] text-[#8C7A6D] pt-2">
          Cordially invited by K. P. Vikraman Pillai, R. Latha Kurup, Vishnu Vikraman Pillai & Family
        </p>
      </div>
    </footer>
  );
};
