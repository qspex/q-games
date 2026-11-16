import { transpose } from "./board";
import { moveRight } from "./moveRight";

export const moveDown = (board) => {
  return transpose(moveRight(transpose(board)));
};
