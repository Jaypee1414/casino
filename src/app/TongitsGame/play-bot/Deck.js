import React from 'react';

export function Deck({ cardsLeft, onDraw, disabled }) {
  return (
    <button 
    
      className="w-1.5 2xl:w-24 h-24 2xl:h-28 bg-[url('/image/cardBackground.svg')]  bg-no-repeat bg-cover bg-center rounded-lg shadow-md flex items-center justify-center"
      onClick={onDraw}
      disabled={disabled}
    >
      <span className="text-white font-bold font-jaro text-2xl tracking-tighter" 
                  style={{
                    WebkitTextStroke: "0.5px black",
                    textStroke: "0.5px black",
                  }}>{cardsLeft}</span>
    </button>
  );
}
