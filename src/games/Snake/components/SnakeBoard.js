import React, { forwardRef } from "react";
import SnakeSegment from "./SnakeSegment";
import Food from "./Food";
import "../styles/SnakeBoard.css";

const SnakeBoard = forwardRef(
  ({ snake, food, CELL_SIZE, handleTouchEnd, handleTouchStart }, ref) => {
    return (
      <div
        ref={ref}
        className="snake-board"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {snake.map((segment, index) => (
          <SnakeSegment
            key={index}
            segment={segment}
            CELL_SIZE={CELL_SIZE}
            isHead={index === 0}
            isTail={index === snake.length - 1}
          />
        ))}

        <Food food={food} CELL_SIZE={CELL_SIZE} />
      </div>
    );
  },
);

export default SnakeBoard;
