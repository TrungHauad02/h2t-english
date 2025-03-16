import { mockData } from "./mockData";

const getSubmitTestByUserId = (userId: number) => {
  return mockData.submitTest;
};

const getSubmitCompetitionByUserId = (userId: number) => {
  return mockData.submitCompetition;
};

const getSubmitToeicByUserId = (userId: number) => {
  return mockData.submitToeic;
};

export const historyTestService = {
  getSubmitTestByUserId,
  getSubmitCompetitionByUserId,
  getSubmitToeicByUserId,
};
