import {
  Grammar,
  Listening,
  Reading,
  RouteNodeEnum,
  Speaking,
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
    return topicService.create(topic);
  },
};

// Grammar creation service
const grammarCreationService: LessonCreationService<Grammar> = {
  createLesson: (grammar: Grammar) => {
    return grammarService.create(grammar);
  },
};

// Reading creation service
const readingCreationService: LessonCreationService<Reading> = {
  createLesson: (reading: Reading) => {
    return readingService.create(reading);
  },
};

// Listening creation service
const listeningCreationService: LessonCreationService<Listening> = {
  createLesson: (listening: Listening) => {
    return listeningService.create(listening);
  },
};

// Speaking creation service
const speakingCreationService: LessonCreationService<Speaking> = {
  createLesson: (speaking: Speaking) => {
    return speakingService.create(speaking);
  },
};

// Writing creation service
const writingCreationService: LessonCreationService<Writing> = {
  createLesson: (writing: Writing) => {
    return writingService.create(writing);
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
    default:
      console.error(`Unknown node type: ${nodeType}`);
      // Provide a default implementation that rejects
      return {
        createLesson: () =>
          Promise.reject(new Error(`Unsupported node type: ${nodeType}`)),
      } as LessonCreationService<T>;
  }
};
