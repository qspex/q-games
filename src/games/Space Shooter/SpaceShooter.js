import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../Space Shooter/SpaceShooter.css";
import Ship from "./components/Ship";
import Bullet from "./components/Bullet";
import Enemy from "./components/Enemy";
import { isColliding } from "./functions/collision";
import { Link } from "react-router-dom";
import Explosion from "./components/Explosion";
import explosionSound from "../Space Shooter/assets/sounds/explosion.mp3";
import shootingSound from "../Space Shooter/assets/sounds/shooting.mp3";
import gameOverSound from "../Space Shooter/assets/sounds/gameOver.mp3";

const SpaceShooter = () => {
  const [shipX, setShipX] = useState(0);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [explosions, setExplosions] = useState([]);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const boardRef = useRef(null);
  const [boardWidth, setBoardWidth] = useState(500);
  const [boardHeight, setBoardHeight] = useState(700);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const SHIP_WIDTH = isMobile ? 40 : 60;
  const ENEMY_WIDTH = isMobile ? 30 : 40;

  const shipXRef = useRef(220);
  const keyPressed = useRef({});
  const lastShot = useRef(0);
  const touchDirection = useRef(null);
  const shooting = useRef(false);

  const [openSettings, setOpenSettings] = useState(false);
  const [explosionVolume, setExplosionVolume] = useState(() => {
    return Number(localStorage.getItem("ExplosionVolume")) || 0.5;
  });
  const [shootingVolume, setShootingVolume] = useState(() => {
    return Number(localStorage.getItem("ShootingVolume")) || 0.5;
  });
  const [gameOverVolume, setGameOverVolume] = useState(() => {
    return Number(localStorage.getItem("GameOverVolume")) || 0.5;
  });

  const explosionAudio = useRef(null);
  const shootingAudio = useRef(null);
  const gameOverAudio = useRef(null);
  useEffect(() => {
    explosionAudio.current = new Audio(explosionSound);
    explosionAudio.current.preload = "auto";
    shootingAudio.current = new Audio(shootingSound);
    shootingAudio.current.preload = "auto";
    gameOverAudio.current = new Audio(gameOverSound);
    gameOverAudio.current.preload = "auto";
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const handleKeyDown = (e) => {
      keyPressed.current[e.code] = true;
    };

    const handleKeyUp = (e) => {
      keyPressed.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [shipX, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setBullets((prev) =>
        prev
          .map((bullet) => ({
            ...bullet,
            y: bullet.y - 8,
          }))
          .filter((bullet) => bullet.y > -20),
      );
    }, 16);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setEnemies((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * (boardWidth - ENEMY_WIDTH - 10),
          y: -40,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, boardWidth, ENEMY_WIDTH]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      if (
        keyPressed.current["ArrowLeft"] ||
        touchDirection.current === "left"
      ) {
        setShipX((prev) => {
          const next = Math.max(0, prev - 6);
          shipXRef.current = next;
          return next;
        });
      }
      if (
        keyPressed.current["ArrowRight"] ||
        touchDirection.current === "right"
      ) {
        setShipX((prev) => {
          const next = Math.min(boardWidth - SHIP_WIDTH - 6, prev + 6);
          shipXRef.current = next;
          return next;
        });
      }
      if (keyPressed.current["Space"] && Date.now() - lastShot.current > 200) {
        lastShot.current = Date.now();
        shoot();
      }
      if (shooting.current && Date.now() - lastShot.current > 200) {
        lastShot.current = Date.now();
        shoot();
      }
      setEnemies((prev) => {
        const remainingEnemies = [];
        prev.forEach((enemy) => {
          const updatedEnemy = { ...enemy, y: enemy.y + (3 + level * 0.5) };
          if (updatedEnemy.y >= boardHeight) {
            setLives((lives) => {
              const newLives = lives - 1;
              if (newLives <= 0) {
                setGameOver(true);
                playGameOver();
              }
              return newLives;
            });
          } else {
            remainingEnemies.push(updatedEnemy);
          }
        });
        return remainingEnemies;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [gameOver, boardWidth, level]);

  useEffect(() => {
    const bulletsToRemove = new Set();
    const enemiesToRemove = new Set();

    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        if (isColliding(bullet, enemy)) {
          bulletsToRemove.add(bullet.id);
          enemiesToRemove.add(enemy.id);
          setExplosions((prev) => [
            ...prev,
            {
              id: Date.now(),
              x: enemy.x,
              y: enemy.y,
            },
          ]);
          playExplosion();
        }
      });
    });

    if (bulletsToRemove.size > 0) {
      setBullets((prev) =>
        prev.filter((bullet) => !bulletsToRemove.has(bullet.id)),
      );
      setEnemies((prev) =>
        prev.filter((enemy) => !enemiesToRemove.has(enemy.id)),
      );

      setScore((prev) => prev + enemiesToRemove.size);
    }
  }, [bullets, enemies]);

  useEffect(() => {
    if (explosions.length === 0) return;

    const timeout = setTimeout(() => {
      setExplosions((prev) => prev.slice(1));
    }, 250);

    return () => clearTimeout(timeout);
  }, [explosions]);

  const restartGame = () => {
    keyPressed.current = {};
    lastShot.current = 0;

    setBullets([]);
    setEnemies([]);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setShipX((boardWidth - SHIP_WIDTH) / 2);
    setOpenSettings(false);
  };

  useEffect(() => {
    setLevel(Math.floor(score / 10) + 1);
  }, [score]);

  const shoot = () => {
    setBullets((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: shipXRef.current + SHIP_WIDTH / 2,
        y: boardHeight - 70,
      },
    ]);
    playShooting();
  };

  const playExplosion = () => {
    const audio = explosionAudio.current.cloneNode();
    audio.volume = explosionVolume;
    audio.play();
  };
  const playShooting = () => {
    const audio = shootingAudio.current.cloneNode();
    audio.volume = shootingVolume;
    audio.play();
  };
  const playGameOver = () => {
    const audio = gameOverAudio.current.cloneNode();
    audio.volume = gameOverVolume;
    audio.play();
  };

  useEffect(() => {
    localStorage.setItem("ExplosionVolume", explosionVolume);
    localStorage.setItem("ShootingVolume", shootingVolume);
    localStorage.setItem("GameOverVolume", gameOverVolume);
  }, [explosionVolume, shootingVolume, gameOverVolume]);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!boardRef.current) return;

      const width = boardRef.current.clientWidth;
      const height = boardRef.current.clientHeight;
      const mobile = window.innerWidth <= 768;
      const shipWidth = mobile ? 40 : 60;

      setBoardWidth(width);
      setBoardHeight(height);
      setIsMobile(mobile);

      const center = (width - shipWidth) / 2;
      setShipX(center);
      shipXRef.current = center;
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="space-shooter">
      <h3 style={{ marginTop: "1rem" }}>Score: {score}</h3>
      <h3>Level: {level}</h3>
      <div
        className="space-shooter-open-settings"
        onClick={() => setOpenSettings(!openSettings)}
      >
        🔊
      </div>
      {openSettings && (
        <div className="settings">
          <div className="volume-setting">
            <label>Explosion</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explosionVolume}
              onChange={(e) => setExplosionVolume(Number(e.target.value))}
            />
          </div>
          <div className="volume-setting">
            <label>Shooting</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={shootingVolume}
              onChange={(e) => setShootingVolume(Number(e.target.value))}
            />
          </div>
          <div className="volume-setting">
            <label>GameOver</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={gameOverVolume}
              onChange={(e) => setGameOverVolume(Number(e.target.value))}
            />
          </div>
        </div>
      )}
      <div className="space-shooter-board" ref={boardRef}>
        <Ship x={shipX} />
        {bullets.map((bullet) => (
          <Bullet key={bullet.id} x={bullet.x} y={bullet.y} />
        ))}
        {enemies.map((enemy) => (
          <Enemy key={enemy.id} x={enemy.x} y={enemy.y} />
        ))}
        {explosions.map((explosion) => (
          <Explosion key={explosion.id} x={explosion.x} y={explosion.y} />
        ))}
      </div>
      <div className="space-shooter-controls">
        <div className="space-shooter-movements">
          <span
            onTouchStart={(e) => {
              touchDirection.current = "left";
            }}
            onTouchEnd={() => {
              touchDirection.current = null;
            }}
            style={{ borderRight: "1px solid white" }}
          >{`<`}</span>
          <span
            onTouchStart={(e) => {
              touchDirection.current = "right";
            }}
            onTouchEnd={() => {
              touchDirection.current = null;
            }}
          >{`>`}</span>
        </div>
        <div
          className="space-shooter-mob-volume"
          style={{ borderRight: "1px solid white" }}
          onClick={() => setOpenSettings(!openSettings)}
        >
          🔊
        </div>
        <div className="space-shooter-shoot">
          <span
            onTouchStart={() => {
              shooting.current = true;
            }}
            onTouchEnd={() => {
              shooting.current = false;
            }}
          >
            ⭕
          </span>
        </div>
      </div>
      <h3 style={{ margin: "0.5rem 0 3rem 0" }}>
        {Array.from({ length: Math.ceil(lives) }).map((_, i) => (
          <span key={i}>❤️</span>
        ))}

        {/* local host */}
        {/* {Array.from({ length: Math.ceil(lives / 2) }).map((_, i) => (
          <span key={i}>❤️</span>
        ))} */}
      </h3>
      {gameOver && (
        <div className="game-over-ss">
          <Link to="/">Back</Link>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default SpaceShooter;
