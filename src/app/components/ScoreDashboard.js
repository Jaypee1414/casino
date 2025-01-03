"use client";
import { useState } from "react";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import CrystalSnowAnimation from "./snowflakes";
import { motion } from "framer-motion";

function ScoreDashboard({ gameState, onClose }) {
  const scoreboardRef = useRef(null);
  const router = useRouter();
  const [scale, setScale] = useState(1);
  const [isWinner, setIsWinner] = useState();

  useEffect(() => {
    const scoreboard = scoreboardRef.current;

    gsap.set(scoreboard, { scale: 0.5, opacity: 0 });

    gsap.to(scoreboard, {
      duration: 0.5,
      scale: 1,
      opacity: 1,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Animation complete callback if needed
      },
    });
  }, []);

  const animateClick = () => {
    setScale(0.99);
    setTimeout(() => {
      setScale(1);
    }, 300);
  };
  console.log(gameState, "Game State");
  console.log(gameState.winner.id === 0);
  useEffect(() => {
    if (gameState) {
      setIsWinner(gameState.winner.id);
    }
  }, [gameState]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div>
        {/* Overlay */}
        <div
          className="fixed inset-0  z-20 bg-black bg-opacity-5"
          style={{
            height: "100vh",
          }}
        ></div>
        {/* ScoreBoard */}
        <div
          ref={scoreboardRef}
          className=" lg:w-screen lg:h-4/6 z-30 rounded-lg shadow-2xl opacity-80"
        >
          {/* Dashboard */}
          <div className="w-auto h-auto">
            {/* Scoreboard */}
            <img
              src=" /image/scoreboardBG.svg"
              alt="My image"
              className="w-screen 2xl:w-[145px] h-full"
              style={{
                transition: "transform 0.3s ease-in-out",
              }}
            />
            {/* Scoreboard Emblem Winner or Defeat */}
            <img
              src={
                isWinner
                  ? "/image/scoreboardWinner.svg"
                  : "/image/scoreboardDefeat.svg"
              }
              alt="My image"
              className="w-96 2xl:w-[145px] h-auto absolute -top-28 left-1/2 transform -translate-x-1/2"
              style={{
                transition: "transform 0.3s ease-in-out",
              }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-1/2  flex flex-col gap-3 pt-10">
              <div className=" w-full h-32 bg-opacity-5 bg-gradient-to-b from-[rgba(33,61,139,0.5)] to-[rgba(73,81,128,0.5)] border-4 border-yellow-300 rounded-lg">
                asasd
              </div>
              <div className=" w-full h-32 bg-opacity-5 bg-gradient-to-b from-[rgba(33,61,139,0.5)] to-[rgba(73,81,128,0.5)] border-4 border-yellow-300 rounded-lg">
                asasd
              </div>
              <div className=" w-full h-32 bg-opacity-5 bg-gradient-to-b from-[rgba(33,61,139,0.5)] to-[rgba(73,81,128,0.5)] border-4 border-yellow-300 rounded-lg">
                asasd
              </div>
            </div>
          </div>
          <div className="  text-white absolute -bottom-20 flex flex-row gap-5 left-1/2 transform -translate-x-1/2">
            <div>
              <button>Continue </button>
            </div>
            <div>
              <button>Details</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ScoreDashboard;
