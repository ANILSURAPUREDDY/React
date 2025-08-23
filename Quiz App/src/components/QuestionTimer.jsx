import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeOut, mode }) {
  const [remainingTimeOut, setRemainingTimeOut] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeOut, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTimeOut((preTimeOut) => preTimeOut - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-timer"
      max={timeout}
      value={remainingTimeOut}
      className={mode}
    />
  );
}
