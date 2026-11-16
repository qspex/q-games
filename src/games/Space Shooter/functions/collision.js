export const isColliding = (bullet, enemy) => {
  return (
    bullet.x < enemy.x + 55 &&
    bullet.x + 4 > enemy.x &&
    bullet.y < enemy.y + 40 &&
    bullet.y + 16 > enemy.y
  );
};
