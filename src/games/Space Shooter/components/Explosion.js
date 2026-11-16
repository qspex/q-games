import React from "react";
import "../styles/Explosion.css";

const Explosion = ({ x, y }) => {
  return (
    <div
      className="explosion"
      style={{
        left: `${x + 25}px`,
        top: `${y + 30}px`,
      }}
    ></div>
  );
};

export default Explosion;
