import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Check,
  Compass,
  Hourglass,
  Sparkles,
  Heart,
} from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingDetails';

interface HeroSectionProps {
  onNavigateToGps: () => void;
  onNavigateToBlessings: () => void;
  onOpenCardModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToGps,
  onNavigateToBlessings,
  onOpenCardModal,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Countdown timer calculation to the Muhoortham
  const targetTime = new Date('2026-12-06T11:50:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Hourglass rotation angle that turns 180° on every second tick
  const [hourglassAngle, setHourglassAngle] = useState(0);

  useEffect(() => {
    setHourglassAngle((prev) => prev + 180);
  }, [timeLeft.seconds]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  const handleShare = async () => {
    const shareData = {
      title: 'Wedding Invitation: Jishnu & Praveena',
      text: 'Cordially inviting you with family to the wedding ceremony of Jishnu Vikraman Pillai & K.S. Praveena on Sunday, 06 Dec 2026.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Wedding: Jishnu Vikraman Pillai & K.S. Praveena');
    const details = encodeURIComponent(
      'Wedding ceremony and Muhoortham of Jishnu Vikraman Pillai & K.S. Praveena.\nMuhoortham: Between 11:50 AM & 12:10 PM.\nVenue: Madathilkavu Bhagavathi Temple, Kunnamthanam, Kerala.\nGroom party leaves at 8:00 AM from C.N. Junction, Karunagappally.'
    );
    const location = encodeURIComponent('Madathilkavu Bhagavathi Temple, Kunnamthanam, Kerala');
    const dates = '20261206T062000Z/20261206T093000Z'; // 11:50 AM - 3:00 PM IST
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section id="invitation" className="relative py-8 md:py-14 overflow-hidden">
      {/* Background Subtle Kerala Temple Motif Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06] bg-[radial-gradient(#8B2635_1px,transparent_1px)] dark:bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
        {/* Traditional Invitation Header Card Frame */}
        <div className="bg-[#FFFDF9] dark:bg-[#1A1412] border border-[#E8DCC8] dark:border-[#382B24] rounded-3xl shadow-sm dark:shadow-2xl dark:shadow-black/50 p-5 sm:p-8 md:p-10 relative overflow-hidden transition-colors duration-300">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#C5A059] opacity-80" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#C5A059] opacity-80" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#C5A059] opacity-80" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#C5A059] opacity-80" />

          {/* Traditional Auspicious Greeting */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8B2635] dark:text-[#E88294]">
              ॥ ॐ ശ്രീ മഹാഗണപതയേ നമഃ ॥
            </span>
            <p className="mt-2 text-xs sm:text-sm font-medium tracking-wide uppercase text-[#735E50] dark:text-[#C5B4A5]">
              Together with Our Families
            </p>
            <p className="mt-1 text-sm sm:text-base italic text-[#4A3D34] dark:text-[#E5D7CB] font-traditional">
              We cordially invite you and your family to grace the wedding ceremony of our beloved son
            </p>
          </div>

          {/* Couple Names */}
          <div className="my-5 sm:my-6 space-y-2">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
              <span className="name-shimmer">{WEDDING_DATA.couple.groom.name}</span>
            </h1>
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="h-px w-12 sm:w-16 bg-[#C5A059]" />
              <span className="font-traditional text-xl sm:text-2xl italic text-[#C5A059] font-semibold">with</span>
              <span className="h-px w-12 sm:w-16 bg-[#C5A059]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
              <span className="name-shimmer">{WEDDING_DATA.couple.bride.name}</span>
            </h2>
          </div>

          {/* Auspicious Date & Muhurtham Details */}
          <div className="max-w-xl mx-auto my-5 sm:my-6 py-4 border-y border-[#ECE2D0] dark:border-[#33261F] grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="space-y-1 sm:border-r sm:border-[#ECE2D0] dark:sm:border-[#33261F] sm:pr-4">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#735E50] dark:text-[#B5A496]">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>Wedding Date</span>
              </div>
              <p className="text-lg font-bold text-[#2C241E] dark:text-[#FAF5EE]">Sunday, 06 Dec 2026</p>
              <p className="text-xs text-[#735E50] dark:text-[#A8978A]">20th Vrichikam 1202 (Kollavarsham)</p>
            </div>

            <div className="space-y-1 sm:pl-4">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#735E50] dark:text-[#B5A496]">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Sacred Muhoortham</span>
              </div>
              <p className="text-lg font-bold text-[#8B2635] dark:text-[#E88294]">11:50 AM – 12:10 PM</p>
              <p className="text-xs text-[#735E50] dark:text-[#A8978A]">Groom party departs 8:00 AM from C. N. Jn</p>
            </div>
          </div>

          {/* Venue Notice */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#735E50] dark:text-[#B5A496] mb-1">
              <MapPin className="w-4 h-4 text-[#8B2635] dark:text-[#E88294]" />
              <span>Wedding Sanctum & Venue</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C241E] dark:text-[#FAF5EE]">
              {WEDDING_DATA.ceremony.venueName}
            </h3>
            <p className="text-sm text-[#5D4F44] dark:text-[#C5B4A5] mt-0.5">
              {WEDDING_DATA.ceremony.venueLocation}
            </p>
          </div>

          {/* Countdown Clock (Wider, Animated) & 2x2 Action Matrix (Compact) */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-stretch mb-2">
            {/* Left Column: Countdown Clock (7 cols, Animated, Richer Width) */}
            <div className="md:col-span-7 countdown-animated-box bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E7] to-[#F3E6D3] dark:from-[#251D18] dark:via-[#1E1714] dark:to-[#17120F] rounded-2xl p-4 sm:p-5 border border-[#E6DBCE] dark:border-[#3D2F26] flex flex-col justify-between h-full relative overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center gap-1.5 mb-3">
                <span className="relative flex h-2 w-2 mr-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B2635] dark:bg-[#E88294] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B2635] dark:bg-[#E88294]"></span>
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#735E50] dark:text-[#C5B4A5]">
                  Countdown to Sacred Muhoortham
                </p>
                <div className="inline-flex items-center justify-center w-5 h-5">
                  <Hourglass
                    className="w-3.5 h-3.5 text-[#C5A059] transition-transform duration-700 ease-in-out"
                    style={{ transform: `rotate(${hourglassAngle}deg)` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center my-auto">
                {/* Days */}
                <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F4EADE] dark:from-[#2A201A] dark:via-[#221914] dark:to-[#1B1410] py-2.5 sm:py-3 px-1 rounded-xl border border-[#DDD0C0] dark:border-[#42332A] shadow-2xs hover:border-[#C5A059] transition-colors overflow-hidden">
                  <div className="flex justify-center gap-3 absolute top-1 inset-x-0 pointer-events-none">
                    <span className="w-1 h-1 rounded-full bg-[#8B2635]/30 dark:bg-[#E88294]/30"></span>
                    <span className="w-1 h-1 rounded-full bg-[#8B2635]/30 dark:bg-[#E88294]/30"></span>
                  </div>
                  <div className="absolute top-[48%] left-0 right-0 h-[1px] bg-[#E5D7C7] dark:bg-[#382B23] z-10 pointer-events-none"></div>
                  <div key={timeLeft.days} className="calendar-flip-card">
                    <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#8B2635] dark:text-[#E88294] tabular-nums">
                      {timeLeft.days}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#735E50] dark:text-[#B5A496] uppercase tracking-wider relative z-20">Days</span>
                </div>

                {/* Hours */}
                <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F4EADE] dark:from-[#2A201A] dark:via-[#221914] dark:to-[#1B1410] py-2.5 sm:py-3 px-1 rounded-xl border border-[#DDD0C0] dark:border-[#42332A] shadow-2xs hover:border-[#C5A059] transition-colors overflow-hidden">
                  <div className="flex justify-center gap-3 absolute top-1 inset-x-0 pointer-events-none">
                    <span className="w-1 h-1 rounded-full bg-[#8B2635]/30 dark:bg-[#E88294]/30"></span>
                    <span className="w-1 h-1 rounded-full bg-[#8B2635]/30 dark:bg-[#E88294]/30"></span>
                  </div>
                  <div className="absolute top-[48%] left-0 right-0 h-[1px] bg-[#E5D7C7] dark:bg-[#382B23] z-10 pointer-events-none"></div>
                  <div key={timeLeft.hours} className="calendar-flip-card">
                    <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#8B2635] dark:text-[#E88294] tabular-nums">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#735E50] dark:text-[#B5A496] uppercase tracking-wider relative z-20">Hours</span>
                </div>

                {/* Minutes */}
                <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F4EADE] dark:from-[#2A201A] dark:via-[#221914] dark:to-[#1B1410] py-2.5 sm:py-3 px-1 rounded-xl border border-[#DDD0C0] dark:border-[#42332A] shadow-2xs hover:border-[#C5A059] transition-colors overflow-hidden">
                  <div className="flex justify-center gap-3 absolute top-1 inset-x-0 pointer-events-none">
                    <span className="w-1 h-1 rounded-full bg-[#8B2635]/30 dark:bg-[#E88294]/30"></span>
                    <span className="w-1 h-1 rounded-full bg-[#8B2635]/30 dark:bg-[#E88294]/30"></span>
                  </div>
                  <div className="absolute top-[48%] left-0 right-0 h-[1px] bg-[#E5D7C7] dark:bg-[#382B23] z-10 pointer-events-none"></div>
                  <div key={timeLeft.minutes} className="calendar-flip-card">
                    <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#8B2635] dark:text-[#E88294] tabular-nums">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#735E50] dark:text-[#B5A496] uppercase tracking-wider relative z-20">Mins</span>
                </div>

                {/* Seconds */}
                <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F4EADE] dark:from-[#2A201A] dark:via-[#221914] dark:to-[#1B1410] py-2.5 sm:py-3 px-1 rounded-xl border border-[#DDD0C0] dark:border-[#42332A] shadow-2xs hover:border-[#C5A059] transition-colors overflow-hidden">
                  <div className="flex justify-center gap-3 absolute top-1 inset-x-0 pointer-events-none">
                    <span className="w-1 h-1 rounded-full bg-[#8B2635]/40 dark:bg-[#E88294]/40"></span>
                    <span className="w-1 h-1 rounded-full bg-[#8B2635]/40 dark:bg-[#E88294]/40"></span>
                  </div>
                  <div className="absolute top-[48%] left-0 right-0 h-[1px] bg-[#E5D7C7] dark:bg-[#382B23] z-10 pointer-events-none"></div>
                  <div key={timeLeft.seconds} className="calendar-flip-card">
                    <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#8B2635] dark:text-[#E88294] tabular-nums">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#735E50] dark:text-[#B5A496] uppercase tracking-wider relative z-20">Secs</span>
                </div>
              </div>
            </div>

            {/* Right Column: Action Matrix (1x4 single row on mobile, 2x2 on sm/desktop) */}
            <div className="md:col-span-5 grid grid-cols-4 sm:grid-cols-2 gap-2 h-full">
              {/* 1. GPS Directions */}
              <button
                onClick={onNavigateToGps}
                title="GPS Directions to Venues"
                aria-label="GPS Directions"
                className="h-full flex flex-col items-center justify-center gap-1.5 p-2 sm:p-3 text-xs sm:text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] dark:bg-[#A83244] dark:hover:bg-[#912536] rounded-2xl transition-colors shadow-2xs text-center cursor-pointer min-h-[46px] sm:min-h-[68px]"
              >
                <Compass className="w-5 h-5 sm:w-4 sm:h-4 shrink-0 text-[#E6C687]" />
                <span className="hidden sm:inline leading-tight text-[11px] sm:text-xs">GPS Directions</span>
              </button>

              {/* 2. Share Invitation */}
              <button
                onClick={handleShare}
                title="Share Invitation Link"
                aria-label="Share Invitation"
                className="h-full flex flex-col items-center justify-center gap-1.5 p-2 sm:p-3 text-xs sm:text-sm font-semibold text-[#4A3D34] dark:text-[#E8D9CD] bg-white dark:bg-[#201814] hover:bg-[#FAF7F2] dark:hover:bg-[#2A201B] rounded-2xl border border-[#D9CABB] dark:border-[#382B24] transition-colors shadow-2xs text-center cursor-pointer min-h-[46px] sm:min-h-[68px]"
              >
                {copiedLink ? (
                  <Check className="w-5 h-5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <Share2 className="w-5 h-5 sm:w-4 sm:h-4 text-[#8B2635] dark:text-[#E88294] shrink-0" />
                )}
                <span className="hidden sm:inline leading-tight text-[11px] sm:text-xs">{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              {/* 3. Add to Calendar */}
              <button
                onClick={handleAddToCalendar}
                title="Add Wedding to Calendar"
                aria-label="Add to Calendar"
                className="h-full flex flex-col items-center justify-center gap-1.5 p-2 sm:p-3 text-xs sm:text-sm font-semibold text-[#4A3D34] dark:text-[#E8D9CD] bg-white dark:bg-[#201814] hover:bg-[#FAF7F2] dark:hover:bg-[#2A201B] rounded-2xl border border-[#D9CABB] dark:border-[#382B24] transition-colors shadow-2xs text-center cursor-pointer min-h-[46px] sm:min-h-[68px]"
              >
                <Calendar className="w-5 h-5 sm:w-4 sm:h-4 text-[#8B2635] dark:text-[#E88294] shrink-0" />
                <span className="hidden sm:inline leading-tight text-[11px] sm:text-xs">Add Calendar</span>
              </button>

              {/* 4. Send Blessing Card */}
              <button
                onClick={onNavigateToBlessings}
                title="Send Your Sacred Blessing"
                aria-label="Send Blessing"
                className="h-full flex flex-col items-center justify-center gap-1.5 p-2 sm:p-3 text-xs sm:text-sm font-semibold text-[#8B2635] dark:text-[#E88294] bg-[#FAF3E8] dark:bg-[#2A1E18] hover:bg-[#F3E7D5] dark:hover:bg-[#35261F] rounded-2xl border border-[#DECDB8] dark:border-[#48372D] transition-colors shadow-2xs text-center cursor-pointer min-h-[46px] sm:min-h-[68px]"
              >
                <Heart className="w-5 h-5 sm:w-4 sm:h-4 text-[#8B2635] dark:text-[#E88294] shrink-0 fill-[#8B2635]/20 dark:fill-[#E88294]/20" />
                <span className="hidden sm:inline leading-tight text-[11px] sm:text-xs font-bold">Send Blessing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
