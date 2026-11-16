import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Games from "./components/Games";
import Nav from "./components/Nav";
import MemoryGame from "./games/memory game/MemoryGame";
import Game2048 from "./games/2048/Game2048";
import FlagGuesser from "./games/FlagGuesser/FlagGuesser";
import WhackAMole from "./games/WhackAMole/WhackAMole";
import SpaceShooter from "./games/Space Shooter/SpaceShooter";
import Snake from "./games/Snake/Snake";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Welcome />
                <Games />
              </>
            }
          />
          <Route
            path="/memory-game"
            element={
              <>
                <Nav gameName={"Memory Game"} />
                <MemoryGame />
              </>
            }
          />
          <Route
            path="/2048"
            element={
              <>
                <Nav gameName={"2048"} />
                <Game2048 />
              </>
            }
          />
          <Route
            path="/flag-guesser"
            element={
              <>
                <Nav gameName={"Flag Guesser"} />
                <FlagGuesser />
              </>
            }
          />
          <Route
            path="/whack-a-mole"
            element={
              <>
                <Nav gameName={"Whack A Mole"} />
                <WhackAMole />
              </>
            }
          />
          <Route
            path="/space-shooter"
            element={
              <>
                <Nav gameName={"Space Shooter"} />
                <SpaceShooter />
              </>
            }
          />
          <Route
            path="/snake"
            element={
              <>
                <Nav gameName={"Snake"} />
                <Snake />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
