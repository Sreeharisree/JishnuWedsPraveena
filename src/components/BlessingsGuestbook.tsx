import React, { useState } from 'react';
import { Send, Check, Mail, Heart } from 'lucide-react';

export const BlessingsGuestbook: React.FC = () => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [attending, setAttending] = useState('Attending in person at Kunnamthanam');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSending(true);

    const blessingPayload = {
      name: name.trim(),
      relation: relation.trim(),
      attending,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      recipient: 'jweddsp@gmail.com',
    };

    // Store in guestbook record for permanent record
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_guestbook_blessings') || '[]');
      existing.push(blessingPayload);
      localStorage.setItem('wedding_guestbook_blessings', JSON.stringify(existing));
    } catch {
      // Ignore localStorage quotas
    }

    // Deliver real email in background directly to jweddsp@gmail.com without opening Gmail
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('relation', relation.trim() || 'Well-wisher / Guest');
      formData.append('rsvp_attendance', attending);
      formData.append('blessing_message', message.trim());
      formData.append('_subject', `Sacred Wedding Blessing for Jishnu & Praveena from ${name.trim()}`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      await fetch('https://formsubmit.co/ajax/jweddsp@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
    } catch {
      // Fallback: beacon dispatch
      try {
        if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
          const beaconData = new FormData();
          beaconData.append('name', name.trim());
          beaconData.append('relation', relation.trim() || 'Well-wisher');
          beaconData.append('attendance', attending);
          beaconData.append('blessing', message.trim());
          beaconData.append('_captcha', 'false');
          navigator.sendBeacon('https://formsubmit.co/ajax/jweddsp@gmail.com', beaconData);
        }
      } catch {
        // Handled silently
      }
    }

    setSending(false);
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setRelation('');
      setMessage('');
      setSubmitted(false);
    }, 4500);
  };

  return (
    <section id="wishes" className="py-10 md:py-16 bg-[#FAF7F2] border-t border-[#ECE2D0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-7">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635]">
            Sacred Blessings & RSVP
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] mt-2 text-balance">
            Blessings for Jishnu & Praveena
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] mt-2">
            Send your heartfelt prayers, wishes, or RSVP directly to the couple.
          </p>
        </div>

        {/* Centered Single Blessing Delivery Card (Private Delivery) */}
        <div className="max-w-xl mx-auto bg-white border border-[#E3D8C8] rounded-3xl p-6 sm:p-9 shadow-sm relative overflow-hidden">
          {/* Subtle Corner Gold Ornament */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#C5A059]/15 via-[#8B2635]/5 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-[#8B2635]" />
            <h3 className="font-serif text-xl font-bold text-[#8B2635]">
              Deliver Your Blessing to the Couple
            </h3>
          </div>
          <p className="text-xs text-[#735E50] mb-6">
            Your sacred message will be conveyed privately to Jishnu & Praveena to cherish forever.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-medium text-[#2C241E] mb-1">
                Your Full Name <span className="text-[#8B2635]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Goutham Krishna"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D9CABB] rounded-xl focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#2C241E] mb-1">
                Relationship
              </label>
              <input
                type="text"
                placeholder="e.g. Cousin / friend / collegue"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D9CABB] rounded-xl focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#2C241E] mb-1">
                Ceremony Attendance / RSVP
              </label>
              <select
                value={attending}
                onChange={(e) => setAttending(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D9CABB] rounded-xl focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9]"
              >
                <option value="Attending in person at Kunnamthanam">
                  Attending in person at Madathilkavu Temple
                </option>
                <option value="Joining Groom's party from Karunagappally (8:00 AM)">
                  Joining Groom&apos;s party from Karunagappally (8:00 AM)
                </option>
                <option value="Sending divine prayers & blessings from afar">
                  Sending divine prayers & blessings from afar
                </option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#2C241E] mb-1">
                Your Sacred Blessing / Message <span className="text-[#8B2635]">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Write your prayers, congratulations, or blessings for Jishnu & Praveena..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D9CABB] rounded-xl focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending || submitted}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] disabled:opacity-85 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending Your Blessing...</span>
                </>
              ) : submitted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Blessing Sent Directly & Privately!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Blessing & Wishes</span>
                </>
              )}
            </button>
          </form>

          {/* Delivery Note */}
          <div className="mt-4 pt-4 border-t border-[#ECE2D0] flex items-center justify-center gap-1.5 text-xs text-[#735E50]">
            <Heart className="w-3.5 h-3.5 text-[#8B2635]" />
            <span>Delivered directly to Jishnu & Praveena with divine grace.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
