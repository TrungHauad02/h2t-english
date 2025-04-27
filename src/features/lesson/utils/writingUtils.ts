import { WritingAnswer } from "interfaces";

/**
 * Tách đoạn văn thành các từ dựa trên khoảng trắng
 */
export const splitParagraphIntoWords = (paragraph: string): string[] => {
  if (!paragraph) return [];
  return paragraph.split(" ").filter((word) => word.trim() !== "");
};

/**
 * Tạo bản đồ các chỗ khuyết từ writingAnswer
 */
export const createMissingWordMap = (
  writingAnswers: WritingAnswer[]
): { [key: number]: WritingAnswer } => {
  if (!writingAnswers || !Array.isArray(writingAnswers)) return {};

  return writingAnswers.reduce((map, answer) => {
    if (
      answer &&
      answer.missingIndex !== undefined &&
      answer.missingIndex >= 0
    ) {
      map[answer.missingIndex] = answer;
    }
    return map;
  }, {} as { [key: number]: WritingAnswer });
};

/**
 * Kiểm tra đáp án người dùng với đáp án đúng
 */
export const checkUserAnswer = (
  userAnswer: string,
  correctAnswer: string
): boolean => {
  if (!userAnswer || !correctAnswer) return false;

  return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
};

/**
 * Tính toán điểm số dựa trên đáp án người dùng
 */
export const calculateScore = (
  userAnswers: { [key: number]: string },
  writingAnswers: WritingAnswer[]
): { score: number; totalAnswers: number; correctAnswers: number } => {
  let correctCount = 0;
  const validAnswers = writingAnswers.filter(
    (answer) =>
      answer && answer.missingIndex !== undefined && answer.correctAnswer
  );

  validAnswers.forEach((answer) => {
    const userAnswer = userAnswers[answer.missingIndex];
    if (userAnswer && checkUserAnswer(userAnswer, answer.correctAnswer)) {
      correctCount++;
    }
  });

  return {
    score:
      validAnswers.length > 0 ? (correctCount / validAnswers.length) * 100 : 0,
    totalAnswers: validAnswers.length,
    correctAnswers: correctCount,
  };
};
