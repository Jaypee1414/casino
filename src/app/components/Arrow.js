import React from "react";

function Arrow() {
  return (
    <div>
      <img
        src="/image/arrowDiscardPile.svg"
        alt="My image"
        className="w-20 h-20 absolute slow-high-bounce" // Explicit width and height
        style={{
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </div>
  );
}

export default Arrow;
