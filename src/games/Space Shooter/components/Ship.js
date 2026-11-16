import React from "react";
import "../styles/Ship.css";

const Ship = ({ x }) => {
  return (
    <div
      className="ship"
      style={{ transform: `translateX(${x}px) rotate(-45deg)` }}
    >
      🚀
    </div>
  );
};

export default Ship;
