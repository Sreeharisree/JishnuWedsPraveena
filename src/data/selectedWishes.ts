export interface SelectedWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  location?: string;
  date?: string;
  highlight?: boolean;
}

// Only authentic blessings provided by the user
export const CURATED_SELECTED_WISHES: SelectedWish[] = [
  {
    id: 'wish-6',
    name: 'Shehin Abdul Samad',
    relation: 'Friend',
    message: 'All the very best 💓. Happy marriage life man 🎈',
    highlight: true,
  },
  {
    id: 'wish-5',
    name: 'VISHNU VIKRAMAN PILLAI',
    relation: 'Brother',
    message: 'Happy married life in advance bro…',
    highlight: true,
  },
  {
    id: 'wish-4',
    name: 'Raju Kumar Mishra',
    relation: "Vishnu's Friend in Bahrain",
    message:
      'Happy Married Life Jishnu, Vishnu always talk about you and your future. He always care about you Jishnu.. Take care aand happy Married life',
    highlight: false,
  },
  {
    id: 'wish-3',
    name: 'Arun Pushpakumar',
    relation: 'Co-founder of several imaginary multi-million dollar business ventures😎.',
    message: `Dear Praveena,

Thank you for purchasing this equipment-JVP.
A high quality product Sold with  strictly no warranties, returns or exchanges.
Handle with care..😆

Dear JVP- 🫂
From our endless conversations to solving world problems together, I’ve always known how deep your heart is and how much care you bring to the people around you.
Praveena, your home will be always full of Joy, comfort & peace. Your man is one of the reliable, thoughtful & solid men I know.

 Wishing you both a lifetime of happiness together. ♥️`,
    highlight: true,
  },
  {
    id: 'wish-2',
    name: 'Muhammed Ajmal',
    relation: 'Friend',
    message: 'Barak jallah feekkum.. Aliya... ❤️',
    highlight: false,
  },
  {
    id: 'wish-1',
    name: 'Thomas',
    relation: 'Friend',
    message: `Congrats dears
Happy married Life 
May god bless you both`,
    highlight: false,
  },
];
