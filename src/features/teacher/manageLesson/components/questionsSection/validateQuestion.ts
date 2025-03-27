import { LessonQuestion } from "interfaces";

export const validateQuestion = (
  question: LessonQuestion,
  showError: (error: any) => void
): boolean => {
  // Check if there's exactly one correct answer
  const correctAnswersCount = question.answers.filter(
    (answer) => answer.correct === true
  ).length;

  if (correctAnswersCount !== 1) {
    showError({
      message: "Question must have exactly 1 correct answer",
      severity: "error",
      details: `Found ${correctAnswersCount} correct answers. Please mark exactly one answer as correct for question: "${question.content.substring(
        0,
        50
      )}${question.content.length > 50 ? "..." : ""}"`,
    });
    return false;
  }

  return true;
};
