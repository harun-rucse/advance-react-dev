import Options from "./Options";
import { useQuizs } from "../contexts/QuizContext";

export default function Question() {
  const { questions, index } = useQuizs();

  const { question, options, correctOption } = questions[index];

  return (
    <div>
      <h4>{question}</h4>
      <Options options={options} correctOption={correctOption} />
    </div>
  );
}
