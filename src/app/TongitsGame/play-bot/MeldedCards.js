import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./Card";
import { Player } from "../../../hooks/use-tongit-game";
import { Card as CardType } from "../../../utils/card-utils";
import PlayerIcon from "@/app/components/PlayerIcon";

export function MeldedCards({
  players,
  onSapawSelect,
  currentPlayerIndex,
  selectedSapawTarget,
}) {
  const rankOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const sortCardsByRank = (cards) => {
    return cards.sort((a, b) => {
      const rankA = rankOrder.indexOf(a.rank);
      const rankB = rankOrder.indexOf(b.rank);
      return rankA - rankB;
    });
  };

  const sortMelds = (melds) => {
    return melds.map((meld) => sortCardsByRank(meld));
  };


  console.log("players",players)
  return (
    <div className="fixed inset-0 pointer-events-none">
      {players.map((player, playerIndex) => {
        const sortedMelds = sortMelds(player.exposedMelds);
        return(
          <div key={player.id}>
          <PlayerIcon
            playerIndex={playerIndex}
            players={players}
            positioning={`${playerIndex === 0 ? "hidden" : ""}${
              playerIndex === 1 ? "top-36 2xl:top-48 left-14 2xl:left-32 z-20" : ""
            } ${playerIndex === 2 ? "top-36 right-14 2xl:right-32 z-20" : ""}`}
          />
          <div
            className={`
            absolute pointer-events-auto w-80
            ${playerIndex === 0 ? "bottom-72 left-96 right-96 -translate-x-1/2 z-10" : ""}
            ${playerIndex === 2 ? "top-52 2xl:top-72 left-72 2xl:left-96 z-10" : ""}
            ${playerIndex === 1 ? "top-52 right-64 2xl:right-96 z-10" : ""}
          `}
          >
            <div className={`bg-opacity-5 bg-white  ${playerIndex === 0 ? "w-[1000px] flex  justify-start" : ""} rounded-lg `}>
              <AnimatePresence>
                {sortedMelds.map((meld, meldIndex) => ( 
                  <motion.div
                    key={meldIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale:
                        selectedSapawTarget?.playerIndex === playerIndex &&
                        selectedSapawTarget?.meldIndex === meldIndex
                          ? 1.05
                          : 1,
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-lg  first-line: ${
                      selectedSapawTarget?.playerIndex === playerIndex &&
                      selectedSapawTarget?.meldIndex === meldIndex
                        ? "bg-black bg-opacity-30 flex justify-start"
                        : "flex justify-start"
                    }`}
                    onClick={() => onSapawSelect({ playerIndex, meldIndex })}
                  >
                    <div className="flex flex-row flex-wrap gap-1">
                      {meld.map((card, cardIndex) => (
                        <motion.div
                          key={cardIndex}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: 1,
                            x: cardIndex * -20, // Shift each card along the X axis
                          }}
                          transition={{ delay: cardIndex * 0.1 }}
                          className="transform scale-75 origin-top-left cursor-pointer rounded-md"
                        >
                          <Card
                            border={`1px solid black`}
                            transformCard={`perspective(500px) rotateX(40deg)`}
                            cardSize={"w-14 h-auto p-1 text-xl 2xl:text-lg"}
                            card={card}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {playerIndex === currentPlayerIndex && (
                <p className="text-xs font-bold text-green-600 mt-1">
                  
                </p>
              )}
            </div>
          </div>
        </div>
        )
      })}
    </div>
  );
}
