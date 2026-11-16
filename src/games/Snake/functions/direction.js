export const getDirection = (key, currentDirection) => {
  switch (key) {
    case "ArrowRight":
      return currentDirection !== "left" ? "right" : currentDirection;

    case "ArrowLeft":
      return currentDirection !== "right" ? "left" : currentDirection;

    case "ArrowUp":
      return currentDirection !== "down" ? "up" : currentDirection;

    case "ArrowDown":
      return currentDirection !== "up" ? "down" : currentDirection;

    default:
      return currentDirection;
  }
};
