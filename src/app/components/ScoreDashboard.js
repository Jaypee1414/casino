import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';

function ScoreDashboard({ gameState }) {
  const scoreboardRef = useRef(null);
  const router = useRouter();


  const handleButtonClick = () => {
    router.push('/TongitsGame');
  };

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
      }
    });
  }, []);
  console.log(gameState, "Game State");
  return (
    <div>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-10"></div>
      {/* ScoreBoard */}
      <div ref={scoreboardRef}  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#2B385F] to-[#ABB9C2] lg:w-8/12 lg:h-4/6 z-30 rounded-lg border border-gray-600 shadow-2xl">
        <button className="text-black hover:text-gray-500 -right-3 absolute -top-4 focus:outline-none  octagon bg-white p-1 shadow-md focus:text-gray-500 transition ease-in-out duration-150 z-10 " onClick={handleButtonClick}>
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-rows-4 grid-cols-9 h-5/6 w-11/12">
          {/* Dashboard */}
          <div
            className="border-2 text-[#FFCD06] font-jaro flex items-center justify-center text-2xl tracking-tight text-center"
            style={{
              WebkitTextStroke: "1px black",
              textStroke: "0.5px black",
            }}
          >
            Players
          </div>
          <div
            className="border-2 text-[#FFCD06] font-jaro flex items-center justify-center text-2xl tracking-tight text-center"
            style={{
              WebkitTextStroke: "1px black",
              textStroke: "0.5px black",
            }}
          >
            Score
          </div>
          <div
            className="border-2 text-[#FFCD06] font-jaro flex items-center justify-center text-2xl tracking-tight text-center"
            style={{
              WebkitTextStroke: "1px black",
              textStroke: "0.5px black",
            }}
          >
            Profit
          </div>
          <div
            className="border-2 text-[#FFCD06] font-jaro flex items-center justify-center text-2xl tracking-tight text-center"
            style={{
              WebkitTextStroke: "1px black",
              textStroke: "0.5px black",
            }}
          >
            Consecutive wins
          </div>
          <div
            className="border-2 text-[#FFCD06] font-jaro flex items-center justify-center text-2xl tracking-tight text-center"
            style={{
              WebkitTextStroke: "1px black",
              textStroke: "0.5px black",
            }}
          >
            Tongits
          </div>
          <div
            className="border-2 text-[#FFCD06] font-jaro flex items-center justify-center text-2xl tracking-tight text-center"
            style={{
              WebkitTextStroke: "1px black",
              textStroke: "0.5px black",
            }}
          >
            Secret melds
          </div>
          <div
            className="border-2 text-[#FFCD06] font-jaro flex items-center justify-center text-2xl tracking-tight text-center "
            style={{
              WebkitTextStroke: "1px black",
              textStroke: "0.5px black",
            }}
          >
            Burned Players
          </div>
          <div
            className="border-2 text-[#FFCD06] font-jaro flex items-center justify-center text-2xl tracking-tight text-center"
            style={{
              WebkitTextStroke: "1px black",
              textStroke: "0.5px black",
            }}
          >
            Challengers
          </div>
          <div
            className="border-2 text-[#FFCD06] font-jaro flex items-center justify-center text-2xl tracking-tight text-center"
            style={{
              WebkitTextStroke: "1px black",
              textStroke: "0.5px black",
            }}
          >
            Hitpot
          </div>
          {/* Player */}
          {gameState.players.map((player, index) => (
            <React.Fragment key={index}>
              <div
                className=" flex items-center justify-center text-2xl border-2 font-jaro text-white tracking-tight"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "0.5px black",
                }}
              >
                {player.name}
              </div>
              <div
                className=" flex items-center justify-center text-2xl border-2 font-jaro text-white tracking-tight"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "0.5px black",
                }}
              >
                {player.score}
              </div>
              <div
                className=" flex items-center justify-center text-2xl border-2 font-jaro text-white tracking-tight"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "0.5px black",
                }}
              >
                0
              </div>
              <div
                className=" flex items-center justify-center text-2xl border-2 font-jaro text-white tracking-tight"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "0.5px black",
                }}
              >
                {player.consecutiveWins}
              </div>
              <div
                className=" flex items-center justify-center text-2xl border-2 font-jaro text-white tracking-tight"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "0.5px black",
                }}
              >
                0
              </div>
              <div
                className=" flex items-center justify-center text-2xl border-2 font-jaro text-white tracking-tight"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "0.5px black",
                }}
              >
                {player.secretMelds.length}
              </div>
              <div
                className=" flex items-center justify-center text-2xl border-2 font-jaro text-white tracking-tight"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "0.5px black",
                }}
              >
                {player.exposedMelds.length > 0 ? "0" : "1" }
              </div>
              <div
                className=" flex items-center justify-center text-2xl border-2 font-jaro text-white tracking-tight"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "0.5px black",
                }}
              >
                {player.turnsPlayed}
              </div>
              <div
                className=" flex items-center justify-center text-2xl border-2 font-jaro text-white tracking-tight"
                style={{
                  WebkitTextStroke: "1px black",
                  textStroke: "0.5px black",
                }}
              >
                {/* hitpot */}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScoreDashboard;

