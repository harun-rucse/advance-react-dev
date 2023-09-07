import { useQuizs } from "../contexts/QuizContext";

export default function StartScreen() {
  const {numQuestions, startQuiz} = useQuizs()

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={startQuiz}
      >
        Let&apos;s start
      </button>
    </div>
  );
}
