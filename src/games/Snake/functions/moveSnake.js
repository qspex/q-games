export const moveSnake = (head, direction) => {
  switch (direction) {
    case "right": {
      return {
        x: head.x + 1,
        y: head.y,
      };
    }
    case "left": {
      return {
        x: head.x - 1,
        y: head.y,
      };
    }
    case "up": {
      return {
        x: head.x,
        y: head.y - 1,
      };
    }
    case "down": {
      return {
        x: head.x,
        y: head.y + 1,
      };
    }
    default:
      return head;
  }
};
