import React, { useEffect, useState } from "react";
import "../styles/Guesser.css";

const Guesser = ({
  addTime,
  currentCountry,
  setCurrentCountry,
  getRandomCountry,
  countryList,
  setScore,
  gameOver,
}) => {
  const [guess, setGuess] = useState("");
  const [dropdownId, setDrowdownId] = useState(-1);

  const filteredCountries =
    guess.trim() === ""
      ? []
      : countryList.filter((country) =>
          country.name.toLowerCase().includes(guess.toLowerCase()),
        );

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setDrowdownId((prev) => Math.min(prev + 1, filteredCountries.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setDrowdownId((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === "Enter") {
      if (dropdownId >= 0) {
        setGuess(filteredCountries[dropdownId].name);
        setDrowdownId(-1);
      }
    }
  };

  useEffect(() => {
    if (currentCountry.name.toLowerCase() === guess.toLowerCase()) {
      addTime(5);
      setCurrentCountry(getRandomCountry);
      setScore((prev) => prev + 1);
      setGuess("");
    }
  }, [guess]);

  return (
    <div className="guesser">
      {!gameOver && (
        <>
          <input
            type="text"
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              setDrowdownId(-1);
            }}
            onKeyDown={handleKeyDown}
          />
          <div id="countries" className="guesser-countries">
            {filteredCountries.map((country, index) => {
              return (
                <span
                  key={index}
                  className={dropdownId === index ? "selected-guess" : ""}
                  onClick={() => {
                    setGuess(country.name);
                    setDrowdownId(-1);
                  }}
                >
                  {country.name}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Guesser);
