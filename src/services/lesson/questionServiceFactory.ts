import { QuestionSupportType } from "interfaces";
import { topicService } from "./topicService";
import { grammarService } from "./grammarService";

// Interface for question update service
interface QuestionUpdateService {
  updateQuestions: (lessonId: number, questions: number[]) => Promise<any>;
}

// Topic questions service
const topicQuestionService: QuestionUpdateService = {
  updateQuestions: (topicId: number, questions: number[]) => {
    return topicService.patchTopic(topicId, { questions });
  },
};

// Grammar questions service
const grammarQuestionService: QuestionUpdateService = {
  updateQuestions: (grammarId: number, questions: number[]) => {
    return grammarService.patchGrammar(grammarId, { questions });
  },
};

// Listening questions service (placeholder for future implementation)
const listeningQuestionService: QuestionUpdateService = {
  updateQuestions: (listeningId: number, questions: number[]) => {
    // TODO: Implement listening service
    console.warn("Listening questions update not implemented yet");
    return Promise.resolve();
  },
};

// Reading questions service (placeholder for future implementation)
const readingQuestionService: QuestionUpdateService = {
  updateQuestions: (readingId: number, questions: number[]) => {
    // TODO: Implement reading service
    console.warn("Reading questions update not implemented yet");
    return Promise.resolve();
  },
};

// Factory function to get the appropriate service based on question type
export const questionServiceFactory = (
  type: QuestionSupportType
): QuestionUpdateService => {
  switch (type) {
    case "topics":
      return topicQuestionService;
    case "grammars":
      return grammarQuestionService;
    case "listenings":
      return listeningQuestionService;
    case "readings":
      return readingQuestionService;
    default:
      // Typescript should prevent this, but just in case
      console.error(`Unknown question type: ${type}`);
      return {
        updateQuestions: () =>
          Promise.reject(new Error(`Unknown question type: ${type}`)),
      };
  }
};
