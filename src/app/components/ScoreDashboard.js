"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Card } from "../TongitsGame/play-bot/Card";
import Scoreboard from "./Scoreboard";

function ScoreDashboard({ gameState, onClose, resetGame, Reset }) {
  const scoreboardRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isWinner, setIsWinner] = useState();
  const [countdown, setCountdown] = useState(10);
  const [closing, setClosing] = useState(false); // Added closing state
  const [showDetails, setShowDetails] = useState(false); // New state for toggling scoreboard visibility

  // Animate for pop up
  useEffect(() => {
    const scoreboard = scoreboardRef.current;
    gsap.set(scoreboard, { scale: 0.5, opacity: 0 });

    gsap.to(scoreboard, {
      duration: 0.5,
      scale: 1,
      opacity: 1,
      ease: "back.out(1.7)",
    });
  }, []);

  // Set winner from gameState
  useEffect(() => {
    if (gameState) {
      setIsWinner(gameState.winner.id);
    }
  }, [gameState]);

  // Countdown and auto-close effect
  useEffect(() => {
    if (!closing) return; // Prevent starting countdown if not in closing state
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          setTimeout(() => {
            Reset(); // Reset the game after countdown ends
          }, 0);
          clearInterval(timer); // Clear the countdown timer
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [closing, Reset]);

  useEffect(() => {
    setClosing(true); // Start the countdown immediately when the component mounts
  }, []);

  // Handle close and reset the scoreboard with animation
  const handleClose = () => {
    setClosing(true); // Start countdown
    gsap.to(scoreboardRef.current, {
      duration: 0.5,
      opacity: 0,
      scale: 0.5,
      ease: "back.in(1.7)",
      onComplete: () => {
        onClose(); // Close the scoreboard
      },
    });
  };

  // Toggle the scoreboard details visibility
  const handleViewDetails = () => {
    setShowDetails((prevState) => !prevState); // Toggle the scoreboard visibility
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/20 z-0"
          style={{
            height: "100vh", // This should be fine unless you want the overlay to cover the entire parent
          }}
        ></div>

        {/* Scoreboard */}
        <div
          ref={scoreboardRef}
          className="lg:w-screen lg:h-4/6 z-30 rounded-lg shadow-2xl"
        >
          {/* Dashboard */}
          <div className="w-screen h-screen z-30">
            {/* Scoreboard */}
            <img
              src=" /image/scoreboardBG.svg"
              alt="My image"
              className="absolute w-9/12 bottom-7 left-1/2 transform -translate-x-1/2"
              style={{
                transition: "transform 0.3s ease-in-out",
              }}
            />
            {/* Scoreboard Emblem Winner or Defeat */}
            <img
              src={
                isWinner === 0
                  ? "/image/scoreboardWinner.svg"
                  : "/image/scoreboardDefeat.svg"
              }
              alt="My image"
              className="w-[400px] 2xl:w-[145px] h-auto absolute left-1/2 top-1 transform -translate-x-1/2 z-40"
              style={{
                transition: "transform 0.3s ease-in-out",
              }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-3/5 flex flex-col gap-4 mt-16">
              {/* scoreboard user list */}
              {gameState.players.map((player, index) => {
                return (
                  <div
                    className="w-full h-36 bg-opacity-5 bg-gradient-to-b from-[rgba(33,61,139,0.5)] to-[rgba(73,81,128,0.5)] border-4 border-yellow-300 rounded-lg flex flex-row gap-3 relative"
                    key={index}
                  >
                    <div className="flex h-full items-center pl-5 w-auto">
                      <img
                        src="https://miro.medium.com/v2/resize:fit:1400/1*rKl56ixsC55cMAsO2aQhGQ@2x.jpeg"
                        className="rounded-full border-2 border-yellow-300 bg-black w-24 h-24"
                      />
                    </div>
                    <div className="w-40">
                      <div className="flex flex-col my-3 gap-2 justify-center h-full w-full">
                        {/* Player name */}
                        <h3
                          className="font-robotoSans font-extrabold text-white text-2xl"
                          style={{
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {player.name}
                        </h3>
                        {/* Line */}
                        <div
                          className="w-full h-1 bg-yellow-400 border rounded-lg"
                          style={{ backgroundColor: "yellow !important" }}
                        ></div>
                        {/* WINNER AND LOSE */}
                        <div>
                          <h3
                            className="font-robotoSans font-extrabold text-3xl p-2"
                            style={{
                              color: player.id === isWinner ? "#FFEE00" : "#CEC9C9",
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            {player.id === isWinner ? "WINNER!" : "Lose!"}
                          </h3>
                        </div>
                      </div>
                    </div>
                    {/* Player Card */}
                    <div className="flex items-center w-10">
                      <div className="flex flex-row justify-between">
                        {player.hand.map((card, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{
                              scale: 1,
                              x: index * -25, // Shift each card along the X axis
                            }}
                            className="transform scale-75 origin-top-left cursor-pointer rounded-md"
                          >
                            <Card
                              border={`1px solid black`}
                              transformCard={`perspective(500px) rotateX(0deg)`}
                              cardSize={"w-14 h-20 p-1 text-md 2xl:text-lg"}
                              card={card}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    {/* Player points */}
                    <div className="">
                      <div className="absolute right-0 p-5 flex flex-row justify-center gap-2 items-center ">
                        <div className="rounded-full p-2 text-2xl bg-[url('/image/pointsBG.svg')] bg-no-repeat bg-cover bg-center font-extrabold border-2 w-14 h-14 border-black items-center justify-center flex ">
                          {player.score}
                        </div>
                        <h4 className="text-white font-bold text-xl">Points</h4>
                      </div>
                      <img
                        src=" /image/scoreboardBGDeduction.svg"
                        alt="My image"
                        className="w-36 2xl:w-[145px] absolute right-0 bottom-0"
                        style={{
                          transition: "transform 0.3s ease-in-out",
                        }}
                      />
                      <div className="absolute right-3 -bottom-3 flex flex-row items-center justify-center">
                        <img
                          src=" /image/scoreboardCoints.svg"
                          alt="My image"
                          className="w-16 2xl:w-[145px]"
                          style={{
                            transition: "transform 0.3s ease-in-out",
                          }}
                        />
                        <h3
                          className="text-white text-2xl font-extrabold font-robotoSans"
                          style={{
                            color: player.id === isWinner ? "#00FF22" : "#FF0000",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {" "}
                          {player.id === isWinner ? "+" : "-"}25000
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className=" flex justify-end text-white font-extrabold text-xl gap-2">
                <button
                  onClick={handleClose} // Close button triggers the closing logic
                  className="bg-text-gradient py-2 px-5 rounded-full border-2 border-slate-300"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Close
                </button>
                <button
                  onClick={handleViewDetails} // Toggle scoreboard visibility on button click
                  className="bg-Button-gradient py-2 px-5 rounded-full border-2 border-slate-300"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
            {showDetails && <Scoreboard gameState={gameState} onClose={handleClose} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ScoreDashboard;
