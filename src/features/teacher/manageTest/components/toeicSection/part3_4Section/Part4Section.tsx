import React from 'react';
import { ToeicPart3_4, ToeicQuestion } from 'interfaces';
import Part3_4Section from './Part3_4Section';

interface Part4SectionProps {
  questions: ToeicPart3_4[];
  onUpdateQuestion?: (updatedQuestion: ToeicPart3_4) => void;
  onAddQuestion?: (newQuestion: ToeicPart3_4) => Promise<ToeicPart3_4>;
  onDeleteQuestion?: (questionId: number) => void;
  onAddSubQuestion?: (parentId: number, question: ToeicQuestion) => Promise<ToeicQuestion>;
  onUpdateSubQuestion?: (question: ToeicQuestion, parentId: number) => Promise<ToeicQuestion>;
  onDeleteSubQuestion?: (questionId: number, parentId: number) => Promise<void>;
  toeicQuestions: { [partId: number]: ToeicQuestion[] };
}

export default function Part4Section({
  questions,
  toeicQuestions,
  onUpdateQuestion,
  onAddQuestion,
  onDeleteQuestion,
  onAddSubQuestion,
  onUpdateSubQuestion,
  onDeleteSubQuestion
}: Part4SectionProps) {
  return (
    <Part3_4Section
      questions={questions}
      partNumber={4}
      toeicQuestions={toeicQuestions}
      onUpdateQuestion={onUpdateQuestion}
      onAddQuestion={onAddQuestion}
      onDeleteQuestion={onDeleteQuestion}
      onAddSubQuestion={onAddSubQuestion}
      onUpdateSubQuestion={onUpdateSubQuestion}
      onDeleteSubQuestion={onDeleteSubQuestion}
    />
  );
}