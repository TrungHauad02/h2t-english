import { useState, useCallback } from 'react';

export function useDialogManagement() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteSubQuestionDialogOpen, setIsDeleteSubQuestionDialogOpen] = useState(false);

  const handleOpenEditDialog = useCallback(() => {
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

  const handleOpenDeleteSubQuestionDialog = useCallback(() => {
    setIsDeleteSubQuestionDialogOpen(true);
  }, []);

  const handleCloseDeleteSubQuestionDialog = useCallback(() => {
    setIsDeleteSubQuestionDialogOpen(false);
  }, []);

  return {
    isEditDialogOpen,
    isDeleteDialogOpen,
    isDeleteSubQuestionDialogOpen,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleOpenDeleteSubQuestionDialog,
    handleCloseDeleteSubQuestionDialog,
  };
}