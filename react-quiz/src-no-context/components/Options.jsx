import React from "react";

export default function Options({ options, correctOption, dispatch, answer }) {
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
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
