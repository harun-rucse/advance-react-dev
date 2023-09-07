import { useQuizs } from "../contexts/QuizContext";

export default function NextButton() {
  const { answer, index, numQuestions, handleNextQuestion, handleFinished } =
    useQuizs();

  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={handleNextQuestion}>
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={handleFinished}>
        Finish
      </button>
    );
  }
}
