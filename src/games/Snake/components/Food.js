import React from "react";
import "../styles/Food.css";

const Food = ({ food, CELL_SIZE }) => {
  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${food.x * CELL_SIZE}px, ${food.y * CELL_SIZE}px)`,
      }}
    >
      <div
        className="snake-food"
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
        }}
      />
    </div>
  );
};

export default Food;
