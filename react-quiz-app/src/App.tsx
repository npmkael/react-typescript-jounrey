import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Page from "./components/Page";
import Loader from "./components/Loader";
import ErrorHandler from "./components/ErrorHandler";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import { Questions } from "./models";
import { QuestionsAction } from "./models";

type QuestionsState = {
  questions: Questions[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
};

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state: QuestionsState, action: QuestionsAction) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      console.log(currentQuestion);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion?.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    default:
      throw new Error("ddd");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;

  // Fetching from Fake API
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Page>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <ErrorHandler />}
        {state.status === "ready" && (
          <StartScreen numberOfQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <Question
            question={state.questions[state.index]}
            dispatch={dispatch}
            answer={state.answer}
          />
        )}
      </Page>
    </div>
  );
}

export default App;
