import React from "react";
import Options from "./Options";

export default function Question({ item, answer, dispatch }) {
  const { question, options, correctOption } = item;

  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        correctOption={correctOption}
        answer={answer}
        dispatch={dispatch}
      />
    </div>
  );
}
