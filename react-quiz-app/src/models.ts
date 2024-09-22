export type Questions = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type QuestionsAction =
  | { type: "dataRecieved"; payload: Questions[] }
  | { type: "dataFailed" }
  | { type: "startQuiz" }
  | { type: "newAnswer"; payload: number };
