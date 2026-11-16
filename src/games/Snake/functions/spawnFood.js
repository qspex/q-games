export const spawnFood = (snake, GRID_SIZE) => {
  while (true) {
    const food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    const onSnake = snake.some(
      (segment) => segment.x === food.x && segment.y === food.y,
    );
    if (!onSnake) {
      return food;
    }
  }
};
