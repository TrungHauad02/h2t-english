import apiClient from "services/apiClient";


export interface ChoiceQuestion {
  question: string;
  choices: string[];
  userAnswer: string;
}

export interface ReadingSection {
  passage: string;
  questions: ChoiceQuestion[];
}

export interface ListeningSection {
  transcript: string;
  questions: ChoiceQuestion[];
}

export interface SpeakingQuestion {
  question: string;
  transcript: string;
}

export interface WritingQuestion {
  topic: string;
  userAnswer: string;
}

export interface TestCommentRequestDTO {
  vocabulary: ChoiceQuestion[];
  grammar: ChoiceQuestion[];
  reading: ReadingSection[];
  listening: ListeningSection[];
  speaking: SpeakingQuestion[];
  writing: WritingQuestion[];
}

export interface TestCommentResponseDTO {
  strengths: string[];
  areasToImprove: string[];
  feedback: string;
}

const commentTest = async (
  payload: TestCommentRequestDTO
): Promise<any> => {
  try {
    const response = await apiClient.post("/comment-test", payload);
    return response.data;
  } catch (error) {
    console.error("Error generating test comment:", error);
    throw error;
  }
};

export const commentTestService = {
  commentTest,
};
