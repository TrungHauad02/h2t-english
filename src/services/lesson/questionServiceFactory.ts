import { QuestionSupportType } from "interfaces";
import { topicService } from "./topicService";
import { grammarService } from "./grammarService";
import { listeningService } from "./listeningService";
import { readingService } from "./readingService";

// Interface for question update service
interface QuestionUpdateService {
  updateQuestions: (lessonId: number, questions: number[]) => Promise<any>;
}

// Topic questions service
const topicQuestionService: QuestionUpdateService = {
  updateQuestions: (topicId: number, questions: number[]) => {
    return topicService.patch(topicId, { questions });
  },
};

// Grammar questions service
const grammarQuestionService: QuestionUpdateService = {
  updateQuestions: (grammarId: number, questions: number[]) => {
    return grammarService.patch(grammarId, { questions });
  },
};

// Listening questions service (placeholder for future implementation)
const listeningQuestionService: QuestionUpdateService = {
  updateQuestions: (listeningId: number, questions: number[]) => {
    return listeningService.patch(listeningId, { questions });
  },
};

// Reading questions service (placeholder for future implementation)
const readingQuestionService: QuestionUpdateService = {
  updateQuestions: (readingId: number, questions: number[]) => {
    return readingService.patch(readingId, { questions });
  },
};

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
