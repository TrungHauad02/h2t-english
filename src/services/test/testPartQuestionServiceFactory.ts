import { QuestionSupportTestType } from "interfaces";
import {
  testPartService,
  testReadingService,
  testListeningService,
  testSpeakingService,
} from "./index";

interface QuestionUpdateService {
  updateQuestions: (parentId: number, questions: number[]) => Promise<any>;
}

export const testPartQuestionServiceFactory = (
  partType: QuestionSupportTestType
): QuestionUpdateService => {
  switch (partType) {
    case "test-parts":
      return {
        updateQuestions: (partId: number, questions: number[]) => {
          return testPartService.patch(partId, { questions });
        }
      };
    case "test-readings":
      return {
        updateQuestions: (readingId: number, questions: number[]) => {
          return testReadingService.patch(readingId, { questions });
        }
      };
    case "test-listenings":
      return {
        updateQuestions: (listeningId: number, questions: number[]) => {
          return testListeningService.patch(listeningId, { questions });
        }
      };
    case "test-speakings":
      return {
        updateQuestions: (speakingId: number, questions: number[]) => {
          return testSpeakingService.patch(speakingId, { questions });
        }
      };
    default:
      console.error(`Unsupported test part type: ${partType}`);
      return {
        updateQuestions: () =>
          Promise.reject(new Error(`Unsupported test part type: ${partType}`)),
      };
  }
};
