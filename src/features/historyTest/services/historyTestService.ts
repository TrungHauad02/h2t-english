import { mockData } from "./mockData";
import {
  SubmitTestAnswer,
  SubmitTestSpeaking,
  SubmitTestWriting,
  SubmitToeic,
  SubmitToeicPart1,
  SubmitToeicPart2,
  SubmitToeicPart3_4,
  SubmitToeicPart5,
  SubmitToeicPart6,
  SubmitToeicPart7,
} from "interfaces";

const getSubmitTestByUserId = (userId: number) => {
  return mockData.submitTest.filter((s) => s.user_id === userId);
};

const getSubmitAnswersByTestId = (testId: number): SubmitTestAnswer[] => {
  const submitTest = mockData.submitTest.find((s) => s.test_id === testId);
  if (!submitTest) return [];
  return mockData.submitTestAnswer.filter((a) => a.submitTest_id === submitTest.id);
};

const getSubmitSpeakingByTestId = (testId: number): SubmitTestSpeaking[] => {
  const submitTest = mockData.submitTest.find((s) => s.test_id === testId);
  if (!submitTest) return [];
  return mockData.submitTestSpeaking.filter((s) => s.submitTest_id === submitTest.id);
};

const getSubmitWritingByTestId = (testId: number): SubmitTestWriting[] => {
  const submitTest = mockData.submitTest.find((s) => s.test_id === testId);
  if (!submitTest) return [];
  return mockData.submitTestWriting.filter((w) => w.submitTest_id === submitTest.id);
};

const getSubmitCompetitionByUserId = (userId: number) => {
  return mockData.submitCompetition.filter((s) => s.user_id === userId);
};

const getSubmitCompetitionAnswers = (competitionId: number): SubmitTestAnswer[] => {
  const submit = mockData.submitCompetition.find((s) => s.competition_id === competitionId);
  if (!submit) return [];
  return mockData.submitCompetitionAnswer
    .filter((a) => a.submitCompetition_id === submit.id)
    .map((a) => ({
      id: a.id,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      submitTest_id: a.submitCompetition_id,
      question_id: a.question_id,
      answer_id: a.answer_id,
    }));
};

const getSubmitCompetitionSpeakings = (competitionId: number): SubmitTestSpeaking[] => {
  const submit = mockData.submitCompetition.find((s) => s.competition_id === competitionId);
  if (!submit) return [];
  return mockData.submitCompetitionSpeaking
    .filter((s) => s.submitCompetition_id === submit.id)
    .map((s) => ({
      id: s.id,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      submitTest_id: s.submitCompetition_id,
      question_id: s.question_id,
      file: "",
      transcript: s.transcript,
      score: s.score,
      comment: "",
    }));
};

const getSubmitCompetitionWritings = (competitionId: number): SubmitTestWriting[] => {
  const submit = mockData.submitCompetition.find((s) => s.competition_id === competitionId);
  if (!submit) return [];
  return mockData.submitCompetitionWriting
    .filter((w) => w.submitCompetition_id === submit.id)
    .map((w) => ({
      id: w.id,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      submitTest_id: w.submitCompetition_id,
      testWriting_id: w.CompetitionWriting_id,
      content: w.content,
      score: w.score,
      comment: "",
    }));
};

const getSubmitToeicByUserId = (userId: number) => {
  return mockData.submitToeic.filter((s) => s.user_id === userId);
};
const getSubmitToeicById = (submitId: number): SubmitToeic | undefined => {
  console.log("cappp");
  
  return mockData.submitToeic.find((s) => s.id === submitId);
};


const getSubmitToeicPart1BySubmitId = (submitId: number): SubmitToeicPart1[] => {
  return mockData.submitToeicPart1.filter((s) => s.submitToeicId === submitId);
};

const getSubmitToeicPart2BySubmitId = (submitId: number): SubmitToeicPart2[] => {
  return mockData.submitToeicPart2.filter((s) => s.submitToeicId === submitId);
};



const getSubmitToeicPart3_4BySubmitId = (submitId: number): SubmitToeicPart3_4[] => {
  return mockData.submitToeicPart3_4.filter((s) => s.submitToeicId === submitId);
};

const getSubmitToeicPart5BySubmitId = (submitId: number): SubmitToeicPart5[] => {
  return mockData.submitToeicPart5.filter((s) => s.submitToeicId === submitId);
};

const getSubmitToeicPart6BySubmitId = (submitId: number): SubmitToeicPart6[] => {
  return mockData.submitToeicPart6.filter((s) => s.submitToeicId === submitId);
};

const getSubmitToeicPart7BySubmitId = (submitId: number): SubmitToeicPart7[] => {
  return mockData.submitToeicPart7.filter((s) => s.submitToeicId === submitId);
};

export const historyTestService = {
  getSubmitTestByUserId,
  getSubmitAnswersByTestId,
  getSubmitSpeakingByTestId,
  getSubmitWritingByTestId,
  getSubmitCompetitionByUserId,
  getSubmitCompetitionAnswers,
  getSubmitCompetitionSpeakings,
  getSubmitCompetitionWritings,
  getSubmitToeicByUserId,
  getSubmitToeicById,
  getSubmitToeicPart1BySubmitId,
  getSubmitToeicPart2BySubmitId,
  getSubmitToeicPart3_4BySubmitId,
  getSubmitToeicPart5BySubmitId,
  getSubmitToeicPart6BySubmitId,
  getSubmitToeicPart7BySubmitId,


};
