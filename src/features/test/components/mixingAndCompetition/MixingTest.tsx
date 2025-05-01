import React, { useState, useCallback } from "react";
import { Grid, useMediaQuery, useTheme, Box } from "@mui/material";
import TestTabs from "./TestTabs";
import { TestPart, TestPartTypeEnum } from "interfaces";
import {
  VocabularySection,
  GrammarSection,
  ReadingSection,
  ListeningSection,
  SpeakingSection,
  WritingSection
} from "./";
import TestQuestionGrid from "./TestQuestionGrid";
import IntroducePartTest from "./InroducePartTest";
import TimeRemaining from "./TimeRemaining";
import SubmitTestDialog from "./SubmitTestDialog";
import ConfirmSubmitDialog from "./ConfirmSubmitDialog";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useMixingTest from "../../hooks/useMixingTest";

interface MixingTestProps {
  mixingTestParts: TestPart[];
  submitTestId: number;
}

const MixingTest: React.FC<MixingTestProps> = ({ mixingTestParts, submitTestId }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  // State for managing submit flow
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0); // In seconds
  
  const {
    allQuestions,
    startSerials,
    activeTab,
    selectedQuestionId,
    isSubmitting,
    isSubmitDialogOpen,
    submissionResult,
    setActiveTab,
    setSelectedQuestionId,
    handleQuestionSelect,
    handleUpdateAnsweredQuestions,
    handleSubmitTest,
    closeSubmitDialog,
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart
  } = useMixingTest(mixingTestParts, submitTestId);

  // Callbacks for submit flow
  const handleOpenConfirmDialog = useCallback(() => {
    setIsConfirmDialogOpen(true);
  }, []);

  const handleCloseConfirmDialog = useCallback(() => {
    setIsConfirmDialogOpen(false);
  }, []);

  const handleConfirmSubmit = useCallback(() => {
    setIsConfirmDialogOpen(false);
    handleSubmitTest();
  }, [handleSubmitTest]);

  // Stats for confirm dialog
  const totalQuestions = allQuestions.length;
  const answeredQuestions = allQuestions.filter(q => q.isAnswered).length;

  // Function to render appropriate section component
  const renderSection = useCallback(() => {
    switch (activeTab) {
      case TestPartTypeEnum.VOCABULARY:
        return vocabularyPart ? (
          <VocabularySection 
            partId={vocabularyPart.id}
            questionIds={vocabularyPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.VOCABULARY]}
            setAnsweredQuestions={handleUpdateAnsweredQuestions}
          />
        ) : null;
        
      case TestPartTypeEnum.GRAMMAR:
        return grammarPart ? (
          <GrammarSection 
            partId={grammarPart.id}
            questionIds={grammarPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.GRAMMAR]}
            setAnsweredQuestions={handleUpdateAnsweredQuestions}
          />
        ) : null;
        
      case TestPartTypeEnum.READING:
        return readingPart ? (
          <ReadingSection 
            partId={readingPart.id}
            testItemIds={readingPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.READING]}
            setAnsweredQuestions={handleUpdateAnsweredQuestions}
          />
        ) : null;
        
      case TestPartTypeEnum.LISTENING:
        return listeningPart ? (
          <ListeningSection 
            partId={listeningPart.id}
            testItemIds={listeningPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.LISTENING]}
            setAnsweredQuestions={handleUpdateAnsweredQuestions}
          />
        ) : null;
        
      case TestPartTypeEnum.SPEAKING:
        return speakingPart ? (
          <SpeakingSection 
            partId={speakingPart.id}
            testItemIds={speakingPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.SPEAKING]}
            setAnsweredQuestions={handleUpdateAnsweredQuestions}
          />
        ) : null;
        
      case TestPartTypeEnum.WRITING:
        return writingPart ? (
          <WritingSection 
            partId={writingPart.id}
            testItemIds={writingPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.WRITING]}
            setAnsweredQuestions={handleUpdateAnsweredQuestions}
          />
        ) : null;
        
      default:
        return null;
    }
  }, [
    activeTab,
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
    submitTestId,
    selectedQuestionId,
    startSerials,
    handleUpdateAnsweredQuestions
  ]);

  // Update time used (would be connected to a timer in real implementation)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeUsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        borderRadius: '1rem',
        width: "100%",
        p: { xs: 1, sm: 2 },
      }}
    >
      <Grid container spacing={2}>
        {isSmallScreen && (
          <Grid item xs={12}>
            <TimeRemaining timeUsed={timeUsed} />
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={9} lg={8}>
          <TestTabs
            activeTab={activeTab.toLowerCase()}
            onTabChange={(newTab) => {
              setActiveTab(newTab.toUpperCase() as TestPartTypeEnum);
              setSelectedQuestionId(null);
            }}
          />
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <IntroducePartTest type={activeTab} />
          </Box>
          
          <Box 
            sx={{ 
              mb: 4,
              p: { xs: 1, sm: 2 },
              bgcolor: isDarkMode ? color.gray800 : color.white, 
              borderRadius: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {renderSection()}
          </Box>

          {isSmallScreen && (
            <Box sx={{  display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
              <Box sx={{ width: { xs: "80%", sm: "50%" } }}>
                <TestQuestionGrid 
                  questionItems={allQuestions}
                  onQuestionSelect={handleQuestionSelect}
                  onSubmitTest={handleOpenConfirmDialog}
                />
              </Box>
            </Box>
          )}
          
        </Grid>
        
        {!isSmallScreen && (
          <Grid item md={3} lg={4}>
            <TimeRemaining timeUsed={timeUsed} />
            <Box sx={{ mt: 3 }}>
              <TestQuestionGrid 
                questionItems={allQuestions}
                onQuestionSelect={handleQuestionSelect}
                onSubmitTest={handleOpenConfirmDialog}
              />
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Submit Test Dialog */}
      <SubmitTestDialog 
        open={isSubmitDialogOpen}
        onClose={closeSubmitDialog}
        isLoading={isSubmitting}
        result={submissionResult}
      />

      {/* Confirm Submit Dialog */}
      <ConfirmSubmitDialog
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmSubmit}
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
};

export default MixingTest;