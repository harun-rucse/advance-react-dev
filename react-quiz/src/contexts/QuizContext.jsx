import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };

    case "newAnswer": {
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish": {
      const { points, highscore } = state;
      const newHighscore = points > highscore ? points : highscore;

      return { ...state, status: "finished", highscore: newHighscore };
    }

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Invalid action type");
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, item) => acc + item.points,
    0
  );

  useEffect(() => {
    async function getDate() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    getDate();
  }, []);

  function startQuiz() {
    dispatch({ type: "start" });
  }

  function handleNewAnswer(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  function handleTick() {
    dispatch({ type: "tick" });
  }

  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function handleFinished() {
    dispatch({ type: "finish" });
  }

  function handleRestart() {
    dispatch({ type: "restart" });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        startQuiz,
        handleNewAnswer,
        handleTick,
        handleNextQuestion,
        handleFinished,
        handleRestart,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizs() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is used outside of QuizProvider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { QuizProvider, useQuizs };
