import { WritingAnswer } from "interfaces";

/**
 * Tách đoạn văn thành các từ dựa trên khoảng trắng
 */
export const splitParagraphIntoWords = (paragraph: string): string[] => {
  return paragraph.split(" ");
};

/**
 * Tạo bản đồ các chỗ khuyết từ writingAnswer
 */
export const createMissingWordMap = (
  writingAnswer: WritingAnswer[]
): { [key: number]: string } => {
  return writingAnswer.reduce((map, answer) => {
    map[answer.missingIndex] = answer.correctAnswer;
    return map;
  }, {} as { [key: number]: string });
};
