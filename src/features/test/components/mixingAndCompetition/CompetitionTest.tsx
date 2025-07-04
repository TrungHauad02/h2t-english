import React, { useState, useCallback } from "react";
import { Grid, useMediaQuery, useTheme, Box,Button } from "@mui/material";
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
import TimeRemaining from "./TimeRemainingCompetition";
import SubmitCompetitionDialog from "../common/SubmitCompetitionDialog";
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
    error,
    competition,
  } = useCompetitionTest();

  const endTime = competition?.endTime ? new Date(competition.endTime) : new Date(Date.now());
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
         <TimeRemaining createAt={submitCompetition?.createdAt ? new Date(submitCompetition.createdAt) : new Date()} endTime={endTime} onTimeout={handleSubmitTest} 
         duration={competition?.duration || 0}
 />

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
  <Box sx={{ mt: 4, textAlign: "center" }}>
    <Button
      variant="contained"
      onClick={handleOpenConfirmDialog}
      sx={{
        py: 1.5,
        px: 4,
        borderRadius: "8px",
        backgroundColor: isDarkMode ? color.teal700 : color.teal500,
        color: "white",
        fontWeight: "bold",
        textTransform: "none",
        fontSize: "1rem",
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(20, 184, 166, 0.2)"
          : "0 4px 12px rgba(20, 184, 166, 0.15)",
        "&:hover": {
          backgroundColor: isDarkMode ? color.teal600 : color.teal600,
          boxShadow: isDarkMode
            ? "0 6px 16px rgba(20, 184, 166, 0.3)"
            : "0 6px 16px rgba(20, 184, 166, 0.2)",
        },
        "&:active": {
          backgroundColor: isDarkMode ? color.teal800 : color.teal700,
        },
        transition: "all 0.2s ease",
      }}
    >
      Submit Test
    </Button>

  </Box>
)}

        </Grid>
{!isSmallScreen && (
  <Grid
    item
    md={3}
    lg={4}
    sx={{
      display: { xs: "none", md: "block" },
      position: "sticky",
      top: 16,
      height: "fit-content",
      alignSelf: "flex-start",
    }}
  >
    <TimeRemaining
      createAt={submitCompetition?.createdAt ? new Date(submitCompetition.createdAt) : new Date()}
      endTime={endTime}
      duration={competition?.duration || 0}
      onTimeout={handleSubmitTest}
    />
    <Box sx={{ mt: 3 }}>
      <TestQuestionGrid
        key={submitCompetition.id}
        questionItems={allQuestions}
        onQuestionSelect={handleQuestionSelect}
        onSubmitTest={handleOpenConfirmDialog}
      />
    </Box>
  </Grid>
)}

          
      </Grid>


      <SubmitCompetitionDialog
        open={isSubmitDialogOpen}
        onClose={closeSubmitDialog}
        isLoading={isSubmitting}
        result={submissionResult}
        competitionId={submitCompetition.competition_id}
        submitCompetitionId={submitCompetition.id}
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
