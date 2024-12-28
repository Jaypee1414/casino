import React from "react";
// import { Card as CardType } from "../utils/card-utils";
import { Card } from "./Card";
import { motion } from "framer-motion";

export function PlayerHand({
  cardSize,
  hand,
  onCardClick,
  selectedIndices,
  isCurrentPlayer,
}) {
  return (
<div
  className={`flex flex-wrap justify-center p-4 rounded-lg relative ${
    isCurrentPlayer ? "bg-opacity-10  shadow-lg h-60" : "bg-opacity-10 h-44"
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
      cardSize={cardSize}
        card={card}
        onClick={() => isCurrentPlayer && onCardClick(index)}
      />
    </motion.div>
  ))}
</div>

  );
}