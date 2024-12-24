import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { Player } from '../../../hooks/use-tongit-game';
import { Card as CardType } from '../../../utils/card-utils';

export function MeldedCards({ players, onSapawSelect, currentPlayerIndex, selectedSapawTarget }) {
  return (
    <div className="space-y-4">
      {players.map((player, playerIndex) => (
        <div key={player.id} className="bg-white p-2 rounded-lg shadow">
          <h3 className="font-semibold text-sm mb-1">
            {player.name}'s Melds ({player.hand.length} cards)
          </h3>
          <AnimatePresence>
            {player.exposedMelds.map((meld, meldIndex) => (
              <motion.div
                key={meldIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: selectedSapawTarget?.playerIndex === playerIndex && selectedSapawTarget?.meldIndex === meldIndex ? 1.05 : 1
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-2 p-2 rounded-lg ${selectedSapawTarget?.playerIndex === playerIndex && selectedSapawTarget?.meldIndex === meldIndex ? 'bg-blue-100' : ''}`}
                onClick={() => onSapawSelect({ playerIndex, meldIndex })}
              >
                <p className="text-xs mb-1">Meld {meldIndex + 1}:</p>
                <div className="flex flex-wrap gap-1">
                  {meld.map((card, cardIndex) => (
                    <motion.div
                      key={cardIndex}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: cardIndex * 0.1 }}
                      className="transform scale-75 origin-top-left cursor-pointer"
                    >
                      <Card card={card} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {playerIndex === currentPlayerIndex && (
            <p className="text-xs font-bold text-green-600 mt-1">Current Turn</p>
          )}
        </div>
      ))}
    </div>
  );
}
