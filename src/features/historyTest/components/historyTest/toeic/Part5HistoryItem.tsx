import React from 'react';
import { ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
import QuestionHistoryItem from './QuestionHistoryItem';

type Props = {
  questionNumber: number;
  question: ToeicQuestion;
  selectedAnswer?: AnswerEnum;
  isReview: boolean;
};

export default function Part5HistoryItem({
  questionNumber,
  question,
  selectedAnswer,
  isReview
}: Props) {
  return (
    <QuestionHistoryItem
      questionNumber={questionNumber}
      question={question}
      selectedAnswer={selectedAnswer}
      isReview={isReview}
      showExplanation={true}
      isPart5={true}
    />
  );
}