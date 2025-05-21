import {
  Grammar,
  Listening,
  Reading,
  RouteNodeEnum,
  ServiceResponse,
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

export interface LessonCreationService<T> {
  createLesson: (lesson: T) => Promise<{ data: T & { id: number } }>;
  patchLesson: (id: number, lesson: T) => Promise<{ data: T & { id: number } }>;
  findByIdInHome: (id: number) => Promise<ServiceResponse<T>>;
}

// Topic creation service
const topicCreationService: LessonCreationService<Topic> = {
  createLesson: (topic: Topic) => {
    return topicService.create(topic);
  },
  patchLesson: (id: number, topic: Topic) => {
    return topicService.patch(id, topic);
  },
  findByIdInHome: (id: number) => {
    return topicService.findByIdInHome(id);
  },
};

// Grammar creation service
const grammarCreationService: LessonCreationService<Grammar> = {
  createLesson: (grammar: Grammar) => {
    return grammarService.create(grammar);
  },
  patchLesson: (id: number, grammar: Grammar) => {
    return grammarService.patch(id, grammar);
  },
  findByIdInHome: (id: number) => {
    return grammarService.findByIdInHome(id);
  },
};

// Reading creation service
const readingCreationService: LessonCreationService<Reading> = {
  createLesson: (reading: Reading) => {
    return readingService.create(reading);
  },
  patchLesson: (id: number, reading: Reading) => {
    return readingService.patch(id, reading);
  },
  findByIdInHome: (id: number) => {
    return readingService.findByIdInHome(id);
  },
};

// Listening creation service
const listeningCreationService: LessonCreationService<Listening> = {
  createLesson: (listening: Listening) => {
    return listeningService.create(listening);
  },
  patchLesson: (id: number, listening: Listening) => {
    return listeningService.patch(id, listening);
  },
  findByIdInHome: (id: number) => {
    return listeningService.findByIdInHome(id);
  },
};

// Speaking creation service
const speakingCreationService: LessonCreationService<Speaking> = {
  createLesson: (speaking: Speaking) => {
    return speakingService.create(speaking);
  },
  patchLesson: (id: number, speaking: Speaking) => {
    return speakingService.patch(id, speaking);
  },
  findByIdInHome: (id: number) => {
    return speakingService.findByIdInHome(id);
  },
};

// Writing creation service
const writingCreationService: LessonCreationService<Writing> = {
  createLesson: (writing: Writing) => {
    return writingService.create(writing);
  },
  patchLesson: (id: number, writing: Writing) => {
    return writingService.patch(id, writing);
  },
  findByIdInHome: (id: number) => {
    return writingService.findByIdInHome(id);
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
        patchLesson: () =>
          Promise.reject(new Error(`Unsupported node type: ${nodeType}`)),
        findByIdInHome: () =>
          Promise.reject(new Error(`Unsupported node type: ${nodeType}`)),
      } as LessonCreationService<T>;
  }
};
