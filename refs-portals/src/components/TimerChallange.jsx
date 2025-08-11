import { useState, useRef } from "react";
import ResultModal from "./ResultsModal";
//let timer;
export default function TimerChallenge({ title, targettime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targettime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targettime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);

    dialog.current.open();
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((preTimeRemaining) => preTimeRemaining - 10);
    }, 10);
  }

  function handleReset() {
    setTimeRemaining(targettime * 1000);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targettime}
        remainingTime={timeRemaining}
        onRest={handleReset}
      />

      <section className="challenge">
        <h1>{title}</h1>

        <p className="challenge-time">
          {targettime} second{targettime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "STOP" : "START"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
