import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../Snake/Snake.css";
import { spawnFood } from "./functions/spawnFood";
import { hitBody, hitWall } from "./functions/collision";
import { getDirection } from "./functions/direction";
import { moveSnake } from "./functions/moveSnake";
import SnakeBoard from "./components/SnakeBoard";
import { Link } from "react-router-dom";

const Snake = () => {
  const GRID_SIZE = 20;
  const boardRef = useRef(null);
  const [boardSize, setBoardSize] = useState(0);
  const CELL_SIZE = boardSize / GRID_SIZE;
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState(spawnFood(snake, GRID_SIZE));
  const [direction, setDirection] = useState("");
  const directionRef = useRef(direction);

  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [gameOver, setGameOver] = useState(false);

  const touchStart = useRef(null);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];

        if (!directionRef.current) {
          return prev;
        }

        const newHead = moveSnake(head, directionRef.current);

        if (hitWall(newHead, GRID_SIZE)) {
          setGameOver(true);
          return prev;
        }

        if (hitBody(newHead, prev)) {
          setGameOver(true);
          return prev;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prev];

        if (!ateFood) {
          newSnake.pop();
        } else {
          setScore((prev) => prev + 1);
          setSpeed((prev) => Math.max(60, prev - 1));
          setFood(spawnFood(newSnake, GRID_SIZE));
        }
        return newSnake;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [food, gameOver]);

  const restartGame = () => {
    const startingSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    setSnake(startingSnake);
    setFood(spawnFood(startingSnake, GRID_SIZE));
    setDirection("");
    setScore(0);
    setSpeed(150);
    setGameOver(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (Math.max(absX, absY) < 30) {
      return;
    }
    if (absX > absY) {
      if (deltaX > 0) {
        setDirection((prev) => (prev !== "left" ? "right" : prev));
      } else {
        setDirection((prev) => (prev !== "right" ? "left" : prev));
      }
    } else {
      if (deltaY > 0) {
        setDirection((prev) => (prev !== "up" ? "down" : prev));
      } else {
        setDirection((prev) => (prev !== "down" ? "up" : prev));
      }
    }
    touchStart.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setDirection(getDirection(e.key, directionRef.current));
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!boardRef.current) return;

      const rect = boardRef.current.getBoundingClientRect();

      const size =
        rect.width -
        parseFloat(getComputedStyle(boardRef.current).borderLeftWidth) -
        parseFloat(getComputedStyle(boardRef.current).borderRightWidth);

      setBoardSize(size);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);

    if (boardRef.current) {
      observer.observe(boardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="snake-game">
      <SnakeBoard
        ref={boardRef}
        snake={snake}
        food={food}
        CELL_SIZE={CELL_SIZE}
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleTouchEnd}
      />
      {gameOver && (
        <div className="game-over-snake">
          <Link to="/">Back</Link>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Snake;
