import React from 'react';

function PlayerIcon({ playerIndex,players, positioning  }) {
  let imageUrl = ''
  
  if(playerIndex === 0 ){
    imageUrl = `https://miro.medium.com/v2/resize:fit:1400/1*rKl56ixsC55cMAsO2aQhGQ@2x.jpeg`
  }else{
    imageUrl = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVCTEOejHb2Cc4W8KxhLqz8_o5K2rO3XrfpA&s`
  }
  
  return (
    <div className={`text-2xl absolute ${positioning}` }>
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-xs w-full">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16">
        <img
             src={imageUrl || "/placeholder.svg?height=64&width=64"}
            alt="My image"
            className="rounded-full object-cover"
            style={{
              
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{players[playerIndex].name}</h2>
          <p className="text-gray-300">Cards: {players[playerIndex]?.hand.length}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg">
          Pot Money: <span className="font-semibold text-green-400">₱ NAN</span>
        </p>
      </div>
    </div>

    </div>
  );
}

export default PlayerIcon;
