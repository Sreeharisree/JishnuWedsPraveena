export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

/**
 * Calculates distance between two coordinates in kilometers using Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Estimates driving time in minutes based on Kerala road geography (approx 36 km/h avg pace)
 */
export function estimateDrivingMinutes(distanceKm: number): number {
  const avgSpeedKmh = 36;
  const hours = distanceKm / avgSpeedKmh;
  return Math.max(5, Math.round(hours * 60));
}

export function formatDriveTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} mins`;
  }
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} hr ${m} mins` : `${h} hr`;
}

export function createGoogleMapsDirectionsUrl(destLat: number, destLng: number, userLat?: number, userLng?: number): string {
  if (userLat !== undefined && userLng !== undefined) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}&travelmode=driving`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`;
}

export function createAppleMapsDirectionsUrl(destLat: number, destLng: number, label: string): string {
  return `https://maps.apple.com/?daddr=${destLat},${destLng}&q=${encodeURIComponent(label)}`;
}

export function createWazeDirectionsUrl(destLat: number, destLng: number): string {
  return `https://waze.com/ul?ll=${destLat},${destLng}&navigate=yes`;
}
