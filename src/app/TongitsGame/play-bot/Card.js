import React from 'react';
import { Player } from '../../../hooks/use-tongit-game';
import { Card as CardType } from '../../../utils/card-utils';
export function Card({ card, onClick, small = false }) {
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
  const baseClasses = `bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col justify-between cursor-pointer ${color}`;

  // Make the card bigger by adjusting width, height, and padding
  const sizeClasses = small 
  ? 'w-8 h-10 p-2 text-md' // smaller size
  : 'w-16 h-22 p-3 text-2xl'; // bigger size


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
