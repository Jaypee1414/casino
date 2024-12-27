import React from 'react';
import { Player } from '../../../hooks/use-tongit-game';
import { Card as CardType } from '../../../utils/card-utils';
import { Card } from './Card';


export function DiscardPile({ topCard, onDraw, disabled, canDraw }) {
  if (!topCard) {
    return (
      <button 
        className="w-20 h-28 bg-gray-300 border border-gray-400 rounded-lg shadow-md flex items-center justify-center"
        disabled={true}
      >
        Empty
      </button>
    );
  }

  return (
    <button 
      className={`p-0 bg-transparent hover:bg-transparent ${!canDraw ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onDraw}
      disabled={disabled || !canDraw}
    >
      <Card card={topCard} />
    </button>
  );
}