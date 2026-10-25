import React from 'react';
import { BelovedWishesCard } from './BelovedWishesCard';
import { SelectedWish } from '../data/selectedWishes';

interface PapyrusScrollWishesProps {
  wishes?: SelectedWish[];
  targetHeight?: number;
}

export const PapyrusScrollWishes: React.FC<PapyrusScrollWishesProps> = (props) => {
  return <BelovedWishesCard {...props} />;
};

export default PapyrusScrollWishes;
