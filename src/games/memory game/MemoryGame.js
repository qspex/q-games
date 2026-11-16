import React, { useEffect, useState } from "react";
import "../memory game/MemoryGame.css";
import {
  foodIcons,
  animalsIcons,
  vehiclesIcons,
} from "../memory game/data/cards";
import Card from "./components/Card";
import { Link } from "react-router-dom";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [cardTheme, setCardTheme] = useState("food");
  const [gameStart, setGameStart] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const iconThemes = {
    food: foodIcons,
    animals: animalsIcons,
    vehicles: vehiclesIcons,
  };

  const options = ["food", "animals", "vehicles"];

  const createCards = () => {
    const icons = iconThemes[cardTheme] || [];
    return [...icons, ...icons]
      .map((icon, index) => ({
        id: index,
        icon,
        matched: false,
        flipped: false,
      }))
      .sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCards(createCards());
  }, [cardTheme]);

  const handleClick = (clickedCard) => {
    if (lockBoard) return;

    if (clickedCard.flipped || clickedCard.matched) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCard.id ? { ...card, flipped: true } : card,
      ),
    );

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else {
      setSecondCard(clickedCard);
    }
  };

  useEffect(() => {
    if (!firstCard || !secondCard) return;

    setLockBoard(true);

    if (firstCard.icon === secondCard.icon) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.icon === firstCard.icon ? { ...card, matched: true } : card,
        ),
      );

      resetTurn();
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: false }
              : card,
          ),
        );

        resetTurn();
      }, 1000);
    }
  }, [secondCard]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
  };

  const matchedCards = cards.filter((card) => card.matched).length;
  const win = matchedCards === cards.length;

  useEffect(() => {
    if (cards.length > 0 && win) {
      setGameOver(true);
    }
  }, [cards]);

  const restartGame = () => {
    setCards(createCards());

    setFirstCard(null);
    setSecondCard(null);

    setLockBoard(false);
    setGameOver(false);

    setGameStart(false);
  };

  return (
    <div className="memory-game">
      {!gameStart && (
        <div className="choose-theme-cards">
          <div className="theme-card-options">
            <h3>Choose theme</h3>
            <div className="theme-card-option">
              <span
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "#f09e24",
                  color: "white",
                  fontWeight: "500",
                }}
                onClick={() => setOpenOptions(!openOptions)}
              >
                {cardTheme}
              </span>
              {openOptions && (
                <>
                  {options.map((opt, id) => {
                    return (
                      <span
                        onClick={() => {
                          setCardTheme(`${opt}`);
                          setOpenOptions(false);
                        }}
                      >
                        {opt}
                      </span>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className="start-game-mc" onClick={() => setGameStart(true)}>
            Start Game
          </div>
        </div>
      )}
      {gameStart && (
        <>
          <div className="board">
            {cards.map((card) => (
              <Card key={card.id} card={card} handleClick={handleClick} />
            ))}
          </div>
          {gameOver && (
            <div className="game-over">
              <Link to="/">Back</Link>
              <button onClick={restartGame}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
