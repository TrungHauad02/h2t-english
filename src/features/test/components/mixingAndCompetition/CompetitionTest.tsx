import React, { useState, useCallback, useEffect } from "react";
import { Grid, useMediaQuery, useTheme, Box } from "@mui/material";
import TestTabs from "./TestTabs";
import { TestPartTypeEnum } from "interfaces";
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
import useCompetitionTest from "../../hooks/useCompetitionTest";

export default function CompetitionTest() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);

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
    writingPart,
    submitCompetition,
    loading,
    error
  } = useCompetitionTest();

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

  const renderSection = useCallback(() => {
    const props = {
      submitTestId: submitCompetition?.id,
      selectedQuestionId,
      setAnsweredQuestions: handleUpdateAnsweredQuestions,
      isCompetitionTest: true,
    };

    switch (activeTab) {
      case TestPartTypeEnum.VOCABULARY:
        return vocabularyPart && (
          <VocabularySection
            partId={vocabularyPart.id}
            questionIds={vocabularyPart.questions || []}
            startSerial={startSerials[TestPartTypeEnum.VOCABULARY]}
            {...props}
          />
        );
      case TestPartTypeEnum.GRAMMAR:
        return grammarPart && (
          <GrammarSection
            partId={grammarPart.id}
            questionIds={grammarPart.questions || []}
            startSerial={startSerials[TestPartTypeEnum.GRAMMAR]}
            {...props}
          />
        );
      case TestPartTypeEnum.READING:
        return readingPart && (
          <ReadingSection
            partId={readingPart.id}
            testItemIds={readingPart.questions || []}
            startSerial={startSerials[TestPartTypeEnum.READING]}
            {...props}
          />
        );
      case TestPartTypeEnum.LISTENING:
        return listeningPart && (
          <ListeningSection
            partId={listeningPart.id}
            testItemIds={listeningPart.questions || []}
            startSerial={startSerials[TestPartTypeEnum.LISTENING]}
            {...props}
          />
        );
      case TestPartTypeEnum.SPEAKING:
        return speakingPart && (
          <SpeakingSection
            partId={speakingPart.id}
            testItemIds={speakingPart.questions || []}
            startSerial={startSerials[TestPartTypeEnum.SPEAKING]}
            {...props}
          />
        );
      case TestPartTypeEnum.WRITING:
        return writingPart && (
          <WritingSection
            partId={writingPart.id}
            testItemIds={writingPart.questions || []}
            startSerial={startSerials[TestPartTypeEnum.WRITING]}
            {...props}
          />
        );
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
    submitCompetition?.id,
    selectedQuestionId,
    startSerials,
    handleUpdateAnsweredQuestions
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading || error || !submitCompetition) return null;

  const totalQuestions = allQuestions.length;
  const answeredQuestions = allQuestions.filter(q => q.isAnswered).length;

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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
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


      <SubmitTestDialog
        open={isSubmitDialogOpen}
        onClose={closeSubmitDialog}
        isLoading={isSubmitting}
        result={submissionResult}
      />

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
}
