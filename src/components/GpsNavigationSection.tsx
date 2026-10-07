import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Car,
  ExternalLink,
  Copy,
  Check,
  Clock,
  Phone,
  AlertCircle,
  Share2,
  Route,
} from 'lucide-react';
import { WEDDING_DATA, LocationDetail } from '../data/weddingDetails';
import {
  calculateDistanceKm,
  estimateDrivingMinutes,
  formatDriveTime,
  createGoogleMapsDirectionsUrl,
  createAppleMapsDirectionsUrl,
  createWazeDirectionsUrl,
} from '../utils/geo';

export const GpsNavigationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wedding' | 'groom'>('wedding');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [mapViewMode, setMapViewMode] = useState<'schematic' | 'interactive'>('interactive');

  const { groomHome, weddingVenue } = WEDDING_DATA.locations;
  const activeLocation = activeTab === 'wedding' ? weddingVenue : groomHome;

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

  // Calculations
  const distanceToVenue = userCoords
    ? calculateDistanceKm(userCoords.lat, userCoords.lng, weddingVenue.latitude, weddingVenue.longitude)
    : null;
  const distanceToGroom = userCoords
    ? calculateDistanceKm(userCoords.lat, userCoords.lng, groomHome.latitude, groomHome.longitude)
    : null;

  const currentDist = activeTab === 'wedding' ? distanceToVenue : distanceToGroom;
  const currentEta = currentDist ? estimateDrivingMinutes(currentDist) : null;

  // Between the two locations (Karunagappally -> Kunnamthanam)
  const distBetweenGroomAndVenue = calculateDistanceKm(
    groomHome.latitude,
    groomHome.longitude,
    weddingVenue.latitude,
    weddingVenue.longitude
  );
  const etaBetween = estimateDrivingMinutes(distBetweenGroomAndVenue);

  return (
    <section id="gps-navigation" className="py-16 md:py-24 bg-[#F5EFE6]/60 border-t border-[#E8DEC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635]">
            GPS Navigation & Venue Directions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] mt-2 text-balance">
            Find Your Way with Real-Time GPS
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] mt-2">
            Seamless navigation to the Groom&apos;s residence in Karunagappally and the wedding ceremony sanctum at Madathilkavu Bhagavathi Temple, Kunnamthanam.
          </p>
        </div>

        {/* Live GPS Bar */}
        <div className="mb-8 p-4 sm:p-5 bg-white border border-[#E3D8C8] rounded-xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#FAF7F2] text-[#8B2635] border border-[#EBE0D2]">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2C241E]">
                {userCoords
                  ? 'Your GPS Location is Active'
                  : 'Calculate Distance & Driving Time from You'}
              </p>
              <p className="text-xs text-[#735E50]">
                {userCoords
                  ? `Lat: ${userCoords.lat.toFixed(4)}, Lng: ${userCoords.lng.toFixed(4)}`
                  : 'Tap below to measure real driving distance from your current location'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleGetLocation}
              disabled={geoLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap disabled:opacity-70"
            >
              <Navigation className="w-4 h-4" />
              <span>{geoLoading ? 'Detecting GPS...' : userCoords ? 'Refresh My GPS' : 'Enable My GPS'}</span>
            </button>
          </div>
        </div>

        {geoError && (
          <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{geoError}</span>
          </div>
        )}

        {/* Location Selection Segmented Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[#EAE0D2] rounded-xl border border-[#D9CEBF]">
            <button
              onClick={() => setActiveTab('wedding')}
              className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'wedding'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              1. Wedding Venue (Temple)
            </button>
            <button
              onClick={() => setActiveTab('groom')}
              className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'groom'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              2. Groom&apos;s Home (Karunagappally)
            </button>
          </div>
        </div>

        {/* Main Grid: Location Details Card & Map Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Detailed Location Information */}
          <div className="lg:col-span-5 bg-white border border-[#E3D8C8] rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#ECE2D0]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2635]">
                  {activeTab === 'wedding' ? 'Ceremony & Muhoortham Sanctum' : 'Groom Residence & Gathering'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C241E] mt-1">
                  {activeLocation.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#5D4F44] mt-4 leading-relaxed">
              {activeLocation.description}
            </p>

            {/* Address & Landmark info */}
            <div className="my-5 p-4 bg-[#FAF7F2] border border-[#EBE0D2] rounded-xl space-y-2 text-xs sm:text-sm">
              <div>
                <span className="font-semibold text-[#3B2D22]">Address: </span>
                <span className="text-[#5D4F44]">{activeLocation.address}</span>
              </div>
              <div>
                <span className="font-semibold text-[#3B2D22]">Landmark: </span>
                <span className="text-[#5D4F44]">{activeLocation.landmark}</span>
              </div>
              {activeLocation.departureTime && (
                <div className="pt-1 text-[#8B2635] font-semibold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{activeLocation.departureTime}</span>
                </div>
              )}
            </div>

            {/* GPS Live Calculated Distance Display */}
            {currentDist !== null && (
              <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 flex items-center justify-between">
                <div>
                  <p className="font-semibold">Distance from your position:</p>
                  <p className="text-xs text-emerald-700">Estimated driving time:</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-base text-emerald-900">{currentDist} km</p>
                  <p className="text-xs font-semibold text-emerald-700">{formatDriveTime(currentEta || 0)}</p>
                </div>
              </div>
            )}

            {/* One-Click Navigation Launchers */}
            <div className="space-y-2.5">
              <a
                href={createGoogleMapsDirectionsUrl(
                  activeLocation.latitude,
                  activeLocation.longitude,
                  userCoords?.lat,
                  userCoords?.lng
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] rounded-lg transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate with Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={createAppleMapsDirectionsUrl(activeLocation.latitude, activeLocation.longitude, activeLocation.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4A3D34] bg-[#FAF7F2] hover:bg-[#F0E6D8] border border-[#D9CABB] rounded-lg transition-colors"
                >
                  <Car className="w-3.5 h-3.5 text-[#8B2635]" />
                  <span>Apple Maps</span>
                </a>
                <a
                  href={createWazeDirectionsUrl(activeLocation.latitude, activeLocation.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4A3D34] bg-[#FAF7F2] hover:bg-[#F0E6D8] border border-[#D9CABB] rounded-lg transition-colors"
                >
                  <Route className="w-3.5 h-3.5 text-[#8B2635]" />
                  <span>Waze</span>
                </a>
              </div>

              <button
                onClick={() => handleCopyAddress(activeLocation)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#6B5A4E] hover:text-[#2C241E] hover:bg-[#FAF7F2] rounded-lg transition-colors border border-transparent hover:border-[#E8DEC8] cursor-pointer"
              >
                {copiedAddress === activeLocation.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Address & Coordinates Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#735E50]" />
                    <span>Copy Address & Coordinates</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Host Call Button */}
            <div className="mt-5 pt-4 border-t border-[#ECE2D0] flex items-center justify-between text-xs text-[#735E50]">
              <span>Need travel assistance?</span>
              <a
                href="tel:9656795970"
                className="font-semibold text-[#8B2635] hover:underline inline-flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 9656795970</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Map & Route Overview */}
          <div className="lg:col-span-7 bg-white border border-[#E3D8C8] rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-serif font-bold text-lg text-[#2C241E]">
                  Kerala Route & GPS Overview
                </h4>
                <p className="text-xs text-[#735E50]">
                  Karunagappally (Kollam) ➔ Kunnamthanam (Pathanamthitta)
                </p>
              </div>

              <div className="flex items-center gap-1 p-0.5 bg-[#FAF7F2] border border-[#E3D8C8] rounded-lg text-xs">
                <button
                  onClick={() => setMapViewMode('interactive')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    mapViewMode === 'interactive'
                      ? 'bg-[#8B2635] text-white'
                      : 'text-[#6B5A4E] hover:text-[#2C241E]'
                  }`}
                >
                  Interactive Map
                </button>
                <button
                  onClick={() => setMapViewMode('schematic')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    mapViewMode === 'schematic'
                      ? 'bg-[#8B2635] text-white'
                      : 'text-[#6B5A4E] hover:text-[#2C241E]'
                  }`}
                >
                  Route Summary
                </button>
              </div>
            </div>

            {/* Map Frame */}
            <div className="relative rounded-xl overflow-hidden border border-[#E3D8C8] bg-[#FAF7F2] min-h-[380px]">
              {mapViewMode === 'interactive' ? (
                <iframe
                  title="Kerala Wedding GPS Location Map"
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={
                    activeTab === 'wedding'
                      ? `https://www.openstreetmap.org/export/embed.html?bbox=76.5700%2C9.3700%2C76.6700%2C9.4700&layer=mapnik&marker=${weddingVenue.latitude}%2C${weddingVenue.longitude}`
                      : `https://www.openstreetmap.org/export/embed.html?bbox=76.4900%2C9.0200%2C76.5800%2C9.1100&layer=mapnik&marker=${groomHome.latitude}%2C${groomHome.longitude}`
                  }
                />
              ) : (
                /* Route Schematic Visualization */
                <div className="p-6 h-[380px] flex flex-col justify-between bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2]">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#8B2635] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        A
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#2C241E]">
                          Groom Residence & C. N. Junction
                        </p>
                        <p className="text-xs text-[#5D4F44]">
                          Kollaka P.O., Karunagappally, Kollam
                        </p>
                        <p className="text-[11px] text-[#8B2635] font-medium mt-0.5">
                          Party leaves at 8:00 AM sharp
                        </p>
                      </div>
                    </div>

                    <div className="ml-4 pl-6 border-l-2 border-dashed border-[#C5A059] py-3 text-xs text-[#735E50] space-y-1">
                      <p className="font-semibold text-[#8B2635]">
                        Distance: ~{distBetweenGroomAndVenue} km • Travel Time: ~{formatDriveTime(etaBetween)}
                      </p>
                      <p>
                        Recommended route: NH66 / Kayamkulam ➔ Adoor ➔ Thiruvalla / Mallappally Road ➔ Kunnamthanam
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C5A059] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        B
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#2C241E]">
                          Madathilkavu Bhagavathi Temple
                        </p>
                        <p className="text-xs text-[#5D4F44]">
                          Kunnamthanam, Pathanamthitta
                        </p>
                        <p className="text-[11px] text-[#8B2635] font-semibold mt-0.5">
                          Muhoortham: 11:50 AM – 12:10 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/90 border border-[#E3D8C8] rounded-lg text-xs text-[#5D4F44]">
                    <span className="font-semibold text-[#2C241E]">Parking Note: </span>
                    Ample dedicated vehicle parking is arranged at the temple grounds and adjacent community hall for all guests.
                  </div>
                </div>
              )}
            </div>

            {/* Quick summary below map */}
            <div className="mt-4 pt-3 border-t border-[#ECE2D0] flex flex-wrap items-center justify-between text-xs text-[#735E50] gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8B2635]" />
                <span>
                  Showing: <strong className="text-[#2C241E]">{activeLocation.title}</strong>
                </span>
              </div>
              <a
                href={activeLocation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#8B2635] hover:underline inline-flex items-center gap-1"
              >
                <span>Full screen on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
