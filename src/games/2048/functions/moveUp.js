import { transpose } from "./board";
import { moveLeft } from "./moveLeft";

export const moveUp = (board) => {
  return transpose(moveLeft(transpose(board)));
};
