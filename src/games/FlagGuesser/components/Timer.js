import "../styles/Timer.css";
import useTimer, { formatTime } from "../functions/useTimer";

const Timer = ({ timer }) => {
  const { timeLeft, progress } = timer;

  // const displayTime = Math.ceil(timeLeft);

  // const minutes = Math.floor(displayTime / 60);
  // const seconds = displayTime % 60;

  return (
    <div className="timer">
      {formatTime(timeLeft)}
      <div className="progress">
        <div
          className="progress-fill"
          style={{ transform: `scaleX(${progress / 100})` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
