import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Share2, Compass, Check, Download } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingDetails';

interface HeroSectionProps {
  onOpenCardModal: () => void;
  onNavigateToGps: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCardModal, onNavigateToGps }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Wedding Muhurtham: 06 Dec 2026 11:50 AM IST (UTC+5:30)
  useEffect(() => {
    const weddingTimestamp = new Date('2026-12-06T11:50:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = weddingTimestamp - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Wedding Invitation: Jishnu & Praveena',
      text: 'You are cordially invited to the wedding of Jishnu Vikraman Pillai & K.S. Praveena on Sunday, 06 December 2026 at Madathilkavu Bhagavathi Temple, Kunnamthanam.',
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
    // Google Calendar direct URL
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
    <section id="invitation" className="relative py-12 md:py-20 overflow-hidden">
      {/* Background Subtle Kerala Temple Motif Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#8B2635_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
        {/* Traditional Invitation Header Card Frame */}
        <div className="bg-[#FFFDF9] border border-[#E8DCC8] rounded-2xl shadow-sm p-6 sm:p-10 md:p-12 relative overflow-hidden">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#C5A059] opacity-80" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#C5A059] opacity-80" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#C5A059] opacity-80" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#C5A059] opacity-80" />

          {/* Traditional Auspicious Greeting */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8B2635]">
              ॥ ॐ ശ്രീ മഹാഗണപതയേ നമഃ ॥
            </span>
            <p className="mt-2 text-xs sm:text-sm font-medium tracking-wide uppercase text-[#735E50]">
              Together with Our Families
            </p>
            <p className="mt-1 text-sm sm:text-base italic text-[#4A3D34] font-traditional">
              We cordially invite you and your family to grace the wedding ceremony of our beloved son
            </p>
          </div>

          {/* Couple Names */}
          <div className="my-6 sm:my-8 space-y-2">
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

          {/* Auspicious Date & Muhurtham Details (No pill boxes, clean typographic layout) */}
          <div className="max-w-xl mx-auto my-6 sm:my-8 py-5 border-y border-[#ECE2D0] grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="space-y-1 sm:border-r sm:border-[#ECE2D0] sm:pr-4">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#735E50]">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>Wedding Date</span>
              </div>
              <p className="text-lg font-bold text-[#2C241E]">Sunday, 06 Dec 2026</p>
              <p className="text-xs text-[#735E50]">20th Vrichikam 1202 (Kollavarsham)</p>
            </div>

            <div className="space-y-1 sm:pl-4">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#735E50]">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Sacred Muhoortham</span>
              </div>
              <p className="text-lg font-bold text-[#8B2635]">11:50 AM – 12:10 PM</p>
              <p className="text-xs text-[#735E50]">Groom party departs 8:00 AM from C. N. Jn</p>
            </div>
          </div>

          {/* Venue Notice */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#735E50] mb-1">
              <MapPin className="w-4 h-4 text-[#8B2635]" />
              <span>Wedding Sanctum & Venue</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C241E]">
              {WEDDING_DATA.ceremony.venueName}
            </h3>
            <p className="text-sm text-[#5D4F44] mt-0.5">
              {WEDDING_DATA.ceremony.venueLocation}
            </p>
          </div>

          {/* Countdown Clock to Sacred Muhoortham */}
          <div className="max-w-lg mx-auto bg-[#F7F2EA] rounded-xl p-4 sm:p-5 mb-8 border border-[#E6DBCE]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#735E50] mb-3">
              Countdown to the Sacred Muhoortham
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white/80 py-2.5 px-1 rounded-lg border border-[#E3D8C8]">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#8B2635] tabular-nums">
                  {timeLeft.days}
                </span>
                <span className="text-[11px] font-medium text-[#735E50] uppercase">Days</span>
              </div>
              <div className="bg-white/80 py-2.5 px-1 rounded-lg border border-[#E3D8C8]">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#8B2635] tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-medium text-[#735E50] uppercase">Hours</span>
              </div>
              <div className="bg-white/80 py-2.5 px-1 rounded-lg border border-[#E3D8C8]">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#8B2635] tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-medium text-[#735E50] uppercase">Mins</span>
              </div>
              <div className="bg-white/80 py-2.5 px-1 rounded-lg border border-[#E3D8C8]">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#8B2635] tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-medium text-[#735E50] uppercase">Secs</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNavigateToGps}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>GPS Directions & Routes</span>
            </button>

            <button
              onClick={onOpenCardModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#3B2D22] bg-[#F0E6D8] hover:bg-[#E7DBCB] active:bg-[#DECFC0] rounded-lg transition-colors cursor-pointer border border-[#D9CABB]"
            >
              <span>View Original Invitation Card</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#4A3D34] bg-white hover:bg-[#F9F5EE] rounded-lg transition-colors cursor-pointer border border-[#D9CABB]"
            >
              <Calendar className="w-4 h-4 text-[#8B2635]" />
              <span>Add to Calendar</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#4A3D34] bg-white hover:bg-[#F9F5EE] rounded-lg transition-colors cursor-pointer border border-[#D9CABB]"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#735E50]" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
