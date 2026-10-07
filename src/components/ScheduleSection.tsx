import React from 'react';
import { Clock, MapPin, Utensils, Sparkles, Navigation } from 'lucide-react';

interface ScheduleSectionProps {
  onNavigateToGps: () => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onNavigateToGps }) => {
  const events = [
    {
      time: '08:00 AM',
      title: "Groom's Party Departure",
      location: 'C. N. Junction, Karunagappally',
      description:
        'The groom, family members, and well-wishers assemble at Kizhakkupurathu and start the procession journey towards Kunnamthanam.',
      icon: Navigation,
      highlight: false,
    },
    {
      time: '10:30 AM',
      title: 'Arrival & Traditional Welcoming (Nadavaravu)',
      location: 'Madathilkavu Bhagavathi Temple Entrance',
      description:
        'Ceremonial welcome with auspicious Thalappoli, traditional Nadaswaram, and temple greetings by the bride’s family.',
      icon: Sparkles,
      highlight: false,
    },
    {
      time: '11:50 AM – 12:10 PM',
      title: 'Sacred Muhoortham & Thalikettu',
      location: 'Temple Kalyana Mandapam Sanctum',
      description:
        'The most auspicious moment: tying of the sacred Mangalsutra (Thali), floral garland exchange (Varmala), and Sindoor daan with Vedic chanting.',
      icon: Clock,
      highlight: true,
    },
    {
      time: '12:30 PM Onwards',
      title: 'Traditional Kerala Sadya (Wedding Feast)',
      location: 'Temple Oottupura / Dining Hall',
      description:
        'A lavish multi-course traditional Kerala vegetarian feast served on plantain leaves, accompanied by classic payasams.',
      icon: Utensils,
      highlight: false,
    },
  ];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-[#F5EFE6]/50 border-t border-[#ECE2D0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635]">
            Auspicious Order of Events
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] mt-2 text-balance">
            Wedding Day Schedule
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] mt-2">
            Sunday, 06 December 2026 (20th Vrichikam 1202)
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C5A059]/40 space-y-8 sm:space-y-10">
          {events.map((event, idx) => {
            const Icon = event.icon;
            return (
              <div key={`event-${idx}`} className="relative group">
                {/* Timeline Node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 ${
                    event.highlight
                      ? 'bg-[#8B2635] text-white border-[#C5A059] shadow-xs'
                      : 'bg-white text-[#8B2635] border-[#D9CABB]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Content Card */}
                <div
                  className={`p-5 sm:p-6 rounded-xl border transition-all ${
                    event.highlight
                      ? 'bg-[#FFFDF9] border-[#C5A059] shadow-sm ring-1 ring-[#C5A059]/30'
                      : 'bg-white border-[#E3D8C8] shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span
                      className={`text-xs font-bold font-mono tracking-wider ${
                        event.highlight ? 'text-[#8B2635]' : 'text-[#735E50]'
                      }`}
                    >
                      {event.time}
                    </span>
                    <span className="text-xs font-medium text-[#5D4F44] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8B2635]" />
                      <span>{event.location}</span>
                    </span>
                  </div>

                  <h3
                    className={`font-serif text-lg sm:text-xl font-bold ${
                      event.highlight ? 'text-[#8B2635]' : 'text-[#2C241E]'
                    }`}
                  >
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5D4F44] mt-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onNavigateToGps}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#8B2635] hover:text-white bg-[#F0E6D8] hover:bg-[#8B2635] rounded-lg transition-colors border border-[#D9CABB] cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Check Routes & GPS for the Morning Departure</span>
          </button>
        </div>
      </div>
    </section>
  );
};
