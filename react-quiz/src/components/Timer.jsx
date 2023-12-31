import { useEffect } from "react";
import { useQuizs } from "../contexts/QuizContext";

export default function Timer() {
  const { secondsRemaining, handleTick } = useQuizs();

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      handleTick();
    }, 1000);

    return () => clearInterval(id);
  }, [handleTick]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}
