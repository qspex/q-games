import React, { useState } from "react";
import "../styles/Games.css";
import { Link } from "react-router-dom";

const Games = () => {
  const [hovered, setHovered] = useState("");
  return (
    <div className="games">
      <div
        className={`game ${hovered === "memory-game" ? "show-game" : ""}`}
        onMouseOver={() => setHovered("memory-game")}
        onMouseLeave={() => setHovered("")}
      >
        <Link to="/memory-game">
          <img src="../imgs/memory-game-logo.jpg" alt="Memory Game" />
          <div className="game-info">
            <span>Memory Game</span>
          </div>
        </Link>
      </div>
      <div
        className={`game ${hovered === "2048" ? "show-game" : ""}`}
        onMouseOver={() => setHovered("2048")}
        onMouseLeave={() => setHovered("")}
      >
        <Link to="/2048">
          <img src="../imgs/2048-logo.jpg" alt="2048" />
          <div className="game-info">
            <span>2048</span>
          </div>
        </Link>
      </div>
      <div
        className={`game ${hovered === "flag-guesser" ? "show-game" : ""}`}
        onMouseOver={() => setHovered("flag-guesser")}
        onMouseLeave={() => setHovered("")}
      >
        <Link to="/flag-guesser">
          <img src="../imgs/flag-guesser-logo.jpg" alt="Flag Guesser" />
          <div className="game-info">
            <span>Flag Guesser</span>
          </div>
        </Link>
      </div>
      <div
        className={`game ${hovered === "whack-a-mole" ? "show-game" : ""}`}
        onMouseOver={() => setHovered("whack-a-mole")}
        onMouseLeave={() => setHovered("")}
      >
        <Link to="/whack-a-mole">
          <img src="../imgs/whack-a-mole-logo.jpg" alt="Whack A Mole" />
          <div className="game-info">
            <span>Whack A Mole</span>
          </div>
        </Link>
      </div>
      <div
        className={`game ${hovered === "space-shooter" ? "show-game" : ""}`}
        onMouseOver={() => setHovered("space-shooter")}
        onMouseLeave={() => setHovered("")}
      >
        <Link to="/space-shooter">
          <img src="../imgs/space-shooter-logo.jpg" alt="Space Shooter" />
          <div className="game-info">
            <span>Space Shooter</span>
          </div>
        </Link>
      </div>
      <div
        className={`game ${hovered === "snake" ? "show-game" : ""}`}
        onMouseOver={() => setHovered("snake")}
        onMouseLeave={() => setHovered("")}
      >
        <Link to="/snake">
          <img src="../imgs/snake-logo.jpg" alt="Snake" />
          <div className="game-info">
            <span>Snake</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Games;
