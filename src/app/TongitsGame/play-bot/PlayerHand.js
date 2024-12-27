import React from "react";
// import { Card as CardType } from "../utils/card-utils";
import { Card } from "./Card";
import { motion } from "framer-motion";

export function PlayerHand({
  hand,
  onCardClick,
  selectedIndices,
  isCurrentPlayer,
}) {
  return (
<div
  className={`flex flex-wrap justify-center p-4 rounded-lg relative ${
    isCurrentPlayer ? "bg-gray-200 shadow-lg bg-opacity-5 h-60" : "bg-gray-100 opacity-50 h-60"
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
      style={{
        borderRadius: "0.5rem",
        border:"1px solid black",
        bottom: "10px",
        right: "10px",
        position: "absolute", // Absolute positioning for overlap
        zIndex: hand.length - index, // Stacking order, higher value means card on top
      }}
    >
      <Card
        card={card}
        onClick={() => isCurrentPlayer && onCardClick(index)}
      />
    </motion.div>
  ))}
</div>

  );
}