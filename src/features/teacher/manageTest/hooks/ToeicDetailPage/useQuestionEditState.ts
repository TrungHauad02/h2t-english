import { useState, useRef, useEffect } from 'react';
import { ToeicQuestion } from 'interfaces';

export enum QuestionChangeType {
  NEW,
  UPDATED,
  DELETED
}

export interface QuestionChange {
  type: QuestionChangeType;
  question: ToeicQuestion;
}

export interface UseQuestionEditStateProps<T> {
  open: boolean;
  question: T;
  toeicQuestions?: { [partId: number]: ToeicQuestion[] };
  mode?: 'edit' | 'add';
  onSave: (updatedQuestion: T & {
    _changes?: {
      toAdd: ToeicQuestion[];
      toUpdate: ToeicQuestion[];
      toDelete: number[];
    },
    subQuestions?: ToeicQuestion[]
  }) => void;
  maxQuestions?: number;
}

export function useQuestionEditState<T extends { id: number; questions?: number[]; status?: boolean }>({
  open,
  question,
  toeicQuestions = {},
  mode = 'edit',
  onSave,
  maxQuestions = 4
}: UseQuestionEditStateProps<T>) {
  const [editedQuestion, setEditedQuestion] = useState<T>({ ...question });
  const [activeTab, setActiveTab] = useState(0);
  const [subQuestions, setSubQuestions] = useState<ToeicQuestion[]>([]);
  
  const [questionChanges, setQuestionChanges] = useState<QuestionChange[]>([]);

  const [subQuestionToDelete, setSubQuestionToDelete] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  

  const tempIdCounterRef = useRef(0);


  useEffect(() => {
    if (open) {
      resetState();
    }
  }, [open]);

  const resetState = () => {
    setEditedQuestion({ ...question });
    setActiveTab(0);
    setError(null);
    setSuccess(null);
    setQuestionChanges([]);
    tempIdCounterRef.current = 0;
    const questions = toeicQuestions[question.id] || [];
    setSubQuestions(questions);
  };
  


  const generateTempId = () => {
    return tempIdCounterRef.current--;
  };

  const generateTempAnswerId = () => {
    return tempIdCounterRef.current-- - 1000; 
  };

  const isNewQuestion = (id: number) => {
    return id <= 0;
  };

  const countNewQuestions = () => {
    return questionChanges.filter(
      change => change.type === QuestionChangeType.NEW
    ).length;
  };

  const countDeletedQuestions = () => {
    return questionChanges.filter(
      change => change.type === QuestionChangeType.DELETED && !isNewQuestion(change.question.id)
    ).length;
  };

  const handleChange = (field: keyof T, value: any) => {
    setEditedQuestion(prev => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    resetState(); 
    const toAdd: ToeicQuestion[] = [];
    const toUpdate: ToeicQuestion[] = [];
    const toDelete: number[] = [];

    questionChanges.forEach(change => {
      switch (change.type) {
        case QuestionChangeType.NEW:
          toAdd.push(change.question);
          break;
        case QuestionChangeType.UPDATED:
          toUpdate.push(change.question);
          break;
        case QuestionChangeType.DELETED:
          if (!isNewQuestion(change.question.id)) {
            toDelete.push(change.question.id as number);
          }
          break;
      }
    });

    onSave({
      ...editedQuestion,
      _changes: {
        toAdd,
        toUpdate,
        toDelete
      },
      subQuestions: mode === 'add' ? subQuestions : undefined
    });
  };

  const trackQuestionChange = (question: ToeicQuestion, type: QuestionChangeType) => {
    const existingChangeIndex = questionChanges.findIndex(
      change => change.question.id === question.id
    );

    if (existingChangeIndex !== -1) {

      const updatedChanges = [...questionChanges];
      
      if (isNewQuestion(question.id) && type === QuestionChangeType.DELETED) {
        updatedChanges.splice(existingChangeIndex, 1);
      } else {
        updatedChanges[existingChangeIndex] = { question, type };
      }
      
      setQuestionChanges(updatedChanges);
    } else {
 
      setQuestionChanges([...questionChanges, { question, type }]);
    }


    const newQuestionsCount = countNewQuestions();
    const deletedQuestionsCount = countDeletedQuestions();

    if (type === QuestionChangeType.NEW) {
      setSuccess(`${newQuestionsCount} new question${newQuestionsCount > 1 ? 's' : ''} added`);
    } else if (type === QuestionChangeType.UPDATED) {
      setSuccess(`Question updated`);
    } else if (type === QuestionChangeType.DELETED && !isNewQuestion(question.id)) {
      setSuccess(`${deletedQuestionsCount} question${deletedQuestionsCount > 1 ? 's' : ''} removed`);
    } else if (type === QuestionChangeType.DELETED && isNewQuestion(question.id)) {
      setSuccess(`New question removed`);
    }
  };

  const handleQuestionChange = (index: number, field: keyof ToeicQuestion, value: any) => {
    if (index < 0 || index >= subQuestions.length) {
      return; // Prevent index errors
    }
    
    const updatedQuestions = [...subQuestions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setSubQuestions(updatedQuestions);
    
    const questionToUpdate = updatedQuestions[index];
    if (!isNewQuestion(questionToUpdate.id)) {
      trackQuestionChange(questionToUpdate, QuestionChangeType.UPDATED);
    } else {
      // If it's a new question, update the NEW status
      trackQuestionChange(questionToUpdate, QuestionChangeType.NEW);
    }
  };
  
  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    if (questionIndex < 0 || questionIndex >= subQuestions.length || 
        answerIndex < 0 || answerIndex >= subQuestions[questionIndex].answers.length) {
      return; // Prevent index errors
    }
    
    const updatedQuestions = [...subQuestions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];
    
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      content: value
    };
    
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers
    };
    
    setSubQuestions(updatedQuestions);
    
    const questionToUpdate = updatedQuestions[questionIndex];
    if (!isNewQuestion(questionToUpdate.id)) {
      trackQuestionChange(questionToUpdate, QuestionChangeType.UPDATED);
    } else {
      // If it's a new question, update the NEW status
      trackQuestionChange(questionToUpdate, QuestionChangeType.NEW);
    }
  };

  const handleCorrectAnswerChange = (questionIndex: number, answerIndex: number) => {
    if (questionIndex < 0 || questionIndex >= subQuestions.length || 
        answerIndex < 0 || answerIndex >= subQuestions[questionIndex].answers.length) {
      return; // Prevent index errors
    }
    
    const updatedQuestions = [...subQuestions];
    const updatedAnswers = updatedQuestions[questionIndex].answers.map((answer, idx) => ({
      ...answer,
      correct: idx === answerIndex
    }));
    
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers
    };
    
    setSubQuestions(updatedQuestions);
    
    const questionToUpdate = updatedQuestions[questionIndex];
    if (!isNewQuestion(questionToUpdate.id)) {
      trackQuestionChange(questionToUpdate, QuestionChangeType.UPDATED);
    } else {
      // If it's a new question, update the NEW status
      trackQuestionChange(questionToUpdate, QuestionChangeType.NEW);
    }
  };

  // This is a separate function from handleAddQuestion to avoid dependency issues
  const addEmptyQuestion = () => {
    if (subQuestions.length >= maxQuestions) {
      return;
    }

    const tempQuestionId = generateTempId();
    // Create unique IDs for each answer
    const emptyAnswers = Array.from({ length: 4 }, (_, index) => ({
      id: generateTempAnswerId(),
      content: '',
      correct: index === 0,
      questionId: tempQuestionId,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true,
    }));
    
    const newQuestion: ToeicQuestion = {
      id: tempQuestionId,
      content: '',
      explanation: '',
      answers: emptyAnswers,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true
    };

    setSubQuestions(prev => [...prev, newQuestion]);
    
    setEditedQuestion(prev => ({
      ...prev,
      questions: [...(prev.questions || []), tempQuestionId]
    } as T));
    
    setActiveTab(subQuestions.length + 1);
    
    // Track the change
    trackQuestionChange(newQuestion, QuestionChangeType.NEW);
  };

  const handleAddQuestion = () => {
    if (subQuestions.length >= maxQuestions) {
      setError(`Maximum of ${maxQuestions} questions allowed per item`);
      return;
    }

    const tempQuestionId = generateTempId();
    // Create unique IDs for each answer
    const emptyAnswers = Array.from({ length: 4 }, (_, index) => ({
      id: generateTempAnswerId(),
      content: '',
      correct: index === 0,
      questionId: tempQuestionId, // Link to the new question
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true,
    }));
    
    const newQuestion: ToeicQuestion = {
      id: tempQuestionId,
      content: '',
      explanation: '',
      answers: emptyAnswers,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true
    };

    const updatedQuestions = [...subQuestions, newQuestion];
    setSubQuestions(updatedQuestions);
    
    // Update the question IDs list in the main item
    const updatedPart = {
      ...editedQuestion,
      questions: [...(editedQuestion.questions || []), tempQuestionId]
    };
    setEditedQuestion(updatedPart as T);
    
    setActiveTab(updatedQuestions.length);
    trackQuestionChange(newQuestion, QuestionChangeType.NEW);
  };

  const handleOpenDeleteDialog = (questionId: number) => {
    setSubQuestionToDelete(questionId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubQuestion = () => {
    if (subQuestionToDelete === null) {
      setIsDeleteDialogOpen(false);
      return;
    }

    const indexToDelete = subQuestions.findIndex(q => q.id === subQuestionToDelete);
    if (indexToDelete !== -1) {
      const questionToDelete = subQuestions[indexToDelete];
      
      // Update subQuestions
      const newQuestions = [...subQuestions];
      newQuestions.splice(indexToDelete, 1);
      setSubQuestions(newQuestions);
      
      // Update the questions list in the edited item
      const updatedQuestions = (editedQuestion.questions || []).filter(
        id => id !== subQuestionToDelete
      );
      setEditedQuestion({
        ...editedQuestion,
        questions: updatedQuestions
      } as T);
      
      // Update the active tab
      if (activeTab >= newQuestions.length) {
        setActiveTab(Math.max(0, newQuestions.length - 1));
      } else if (activeTab > indexToDelete) {
        setActiveTab(activeTab - 1);
      }
      
      // Track the change
      trackQuestionChange(questionToDelete, QuestionChangeType.DELETED);
    }
    
    setIsDeleteDialogOpen(false);
    setSubQuestionToDelete(null);
  };

  return {
    editedQuestion,
    activeTab,
    subQuestions,
    error,
    success,
    isDeleteDialogOpen,
    subQuestionToDelete,
    handleTabChange,
    handleChange,
    handleQuestionChange,
    handleAnswerChange,
    handleCorrectAnswerChange,
    handleAddQuestion,
    handleSave,
    handleOpenDeleteDialog,
    handleDeleteSubQuestion,
    setIsDeleteDialogOpen
  };
}