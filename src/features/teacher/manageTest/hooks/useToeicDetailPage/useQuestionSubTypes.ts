import { Toeic, ToeicQuestion } from "interfaces";
import { useState } from "react";
import { toeicQuestionService, toeicPart3_4Service, toeicPart6Service, toeicPart7Service } from "services/test";

export function useQuestionSubTypes(data: Toeic | null) {
  const [part3ToeicQuestions, setPart3ToeicQuestions] = useState<{ [partId: number]: ToeicQuestion[] }>({});
  const [part4ToeicQuestions, setPart4ToeicQuestions] = useState<{ [partId: number]: ToeicQuestion[] }>({});
  const [part6ToeicQuestions, setPart6ToeicQuestions] = useState<{ [partId: number]: ToeicQuestion[] }>({});
  const [part7ToeicQuestions, setPart7ToeicQuestions] = useState<{ [partId: number]: ToeicQuestion[] }>({});

  const getPartStateAndUpdater = (partType: "part3" | "part4" | "part6" | "part7", parentId: number) => {
    switch (partType) {
      case "part3":
        return {
          currentPart: part3ToeicQuestions[parentId] || [],
          updateStateFn: (updated: ToeicQuestion[]) => {
            setPart3ToeicQuestions(prev => ({ ...prev, [parentId]: updated }));
          }
        };
      case "part4":
        return {
          currentPart: part4ToeicQuestions[parentId] || [],
          updateStateFn: (updated: ToeicQuestion[]) => {
            setPart4ToeicQuestions(prev => ({ ...prev, [parentId]: updated }));
          }
        };
      case "part6":
        return {
          currentPart: part6ToeicQuestions[parentId] || [],
          updateStateFn: (updated: ToeicQuestion[]) => {
            setPart6ToeicQuestions(prev => ({ ...prev, [parentId]: updated }));
          }
        };
      case "part7":
        return {
          currentPart: part7ToeicQuestions[parentId] || [],
          updateStateFn: (updated: ToeicQuestion[]) => {
            setPart7ToeicQuestions(prev => ({ ...prev, [parentId]: updated }));
          }
        };
      default:
        throw new Error(`Unknown partType: ${partType}`);
    }
  };

  const loadQuestionsForPart = async (
    partId: number,
    questionIds: number[],
    partType: "part3" | "part4" | "part6" | "part7"
  ) => {
    if (!questionIds.length) return;

    const questions = await toeicQuestionService.getByIds(questionIds);
    const { updateStateFn } = getPartStateAndUpdater(partType, partId);
    updateStateFn(questions);
  };

  const addSubQuestion = async (
    parentId: number,
    question: ToeicQuestion,
    partType: "part3" | "part4" | "part6" | "part7"
  ) => {
    const created = await toeicQuestionService.create(question);
    const { currentPart, updateStateFn } = getPartStateAndUpdater(partType, parentId);
    updateStateFn([...currentPart, created]);

    await patchQuestionIdsToParent(partType, parentId, [...currentPart.map(q => q.id), created.id]);
    return created;
  };

  const updateSubQuestion = async (
    question: ToeicQuestion,
    partType: "part3" | "part4" | "part6" | "part7",
    parentId: number
  ) => {
    await toeicQuestionService.update(question.id, question);
    const { currentPart, updateStateFn } = getPartStateAndUpdater(partType, parentId);
    const updated = currentPart.map(q => (q.id === question.id ? question : q));
    updateStateFn(updated);
    return question;
  };

  const deleteSubQuestion = async (
    questionId: number,
    partType: "part3" | "part4" | "part6" | "part7",
    parentId: number
  ) => {
    await toeicQuestionService.remove(questionId);
    const { currentPart, updateStateFn } = getPartStateAndUpdater(partType, parentId);
    const updated = currentPart.filter(q => q.id !== questionId);
    updateStateFn(updated);
    await patchQuestionIdsToParent(partType, parentId, updated.map(q => q.id));
  };

  const patchQuestionIdsToParent = async (
    partType: "part3" | "part4" | "part6" | "part7",
    parentId: number,
    questionIds: number[]
  ) => {
    const patchData = { questions: questionIds };

    switch (partType) {
      case "part3":
      case "part4":
        await toeicPart3_4Service.patch(parentId, patchData);
        break;
      case "part6":
        await toeicPart6Service.patch(parentId, patchData);
        break;
      case "part7":
        await toeicPart7Service.patch(parentId, patchData);
        break;
    }
  };

  return {
    part3ToeicQuestions,
    part4ToeicQuestions,
    part6ToeicQuestions,
    part7ToeicQuestions,
    loadQuestionsForPart,
    addSubQuestion,
    updateSubQuestion,
    deleteSubQuestion
  };
}
