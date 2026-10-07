import React, { useState, useEffect } from 'react';
import { Send, Heart, User, Sparkles, Check, MessageSquare } from 'lucide-react';

interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  attending: string;
  date: string;
}

const DEFAULT_BLESSINGS: Blessing[] = [
  {
    id: 'seed-1',
    name: 'Vishnu Vikraman Pillai & Family',
    relation: "Groom's Brother",
    message: 'Wishing our dear Jishnu and Praveena a lifetime filled with unconditional love, good health, and infinite happiness together. Can’t wait to celebrate!',
    attending: 'Attending (Family)',
    date: 'Auspicious Family Blessing',
  },
  {
    id: 'seed-2',
    name: 'Unnikrishnan & Deepa',
    relation: 'Family Friend, Karunagappally',
    message: 'Heartiest congratulations to Jishnu & Praveena! May Bhagavathi bless both of you with joy, prosperity, and peace.',
    attending: 'Attending (2 Guests)',
    date: 'Blessing',
  },
  {
    id: 'seed-3',
    name: 'Radhakrishnan Nair',
    relation: 'Elder, Kunnamthanam',
    message: 'Prayers and divine blessings from Madathilkavu Bhagavathi Temple for a blissful married life.',
    attending: 'Attending',
    date: 'Elder Blessing',
  },
];

export const BlessingsGuestbook: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>(DEFAULT_BLESSINGS);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [attending, setAttending] = useState('Attending in person');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('wedding_blessings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlessings(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not load stored blessings:', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newBlessing: Blessing = {
      id: `blessing-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim() || 'Well-wisher',
      message: message.trim(),
      attending,
      date: 'Just now',
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    try {
      localStorage.setItem('wedding_blessings', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setName('');
    setRelation('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="wishes" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#ECE2D0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635]">
            Guestbook & Warm Wishes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] mt-2 text-balance">
            Blessings for Jishnu & Praveena
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] mt-2">
            Leave your heartfelt wishes, prayers, or let the family know you are coming to grace the ceremony.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <div className="lg:col-span-5 bg-white border border-[#E3D8C8] rounded-2xl p-6 sm:p-7 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#8B2635] mb-1">
              Send Your Sacred Blessings
            </h3>
            <p className="text-xs text-[#735E50] mb-5">
              Your message will be shared with the couple and their families.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-[#2C241E] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D9CABB] rounded-lg focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#2C241E] mb-1">Relationship / Native Town</label>
                <input
                  type="text"
                  placeholder="e.g. Friend from Karunagappally / Colleague"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D9CABB] rounded-lg focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#2C241E] mb-1">Ceremony Attendance / RSVP</label>
                <select
                  value={attending}
                  onChange={(e) => setAttending(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D9CABB] rounded-lg focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9]"
                >
                  <option value="Attending in person">Attending in person at Kunnamthanam</option>
                  <option value="Joining Groom's party from Karunagappally">Joining Groom&apos;s party from Karunagappally (8:00 AM)</option>
                  <option value="Sending prayers & blessings from afar">Sending prayers & blessings from afar</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#2C241E] mb-1">Your Heartfelt Blessing / Message *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your prayers, wishes, or wedding congratulations..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#D9CABB] rounded-lg focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Blessing Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Wedding Blessing</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Blessings Feed */}
          <div className="lg:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-1">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-[#E3D8C8] rounded-xl p-4 sm:p-5 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E3D8C8] flex items-center justify-center text-[#8B2635] font-bold text-xs shrink-0">
                      {b.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#2C241E]">{b.name}</p>
                      <p className="text-[11px] text-[#735E50]">{b.relation}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#8B2635] font-medium">{b.attending}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5D4F44] italic leading-relaxed pl-10">
                  &ldquo;{b.message}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
