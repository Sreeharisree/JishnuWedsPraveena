import React, { useState } from 'react';
import {
  Navigation,
  Compass,
  Car,
  ExternalLink,
  Copy,
  Check,
  Clock,
  Phone,
  AlertCircle,
  Sparkles,
  Home,
} from 'lucide-react';
import { WEDDING_DATA, LocationDetail } from '../data/weddingDetails';
import {
  calculateDistanceKm,
  estimateDrivingMinutes,
  formatDriveTime,
  createGoogleMapsDirectionsUrl,
  createAppleMapsDirectionsUrl,
} from '../utils/geo';

export const GpsNavigationSection: React.FC = () => {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const { groomHome, weddingVenue } = WEDDING_DATA.locations;

  // Request browser geolocation to compute live distance & driving ETA
  const handleGetLocation = () => {
    setGeoLoading(true);
    setGeoError(null);

    if (!('geolocation' in navigator)) {
      setGeoError('Geolocation is not supported by your browser.');
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGeoLoading(false);
      },
      (err) => {
        let msg = 'Could not access your location.';
        if (err.code === 1) {
          msg = 'Location permission was denied. You can still tap Google Maps below for directions.';
        } else if (err.code === 2) {
          msg = 'Location unavailable. Please check GPS signal.';
        } else if (err.code === 3) {
          msg = 'Location request timed out.';
        }
        setGeoError(msg);
        setGeoLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleCopyAddress = (location: LocationDetail) => {
    const textToCopy = `${location.title}\n${location.address}\nGPS: ${location.latitude}, ${location.longitude}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAddress(location.id);
    setTimeout(() => setCopiedAddress(null), 2500);
  };

  const renderLocationCard = (
    location: LocationDetail,
    badgeText: string,
    badgeIcon: React.ReactNode,
    smallMsg: string,
    _embedBbox?: string
  ) => {
    const distanceKm = userCoords
      ? calculateDistanceKm(userCoords.lat, userCoords.lng, location.latitude, location.longitude)
      : null;
    const etaMinutes = distanceKm ? estimateDrivingMinutes(distanceKm) : null;

    return (
      <div className="bg-white dark:bg-[#1A1412] border border-[#E3D8C8] dark:border-[#382B24] rounded-3xl p-6 sm:p-7 shadow-xs dark:shadow-xl hover:shadow-md transition-all duration-300 flex flex-col justify-between">
        <div>
          {/* Card Badge & Heading */}
          <div className="pb-4 border-b border-[#ECE2D0] dark:border-[#33261F]">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8B2635] dark:text-[#E88294] mb-1.5">
              {badgeIcon}
              <span>{badgeText}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2C241E] dark:text-[#FAF5EE]">
              {location.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#8B2635] dark:text-[#E88294] font-medium mt-1">
              {smallMsg}
            </p>
          </div>

          {/* Address & Landmark */}
          <div className="my-4 p-4 bg-[#FAF7F2] dark:bg-[#251D18] border border-[#EBE0D2] dark:border-[#382B24] rounded-2xl space-y-2 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Address: </span>
              <span className="text-[#5D4F44] dark:text-[#C5B4A5]">{location.address}</span>
            </div>
            <div>
              <span className="font-bold text-[#3B2D22] dark:text-[#EFE2D5]">Landmark: </span>
              <span className="text-[#5D4F44] dark:text-[#C5B4A5]">{location.landmark}</span>
            </div>
            {location.departureTime && (
              <div className="pt-1 text-[#8B2635] dark:text-[#E88294] font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{location.departureTime}</span>
              </div>
            )}
          </div>

          {/* GPS Live Calculated Distance Display (if enabled) */}
          {distanceKm !== null && (
            <div className="mb-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
              <div>
                <p className="font-semibold">Distance from your position:</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">Estimated driving time:</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-base text-emerald-900 dark:text-emerald-100">{distanceKm} km</p>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{formatDriveTime(etaMinutes || 0)}</p>
              </div>
            </div>
          )}

          {/* Small Embedded Map View Inside Card */}
          <div className="mb-5 rounded-2xl overflow-hidden border border-[#D9CABB] dark:border-[#382B24] bg-[#FAF7F2] dark:bg-[#201814] shadow-2xs h-[210px] sm:h-[230px] relative">
            <iframe
              title={`Map of ${location.title}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&hl=en&z=15&output=embed`}
            />
          </div>
        </div>

        {/* Navigation Launchers & Actions */}
        <div className="space-y-2.5 pt-2 border-t border-[#ECE2D0] dark:border-[#33261F]">
          {/* Maps Navigation: Google Maps & Apple Maps only */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={
                location.googleMapsUrl ||
                createGoogleMapsDirectionsUrl(
                  location.latitude,
                  location.longitude,
                  userCoords?.lat,
                  userCoords?.lng
                )
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] dark:bg-[#A83244] dark:hover:bg-[#912536] rounded-xl transition-colors shadow-xs"
            >
              <Navigation className="w-4 h-4" />
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href={createAppleMapsDirectionsUrl(location.latitude, location.longitude, location.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#4A3D34] dark:text-[#E8D9CD] bg-[#FAF7F2] dark:bg-[#251D18] hover:bg-[#F0E6D8] dark:hover:bg-[#2E221D] border border-[#D9CABB] dark:border-[#382B24] rounded-xl transition-colors shadow-2xs"
            >
              <Car className="w-4 h-4 text-[#8B2635] dark:text-[#E88294]" />
              <span>Apple Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Copy Address Button */}
          <button
            onClick={() => handleCopyAddress(location)}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#6B5A4E] dark:text-[#BFAFA2] hover:text-[#2C241E] dark:hover:text-[#FAF5EE] hover:bg-[#FAF7F2] dark:hover:bg-[#251D18] rounded-lg transition-colors border border-transparent hover:border-[#E8DEC8] dark:hover:border-[#382B24] cursor-pointer"
          >
            {copiedAddress === location.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">Address & Coordinates Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#735E50] dark:text-[#A8988B]" />
                <span>Copy Address & Coordinates</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="gps-navigation" className="py-10 md:py-16 bg-[#F5EFE6]/60 dark:bg-[#15100E] border-t border-[#E8DEC8] dark:border-[#261E1A] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635] dark:text-[#E88294]">
            GPS Navigation & Directions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] dark:text-[#FAF5EE] mt-2 text-balance">
            Find Your Way to the Celebrations
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] dark:text-[#BFAFA2] mt-2">
            Direct GPS routes to the sacred wedding sanctum at Madathilkavu Bhagavathi Temple and the Groom&apos;s residence in Karunagappally.
          </p>
        </div>

        {/* Two Distinct Side-by-Side Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-10">
          {/* Card 1: Wedding Venue */}
          {renderLocationCard(
            weddingVenue,
            'Wedding Venue & Sanctum',
            <Sparkles className="w-4 h-4 text-[#C5A059]" />,
            'Auspicious Muhoortham: 11:50 AM – 12:10 PM • Sacred Thalikettu & Ceremony',
            '76.5890%2C9.3915%2C76.6490%2C9.4515'
          )}

          {/* Card 2: Groom's Home */}
          {renderLocationCard(
            groomHome,
            "Groom's Home & Residence",
            <Home className="w-4 h-4 text-[#8B2635] dark:text-[#E88294]" />,
            'Departure: 8:00 AM from C. N. Junction • Family Residence & Gathering',
            '76.522164%2C9.009832%2C76.582164%2C9.069832'
          )}
        </div>

        {/* Live GPS Distance Activation Bar (Moved to Bottom) */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#1A1412] border border-[#E3D8C8] dark:border-[#382B24] rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#251D18] text-[#8B2635] dark:text-[#E88294] border border-[#EBE0D2] dark:border-[#382B24]">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2C241E] dark:text-[#FAF5EE]">
                {userCoords
                  ? 'Your GPS Location is Active'
                  : 'Calculate Distance & Driving Time from Your Location'}
              </p>
              <p className="text-xs text-[#735E50] dark:text-[#B5A496]">
                {userCoords
                  ? `Lat: ${userCoords.lat.toFixed(4)}, Lng: ${userCoords.lng.toFixed(4)}`
                  : 'Tap to measure live driving distance and time from where you are right now'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleGetLocation}
              disabled={geoLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] dark:bg-[#A83244] dark:hover:bg-[#912536] rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap disabled:opacity-70"
            >
              <Navigation className="w-4 h-4" />
              <span>{geoLoading ? 'Detecting GPS...' : userCoords ? 'Refresh My GPS' : 'Enable My GPS'}</span>
            </button>
          </div>
        </div>

        {geoError && (
          <div className="mb-6 p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>{geoError}</span>
          </div>
        )}

        {/* Travel Assistance Footer */}
        <div className="p-5 sm:p-6 bg-white dark:bg-[#1A1412] border border-[#E3D8C8] dark:border-[#382B24] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm text-[#735E50] dark:text-[#B5A496]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8B2635]/10 dark:bg-[#E88294]/20 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#8B2635] dark:text-[#E88294]" />
            </div>
            <div>
              <p className="font-semibold text-[#2C241E] dark:text-[#FAF5EE]">Need route guidance or parking assistance?</p>
              <p className="text-xs text-[#735E50] dark:text-[#B5A496]">Contact our family hosts:</p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-3 sm:gap-4 w-full md:w-auto">
            <a
              href="tel:9656795970"
              className="flex-1 md:flex-initial flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#251D18] hover:bg-[#F3EBE0] dark:hover:bg-[#2E221D] active:bg-[#ECE0D0] border border-[#E8DEC8] dark:border-[#382B24] hover:border-[#8B2635]/30 transition-all text-left group shadow-2xs"
              title="Call K. P. Vikraman Pillai"
            >
              <Phone className="w-3.5 h-3.5 text-[#8B2635] dark:text-[#E88294] group-hover:scale-110 transition-transform shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-xs sm:text-sm text-[#2C241E] dark:text-[#FAF5EE] group-hover:text-[#8B2635] dark:group-hover:text-[#E88294] transition-colors leading-tight">
                  K. P. Vikraman Pillai
                </span>
                <span className="font-mono text-xs text-[#8B2635] dark:text-[#E88294] font-semibold tracking-wide mt-0.5">
                  96567 95970
                </span>
              </div>
            </a>

            <a
              href="tel:9947252533"
              className="flex-1 md:flex-initial flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#251D18] hover:bg-[#F3EBE0] dark:hover:bg-[#2E221D] active:bg-[#ECE0D0] border border-[#E8DEC8] dark:border-[#382B24] hover:border-[#8B2635]/30 transition-all text-left group shadow-2xs"
              title="Call Goutham J Krishna"
            >
              <Phone className="w-3.5 h-3.5 text-[#8B2635] dark:text-[#E88294] group-hover:scale-110 transition-transform shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-xs sm:text-sm text-[#2C241E] dark:text-[#FAF5EE] group-hover:text-[#8B2635] dark:group-hover:text-[#E88294] transition-colors leading-tight">
                  Goutham J Krishna
                </span>
                <span className="font-mono text-xs text-[#8B2635] dark:text-[#E88294] font-semibold tracking-wide mt-0.5">
                  99472 52533
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
