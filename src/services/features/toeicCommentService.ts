import apiClient from "services/apiClient";


interface ToeicCommentRequest {
  submitToeicId: number;
  toeicId: number;
  totalScore: number;
  listeningScore: number;
  readingScore: number;
  listeningCorrect: number;
  readingCorrect: number;
  correctAnswers: number;
  answeredQuestions: number;
  partAccuracy?: {
    part1Accuracy?: number;
    part2Accuracy?: number;
    part3Accuracy?: number;
    part4Accuracy?: number;
    part5Accuracy?: number;
    part6Accuracy?: number;
    part7Accuracy?: number;
  };
}

const generateComment = async (data: ToeicCommentRequest) => {
  try {
    const response = await apiClient.post("/toeic-comment", data);

    return response.data; 
  } catch (error) {
    console.error("Error generating TOEIC comment:", error);
    throw error;
  }
};


export const toeicCommentService = {
  generateComment,

};