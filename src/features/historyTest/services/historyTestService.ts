import { mockData } from "./mockData";
import {
  SubmitTestAnswer,
  SubmitTestSpeaking,
  SubmitTestWriting,
} from "interfaces";

const getSubmitTestByUserId = (userId: number) => {
  return mockData.submitTest;
};

const getSubmitCompetitionByUserId = (userId: number) => {
  return mockData.submitCompetition;
};

const getSubmitToeicByUserId = (userId: number) => {
  return mockData.submitToeic;
};

const getSubmitAnswersByTestId = (testId: number): SubmitTestAnswer[] => {
  const submitTest = mockData.submitTest.find((s) => s.test_id === testId);
  if (!submitTest) return [];
  return mockData.submitTestAnswer.filter(
    (a) => a.submitTest_id === submitTest.id
  );
};

const getSubmitSpeakingByTestId = (testId: number): SubmitTestSpeaking[] => {
  const submitTest = mockData.submitTest.find((s) => s.test_id === testId);
  if (!submitTest) return [];
  return mockData.submitTestSpeaking.filter(
    (s) => s.submitTest_id === submitTest.id
  );
};

const getSubmitWritingByTestId = (testId: number): SubmitTestWriting[] => {
  const submitTest = mockData.submitTest.find((s) => s.test_id === testId);
  if (!submitTest) return [];
  return mockData.submitTestWriting.filter(
    (w) => w.submitTest_id === submitTest.id
  );
};

export const historyTestService = {
  getSubmitTestByUserId,
  getSubmitCompetitionByUserId,
  getSubmitToeicByUserId,
  getSubmitAnswersByTestId,
  getSubmitSpeakingByTestId,
  getSubmitWritingByTestId,
};
