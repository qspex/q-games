import { moveRowLeft } from "./moveLeft";

export const moveRight = (board) => {
  return board.map((row) => {
    const reversed = [...row].reverse();
    const moved = moveRowLeft(reversed);
    return moved.reverse();
  });
};
