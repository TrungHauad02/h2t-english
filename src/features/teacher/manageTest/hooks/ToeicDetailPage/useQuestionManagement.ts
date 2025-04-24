import { useState, useCallback, useMemo, useEffect } from 'react';
import { ToeicPart3_4, ToeicPart6, ToeicPart7, ToeicQuestion } from 'interfaces';

type QuestionType = ToeicPart3_4 | ToeicPart6 | ToeicPart7;

interface QuestionManagementProps<T extends QuestionType> {
  questions: T[];
  toeicQuestions: { [partId: number]: ToeicQuestion[] };
  onUpdateQuestion?: (updatedQuestion: T) => void;
  onAddQuestion?: (newQuestion: T) => Promise<T>;
  onDeleteQuestion?: (questionId: number) => void;
}

export function useQuestionManagement<T extends QuestionType>({
  questions,
  toeicQuestions,
  onUpdateQuestion,
  onAddQuestion,
  onDeleteQuestion,
}: QuestionManagementProps<T>) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');
  const [emptyQuestion, setEmptyQuestion] = useState<T | null>(null);

  const currentQuestion = useMemo(
    () => (questions.length > 0 ? questions[currentQuestionIndex] : null),
    [questions, currentQuestionIndex]
  );

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
      setCurrentQuestionIndex(0);
    }
  }, [questions, currentQuestionIndex]);

  const onSelectQuestion = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
  }, []);

  const onNavigatePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const onNavigateNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const createEmptyQuestion = useCallback((templateFn: () => T): T => {
    return templateFn();
  }, []);

  const handleOpenEditDialog = useCallback(() => {
    setDialogMode('edit');
    return true;
  }, []);

  const handleOpenAddDialog = useCallback(
    (templateFn: () => T) => {
      setDialogMode('add');
      setEmptyQuestion(createEmptyQuestion(templateFn));
      return true;
    },
    [createEmptyQuestion]
  );

  const handleDeleteQuestion = useCallback(() => {
    if (currentQuestion && onDeleteQuestion) {
      onDeleteQuestion(currentQuestion.id);
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    }
  }, [currentQuestion, onDeleteQuestion, currentQuestionIndex]);

  return {
    currentQuestion,
    currentQuestionIndex,
    dialogMode,
    emptyQuestion,
    onSelectQuestion,
    onNavigatePrevious,
    onNavigateNext,
    handleOpenEditDialog,
    handleOpenAddDialog,
    handleDeleteQuestion,
    setEmptyQuestion,
  };
}