import React, { useEffect, useState } from "react";
import "../styles/FlagScreen.css";

const FlagScreen = ({ currentCountry }) => {
  const [revealing, setRevealing] = useState(false);
  const [revealDirection, setRevealDirection] = useState("");
  const revealingDirection = ["neg-x", "pos-x", "neg-y", "pos-y"];

  useEffect(() => {
    setRevealDirection(
      revealingDirection[Math.floor(Math.random() * revealingDirection.length)],
    );
  }, [currentCountry]);

  useEffect(() => {
    setRevealing(false);

    const timeout = setTimeout(() => {
      setRevealing(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [currentCountry]);

  return (
    <div className="flag-screen">
      <img src={currentCountry.flag} alt={currentCountry.name} />
      <div
        className={`img-cover ${revealing ? `${revealDirection}` : "revealed"}`}
      ></div>
    </div>
  );
};

export default FlagScreen;
