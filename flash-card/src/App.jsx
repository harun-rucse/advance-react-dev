import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      {/* <FlashCards />
       */}
      <DateCounter />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  const handleToggle = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  return (
    <div className="flashcards">
      {questions?.map((question) => (
        <CardItem
          key={question.id}
          question={question}
          selectedId={selectedId}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

function CardItem({ question, selectedId, onToggle }) {
  return (
    <div
      key={question.id}
      className={`${selectedId === question.id ? "selected" : ""}`}
      onClick={() => onToggle(question.id)}
    >
      {selectedId === question.id ? question.answer : question.question}
    </div>
  );
}

// Exercise for Date Counter
function DateCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + count);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + step);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - step);
  };

  const hanldeReset = () => {
    setCount(0);
    setStep(1);
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <div>
        <input
          type="range"
          min={0}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={handleDecrement}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={handleIncrement}>+</button>
        <p>
          <span>
            {count === 0
              ? "Today is "
              : count > 0
              ? `${count} days from now`
              : `${Math.abs(count)} days ago `}
          </span>
          <span>{date.toDateString()}</span>
        </p>
        {(count !== 0 ||
          step !== 1) && <button onClick={hanldeReset}>Reset</button>}
      </div>
    </div>
  );
}
