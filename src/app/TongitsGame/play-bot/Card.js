import {React,useRef, useEffect} from 'react';
import { motion } from 'framer-motion';
import { Player } from '../../../hooks/use-tongit-game';
import { Card as CardType } from '../../../utils/card-utils';
export function Card({border,transformCard,id ,opacityCard, cardSize, card, onClick, small = false,}) {
  const { suit, rank } = card;
  const boxRef = useRef(null)
  const color = suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-black';

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.transform = transformCard ? transformCard : " ";
      boxRef.current.style.border = border ? border : ''; 
    }
  }, [transformCard,border])

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
    <motion.div 
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >   <div 
  id={`card-${id}`}
    className={`${baseClasses} ${sizeClasses}`}
    onClick={onClick}
    ref={boxRef} 
  >
    <div className="text-left font-bold">{rank}</div>
    <div className="text-center text-3xl 2xl:text-4xl">
      {getSuitSymbol(suit)}
    </div>
  </div></motion.div> 

  );
}
