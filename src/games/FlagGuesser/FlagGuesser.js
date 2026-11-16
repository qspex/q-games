import React, { useState } from "react";
import "../FlagGuesser/FlagGuesser.css";
import FlagScreen from "./components/FlagScreen";
import Timer from "./components/Timer";
import useTimer from "./functions/useTimer";
import Guesser from "./components/Guesser";
import countries from "./data/countries.json";
import { Link } from "react-router-dom";

const countryList = countries.map((country) => ({
  name: country.name.common,
  flag: `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`,
}));

const FlagGuesser = () => {
  const timer = useTimer(60);
  const [score, setScore] = useState(0);

  const getRandomCountry = () =>
    countryList[Math.floor(Math.random() * countryList.length)];

  const [currentCountry, setCurrentCountry] = useState(getRandomCountry);

  const restartGame = () => {
    setCurrentCountry(getRandomCountry());
    setScore(0);
    timer.reset();
    timer.setGameEnd(false);
  };

  const giveUp = () => {
    timer.setGameEnd(true);
    timer.setEndTime(0);
    timer.setTimeLeft(0);
  };

  return (
    <div className="flag-guesser">
      <Timer timer={timer} />
      <div className="flag-score">{score}</div>
      <div className="give-up-fg" onClick={giveUp}>
        Give Up
      </div>
      <FlagScreen key={currentCountry.name} currentCountry={currentCountry} />
      <Guesser
        addTime={timer.addTime}
        currentCountry={currentCountry}
        setCurrentCountry={setCurrentCountry}
        getRandomCountry={getRandomCountry}
        countryList={countryList}
        setScore={setScore}
        gameOver={timer.gameEnd}
      />
      {timer.gameEnd && (
        <>
          <h3 className="game-over-country-reveal">{currentCountry.name}</h3>
          <div className="game-over-flag-guesser">
            <Link to="/">Back</Link>
            <button onClick={restartGame}>Play Again</button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlagGuesser;
