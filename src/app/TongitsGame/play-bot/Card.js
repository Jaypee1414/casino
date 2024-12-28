import React from 'react';
import { Player } from '../../../hooks/use-tongit-game';
import { Card as CardType } from '../../../utils/card-utils';
export function Card({opacityCard, cardSize, card, onClick, small = false, }) {
  const { suit, rank } = card;
  const color = suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-black';

  const getSuitSymbol = (suit) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };
  const baseClasses = `${opacityCard} bg-white border border-gray-300 rounded-md shadow-sm flex flex-col justify-between cursor-pointer ${color}`;

  // Make the card bigger by adjusting width, height, and padding
  const sizeClasses = small 
  ? `${cardSize}` // smaller size
  : `${cardSize}`; // bigger size


  return (
    <div 
      className={`${baseClasses} ${sizeClasses}`}
      onClick={onClick}
    >
      <div className="text-left font-bold">{rank}</div>
      <div className="text-center">
        {getSuitSymbol(suit)}
      </div>
    </div>
  );
}
