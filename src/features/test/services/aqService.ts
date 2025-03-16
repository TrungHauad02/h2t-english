import { questions } from "./mockData";

const getQuestionByTestId = (testId: string, type: string) => {
  return questions;
};

export const aqService = {
  getQuestionByTestId,
};
