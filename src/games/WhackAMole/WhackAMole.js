import React, { useEffect, useRef, useState } from "react";
import "../WhackAMole/WhackAMole.css";
import Hole from "./components/Hole";
import { Link } from "react-router-dom";

const WhackAMole = () => {
  const holes = Array.from({ length: 9 }, (_, i) => i);
  const [activeHole, setActiveHole] = useState(null);
  const [score, setScore] = useState(0);
  const [startGame, setStartGame] = useState(false);

  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const lastHole = useRef(null);

  const getRandomHole = () => {
    let randomHole;

    do {
      randomHole = Math.floor(Math.random() * 9);
    } while (randomHole === lastHole.current);

    lastHole.current = randomHole;

    return randomHole;
  };

  const handleClick = (id) => {
    if (id !== activeHole) return;
    setScore((prev) => prev + 1);
    setActiveHole(null);
  };

  useEffect(() => {
    if (gameOver) return;
    if (startGame) {
      let timeout;
      const showMole = () => {
        const hole = getRandomHole();
        setActiveHole(hole);

        timeout = setTimeout(() => {
          setActiveHole(null);

          timeout = setTimeout(showMole, 300);
        }, 700);
      };

      showMole();

      return () => clearTimeout(timeout);
    }
  }, [gameOver, startGame]);

  useEffect(() => {
    if (gameOver) return;

    if (startGame) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameOver, startGame]);

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setActiveHole(null);
    setGameOver(false);
    setStartGame(true);
  };

  return (
    <div className="whack-a-mole">
      <h3>Time Left: {timeLeft}</h3>
      <h3>Score: {score}</h3>
      <div className="wam-board">
        {holes.map((hole) => (
          <Hole
            key={hole}
            id={hole}
            active={activeHole === hole}
            handleWhack={handleClick}
          />
        ))}
      </div>
      {!startGame && (
        <div className="start-game-wam" onClick={() => setStartGame(true)}>
          Start Game
        </div>
      )}
      {gameOver && (
        <div className="game-over-wam">
          <Link to="/">Back</Link>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default WhackAMole;
