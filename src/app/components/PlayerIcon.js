import React from 'react';

function PlayerIcon({ positioning }) {
  return (
    <div className={`text-2xl absolute ${positioning}` }>
      Player
    </div>
  );
}

export default PlayerIcon;
