export const hitWall = (head, GRID_SIZE) => {
  return head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
};

export const hitBody = (head, snake) => {
  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
};
