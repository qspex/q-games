import React from "react";
import "../styles/Bullet.css";

const Bullet = ({ x, y }) => {
  return (
    <div
      className="bullet"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    ></div>
  );
};

export default Bullet;
