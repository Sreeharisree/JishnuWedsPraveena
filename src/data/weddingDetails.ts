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

// Configurable Google Drive audio link for the ceremony prayer
export const WEDDING_AUDIO_DRIVE_URL = 'https://drive.google.com/file/d/1JX-6BDsuJoXF-BUDZiuh-Z7M-OFvC-Vt/view';

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
      brother: 'K. S. Pranav',
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
    star: 'Chithira (Chitra Nakshatra)',
    muhoorthamTime: '11:50 AM – 12:10 PM',
    venueName: 'Madathilkavu Bhagavathi Temple',
    venueLocation: 'Kunnamthanam, Mallappally, Pathanamthitta',
  },
  hosts: {
    contactPersons: [
      {
        name: 'K. P. Vikraman Pillai',
        relation: "Father of the Groom",
        phones: ['9656795970'],
      },
      {
        name: 'Vishnu Vikraman Pillai',
        relation: "Brother of the Groom",
        phones: ['8547303310'],
      },
    ],
  },
  locations: {
    groomHome: {
      id: 'groom-home',
      title: "Groom's Home (Kizhakkupurathu)",
      subtitle: 'Starting Point & Family Residence',
      description: 'The ancestral residence of Jishnu Vikraman Pillai where pre-wedding rituals commence.',
      address: 'Kizhakkupurathu, Kollaka P.O., Karunagappally, Kollam District, Kerala',
      pincode: '690536',
      district: 'Kollam, Kerala',
      landmark: 'Near Kollaka / C. N. Junction Karunagappally',
      latitude: 9.039832,
      longitude: 76.552164,
      departureTime: 'Party leaves at 8:00 AM from C. N. Junction',
      contactPhones: ['9656795970', '9947252533'],
      googleMapsUrl: 'https://maps.app.goo.gl/tPo6rBRYxvJBP947A',
      appleMapsUrl: 'https://maps.apple.com/?daddr=9.039832,76.552164&q=Groom+Home+Kizhakkupurathu',
      wazeUrl: 'https://waze.com/ul?ll=9.039832,76.552164&navigate=yes',
    } as LocationDetail,
    weddingVenue: {
      id: 'wedding-venue',
      title: 'Madathilkavu Bhagavathi Temple',
      subtitle: 'Wedding Ceremony & Auspicious Muhoortham',
      description: 'The sacred sanctum where the auspicious marriage ceremony and Thalikettu will be solemnized.',
      address: 'Madathilkavu Bhagavathi Temple, Kunnamthanam, Mallappally, Pathanamthitta, Kerala',
      pincode: '689581',
      district: 'Pathanamthitta, Kerala',
      landmark: 'Kunnamthanam Junction, near Mallappally',
      latitude: 9.4215,
      longitude: 76.6190,
      departureTime: 'Muhoortham: 11:50 AM – 12:10 PM',
      contactPhones: ['9656795970', '9947252533'],
      googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Madathilkavu+Bhagavathi+Temple+Kunnamthanam+Kerala&destination_coord=9.4215,76.6190',
      appleMapsUrl: 'https://maps.apple.com/?daddr=9.4215,76.6190&q=Madathilkavu+Bhagavathi+Temple+Kunnamthanam',
      wazeUrl: 'https://waze.com/ul?ll=9.4215,76.6190&navigate=yes',
    } as LocationDetail,
  },
};

// Groom Photos (3)
export const INITIAL_GROOM_PHOTOS: PhotoItem[] = [
  {
    id: 'groom-1',
    caption: 'Groom Portrait 1',
    category: 'groom',
    url: 'https://drive.google.com/thumbnail?id=1ao2rk5YPsWjJ160xA9uSYasl-cs42U1S&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1ao2rk5YPsWjJ160xA9uSYasl-cs42U1S/view',
    aspectRatio: '4/5',
  },
  {
    id: 'groom-2',
    caption: 'Groom Portrait 2',
    category: 'groom',
    url: 'https://drive.google.com/thumbnail?id=1dvev-v2tXe_m8MY2AMVOTRsqZDXJiXn-&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1dvev-v2tXe_m8MY2AMVOTRsqZDXJiXn-/view',
    aspectRatio: '4/5',
  },
  {
    id: 'groom-3',
    caption: 'Groom Portrait 3',
    category: 'groom',
    url: 'https://drive.google.com/thumbnail?id=1detB4cipBDHROR18mkoiOoEDGcGuIb1v&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1detB4cipBDHROR18mkoiOoEDGcGuIb1v/view',
    aspectRatio: '4/5',
  },
];

// Bride Photos (3)
export const INITIAL_BRIDE_PHOTOS: PhotoItem[] = [
  {
    id: 'bride-1',
    caption: 'Bride Portrait 1',
    category: 'bride',
    url: 'https://drive.google.com/thumbnail?id=1_gS2Hxv7sQwsnyyKJyU6_f-J52EJpGpP&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1_gS2Hxv7sQwsnyyKJyU6_f-J52EJpGpP/view',
    aspectRatio: '4/5',
  },
  {
    id: 'bride-2',
    caption: 'Bride Portrait 2',
    category: 'bride',
    url: 'https://drive.google.com/thumbnail?id=12g0oTeRWzicaUJgN_0buwBihOxFJYi-J&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/12g0oTeRWzicaUJgN_0buwBihOxFJYi-J/view',
    aspectRatio: '4/5',
  },
  {
    id: 'bride-3',
    caption: 'Bride Portrait 3',
    category: 'bride',
    url: 'https://drive.google.com/thumbnail?id=17xirEkN43I5FKRzKIxhBCm4Qr6MhAou_&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/17xirEkN43I5FKRzKIxhBCm4Qr6MhAou_/view',
    aspectRatio: '4/5',
  },
];

// All Moments Photos (6)
export const INITIAL_COUPLE_PHOTOS: PhotoItem[] = [
  {
    id: 'moment-1',
    caption: 'All Moments 1',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1Mf3jvqXAaRqXE5ZzXf8d06mPA7eSQP4J&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1Mf3jvqXAaRqXE5ZzXf8d06mPA7eSQP4J/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-2',
    caption: 'All Moments 2',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1nAUqPFOC116ryhbGJFA-7cWzSZn8b83C&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1nAUqPFOC116ryhbGJFA-7cWzSZn8b83C/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-3',
    caption: 'All Moments 3',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=12CjQ0dDiLx2GZ7s-dHO3461HCH9OIQSl&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/12CjQ0dDiLx2GZ7s-dHO3461HCH9OIQSl/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-4',
    caption: 'All Moments 4',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1XOpIk7bfBfeD1r44pw03AdCNZ6vhqEkC&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1XOpIk7bfBfeD1r44pw03AdCNZ6vhqEkC/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-5',
    caption: 'All Moments 5',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1KtcuEOyUhP4Nb1mZwcasyN1NjVc7H8o_&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1KtcuEOyUhP4Nb1mZwcasyN1NjVc7H8o_/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-6',
    caption: 'All Moments 6',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=10YdJSY7lf3GrwKer6D9O9V_uKClwWS5J&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/10YdJSY7lf3GrwKer6D9O9V_uKClwWS5J/view',
    aspectRatio: '4/5',
  },
];

// Exact requested carousel sequence:
// All Moments 1, Groom 1, All Moments 2, All Moments 3, All Moments 4, All Moments 5, All Moments 6, Bride 1, Groom 2, Bride 2, Groom 3, Bride 3
export const CAROUSEL_ORDERED_PHOTOS: PhotoItem[] = [
  INITIAL_COUPLE_PHOTOS[0], // All Moments 1
  INITIAL_GROOM_PHOTOS[0],  // Groom 1
  INITIAL_COUPLE_PHOTOS[1], // All Moments 2
  INITIAL_COUPLE_PHOTOS[2], // All Moments 3
  INITIAL_COUPLE_PHOTOS[3], // All Moments 4
  INITIAL_COUPLE_PHOTOS[4], // All Moments 5
  INITIAL_COUPLE_PHOTOS[5], // All Moments 6
  INITIAL_BRIDE_PHOTOS[0],  // Bride 1
  INITIAL_GROOM_PHOTOS[1],  // Groom 2
  INITIAL_BRIDE_PHOTOS[1],  // Bride 2
  INITIAL_GROOM_PHOTOS[2],  // Groom 3
  INITIAL_BRIDE_PHOTOS[2],  // Bride 3
];
