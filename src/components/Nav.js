import React from "react";
import "../styles/Nav.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";

const Nav = ({ gameName }) => {
  return (
    <div className="nav">
      <div className="back-to-hub">
        <Link to="/">
          <KeyboardBackspaceIcon sx={{ fontSize: "50px" }} />
        </Link>
      </div>
      <h3>{gameName}</h3>
    </div>
  );
};

export default Nav;
