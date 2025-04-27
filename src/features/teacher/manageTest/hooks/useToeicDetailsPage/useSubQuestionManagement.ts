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
      if (changes.toUpdate.length > 0 && onUpdateSubQuestion) {
        await Promise.all(
          changes.toUpdate.map(q => onUpdateSubQuestion(q, questionId))
        );
      }
      
      if (changes.toDelete.length > 0 && onDeleteSubQuestion) {
        await Promise.all(
          changes.toDelete.map(id => onDeleteSubQuestion(id, questionId))
        );
      }

      let newQuestionIds: number[] = [];
      
      if (changes.toAdd.length > 0 && onAddSubQuestion) {
        const newQuestions = await Promise.all(
          changes.toAdd.map(q => onAddSubQuestion(questionId, q))
        );
        newQuestionIds = newQuestions.map(q => q.id);
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