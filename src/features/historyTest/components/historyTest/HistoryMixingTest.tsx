import React from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import TestTabs from "./historyMixingAndCompetitionTest/TestTabs";
import {
  VocabularySection,
  GrammarSection,
  ReadingSection,
  ListeningSection,
  SpeakingSection,
  WritingSection
} from "./historyMixingAndCompetitionTest";
import TestQuestionGridHistory from "./common/TestQuestionGridHistory";
import { TestPart, TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useHistoryMixingTest from "../../hooks/useHistoryMixingTest";

interface MixingTestHistoryProps {
  mixingTestParts: TestPart[];
  submitTestId: number;
}

export default function MixingTestHistory({
  mixingTestParts,
  submitTestId
}: MixingTestHistoryProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const {
    allQuestions,
    startSerials,
    activeTab,
    selectedQuestionId,
    setActiveTab,
    setSelectedQuestionId,
    handleQuestionSelect,
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
  } = useHistoryMixingTest(mixingTestParts, submitTestId);

  const renderSection = () => {
    switch (activeTab) {
      case TestPartTypeEnum.VOCABULARY:
        return vocabularyPart ? (
          <VocabularySection 
            partId={vocabularyPart.id}
            questionIds={vocabularyPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.VOCABULARY]}
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

          />
        ) : null;
      default:
        return null;
    }
  };

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
        <Grid item xs={12} sm={12} md={9} lg={8}>
          <TestTabs
            activeTab={activeTab.toLowerCase()}
            onTabChange={(newTab) => {
              setActiveTab(newTab.toUpperCase() as TestPartTypeEnum);
              setSelectedQuestionId(null);
            }}
          />
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
                <TestQuestionGridHistory 
                  questionItems={allQuestions}
                  onQuestionSelect={handleQuestionSelect}
                />
              </Box>
            </Box>
          )}
        </Grid>

        {!isSmallScreen && (
          <Grid item md={3} lg={4}>
            <Box sx={{ mt: 3 }}>
              <TestQuestionGridHistory 
                questionItems={allQuestions}
                onQuestionSelect={handleQuestionSelect}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
