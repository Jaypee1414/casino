import React from "react";
import NetworkStatus from "@/app/components/NetworkStatus";
// import { useRouter } from 'next/navigation';
function page() {
  // Router Back to the landing Page
  // const router = useRouter();
  // const handleButtonClickLive = () => {
  //   router.push('/TongitsGame/live-game');
  // };
  return (
    <div
      className="w-full h-screen"
      style={{
        background:
          "linear-gradient(to right, rgba(2, 24, 33, 0.6) 25%, rgba(149, 74, 74, 0.8) 44%)",
        zIndex: -1, // Send it to the background
      }}
    >
      <div className="absolute w-screen h-16 top-0 bg-user-name">
        {/* Header */}
        <div className="flex flex-row h-full w-full justify-between">
          <button>
            <img
              src="/image/existButton.svg"
              alt="My image"
              className="w-full h-full"
              style={{
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </button>
          <NetworkStatus />
        </div>
        {/* Choose Bet */}
        <div className="w-full h-auto flex justify-center items-center">
          <div className="flex flex-col">
            {/* Gamaber Vip Icon & Regular */}
            <div className="flex justify-between flex-row  items-center px-24 w-screen ">
              <div>
                <img
                  src="/image/vipGamebet.svg"
                  alt="My image"
                  className="w-auto h-64"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </div>
              <div>
                <img
                  src="/image/gamebetCrown.svg"
                  alt="My image"
                  className="w-auto h-56 slow-high-bounce"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </div>
              <div>
                <img
                  src="/image/gameberRegular.svg"
                  alt="My image"
                  className="w-auto h-56"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </div>
            </div>
            {/* Button Game Bet */}
            <div className="flex justify-between flex-row px-24 gap-10 w-screen">
              {/* VIP */}
              <div>
              <button>
                {" "}
                <img
                  src="/image/gamebet100.svg"
                  alt="My image"
                  className="w-auto h-56 hover:translate-y-[-10px] transition-transform ease-in-out duration-300"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </button>
              <button>
                {" "}
                <img
                  src="/image/gamebet50.svg"
                  alt="My image"
                  className="w-auto h-56 hover:translate-y-[-10px] transition-transform ease-in-out duration-300"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </button>
              <button>
                {" "}
                <img
                  src="/image/gamebet20.svg"
                  alt="My image"
                  className="w-auto h-56 hover:translate-y-[-10px] transition-transform ease-in-out duration-300"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </button>
              </div>
              {/* REGULAR */}
              <div>
              <button>
                {" "}
                <img
                  src="/image/gamebet2.svg"
                  alt="My image"
                  className="w-auto h-56 hover:translate-y-[-10px] transition-transform ease-in-out duration-300"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </button>
              <button>
                {" "}
                <img
                  src="/image/gamebet5.svg"
                  alt="My image"
                  className="w-auto h-56 hover:translate-y-[-10px] transition-transform ease-in-out duration-300"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </button>
              <button>
                {" "}
                <img
                  src="/image/gamebet10.svg"
                  alt="My image"
                  className="w-auto h-56 hover:translate-y-[-10px] transition-transform ease-in-out duration-300"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </button>
              </div>
            </div>
            {/* Button Quick Play */}
            <div className="w-full flex items-center justify-center py-16">
              <button>
              <img
              src="/image/gamebetQuickplay.svg"
              alt="My image"
              className="w-52 h-auto"
              style={{
                transition: "transform 0.3s ease-in-out",
              }}
            />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
