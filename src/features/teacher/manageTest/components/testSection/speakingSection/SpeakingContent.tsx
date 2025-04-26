import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { TestSpeaking } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { SpeakingTitleSection, SpeakingQuestionsPanel } from './';
import { AddQuestionDialog } from './questionManagement/';
import { testSpeakingService, questionService, testPartQuestionServiceFactory } from "services";
import { toast } from "react-toastify";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";

interface SpeakingContentProps {
  selectedSpeaking: TestSpeaking;
  isEditMode: boolean;
  fetchSpeakings: () => void;
}

export default function SpeakingContent({
  selectedSpeaking,
  isEditMode,
  fetchSpeakings
}: SpeakingContentProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();
  const [questions, setQuestions] = useState<number[]>(selectedSpeaking.questions || []);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState<string>("");
  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);
  const [hasMadeChanges, setHasMadeChanges] = useState(false);
  const questionServiceUpdate = testPartQuestionServiceFactory("test-speakings");

  useEffect(() => {
    if (selectedSpeaking?.questions) {
      setQuestions(selectedSpeaking.questions);
    }
  }, [selectedSpeaking]);

  // Title handlers
  const handleEditTitle = () => {
    setTempTitle(selectedSpeaking.title);
    setIsEditingTitle(true);
  };

  const handleTitleChange = (value: string) => {
    setTempTitle(value);
  };

  const handleSaveTitle = async () => {
    if (tempTitle.trim()) {
      try {
        await testSpeakingService.patch(selectedSpeaking.id, {
          title: tempTitle
        });
        
        fetchSpeakings();
        toast.success("Title updated successfully");
      } catch (error) {
        console.error("Error saving title:", error);
        showError({
          message: "Error updating title",
          severity: "error",
          details: extractErrorMessages(error),
        });
      }
    }
    setIsEditingTitle(false);
  };

  const handleCancelEditTitle = () => {
    setIsEditingTitle(false);
    setTempTitle("");
  };

  const handleAddQuestion = () => {
    setIsAddQuestionDialogOpen(true);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    
    const updatedQuestions = [...questions];
    [updatedQuestions[index], updatedQuestions[index - 1]] = [
      updatedQuestions[index - 1],
      updatedQuestions[index],
    ];
    
    setQuestions(updatedQuestions);
    setHasMadeChanges(true);
  };
  
  const handleMoveDown = (index: number) => {
    if (index >= questions.length - 1) return;
    
    const updatedQuestions = [...questions];
    [updatedQuestions[index], updatedQuestions[index + 1]] = [
      updatedQuestions[index + 1],
      updatedQuestions[index],
    ];
    
    setQuestions(updatedQuestions);
    setHasMadeChanges(true);
  };
  
  const handleSaveChanges = async () => {
    try {
      // Update questions order
      await questionServiceUpdate.updateQuestions(selectedSpeaking.id, questions);
      
      setHasMadeChanges(false);
      toast.success("Question order saved successfully");
      fetchSpeakings();
    } catch (error) {
      console.error("Error saving question order:", error);
      showError({
        message: "Error saving question order",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };
  
  const handleDeleteQuestion = async (questionId: number) => {
    try {
      // Delete the question
      await questionService.remove(questionId);
      
      // Update the speaking's question list
      const updatedQuestions = questions.filter(id => id !== questionId);
      
      // Use service to update the speaking with the new questions list
      await questionServiceUpdate.updateQuestions(selectedSpeaking.id, updatedQuestions);
      
      // Show success message
      toast.success("Question deleted successfully");
      
      // Refresh data
      fetchSpeakings();
    } catch (error) {
      console.error("Error deleting question:", error);
      showError({
        message: "Error deleting question",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 3,
      minHeight: 'calc(100vh - 150px)'
    }}>
      {/* Title Section */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden',
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          border: isDarkMode ? `1px solid ${color.gray700}` : 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: isDarkMode 
              ? '0 8px 24px rgba(0, 0, 0, 0.25)' 
              : '0 8px 24px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)'
          }
        }}
      >
        <Box
          sx={{
            height: 6,
            background: `linear-gradient(90deg, ${isDarkMode ? color.teal700 : color.teal400} 0%, ${isDarkMode ? color.emerald700 : color.emerald400} 100%)`
          }}
        />
        <Box sx={{ p: 3 }}>
          <SpeakingTitleSection
            title={selectedSpeaking.title}
            isEditingTitle={isEditingTitle}
            tempTitle={tempTitle}
            handleEditTitle={handleEditTitle}
            handleTitleChange={handleTitleChange}
            handleSaveTitle={handleSaveTitle}
            handleCancelEdit={handleCancelEditTitle}
          />
        </Box>
      </Paper>
      
      {/* Questions Section */}
      <SpeakingQuestionsPanel
        speakingId={selectedSpeaking.id}
        isEditMode={isEditMode}
        fetchSpeakings={fetchSpeakings}
        onAddQuestion={handleAddQuestion}
        questions={questions}
        hasMadeChanges={hasMadeChanges}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onSaveChanges={handleSaveChanges}
        onDeleteQuestion={handleDeleteQuestion}
      />
      
      {/* Add Question Dialog */}
      <AddQuestionDialog
        open={isAddQuestionDialogOpen}
        onClose={() => setIsAddQuestionDialogOpen(false)}
        speakingId={selectedSpeaking.id}
        fetchSpeakings={fetchSpeakings}
        questions={questions}
      />
    </Box>
  );
}