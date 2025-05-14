import { useState } from "react";
import { AIResponse } from "interfaces";
import { aiResponseService } from "services/features/aiResponseService";

interface UseDialogsProps {
  onRefresh: () => void;
}

export function useDialogs({ onRefresh }: UseDialogsProps) {
  // Dialog open states
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  
  // Selected response
  const [selectedResponse, setSelectedResponse] = useState<AIResponse | null>(null);
  
  // Deletion state
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // View dialog handlers
  const handleViewOpen = (response: AIResponse) => {
    setSelectedResponse(response);
    setViewDialogOpen(true);
  };

  const handleViewClose = () => {
    setViewDialogOpen(false);
  };

  // Delete dialog handlers
  const handleDeleteOpen = (response: AIResponse) => {
    setSelectedResponse(response);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedResponse) {
      try {
        setIsDeleting(true);
        await aiResponseService.remove(selectedResponse.id);
        setDeleteDialogOpen(false);
        onRefresh();
      } catch (error) {
        console.error("Error deleting response:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return {
    viewDialogOpen,
    deleteDialogOpen,
    selectedResponse,
    isDeleting,
    handleViewOpen,
    handleViewClose,
    handleDeleteOpen,
    handleDeleteClose,
    handleDeleteConfirm
  };
}