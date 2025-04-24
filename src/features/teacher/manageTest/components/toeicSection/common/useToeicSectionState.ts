import { useState, useCallback } from 'react';

interface UseToeicSectionStateProps {
  totalItems: number;
}

export default function useToeicSectionState({ totalItems }: UseToeicSectionStateProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSubQuestion, setActiveSubQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteSubQuestionDialogOpen, setIsDeleteSubQuestionDialogOpen] = useState(false);
  const [subQuestionToDelete, setSubQuestionToDelete] = useState<number | null>(null);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');

  const onSelectQuestion = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
    setActiveSubQuestion(0);
    setShowExplanation(false);
  }, []);

  const onNavigatePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setActiveSubQuestion(0);
      setShowExplanation(false);
    }
  }, [currentQuestionIndex]);

  const onNavigateNext = useCallback(() => {
    if (currentQuestionIndex < totalItems - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setActiveSubQuestion(0);
      setShowExplanation(false);
    }
  }, [currentQuestionIndex, totalItems]);

  const handleChangeSubQuestion = useCallback((newValue: number) => {
    setActiveSubQuestion(newValue);
    setShowExplanation(false);
  }, []);

  const toggleExplanation = useCallback(() => {
    setShowExplanation(prev => !prev);
  }, []);

  const handleOpenEditDialog = useCallback(() => {
    setDialogMode('edit');
    setIsEditDialogOpen(true);
  }, []);

  const handleOpenAddDialog = useCallback(() => {
    setDialogMode('add');
    setIsEditDialogOpen(true);
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false);
  }, []);

  const handleOpenDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, []);

  const handleOpenDeleteSubQuestionDialog = useCallback((subQuestionId: number) => {
    setSubQuestionToDelete(subQuestionId);
    setIsDeleteSubQuestionDialogOpen(true);
  }, []);

  const handleCloseDeleteSubQuestionDialog = useCallback(() => {
    setIsDeleteSubQuestionDialogOpen(false);
    setSubQuestionToDelete(null);
  }, []);

  return {
    currentQuestionIndex,
    activeSubQuestion,
    showExplanation,
    isEditDialogOpen,
    isDeleteDialogOpen,
    isDeleteSubQuestionDialogOpen,
    subQuestionToDelete,
    dialogMode,
    onSelectQuestion,
    onNavigatePrevious,
    onNavigateNext,
    handleChangeSubQuestion,
    toggleExplanation,
    handleOpenEditDialog,
    handleOpenAddDialog,
    handleCloseEditDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleOpenDeleteSubQuestionDialog,
    handleCloseDeleteSubQuestionDialog,
    setCurrentQuestionIndex,
    setActiveSubQuestion
  };
}