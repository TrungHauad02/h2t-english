import {
  Toeic,
  ToeicPart1,
  ToeicPart2,
  ToeicPart3_4,
  ToeicPart6,
  ToeicPart7,
  ToeicQuestion
} from "interfaces";
import { useState } from "react";
import {
  toeicService,
  toeicPart1Service,
  toeicPart2Service,
  toeicPart3_4Service,
  toeicPart6Service,
  toeicPart7Service,
  toeicQuestionService
} from "services/test";

export function usePartHandlers(
  data: Toeic | null, 
  setData: React.Dispatch<React.SetStateAction<Toeic | null>>,
  questionHandlers?: {
    loadQuestionsForPart: (
      partId: number,
      questionIds: number[],
      partType: "part3" | "part4" | "part6" | "part7"
    ) => Promise<void>;
    patchQuestionIdsToParent: (
      partType: "part3" | "part4" | "part6" | "part7",
      parentId: number,
      questionIds: number[]
    ) => Promise<void>;
  }
) {
  const [part1Questions, setPart1Questions] = useState<ToeicPart1[]>([]);
  const [part2Questions, setPart2Questions] = useState<ToeicPart2[]>([]);
  const [part3Questions, setPart3Questions] = useState<ToeicPart3_4[]>([]);
  const [part4Questions, setPart4Questions] = useState<ToeicPart3_4[]>([]);
  const [part5Questions, setPart5Questions] = useState<ToeicQuestion[]>([]);
  const [part6Questions, setPart6Questions] = useState<ToeicPart6[]>([]);
  const [part7Questions, setPart7Questions] = useState<ToeicPart7[]>([]);

  const updateQuestionIdsOfPart = async (
    partKey: keyof Pick<Toeic, 
      "questionsPart1" | "questionsPart2" | "questionsPart3" | 
      "questionsPart4" | "questionsPart5" | "questionsPart6" | "questionsPart7"
    >, 
    ids: number[]
  ) => {
    if (!data?.id) return;

    try {
      const updateData: Partial<Toeic> = { [partKey]: ids };
      await toeicService.patch(data.id, updateData);
      setData(prev => prev ? { ...prev, ...updateData } : prev);
    } catch (error) {
      console.error(`Failed to update ${partKey}:`, error);
    }
  };

  const loadPart1Data = async (toeic: Toeic) => {
    if (toeic.questionsPart1?.length) {
      try {
        const part1 = await toeicPart1Service.getByIdsAndStatus(toeic.questionsPart1);
        setPart1Questions(part1.data);
      } catch (error) {
        console.error("Error loading Part 1 data:", error);
      }
    }
  };

  const addPart1Question = async (question: ToeicPart1) => {
    try {
      const created = await toeicPart1Service.create(question);
      const newQuestion = created.data;
      setPart1Questions(prev => [...prev, newQuestion]);
    
      const updatedIds = [...(data?.questionsPart1 || []), newQuestion.id];
      if (data?.id) await updateQuestionIdsOfPart("questionsPart1", updatedIds);
      return newQuestion;
    } catch (error) {
      console.error("Error adding Part 1 question:", error);
      throw error;
    }
  };
  
  const updatePart1Question = async (question: ToeicPart1) => {
    try {
      await toeicPart1Service.update(question.id, question);
      setPart1Questions(prev => prev.map(q => q.id === question.id ? question : q));
      return question;
    } catch (error) {
      console.error("Error updating Part 1 question:", error);
      throw error;
    }
  };
  
  const deletePart1Question = async (id: number) => {
    try {
      await toeicPart1Service.remove(id);
      setPart1Questions(prev => prev.filter(q => q.id !== id));
    
      const updatedIds = (data?.questionsPart1 || []).filter(qId => qId !== id);
      if (data?.id) await updateQuestionIdsOfPart("questionsPart1", updatedIds);
    } catch (error) {
      console.error("Error deleting Part 1 question:", error);
      throw error;
    }
  };

  const loadPart2Data = async (toeic: Toeic) => {
    if (toeic.questionsPart2?.length) {
      try {
        const part2 = await toeicPart2Service.getByIdsAndStatus(toeic.questionsPart2);
        setPart2Questions(part2.data);
      } catch (error) {
        console.error("Error loading Part 2 data:", error);
      }
    }
  };

  const addPart2Question = async (question: ToeicPart2) => {
    try {
      const created = await toeicPart2Service.create(question);
      const newQuestion = created.data;
      setPart2Questions(prev => [...prev, newQuestion]);
    
      const updatedIds = [...(data?.questionsPart2 || []), newQuestion.id];
      if (data?.id) await updateQuestionIdsOfPart("questionsPart2", updatedIds);
      return newQuestion;
    } catch (error) {
      console.error("Error adding Part 2 question:", error);
      throw error;
    }
  };
  
  const updatePart2Question = async (question: ToeicPart2) => {
    try {
      await toeicPart2Service.update(question.id, question);
      setPart2Questions(prev => prev.map(q => q.id === question.id ? question : q));
      return question;
    } catch (error) {
      console.error("Error updating Part 2 question:", error);
      throw error;
    }
  };
  
  const deletePart2Question = async (id: number) => {
    try {
      await toeicPart2Service.remove(id);
      setPart2Questions(prev => prev.filter(q => q.id !== id));
    
      const updatedIds = (data?.questionsPart2 || []).filter(qId => qId !== id);
      if (data?.id) await updateQuestionIdsOfPart("questionsPart2", updatedIds);
    } catch (error) {
      console.error("Error deleting Part 2 question:", error);
      throw error;
    }
  };

  const loadPart3Data = async (toeic: Toeic) => {
    if (toeic.questionsPart3?.length) {
      try {
        const part3 = await toeicPart3_4Service.getByIdsAndStatus(toeic.questionsPart3);
        setPart3Questions(part3.data);
        
        if (questionHandlers) {
          await Promise.all(
            part3.data.map((question: ToeicPart3_4) => {
              if (question.questions && question.questions.length > 0) {
                return questionHandlers.loadQuestionsForPart(
                  question.id,
                  question.questions,
                  "part3"
                );
              }
              return Promise.resolve();
            })
          );
        }
      } catch (error) {
        console.error("Error loading Part 3 data:", error);
      }
    }
  };

  const loadPart4Data = async (toeic: Toeic) => {
    if (toeic.questionsPart4?.length) {
      try {
        const part4 = await toeicPart3_4Service.getByIdsAndStatus(toeic.questionsPart4);
        setPart4Questions(part4.data);
        
        if (questionHandlers) {
          await Promise.all(
            part4.data.map((question: ToeicPart3_4) => {
              if (question.questions && question.questions.length > 0) {
                return questionHandlers.loadQuestionsForPart(
                  question.id,
                  question.questions,
                  "part4"
                );
              }
              return Promise.resolve();
            })
          );
        }
      } catch (error) {
        console.error("Error loading Part 4 data:", error);
      }
    }
  };

  const addPart3_4 = async (question: ToeicPart3_4, isPart4 = false) => {
    try {
      const created = await toeicPart3_4Service.create(question);
      const newQuestion = created.data;
      
      const key = isPart4 ? "questionsPart4" : "questionsPart3";
      isPart4
        ? setPart4Questions(prev => [...prev, newQuestion])
        : setPart3Questions(prev => [...prev, newQuestion]);
    
      const updatedIds = [...(data?.[key] || []), newQuestion.id];
      if (data?.id) await updateQuestionIdsOfPart(key, updatedIds);
      
      if (newQuestion.questions.length > 0 && questionHandlers?.loadQuestionsForPart) {
        await questionHandlers.loadQuestionsForPart(
          newQuestion.id,
          newQuestion.questions,
          isPart4 ? "part4" : "part3"
        );
      }
      
      return newQuestion;
    } catch (error) {
      console.error(`Error adding Part ${isPart4 ? '4' : '3'} question:`, error);
      throw error;
    }
  };
  
  const updatePart3_4 = async (question: ToeicPart3_4, isPart4 = false) => {
    try {
      await toeicPart3_4Service.update(question.id, question);
      
      const updater = (list: ToeicPart3_4[]) => list.map(q => q.id === question.id ? question : q);
      isPart4
        ? setPart4Questions(updater)
        : setPart3Questions(updater);
      
        const questionIds = question.questions ?? [];

        if (questionIds.length > 0 && questionHandlers?.loadQuestionsForPart) {
          await questionHandlers.loadQuestionsForPart(
            question.id,
            questionIds,
            isPart4 ? "part4" : "part3"
          );
        }
      
      return question;
    } catch (error) {
      console.error(`Error updating Part ${isPart4 ? '4' : '3'} question:`, error);
      throw error;
    }
  };
  
  const deletePart3_4 = async (id: number, isPart4 = false) => {
    try {
      await toeicPart3_4Service.remove(id);
      const key = isPart4 ? "questionsPart4" : "questionsPart3";
    
      isPart4
        ? setPart4Questions(prev => prev.filter(q => q.id !== id))
        : setPart3Questions(prev => prev.filter(q => q.id !== id));
    
      const updatedIds = (data?.[key] || []).filter(qId => qId !== id);
      if (data?.id) await updateQuestionIdsOfPart(key, updatedIds);
    } catch (error) {
      console.error(`Error deleting Part ${isPart4 ? '4' : '3'} question:`, error);
      throw error;
    }
  };

  const loadPart5Data = async (toeic: Toeic) => {
    if (toeic.questionsPart5?.length) {
      try {
        const part5 = await toeicQuestionService.getByIdsAndStatus(toeic.questionsPart5);
        setPart5Questions(part5.data);
      } catch (error) {
        console.error("Error loading Part 5 data:", error);
      }
    }
  };

  const addPart5Question = async (question: ToeicQuestion) => {
    try {
      const created = await toeicQuestionService.create(question);
      setPart5Questions(prev => [...prev, created.data]);
    
      const updatedIds = [...(data?.questionsPart5 || []), created.data.id];
      if (data?.id) await updateQuestionIdsOfPart("questionsPart5", updatedIds);
      return created;
    } catch (error) {
      console.error("Error adding Part 5 question:", error);
      throw error;
    }
  };
  
  const updatePart5Question = async (question: ToeicQuestion) => {
    try {
      await toeicQuestionService.update(question.id, question);
      setPart5Questions(prev => prev.map(old => old.id === question.id ? question : old));
      return question;
    } catch (error) {
      console.error("Error updating Part 5 question:", error);
      throw error;
    }
  };
  
  const deletePart5Question = async (id: number) => {
    try {
      await toeicQuestionService.remove(id);
      setPart5Questions(prev => prev.filter(q => q.id !== id));
    
      const updatedIds = (data?.questionsPart5 || []).filter(qId => qId !== id);
      if (data?.id) await updateQuestionIdsOfPart("questionsPart5", updatedIds);
    } catch (error) {
      console.error("Error deleting Part 5 question:", error);
      throw error;
    }
  };

  const loadPart6Data = async (toeic: Toeic) => {
    if (toeic.questionsPart6?.length) {
      try {
        const part6 = await toeicPart6Service.getByIdsAndStatus(toeic.questionsPart6);
        setPart6Questions(part6.data);
        
        if (questionHandlers) {
          await Promise.all(
            part6.data.map((question: ToeicPart6) => {
              if (question.questions && question.questions.length > 0) {
                return questionHandlers.loadQuestionsForPart(
                  question.id,
                  question.questions,
                  "part6"
                );
              }
              return Promise.resolve();
            })
          );
        }
      } catch (error) {
        console.error("Error loading Part 6 data:", error);
      }
    }
  };

  const addPart6 = async (question: ToeicPart6) => {
    try {
      const created = await toeicPart6Service.create(question);
      const newQuestion = created.data;
      setPart6Questions(prev => [...prev, newQuestion]);

      const updatedIds = [...(data?.questionsPart6 || []), newQuestion.id];
      if (data?.id) await updateQuestionIdsOfPart("questionsPart6", updatedIds);
      
      if (newQuestion.questions.length > 0 && questionHandlers?.loadQuestionsForPart) {
        await questionHandlers.loadQuestionsForPart(
          newQuestion.id,
          newQuestion.questions,
          "part6"
        );
      }
      
      return newQuestion;
    } catch (error) {
      console.error("Error adding Part 6 question:", error);
      throw error;
    }
  };
  
  const updatePart6 = async (question: ToeicPart6) => {
    try {
      await toeicPart6Service.update(question.id, question);
      setPart6Questions(prev => prev.map(q => q.id === question.id ? question : q));
      
      if (questionHandlers?.patchQuestionIdsToParent && question.questions) {
        await questionHandlers.patchQuestionIdsToParent(
          "part6",
          question.id,
          question.questions
        );
        
        if (question.questions.length > 0 && questionHandlers.loadQuestionsForPart) {
          await questionHandlers.loadQuestionsForPart(
            question.id,
            question.questions,
            "part6"
          );
        }
      }
      
      return question;
    } catch (error) {
      console.error("Error updating Part 6 question:", error);
      throw error;
    }
  };
  
  const deletePart6 = async (id: number) => {
    try {
      await toeicPart6Service.remove(id);
      setPart6Questions(prev => prev.filter(q => q.id !== id));
    
      const updatedIds = (data?.questionsPart6 || []).filter(qId => qId !== id);
      if (data?.id) await updateQuestionIdsOfPart("questionsPart6", updatedIds);
    } catch (error) {
      console.error("Error deleting Part 6 question:", error);
      throw error;
    }
  };

  const loadPart7Data = async (toeic: Toeic) => {
    if (toeic.questionsPart7?.length) {
      try {
        const part7 = await toeicPart7Service.getByIdsAndStatus(toeic.questionsPart7);
        setPart7Questions(part7.data);
        
        if (questionHandlers) {
          await Promise.all(
            part7.data.map((question: ToeicPart7) => {
              if (question.questions && question.questions.length > 0) {
                return questionHandlers.loadQuestionsForPart(
                  question.id,
                  question.questions,
                  "part7"
                );
              }
              return Promise.resolve();
            })
          );
        }
      } catch (error) {
        console.error("Error loading Part 7 data:", error);
      }
    }
  };

  const addPart7 = async (question: ToeicPart7) => {
    try {
      const created = await toeicPart7Service.create(question);
      const newQuestion = created.data;
      setPart7Questions(prev => [...prev, newQuestion]);
    
      const updatedIds = [...(data?.questionsPart7 || []), newQuestion.id];
      if (data?.id) await updateQuestionIdsOfPart("questionsPart7", updatedIds);
      
      if (questionHandlers?.patchQuestionIdsToParent && newQuestion.questions?.length > 0) {
        await questionHandlers.patchQuestionIdsToParent(
          "part7",
          newQuestion.id,
          newQuestion.questions
        );
        
        if (newQuestion.questions.length > 0 && questionHandlers.loadQuestionsForPart) {
          await questionHandlers.loadQuestionsForPart(
            newQuestion.id,
            newQuestion.questions,
            "part7"
          );
        }
      }
      
      return newQuestion;
    } catch (error) {
      console.error("Error adding Part 7 question:", error);
      throw error;
    }
  };
  
  const updatePart7 = async (question: ToeicPart7) => {
    try {
      await toeicPart7Service.update(question.id, question);
      setPart7Questions(prev => prev.map(q => q.id === question.id ? question : q));
      
      if (questionHandlers?.patchQuestionIdsToParent && question.questions) {
        await questionHandlers.patchQuestionIdsToParent(
          "part7",
          question.id,
          question.questions
        );
        
        if (question.questions.length > 0 && questionHandlers.loadQuestionsForPart) {
          await questionHandlers.loadQuestionsForPart(
            question.id,
            question.questions,
            "part7"
          );
        }
      }
      
      return question;
    } catch (error) {
      console.error("Error updating Part 7 question:", error);
      throw error;
    }
  };
  
  const deletePart7 = async (id: number) => {
    try {
      await toeicPart7Service.remove(id);
      setPart7Questions(prev => prev.filter(q => q.id !== id));
    
      const updatedIds = (data?.questionsPart7 || []).filter(qId => qId !== id);
      if (data?.id) await updateQuestionIdsOfPart("questionsPart7", updatedIds);
    } catch (error) {
      console.error("Error deleting Part 7 question:", error);
      throw error;
    }
  };

  return {
    part1Questions,
    part2Questions,
    part3Questions,
    part4Questions,
    part5Questions,
    part6Questions,
    part7Questions,

    updateQuestionIdsOfPart,

    loadPart1Data,
    loadPart2Data,
    loadPart3Data,
    loadPart4Data,
    loadPart5Data,
    loadPart6Data,
    loadPart7Data,

    addPart1Question,
    updatePart1Question,
    deletePart1Question,

    addPart2Question,
    updatePart2Question,
    deletePart2Question,

    addPart3_4,
    updatePart3_4,
    deletePart3_4,

    addToeicQuestion: addPart5Question,
    updateToeicQuestion: updatePart5Question,
    deleteToeicQuestion: deletePart5Question,

    addPart6,
    updatePart6,
    deletePart6,

    addPart7,
    updatePart7,
    deletePart7
  };
}