import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#ECE2D0] py-10 text-center text-xs text-[#735E50]">
      <div className="max-w-4xl mx-auto px-4 space-y-2">
        <p className="font-serif text-base font-bold">
          <span className="name-shimmer">Jishnu Vikraman Pillai & K.S. Praveena</span>
        </p>
        <p className="text-xs text-[#5D4F44]">
          Sunday, 06 December 2026 (20th Vrichikam 1202) • Madathilkavu Bhagavathi Temple, Kunnamthanam
        </p>
        <p className="text-[11px] text-[#8C7A6D] pt-1">
          Cordially invited by K. P. Vikraman Pillai, R. Latha Kurup, Vishnu Vikraman Pillai & Family
        </p>
        <div className="pt-4 border-t border-[#EFE7DA] mt-4">
          <p className="text-[11px] text-[#8C7A6D]">
            Created by{' '}
            <a
              href="https://sreeharis.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#8B2635] hover:text-[#5A1723] hover:underline underline-offset-4 transition-colors"
            >
              Sreehari S
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
