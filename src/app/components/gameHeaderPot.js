import React, { useEffect } from "react";
import Image from "next/image";

function GameHeaderPot({ gameState }) {
  const userWinner = gameState.players[0].consecutiveWins - 1;
  const potMoney = gameState.potMoney
  console.log("Header", potMoney)
  return (
    <div className="relative">
      <Image
        src="/image/headerGame.svg"
        width={1000}
        height={1000}
        alt="My image"
        className="w-auto h-36 2xl:h-40"
        style={{
          transition: "transform 0.3s ease-in-out",
        }}
      />
      <div className="absolute top-5 left-40 transform -translate-x-1/2 ">
        <div className="flex flex-row-reverse gap-3  w-48">
          {Array.from({ length: userWinner }).map((_, index) => (
            <div key={index}>
              <Image
                src="/image/winnerCrown.svg"
                width={50}
                height={50}
                alt="Winner Crown"
                className="w-12 h-12"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-7 right-14 transform -translate-x-1/2 ">
        <h3 className="font-robotoSans text-yellow-300 font-extrabold text-3xl text-stroke-thick tracking-tight">Pot: {potMoney}</h3>
      </div>
    </div>
  );
}

export default GameHeaderPot;
