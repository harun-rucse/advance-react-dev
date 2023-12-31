import { useQuizs } from "../contexts/QuizContext";

export default function Options({ options, correctOption }) {
  const { answer, handleNewAnswer } = useQuizs();
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options?.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer && "answer"}
            ${
              hasAnswered ? (correctOption === index ? "correct" : "wrong") : ""
            }
          `}
          key={option}
          disabled={hasAnswered}
          onClick={() => handleNewAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
