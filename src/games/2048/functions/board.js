import { moveLeft } from "./moveLeft";
import { moveRight } from "./moveRight";
import { moveUp } from "./moveUp";
import { moveDown } from "./moveDown";

export const createBoard = () => {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
};

export const spawnRandomTile = (board) => {
  const newBoard = board.map((row) => [...row]);

  const emptyCells = [];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (newBoard[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length === 0) return newBoard;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  newBoard[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;

  return newBoard;
};

export const boardsAreEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const transpose = (board) => {
  return board[0].map((_, col) => board.map((row) => row[col]));
};

export const isGameOver = (board) => {
  if (board.some((row) => row.includes(0))) {
    return false;
  }

  if (!boardsAreEqual(board, moveLeft(board))) return false;

  if (!boardsAreEqual(board, moveRight(board))) return false;

  if (!boardsAreEqual(board, moveUp(board))) return false;

  if (!boardsAreEqual(board, moveDown(board))) return false;

  return true;
};
