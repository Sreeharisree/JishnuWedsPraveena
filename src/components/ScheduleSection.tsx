import React from 'react';
import { Clock, Navigation, Bell, Heart } from 'lucide-react';

interface ScheduleSectionProps {
  onNavigateToGps?: () => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = () => {
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
      icon: Bell,
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
      time: '12:20 PM Onwards',
      title: 'Mangala Ashamsakal & Blessings',
      location: 'Kalyana Mandapam Stage',
      description:
        'Congratulating the newlywed couple, receiving heartfelt blessings from elders and family members, and commemorative photographs.',
      icon: Heart,
      highlight: false,
    },
  ];

  return (
    <section id="schedule" className="py-10 md:py-16 bg-[#F5EFE6]/50 dark:bg-[#15100E] border-t border-[#ECE2D0] dark:border-[#261E1A] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635] dark:text-[#E88294]">
            Auspicious Order of Events
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] dark:text-[#FAF5EE] mt-2 text-balance">
            Wedding Day Schedule
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] dark:text-[#BFAFA2] mt-2">
            Sunday, 06 December 2026 (20th Vrichikam 1202)
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D9CABB] dark:border-[#382B24] space-y-10 sm:space-y-12">
          {events.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                    evt.highlight
                      ? 'bg-[#8B2635] dark:bg-[#A83244] text-white border-[#C5A059] dark:border-[#D4AF37] shadow-md'
                      : 'bg-[#FFFDF9] dark:bg-[#1E1714] text-[#8B2635] dark:text-[#E88294] border-[#D9CABB] dark:border-[#382B24]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Event Card */}
                <div
                  className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    evt.highlight
                      ? 'bg-[#FFFDF9] dark:bg-[#201814] border-[#C5A059] dark:border-[#D4AF37] shadow-md dark:shadow-xl'
                      : 'bg-[#FFFDF9]/80 dark:bg-[#1A1412] border-[#E8DEC8] dark:border-[#382B24] hover:border-[#D9CABB] dark:hover:border-[#4B3B30]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        evt.highlight
                          ? 'bg-[#8B2635] dark:bg-[#A83244] text-white'
                          : 'bg-[#F0E6D8] dark:bg-[#2C211B] text-[#5A1723] dark:text-[#E88294]'
                      }`}
                    >
                      {evt.time}
                    </span>
                    <span className="text-xs text-[#8C7A6D] dark:text-[#A8988B]">{evt.location}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C241E] dark:text-[#FAF5EE] mt-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D4F44] dark:text-[#C5B4A5] mt-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
