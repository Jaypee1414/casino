import React from 'react';

export function Deck({ cardsLeft, onDraw, disabled }) {
  return (
    <button 
    
      className="w-20 h-24 bg-[url('/image/cardBackground.svg')]  bg-no-repeat bg-cover bg-center rounded-lg shadow-md flex items-center justify-center"
      onClick={onDraw}
      disabled={disabled}
    >
      <span className="text-white font-bold font-jaro text-lg">{cardsLeft}</span>
    </button>
  );
}
