import React, { useEffect, useState } from "react";
import "../styles/Board.css";
import {
  boardsAreEqual,
  createBoard,
  isGameOver,
  spawnRandomTile,
} from "../functions/board";
import { moveLeft } from "../functions/moveLeft";
import { moveRight } from "../functions/moveRight";
import { moveUp } from "../functions/moveUp";
import { moveDown } from "../functions/moveDown";
import { Link } from "react-router-dom";

const Board = () => {
  const initializeGame = () => {
    let board = createBoard();

    board = spawnRandomTile(board);
    board = spawnRandomTile(board);

    return board;
  };

  const [board, setBoard] = useState(initializeGame);
  const [gameOver, setGameOver] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const makeMove = (direction) => {
    setBoard((currentBoard) => {
      let newBoard = currentBoard;

      switch (direction) {
        case "left":
          newBoard = moveLeft(currentBoard);
          break;

        case "right":
          newBoard = moveRight(currentBoard);
          break;

        case "up":
          newBoard = moveUp(currentBoard);
          break;

        case "down":
          newBoard = moveDown(currentBoard);
          break;

        default:
          return currentBoard;
      }

      if (boardsAreEqual(currentBoard, newBoard)) {
        return currentBoard;
      }

      return spawnRandomTile(newBoard);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          makeMove("left");
          break;

        case "ArrowRight":
          e.preventDefault();
          makeMove("right");
          break;

        case "ArrowUp":
          e.preventDefault();
          makeMove("up");
          break;

        case "ArrowDown":
          e.preventDefault();
          makeMove("down");
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePointerDown = (e) => {
    setTouchStart({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handlePointerUp = (e) => {
    if (!touchStart) return;

    const deltaX = e.clientX - touchStart.x;
    const deltaY = e.clientY - touchStart.y;

    const MIN_DISTANCE = 40;

    if (Math.abs(deltaX) < MIN_DISTANCE && Math.abs(deltaY) < MIN_DISTANCE) {
      setTouchStart(null);
      return;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      makeMove(deltaX > 0 ? "right" : "left");
    } else {
      makeMove(deltaY > 0 ? "down" : "up");
    }

    setTouchStart(null);
  };

  useEffect(() => {
    setGameOver(isGameOver(board));
  }, [board]);

  const restartGame = () => {
    setBoard(initializeGame());
    setGameOver(false);
  };

  return (
    <>
      {gameOver && (
        <div className="game-over-2048-txt">
          <h3>Game Over</h3>
        </div>
      )}
      <div
        className={!gameOver ? "board-2048" : "board-2048-game-over"}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`tile-2048 tile-color-${value}`}
            >
              {value !== 0 && value}
            </div>
          )),
        )}
      </div>
      {gameOver && (
        <div className="game-over-2048">
          <Link to="/">Back</Link>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </>
  );
};

export default Board;
