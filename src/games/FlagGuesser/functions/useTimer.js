import { useEffect, useState } from "react";

const useTimer = (duration = 60) => {
  const [endTime, setEndTime] = useState(Date.now() + duration * 1000);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [gameEnd, setGameEnd] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, (endTime - Date.now()) / 1000);

      setTimeLeft(remaining);

      if (remaining <= 0) {
        setGameEnd(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const addTime = (seconds) => {
    setEndTime((prev) => {
      const newEndTime = prev + seconds * 1000;
      const maxEndTime = Date.now() + duration * 1000;

      return Math.min(newEndTime, maxEndTime);
    });
  };

  const progress = (timeLeft / duration) * 100;

  const reset = () => {
    setEndTime(Date.now() + duration * 1000);
  };

  return {
    timeLeft,
    setTimeLeft,
    setEndTime,
    progress,
    addTime,
    gameEnd,
    setGameEnd,
    reset,
  };
};

export default useTimer;

export const formatTime = (timeLeft) => {
  const totalSeconds = Math.ceil(timeLeft);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
