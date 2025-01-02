"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTongitGame } from "../../../hooks/use-tongit-game";
import { PlayerHand } from "./PlayerHand";
import { Deck } from "./Deck";
import { DiscardPile } from "./DiscardPile";
import { GameBoard } from "./GameBoard";
import { ActivityLog } from "./ActivityLog";
import { MeldedCards } from "./MeldedCards";
import { motion, AnimatePresence } from "framer-motion";
import { isValidMeld, shuffleDeck, sortCards } from "../../../utils/card-utils";
import NetworkStatus from "@/app/components/NetworkStatus";
import PercentageLoader from "@/app/components/PercentageLoad";
import Sidebar from "@/app/components/Sidebar";
import ScoreDashboard from "@/app/components/ScoreDashboard";
import ChatSideBar from "@/app/components/ChatSideBar";
import DealingAnimation from "@/app/components/DealingCard";
import { gsap } from 'gsap';


export default function TongitGame() {
  const [playerHand, setPlayerHande] = useState();
  const [isAutoSort, setIsAutoSort] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [gameMode, setGameMode] = useState("Bot");
  const [selectedSapawTarget, setSelectedSapawTarget] = useState(null);
  const [isScoreboardVisible, setIsScoreboardVisible] = useState(false)
  const {
    gameState,
    gameActions,
    drawCard,
    discardCard,
    meldCards,
    sapaw,
    checkTongits,
    updateSelectedCardIndices,
    botTurn,
    isProcessingBotTurn,
    isDeckEmpty,
    callDraw,
  } = useTongitGame(gameMode);
  const [sapawTarget, setSapawTarget] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  
  // Open left bar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // open right bar
  const toggleChat = () => {
    setIsChatOpen(!isSidebarOpen);
  };


  // CARD ANIMATION THROW
  // State to keep track of selected card indices
  const [selectedIndices, setSelectedIndices] = useState([]);
 // State to manage the index of the card being discarded
 const [discardingIndex, setDiscardingIndex] = useState(null);

  const handleCardClick = useCallback(
    (index) => {
      if (
        gameState &&
        !gameState.gameEnded &&
        gameState.currentPlayerIndex === 0
      ) {
        const newSelectedIndices = gameState.selectedCardIndices.includes(index)
          ? gameState.selectedCardIndices.filter((i) => i !== index)
          : [...gameState.selectedCardIndices, index];
        updateSelectedCardIndices(newSelectedIndices);
        setSelectedIndices(newSelectedIndices) //Track card selected 
      }
    },
    [gameState, updateSelectedCardIndices]
  );

  useEffect(() => {
    setPlayerHande(gameState?.players[0]?.hand);
  }, [gameState]);

  const shuffleDecks = () => {
    const shuffle = shuffleDeck(gameState.players[0].hand);
    setPlayerHande(shuffle);
  };

  const autoSort = () => {
    const shuffle = sortCards(gameState.players[0].hand);
    setPlayerHande(shuffle);
  };

  const handleDiscard = useCallback(() => {
    if (
      gameState &&
      gameState.currentPlayerIndex === 0 &&
      gameState.selectedCardIndices.length === 1 &&
      !gameState.gameEnded
    ) {
      const indexToDiscard = selectedIndices[0];
      // Set the discarding index to trigger the animation
      setDiscardingIndex(indexToDiscard);
      
      // After animation completes, remove the card from the hand
      setTimeout(() => {
        discardCard(gameState.selectedCardIndices[0]);
        setSelectedIndices([]);
        setDiscardingIndex(null);
      }, 1000); 
    }
  }, [gameState, discardCard,selectedIndices]);

  const handleMeld = useCallback(() => {
    if (
      gameState &&
      gameState.currentPlayerIndex === 0 &&
      gameState.selectedCardIndices.length >= 3 &&
      !gameState.gameEnded
    ) {
      meldCards(gameState.selectedCardIndices);
      // setStatusMessage("Meld successful. You can continue your turn.");
    }
  }, [gameState, meldCards]);

  const handleSapaw = useCallback(() => {
    if (
      gameState &&
      gameState.currentPlayerIndex === 0 &&
      sapawTarget &&
      gameState.selectedCardIndices.length > 0 &&
      !gameState.gameEnded
    ) {
      sapaw(
        sapawTarget.playerIndex,
        sapawTarget.meldIndex,
        gameState.selectedCardIndices
      );
      setSapawTarget(null);
      setSelectedSapawTarget(null);
      setStatusMessage("Sapaw successful. You can continue your turn.");
    }
  }, [
    gameState,
    sapawTarget,
    sapaw,
    setSapawTarget,
    setStatusMessage,
    setSelectedSapawTarget,
  ]);

  const handleCallDraw = useCallback(() => {
    if (
      gameState &&
      gameState.currentPlayerIndex === 0 &&
      !gameState.gameEnded &&
      gameState.players[0].exposedMelds.length > 0 &&
      !gameState.hasDrawnThisTurn
    ) {
      callDraw();
    }
  }, [gameState, callDraw]);

  const canDrawFromDiscard = useCallback(() => {
    if (!gameState || gameState.discardPile.length === 0) return false;
    const topDiscardCard =
      gameState.discardPile[gameState.discardPile.length - 1];
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];

    for (let i = 0; i < currentPlayer.hand.length; i++) {
      for (let j = i + 1; j < currentPlayer.hand.length; j++) {
        if (
          isValidMeld([
            topDiscardCard,
            currentPlayer.hand[i],
            currentPlayer.hand[j],
          ])
        ) {
          return true;
        }
      }
    }

    for (const meld of currentPlayer.exposedMelds) {
      if (isValidMeld([...meld, topDiscardCard])) {
        return true;
      }
    }

    return false;
  }, [gameState]);

  useEffect(() => {
    if (
      gameState &&
      gameState.currentPlayerIndex !== 0 &&
      !isProcessingBotTurn &&
      !gameState.gameEnded
    ) {
      const timer = setTimeout(() => {
        botTurn();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, botTurn, isProcessingBotTurn]);

  useEffect(() => {
    if (gameState && isDeckEmpty() && !gameState.gameEnded) {
      callDraw();
    }
  }, [gameState, isDeckEmpty, callDraw]);

  const [isDealingDone, setIsDealingDone] = useState(false);

  useEffect(() => {
    // Simulate fetching game state
    const fetchGameState = async () => {
      // Replace this with your actual game state fetching logic
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    fetchGameState();

    // Simulate the dealing animation duration with a timeout
    const timer = setTimeout(() => {
      setIsDealingDone(true);
    }, 900); // 3 seconds animation duration

    return () => clearTimeout(timer);
  }, []);

  if (!isDealingDone) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[url('/image/TableBot.svg')] bg-no-repeat bg-cover bg-center relative">
        <DealingAnimation />
      </div>
    );
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isPlayerTurn = gameState.currentPlayerIndex === 0;

  const animateClick = () => {
    setScale(0.99);
    setTimeout(() => {
      setScale(1);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full  min-h-screen bg-[url('/image/TableBot.svg')]  bg-no-repeat bg-cover bg-center relative">
      <AnimatePresence>
        {isScoreboardVisible && (
          <ScoreDashboard onClose={() => setIsScoreboardVisible(false)} gameState={gameState}/>
        )}
      </AnimatePresence>

      {/* header game */}
      <div className="absolute w-screen h-16 top-0  bg-gradient-to-r from-[#9AD0C2] rgba(112,35,28,0.8)  rgba(91,36,36,1) via-[#583332] to-[#4E6A63]">
        <div className="flex flex-row h-full w-full justify-between">
          <button onClick={toggleSidebar}>
            <img
              onClick={animateClick}
              src="/image/sideBarButton.svg"
              alt="My image"
              className="w-full h-full"
              style={{
                transform: `scale(${scale})`,
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </button>
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <NetworkStatus />
        </div>
      </div>
      <img
        src="/image/headerGame.svg"
        alt="My image"
        className="w-auto absolute h-36 2xl:h-40 top-0"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.3s ease-in-out",
        }}
      />
      <div className="flex w-full max-w-7xl gap-4">
        {/* activity log  */}
        <div className="">
          <div className="h-[calc(100vh-8rem)]">
            <div className="h-full flex flex-col">
              <div className="flex-grow">
                <ActivityLog activities={gameActions} />
              </div>
            </div>
          </div>
        </div>
        {/* card and deck */}
        <div className="w-full flex flex-col justify-between items-center gap-10 ">
          <div>
            <div className="p-4">
              <h2 className="-xl font-semibold mb-2">
                {gameState.gameEnded
                  ? "Game Over"
                  : isPlayerTurn
                  ? ""
                  : `${currentPlayer.name}'s Turn`}
              </h2>
              {gameState.gameEnded ? (
                <div>
                  <ScoreDashboard gameState={gameState} />
                </div>
              ) : (
                " "
              )}
              {statusMessage && (
                <p className="text-sm text-blue-600 mt-2">{statusMessage}</p>
              )}
            </div>
          </div>
          <div>
            {/* Deck  */}
            <div className="p-4 2xl:px-8 rounded-md flex justify-center space-x-2 mb-10 mt-3 w-full"
            style={{
  background: 'linear-gradient(to bottom, rgba(0, 40, 56, 0.2), rgba(122, 210, 175, 0.2))'
}}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Deck
                  cardsLeft={gameState.deck.length}
                  onDraw={() =>
                    isPlayerTurn && !gameState.gameEnded && drawCard(false)
                  }
                  disabled={
                    gameState.hasDrawnThisTurn ||
                    !isPlayerTurn ||
                    gameState.gameEnded
                  }
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DiscardPile
                  topCard={
                    gameState.discardPile[gameState.discardPile.length - 1] ||
                    null
                  }
                  onDraw={() =>
                    isPlayerTurn && !gameState.gameEnded && drawCard(true)
                  }
                  disabled={
                    gameState.hasDrawnThisTurn ||
                    !isPlayerTurn ||
                    gameState.gameEnded ||
                    !canDrawFromDiscard()
                  }
                  canDraw={canDrawFromDiscard()}
                />
              </motion.div>
            </div>
          </div>
          {/* Player Hand */}
          <div>
            <div className="pb-24 pr-20 2xl:py-24 2xl:pr-0">
              <PlayerHand
                cardSize={" w-10 md:w-20 h-22 p-3 text-4xl"}
                hand={playerHand}
                onCardClick={handleCardClick}
                selectedIndices={gameState.selectedCardIndices}
                isCurrentPlayer={isPlayerTurn && !gameState.gameEnded}
                discardingIndex={discardingIndex}
              />
            </div>
          </div>
        </div>
        {/* melded */}
        <div className="absolute">
          <div className="h-[calc(100vh-8rem)] overflow-y-auto justify-center flex items-center">
            <div className="p-4">
              <MeldedCards
                cardSize={"w-16 h-22 p-3 text-3xl"}
                players={gameState.players}
                onSapawSelect={(target) => {
                  setSapawTarget(target);
                  setSelectedSapawTarget(target);
                }}
                currentPlayerIndex={gameState.currentPlayerIndex}
                selectedSapawTarget={selectedSapawTarget}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="absolute bottom-0 left-96 2xl:left-[36rem] transform translate-x-1/2 mb-4">
          <img
            onClick={animateClick}
            src="/image/userBorder.svg"
            alt="My image"
            className="w-30 h-36 2xl:h-40"
            style={{
              transform: `scale(${scale})`,
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </button>
        <button onClick={toggleChat}>
          <img
            onClick={animateClick}
            src="/image/chatButton.svg"
            alt="My image"
            className="w-32 h-32 absolute right-0 2xl:right-10 bottom-20" // Explicit width and height
            style={{
              transform: `scale(${scale})`,
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </button>
        <ChatSideBar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        <div className="px-28 2xl:px-36 flex w-screen items-center gap-11 h-32 absolute bottom-0 left-0 justify-between">
          <div>
            {" "}
            {/* left button */}
            <button
              onClick={handleMeld}
              disabled={
                !isPlayerTurn ||
                gameState.selectedCardIndices.length < 3 ||
                !gameState.hasDrawnThisTurn ||
                gameState.gameEnded
              }
            >
              <img
                onClick={animateClick}
                src="/image/dropButton.svg"
                alt="My image"
                className="w-[115px] 2xl:w-[145px] h-full"
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
            <button
              onClick={handleDiscard}
              disabled={
                !isPlayerTurn ||
                gameState.selectedCardIndices.length !== 1 ||
                !gameState.hasDrawnThisTurn ||
                gameState.gameEnded
              }
            >
              <img
                onClick={animateClick}
                src="/image/dumpButton.svg"
                alt="My image"
                className="w-[115px] 2xl:w-[145px] h-full"
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
            <button
                onClick={handleSapaw} 
                disabled={!isPlayerTurn || !sapawTarget || gameState.selectedCardIndices.length === 0 || !gameState.hasDrawnThisTurn || gameState.gameEnded}
            >
              <img
                src="/image/sapawButton.svg"
                alt="My image"
                className="w-[125px] 2xl:w-[160px] h-full"
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
            <button
              onClick={handleCallDraw}
              disabled={
                !isPlayerTurn ||
                gameState.selectedCardIndices.length < 3 ||
                !gameState.hasDrawnThisTurn ||
                gameState.gameEnded
              }
            >
              <img
                onClick={animateClick}
                src="/image/fightButton.svg"
                alt="My image"
                className="w-[115px] 2xl:w-[145px] h-full"
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
          </div>
          {/* right button */}
          <div className="h-full flex justify-center items-center">
            <button
            onClick={autoSort}
            >
              <img
                onClick={animateClick}
                src="/image/auoSort.svg"
                alt="My image"
                className="w-32 h-32" // Explicit width and height
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
            <button onClick={shuffleDecks}>
              <img
                onClick={animateClick}
                src="/image/shuffleButton.svg"
                alt="My image"
                className="w-32 h-32" // Explicit width and height
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
            <button onClick={shuffleDecks}>
              <img
                onClick={animateClick}
                src="/image/withdrawButton.svg"
                alt="My image"
                className="w-32 h-32" // Explicit width and height
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
            <button onClick={() => setIsScoreboardVisible(true)}>
              <img
                onClick={animateClick}
                src="/image/depositButton.svg"
                alt="My image"
                className="w-32 h-32" // Explicit width and height
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
