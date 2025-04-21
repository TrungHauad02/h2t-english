import {
    ToeicPart3_4,
    ToeicPart6,
    ToeicPart7,
    ToeicQuestion
  } from "interfaces";
  import { 
    toeicPart3_4Service,
    toeicPart6Service,
    toeicPart7Service,
    toeicQuestionService
  } from "services/test";
  
  export function useAddMultipleQuestions() {
    
    const addPart3_4WithQuestions = async (
      parent: ToeicPart3_4,
      subQuestions: ToeicQuestion[],
      isPart4 = false
    ) => {
      try {
        const createdParent = await toeicPart3_4Service.create(parent);
        const parentId = createdParent.data.id;
        
        const createdQuestions = await Promise.all(
          subQuestions.map(q => toeicQuestionService.create(q as ToeicQuestion))
        );
        const questionIds = createdQuestions.map(q => q.id);
        
        const updatedParent = {
          ...createdParent.data,
          questions: questionIds
        };
        await toeicPart3_4Service.update(parentId, updatedParent);
        
        return {
          parent: updatedParent,
          questions: createdQuestions
        };
      } catch (error) {
        console.error(`Error adding Part ${isPart4 ? '4' : '3'} with questions:`, error);
        throw error;
      }
    };
    
    const addPart6WithQuestions = async (
      parent: ToeicPart6,
      subQuestions: ToeicQuestion[]
    ) => {
      try {
        const createdParent = await toeicPart6Service.create(parent);
        const parentId = createdParent.id;
        
        const createdQuestions = await Promise.all(
          subQuestions.map(q => toeicQuestionService.create(q as ToeicQuestion))
        );
        const questionIds = createdQuestions.map(q => q.id);
        
        const updatedParent = {
          ...createdParent,
          questions: questionIds
        };
        await toeicPart6Service.update(parentId, updatedParent);
        
        return {
          parent: updatedParent,
          questions: createdQuestions
        };
      } catch (error) {
        console.error("Error adding Part 6 with questions:", error);
        throw error;
      }
    };
    
    const addPart7WithQuestions = async (
      parent: ToeicPart7,
      subQuestions: ToeicQuestion[]
    ) => {
      try {
        const createdParent = await toeicPart7Service.create(parent);
        const parentId = createdParent.id;
        
        const createdQuestions = await Promise.all(
          subQuestions.map(q => toeicQuestionService.create(q as ToeicQuestion))
        );
        const questionIds = createdQuestions.map(q => q.id);
        
        const updatedParent = {
          ...createdParent,
          questions: questionIds
        };
        await toeicPart7Service.update(parentId, updatedParent);
        
        return {
          parent: updatedParent,
          questions: createdQuestions
        };
      } catch (error) {
        console.error("Error adding Part 7 with questions:", error);
        throw error;
      }
    };
    
    const addSubQuestionsToExistingPart = async (
      partId: number,
      subQuestions: ToeicQuestion[],
      partType: "part3" | "part4" | "part6" | "part7",
      existingQuestionIds: number[] = []
    ) => {
      try {
        const createdQuestions = await Promise.all(
          subQuestions.map(q => toeicQuestionService.create(q as ToeicQuestion))
        );
        
        const allQuestionIds = [...existingQuestionIds, ...createdQuestions.map(q => q.id)];
        
        let updatedParent;
        
        switch (partType) {
          case "part3":
          case "part4":
            const part3_4 = await toeicPart3_4Service.findById(partId);
            updatedParent = {
              ...part3_4.data,
              questions: allQuestionIds
            };
            await toeicPart3_4Service.update(partId, updatedParent);
            break;
            
          case "part6":
            const part6 = await toeicPart6Service.findById(partId);
            updatedParent = {
              ...part6,
              questions: allQuestionIds
            };
            await toeicPart6Service.update(partId, updatedParent);
            break;
            
          case "part7":
            const part7 = await toeicPart7Service.findById(partId);
            updatedParent = {
              ...part7,
              questions: allQuestionIds
            };
            await toeicPart7Service.update(partId, updatedParent);
            break;
        }
        
        return {
          questions: createdQuestions,
          parent: updatedParent
        };
      } catch (error) {
        console.error(`Error adding sub-questions to existing ${partType}, ID ${partId}:`, error);
        throw error;
      }
    };
    
    return {
      addPart3_4WithQuestions,
      addPart6WithQuestions,
      addPart7WithQuestions,
      addSubQuestionsToExistingPart
    };
  }