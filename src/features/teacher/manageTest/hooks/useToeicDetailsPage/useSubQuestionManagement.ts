import { useState, useCallback, useEffect, useRef } from 'react';
import { ToeicQuestion } from 'interfaces';

interface SubQuestionManagementProps {
  currentQuestionId: number | null;
  toeicQuestions: { [partId: number]: ToeicQuestion[] };
  onAddSubQuestion?: (parentId: number, question: ToeicQuestion) => Promise<ToeicQuestion>;
  onUpdateSubQuestion?: (question: ToeicQuestion, parentId: number) => Promise<ToeicQuestion>;
  onDeleteSubQuestion?: (questionId: number, parentId: number) => Promise<void>;
}

export function useSubQuestionManagement({
  currentQuestionId,
  toeicQuestions,
  onAddSubQuestion,
  onUpdateSubQuestion,
  onDeleteSubQuestion,
}: SubQuestionManagementProps) {
  const [activeSubQuestion, setActiveSubQuestion] = useState(0);
  const [currentSubQuestions, setCurrentSubQuestions] = useState<ToeicQuestion[]>([]);
  const [subQuestionToDelete, setSubQuestionToDelete] = useState<number | null>(null);

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const tabContainerRef = useRef<HTMLDivElement | null>(null);

  // Update sub-questions when the parent question changes
  useEffect(() => {
    if (currentQuestionId) {
      const subQuestions = toeicQuestions[currentQuestionId] || [];
      setCurrentSubQuestions(subQuestions);
      setActiveSubQuestion(0);
    } else {
      setCurrentSubQuestions([]);
    }
  }, [currentQuestionId, toeicQuestions]);

  // Handle scroll reset on tab change
  useEffect(() => {
    const handleScrollFix = () => {
      try {
        if (tabsRef.current) {
          tabsRef.current.scrollLeft = 0;
        }
        if (tabContainerRef.current) {
          tabContainerRef.current.scrollTop = 0;
        }
      } catch (error) {
        console.warn('Scroll reset failed', error);
      }
    };

    const timeoutId = setTimeout(handleScrollFix, 100);
    return () => clearTimeout(timeoutId);
  }, [activeSubQuestion]);

  const handleChangeSubQuestion = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      try {
        setActiveSubQuestion(newValue);
      } catch (error) {
        console.warn('Error changing sub-question', error);
      }
    }, 
    []
  );

  const handleDeleteSubQuestion = useCallback(() => {
    if (subQuestionToDelete !== null && currentQuestionId && onDeleteSubQuestion) {
      onDeleteSubQuestion(subQuestionToDelete, currentQuestionId)
        .then(() => {
          if (activeSubQuestion >= currentSubQuestions.length - 1) {
            setActiveSubQuestion(Math.max(0, currentSubQuestions.length - 2));
          }
          setSubQuestionToDelete(null);
        })
        .catch(error => {
          console.error('Error deleting sub-question:', error);
          setSubQuestionToDelete(null);
        });
    }
  }, [subQuestionToDelete, currentQuestionId, onDeleteSubQuestion, activeSubQuestion, currentSubQuestions.length]);

  const handleSaveSubQuestions = useCallback(async (
    questionId: number,
    changes: {
      toAdd: ToeicQuestion[];
      toUpdate: ToeicQuestion[];
      toDelete: number[];
    }
  ) => {
    try {
      // 1. Update existing questions sequentially
      if (changes.toUpdate.length > 0 && onUpdateSubQuestion) {
        for (const question of changes.toUpdate) {
          await onUpdateSubQuestion(question, questionId);
        }
      }
      
      // 2. Delete questions sequentially
      if (changes.toDelete.length > 0 && onDeleteSubQuestion) {
        for (const id of changes.toDelete) {
          await onDeleteSubQuestion(id, questionId);
        }
      }
  
      let newQuestionIds: number[] = [];
      
      // 3. Add new questions sequentially
      if (changes.toAdd.length > 0 && onAddSubQuestion) {
        for (const question of changes.toAdd) {
          const newQuestion = await onAddSubQuestion(questionId, question);
          newQuestionIds.push(newQuestion.id);
        }
      }
      
      return newQuestionIds;
    } catch (error) {
      console.error("Error saving sub-questions:", error);
      return [];
    }
  }, [onAddSubQuestion, onUpdateSubQuestion, onDeleteSubQuestion]);
  return {
    activeSubQuestion,
    currentSubQuestions,
    subQuestionToDelete,
    tabsRef,
    tabContainerRef,
    handleChangeSubQuestion,
    handleDeleteSubQuestion,
    handleSaveSubQuestions,
    setSubQuestionToDelete,
  };
}