export interface LocationDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  address: string;
  pincode: string;
  district: string;
  landmark: string;
  latitude: number;
  longitude: number;
  departureTime?: string;
  contactPhones: string[];
  googleMapsUrl: string;
  appleMapsUrl: string;
  wazeUrl: string;
}

export interface PhotoItem {
  id: string;
  caption: string;
  category: 'groom' | 'bride' | 'couple';
  url: string;
  googleDriveUrl?: string;
  aspectRatio: string;
}

export const WEDDING_DATA = {
  couple: {
    groom: {
      name: 'Jishnu Vikraman Pillai',
      fullName: 'Jishnu Vikraman Pillai',
      native: 'Kizhakkupurathu, Kollaka P.O., Karunagappally',
      parents: 'K. P. Vikraman Pillai & R. Latha Kurup',
      phoneNumbers: ['9656795970', '8547303310'],
      grandparentsPaternal: 'Late. Mr. Prabhakaran Pillai & Late. Mrs. Bharathi Amma',
      grandparentsPaternalHouse: 'Kizhakkupurathu, Kollaka P.O., Karunagappally',
      grandparentsMaternal: 'Late. Mr. Viswanatha Kurup & Late. Mrs. Rajamma Amma',
      grandparentsMaternalHouse: 'Mulamoottil House, Sasthamkotta P.O., Karunagappally',
      brother: 'Vishnu Vikraman Pillai & Family',
      departurePoint: 'C. N. Junction, Karunagappally',
      departureTime: '8:00 AM',
    },
    bride: {
      name: 'K.S. Praveena',
      fullName: 'K.S. Praveena',
      native: 'Kochuzhathil, Kunnamthanam',
      parents: 'Late. Mr. Sajikumar K. N. & Mrs. Prasannakumari P. N.',
      grandparentsPaternal: 'Mr. K. V. Narayana Pillai & Late. Mrs. M. K. Saraswathi Amma',
      grandparentsMaternal: 'Late. Mr. Nanukkuttan Nair & Mrs. Vijayamma',
      grandparentsMaternalPlace: 'Ithithanam',
      familyHouse: 'Kochuzhathil, Kunnamthanam',
    },
  },
  ceremony: {
    date: '2026-12-06',
    formattedDate: 'Sunday, 06 December 2026',
    malayalamDate: '20th Vrichikam 1202',
    muhoortham: 'Between 11:50 am & 12:10 pm',
    venueName: 'Madathilkavu Bhagavathi Temple',
    venueLocation: 'Kunnamthanam, Pathanamthitta, Kerala',
    departureNotice: "Groom's party leaves at 8:00 AM from C. N. Junction",
    happinessSharedBy: 'Vishnu Vikraman Pillai & Family',
  },
  locations: {
    groomHome: {
      id: 'groom-home',
      title: "Groom's Home & Departure Point",
      subtitle: 'Kizhakkupurathu, Karunagappally',
      description: "Groom's residence where the celebratory gathering begins. Party departs for the wedding venue at 8:00 AM sharp from C. N. Junction.",
      address: 'Kizhakkupurathu, Kollaka P.O., Karunagappally, Kollam District, Kerala',
      pincode: '690536',
      district: 'Kollam, Kerala',
      landmark: 'Near Kollaka / C. N. Junction Karunagappally',
      latitude: 9.0638,
      longitude: 76.5365,
      departureTime: 'Party leaves at 8:00 AM from C. N. Junction',
      contactPhones: ['9656795970', '8547303310'],
      googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.0638,76.5365&destination_place_id=ChIJ8_yvKollakaKarunagappally',
      appleMapsUrl: 'https://maps.apple.com/?daddr=9.0638,76.5365&q=Groom+Home+Kollaka+Karunagappally',
      wazeUrl: 'https://waze.com/ul?ll=9.0638,76.5365&navigate=yes',
    } as LocationDetail,
    weddingVenue: {
      id: 'wedding-venue',
      title: 'Madathilkavu Bhagavathi Temple',
      subtitle: 'Wedding Ceremony & Auspicious Muhoortham',
      description: 'The sacred sanctum where the marriage ceremony, Thalikettu, and traditional feast (Sadhya) will be solemnized.',
      address: 'Madathilkavu Bhagavathi Temple, Kunnamthanam, Mallappally / Tiruvalla, Pathanamthitta District, Kerala',
      pincode: '689581',
      district: 'Pathanamthitta, Kerala',
      landmark: 'Kunnamthanam Junction, near Mallappally Road',
      latitude: 9.4215,
      longitude: 76.6190,
      departureTime: 'Muhoortham: 11:50 AM – 12:10 PM',
      contactPhones: ['9656795970', '8547303310'],
      googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Madathilkavu+Bhagavathi+Temple+Kunnamthanam+Kerala&destination_coord=9.4215,76.6190',
      appleMapsUrl: 'https://maps.apple.com/?daddr=9.4215,76.6190&q=Madathilkavu+Bhagavathi+Temple+Kunnamthanam',
      wazeUrl: 'https://waze.com/ul?ll=9.4215,76.6190&navigate=yes',
    } as LocationDetail,
  },
};

export const INITIAL_GROOM_PHOTOS: PhotoItem[] = [
  {
    id: 'groom-1',
    caption: 'Jishnu Vikraman Pillai — Traditional Kasavu Elegance',
    category: 'groom',
    url: '/src/assets/images/groom_portrait_sample_1791366491399.jpg',
    aspectRatio: '3/4',
  },
  {
    id: 'groom-2',
    caption: 'The Groom at Nilavilakku Blessings',
    category: 'groom',
    url: '/src/assets/images/groom_portrait_sample_1791366491399.jpg',
    aspectRatio: '3/4',
  },
  {
    id: 'groom-3',
    caption: 'Pre-wedding Auspicious Ceremonies',
    category: 'groom',
    url: '/src/assets/images/groom_portrait_sample_1791366491399.jpg',
    aspectRatio: '3/4',
  },
  {
    id: 'groom-4',
    caption: 'Warm Smiles with Family & Kin',
    category: 'groom',
    url: '/src/assets/images/groom_portrait_sample_1791366491399.jpg',
    aspectRatio: '3/4',
  },
  {
    id: 'groom-5',
    caption: 'Groom Festive Traditional Portrait',
    category: 'groom',
    url: '/src/assets/images/groom_portrait_sample_1791366491399.jpg',
    aspectRatio: '3/4',
  },
];

export const INITIAL_BRIDE_PHOTOS: PhotoItem[] = [
  {
    id: 'bride-1',
    caption: 'K.S. Praveena — Auspicious Temple Saree & Traditional Jewels',
    category: 'bride',
    url: '/src/assets/images/bride_portrait_sample_1791366509443.jpg',
    aspectRatio: '3/4',
  },
  {
    id: 'bride-2',
    caption: 'The Grace of Jasmine & Antique Gold',
    category: 'bride',
    url: '/src/assets/images/bride_portrait_sample_1791366509443.jpg',
    aspectRatio: '3/4',
  },
  {
    id: 'bride-3',
    caption: 'Bridal Glow & Traditional Blessings',
    category: 'bride',
    url: '/src/assets/images/bride_portrait_sample_1791366509443.jpg',
    aspectRatio: '3/4',
  },
  {
    id: 'bride-4',
    caption: 'Cherished Moments at Kunnamthanam',
    category: 'bride',
    url: '/src/assets/images/bride_portrait_sample_1791366509443.jpg',
    aspectRatio: '3/4',
  },
  {
    id: 'bride-5',
    caption: 'Graceful Bridal Elegance',
    category: 'bride',
    url: '/src/assets/images/bride_portrait_sample_1791366509443.jpg',
    aspectRatio: '3/4',
  },
];

export const INITIAL_COUPLE_PHOTOS: PhotoItem[] = [
  {
    id: 'couple-1',
    caption: 'Jishnu & Praveena — Beginning of a Sacred Forever',
    category: 'couple',
    url: '/src/assets/images/wedding_hero_traditional_1791366472241.jpg',
    aspectRatio: '16/9',
  },
  {
    id: 'couple-2',
    caption: 'Madathilkavu Bhagavathi Temple Sanctum at Kunnamthanam',
    category: 'couple',
    url: '/src/assets/images/temple_venue_kerala_1791366522028.jpg',
    aspectRatio: '16/9',
  },
];
