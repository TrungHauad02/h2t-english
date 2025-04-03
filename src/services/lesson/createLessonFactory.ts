import {
  Grammar,
  Listening,
  Reading,
  RouteNodeEnum,
  Speaking,
  Test,
  Topic,
  Writing,
} from "interfaces";
import { topicService } from "services/lesson/topicService";
import { grammarService } from "services/lesson/grammarService";
import { readingService } from "services/lesson/readingService";
import { listeningService } from "services/lesson/listeningService";
import { speakingService } from "services/lesson/speakingService";
import { writingService } from "services/lesson/writingService";

// Interface for lesson creation service
export interface LessonCreationService<T> {
  createLesson: (lesson: T) => Promise<{ data: T & { id: number } }>;
}

// Topic creation service
const topicCreationService: LessonCreationService<Topic> = {
  createLesson: (topic: Topic) => {
    return topicService.createTopic(topic);
  },
};

// Grammar creation service
const grammarCreationService: LessonCreationService<Grammar> = {
  createLesson: (grammar: Grammar) => {
    return grammarService.createGrammar(grammar);
  },
};

// Reading creation service
const readingCreationService: LessonCreationService<Reading> = {
  createLesson: (reading: Reading) => {
    return readingService.createReading(reading);
  },
};

// Listening creation service
const listeningCreationService: LessonCreationService<Listening> = {
  createLesson: (listening: Listening) => {
    return listeningService.createListening(listening);
  },
};

// Speaking creation service
const speakingCreationService: LessonCreationService<Speaking> = {
  createLesson: (speaking: Speaking) => {
    return speakingService.createSpeaking(speaking);
  },
};

// Writing creation service
const writingCreationService: LessonCreationService<Writing> = {
  createLesson: (writing: Writing) => {
    return writingService.createWriting(writing);
  },
};

// Test creation service - placeholder for future implementation
const testCreationService: LessonCreationService<Test> = {
  createLesson: (test: Test) => {
    // TODO: Implement test creation service
    console.warn("Test creation not implemented yet");
    return Promise.resolve({ data: { ...test, id: -1 } });
  },
};

// Factory function to get the appropriate service based on node type
export const createLessonFactory = <T>(
  nodeType: RouteNodeEnum
): LessonCreationService<T> => {
  switch (nodeType) {
    case RouteNodeEnum.VOCABULARY:
      return topicCreationService as unknown as LessonCreationService<T>;
    case RouteNodeEnum.GRAMMAR:
      return grammarCreationService as unknown as LessonCreationService<T>;
    case RouteNodeEnum.READING:
      return readingCreationService as unknown as LessonCreationService<T>;
    case RouteNodeEnum.LISTENING:
      return listeningCreationService as unknown as LessonCreationService<T>;
    case RouteNodeEnum.SPEAKING:
      return speakingCreationService as unknown as LessonCreationService<T>;
    case RouteNodeEnum.WRITING:
      return writingCreationService as unknown as LessonCreationService<T>;
    case RouteNodeEnum.MIXING_TEST:
    case RouteNodeEnum.READING_TEST:
    case RouteNodeEnum.LISTENING_TEST:
    case RouteNodeEnum.SPEAKING_TEST:
    case RouteNodeEnum.WRITING_TEST:
      return testCreationService as unknown as LessonCreationService<T>;
    default:
      console.error(`Unknown node type: ${nodeType}`);
      // Provide a default implementation that rejects
      return {
        createLesson: () =>
          Promise.reject(new Error(`Unsupported node type: ${nodeType}`)),
      } as LessonCreationService<T>;
  }
};
