import React from "react";
// import { Card as CardType } from "../utils/card-utils";
import { Card } from "./Card";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';

export function PlayerHand({
  position,
  cardSize,
  hand,
  onCardClick,
  selectedIndices,
  isCurrentPlayer,
  discardingIndex
}) {

  const containerRef = useRef(null);
  const [selectedCards, setSelectedCards] = useState(new Set())
  const animationTriggered = useRef(false);

  useEffect(() => {
    // Only trigger animation once, on initial mount (refresh)
    if (!animationTriggered.current && containerRef.current && hand?.length > 0) {
      const cards = containerRef.current.children;

      // Set initial state for cards
      gsap.set(cards, {
        x: 3,
        y: 0,
        opacity: 0,
      });

      // Animate cards spreading out horizontally
      gsap.to(cards, {
        x: (index) => index * -45,  // Spread the cards horizontally
        opacity: 1,
        stagger: 0.05,  // Increase stagger for faster animation
        duration: 0.8,  // Faster durationfor the spread
        ease: 'power2.out',  // Snappy easing
      });

      // Mark that animation has been triggered
      animationTriggered.current = true;
    }
  }, [hand]); // Runs only when 'hand' changes


  // Handler for selecting/deselecting cards
  const handleCardClick = (index) => {
    setSelectedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };


  return (
<div
ref={containerRef}
  className={`flex flex-wrap justify-center p-4 rounded-lg relative ${
    isCurrentPlayer ? "bg-opacity-10  shadow-lg h-60  w-[66rem] 2xl:w-[75rem]" : "bg-opacity-10  shadow-lg h-60  w-[66rem] 2xl:w-[75rem]"
  }`}
>
  {hand?.map((card, index) => (
    <motion.div
      key={`${card.suit}-${card.rank}-${index}`}
      layout
      initial={false}
      animate={{
        y: selectedIndices.includes(index) ? -16 : 0,
        x: index * -45, // Slightly adjust for overlap horizontally
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ rotate: 5 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)',
        borderRadius: "0.5rem",
        border:"1px solid black",
        bottom: "10px",
        right: "10px",
        position: "absolute", // Absolute positioning for overlap
        zIndex: hand.length - index, // Stacking order, higher value means card on top
      }}
    >
      <Card
      position={position}
        opacityCard={`${selectedCards.size === 0 || selectedCards.has(index) ? 'opacity-100' : 'opacity-85'}`}
        cardSize={cardSize}
        card={card}
        onClick={() => {
          if (isCurrentPlayer) {
            onCardClick(index);  // Existing handler
          }
          handleCardClick(index);  // New handler
        }}
        isDiscarding={discardingIndex === index}
      />
    </motion.div>
  ))}
</div>

  );
}