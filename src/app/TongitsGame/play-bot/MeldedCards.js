import React from "react";
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
  return (
    <div className="fixed inset-0 pointer-events-none">
      {players.map((player, playerIndex) => (
        <div key={player.id}>
          <PlayerIcon
            playerIndex={playerIndex}
            players={players}
            positioning={`${playerIndex === 0 ? "hidden" : ""}${
              playerIndex === 1 ? "top-40 2xl:top-48 left-14 2xl:left-32" : ""
            } ${playerIndex === 2 ? "top-44 right-14 2xl:right-32" : ""}`}
          />
          <div
            className={`
            absolute pointer-events-auto w-72 
            ${playerIndex === 0 ? "bottom-80 left-1/2 -translate-x-1/2" : ""}
            ${playerIndex === 1 ? "top-64 2xl:top-72 left-72 2xl:left-96 " : ""}
            ${playerIndex === 2 ? "top-72 right-72 2xl:right-96" : ""}
          `}
          >
            <div className="bg-opacity-10 bg-black p-2 rounded-lg">
              {/* <h3 className="font-semibold text-sm mb-1">
              {player.name}'s Melds ({player.hand.length} cards)
            </h3> */}
              <AnimatePresence>
                {player.exposedMelds.map((meld, meldIndex) => (
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
                    className={`mb-2 p-2 rounded-lg first-line: ${
                      selectedSapawTarget?.playerIndex === playerIndex &&
                      selectedSapawTarget?.meldIndex === meldIndex
                        ? "bg-black bg-opacity-30 w-auto"
                        : ""
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
                            x: cardIndex * -18, // Shift each card along the X axis
                          }}
                          transition={{ delay: cardIndex * 0.1 }}
                          className="transform scale-75 origin-top-left cursor-pointer border-black border rounded-md"
                        >
                          <Card
                            cardSize={"w-14 h-auto p-2 text-sm"}
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
      ))}
    </div>
  );
}
