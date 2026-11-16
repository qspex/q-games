import React from "react";
import "../styles/SnakeSegment.css";

const SnakeSegment = ({ segment, CELL_SIZE, isHead, isTail }) => {
  return (
    <div
      className="snake-segment-wrapper"
      style={{
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
        transform: `
          translate(
            ${segment.x * CELL_SIZE}px,
            ${segment.y * CELL_SIZE}px
          )
        `,
      }}
    >
      <div
        className={`snake-segment ${
          isHead ? "snake-head" : isTail ? "snake-tail" : "snake-body"
        }`}
      ></div>
    </div>
  );
};

export default SnakeSegment;
