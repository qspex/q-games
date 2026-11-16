import React from "react";
import "../styles/Enemy.css";

const Enemy = ({ x, y }) => {
  return (
    <div className="enemy" style={{ transform: `translate(${x}px, ${y}px)` }}>
      👿
    </div>
  );
};

export default Enemy;
