import React, { use, useEffect, useState } from "react";
import "../styles/Card.css";

const Card = ({ card, handleClick }) => {
  const [found, setFound] = useState(false);
  useEffect(() => {
    setFound(false);
    setTimeout(() => {
      if (card.matched) {
        setFound(true);
      }
    }, 500);
  }, [card.matched]);
  return (
    <div
      className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
      onClick={() => handleClick(card)}
    >
      <div className="card-inner">
        <div className="card-front">❓</div>
        <div className={`card-back ${found ? "found" : ""}`}>{card.icon}</div>
      </div>
    </div>
  );
};

export default Card;
