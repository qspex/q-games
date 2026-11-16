import React from "react";
import "../styles/Hole.css";

const Hole = ({ id, active, handleWhack }) => {
  return (
    <div className="hole">
      <div
        className={`mole ${active ? "active" : ""}`}
        onClick={() => active && handleWhack(id)}
      >
        🐹
      </div>
    </div>
  );
};

export default Hole;
