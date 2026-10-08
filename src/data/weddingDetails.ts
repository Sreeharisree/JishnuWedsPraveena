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
export const WEDDING_AUDIO_DRIVE_URL = 'https://drive.google.com/file/d/1yclqvxt2iM3WPwrD0GppAQzjqq1ViXeQ/view';

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
    star: 'Chithira (Chitra Nakshatra)',
    muhoorthamTime: '11:50 AM – 12:10 PM',
    venueName: 'Madathilkavu Bhagavathi Temple',
    venueLocation: 'Kunnamthanam, Mallappally / Tiruvalla, Pathanamthitta District',
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
      contactPhones: ['9656795970', '8547303310'],
      googleMapsUrl: 'https://maps.app.goo.gl/tPo6rBRYxvJBP947A',
      appleMapsUrl: 'https://maps.apple.com/?daddr=9.039832,76.552164&q=Groom+Home+Kizhakkupurathu',
      wazeUrl: 'https://waze.com/ul?ll=9.039832,76.552164&navigate=yes',
    } as LocationDetail,
    weddingVenue: {
      id: 'wedding-venue',
      title: 'Madathilkavu Bhagavathi Temple',
      subtitle: 'Wedding Ceremony & Auspicious Muhoortham',
      description: 'The sacred sanctum where the auspicious marriage ceremony and Thalikettu will be solemnized.',
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
    caption: 'Groom Portrait 1',
    category: 'groom',
    url: 'https://drive.google.com/thumbnail?id=1NYX_sf_nLhRTY8j6upcmEow2OA3QhvaW&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1NYX_sf_nLhRTY8j6upcmEow2OA3QhvaW/view',
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
    url: 'https://drive.google.com/thumbnail?id=1ANmqeLhQbLNIaPa1JXUQj48OOZxzjq8k&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1ANmqeLhQbLNIaPa1JXUQj48OOZxzjq8k/view',
    aspectRatio: '4/5',
  },
  {
    id: 'groom-4',
    caption: 'Groom Portrait 4',
    category: 'groom',
    url: 'https://drive.google.com/thumbnail?id=1ao2rk5YPsWjJ160xA9uSYasl-cs42U1S&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1ao2rk5YPsWjJ160xA9uSYasl-cs42U1S/view',
    aspectRatio: '4/5',
  },
  {
    id: 'groom-5',
    caption: 'Groom Portrait 5',
    category: 'groom',
    url: 'https://drive.google.com/thumbnail?id=1qBk0vuc6OIcKAECWc6z_K0LxzcSI9AQV&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1qBk0vuc6OIcKAECWc6z_K0LxzcSI9AQV/view',
    aspectRatio: '4/5',
  },
  {
    id: 'groom-6',
    caption: 'Groom Portrait 6',
    category: 'groom',
    url: 'https://drive.google.com/thumbnail?id=1aK4XkYAXJY7E_JVf_cYFegJFJ9w6WUo1&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1aK4XkYAXJY7E_JVf_cYFegJFJ9w6WUo1/view',
    aspectRatio: '4/5',
  },
  {
    id: 'groom-7',
    caption: 'Groom Portrait 7',
    category: 'groom',
    url: 'https://drive.google.com/thumbnail?id=1PSoIkEV-pxCLx8x_YBYJVuGSOH4JLGhy&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1PSoIkEV-pxCLx8x_YBYJVuGSOH4JLGhy/view',
    aspectRatio: '4/5',
  },
];

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
    url: 'https://drive.google.com/thumbnail?id=1rDqsjmLRhkssH901FH2BaGUD2VfWUQw1&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1rDqsjmLRhkssH901FH2BaGUD2VfWUQw1/view',
    aspectRatio: '4/5',
  },
  {
    id: 'bride-3',
    caption: 'Bride Portrait 3',
    category: 'bride',
    url: 'https://drive.google.com/thumbnail?id=1O7haYAfEZArV4uMXCjuaGviBfhM1AedW&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1O7haYAfEZArV4uMXCjuaGviBfhM1AedW/view',
    aspectRatio: '4/5',
  },
  {
    id: 'bride-4',
    caption: 'Bride Portrait 4',
    category: 'bride',
    url: 'https://drive.google.com/thumbnail?id=12g0oTeRWzicaUJgN_0buwBihOxFJYi-J&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/12g0oTeRWzicaUJgN_0buwBihOxFJYi-J/view',
    aspectRatio: '4/5',
  },
  {
    id: 'bride-5',
    caption: 'Bride Portrait 5',
    category: 'bride',
    url: 'https://drive.google.com/thumbnail?id=1jfJUhmi7b8DngJkLXjVdPeutcZTTItqh&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1jfJUhmi7b8DngJkLXjVdPeutcZTTItqh/view',
    aspectRatio: '4/5',
  },
  {
    id: 'bride-6',
    caption: 'Bride Portrait 6',
    category: 'bride',
    url: 'https://drive.google.com/thumbnail?id=17xirEkN43I5FKRzKIxhBCm4Qr6MhAou_&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/17xirEkN43I5FKRzKIxhBCm4Qr6MhAou_/view',
    aspectRatio: '4/5',
  },
];

export const INITIAL_COUPLE_PHOTOS: PhotoItem[] = [
  {
    id: 'moment-1',
    caption: 'Wedding Moment 1',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1Mf3jvqXAaRqXE5ZzXf8d06mPA7eSQP4J&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1Mf3jvqXAaRqXE5ZzXf8d06mPA7eSQP4J/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-2',
    caption: 'Wedding Moment 2',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1GtxkO2R-A5g6267gCCeOtorBIDvH2moj&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1GtxkO2R-A5g6267gCCeOtorBIDvH2moj/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-3',
    caption: 'Wedding Moment 3',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1NPXvrqoxAstJWVkkCB8gWQnbFHtJ42XM&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1NPXvrqoxAstJWVkkCB8gWQnbFHtJ42XM/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-4',
    caption: 'Wedding Moment 4',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1KtcuEOyUhP4Nb1mZwcasyN1NjVc7H8o_&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1KtcuEOyUhP4Nb1mZwcasyN1NjVc7H8o_/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-5',
    caption: 'Wedding Moment 5',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=10YdJSY7lf3GrwKer6D9O9V_uKClwWS5J&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/10YdJSY7lf3GrwKer6D9O9V_uKClwWS5J/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-6',
    caption: 'Wedding Moment 6',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1nAUqPFOC116ryhbGJFA-7cWzSZn8b83C&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1nAUqPFOC116ryhbGJFA-7cWzSZn8b83C/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-7',
    caption: 'Wedding Moment 7',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=12CjQ0dDiLx2GZ7s-dHO3461HCH9OIQSl&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/12CjQ0dDiLx2GZ7s-dHO3461HCH9OIQSl/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-8',
    caption: 'Wedding Moment 8',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1yphQaS-2xOOncTxNGBt8yiIgFLDTtD22&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1yphQaS-2xOOncTxNGBt8yiIgFLDTtD22/view',
    aspectRatio: '4/5',
  },
  {
    id: 'moment-9',
    caption: 'Wedding Moment 9',
    category: 'couple',
    url: 'https://drive.google.com/thumbnail?id=1XOpIk7bfBfeD1r44pw03AdCNZ6vhqEkC&sz=w1600',
    googleDriveUrl: 'https://drive.google.com/file/d/1XOpIk7bfBfeD1r44pw03AdCNZ6vhqEkC/view',
    aspectRatio: '4/5',
  },
];
