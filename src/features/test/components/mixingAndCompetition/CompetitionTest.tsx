import React, { useState, useMemo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import TestTabs from "./TestTabs";
import { TestPart, TestPartTypeEnum } from "interfaces";
import VocabularyAndGrammarPart from "./vocabularyAndGrammarPart/VocabularyAndGrammarPart";
import ReadingPart from "./readingPart/ReadingPart";
import ListeningPart from "./listeningPart/ListeningPart";
import SpeakingPart from "./speakingPart/SpeakingPart";
import WritingPart from "./writingPart/WritingPart";
import { testService } from "features/test/services/testServices";
import TestQuestionGrid from "./TestQuestionGrid";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface CompetitionTestProps {
  competitionTestParts: TestPart[];
}

const tabOrder: TestPartTypeEnum[] = [
  TestPartTypeEnum.VOCABULARY,
  TestPartTypeEnum.GRAMMAR,
  TestPartTypeEnum.READING,
  TestPartTypeEnum.LISTENING,
  TestPartTypeEnum.SPEAKING,
  TestPartTypeEnum.WRITING,
];

const CompetitionTest: React.FC<CompetitionTestProps> = ({ competitionTestParts }) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [activeTab, setActiveTab] = useState<TestPartTypeEnum>(TestPartTypeEnum.VOCABULARY);

  const questionCounts = useMemo(() => {
    const counts: Record<TestPartTypeEnum, number> = {
      [TestPartTypeEnum.VOCABULARY]: 0,
      [TestPartTypeEnum.GRAMMAR]: 0,
      [TestPartTypeEnum.READING]: 0,
      [TestPartTypeEnum.LISTENING]: 0,
      [TestPartTypeEnum.SPEAKING]: 0,
      [TestPartTypeEnum.WRITING]: 0,
    };

    competitionTestParts.forEach((part) => {
      if (part.type === TestPartTypeEnum.READING) {
        const fetchedTests = testService.getTestReadingsByIds(part.questions as number[]);
        counts[part.type] += fetchedTests.reduce((total, test) => total + test.questions.length, 0);
      } else if (part.type === TestPartTypeEnum.LISTENING) {
        const fetchedTests = testService.getTestListeningsByIds(part.questions as number[]);
        counts[part.type] += fetchedTests.reduce((total, test) => total + test.questions.length, 0);
      } else if (part.type === TestPartTypeEnum.SPEAKING) {
        const fetchedTests = testService.getTestSpeakingsByIds(part.questions as number[]);
        counts[part.type] += fetchedTests.reduce((total, test) => total + test.questions.length, 0);
      } else {
        counts[part.type] += part.questions.length;
      }
    });
    return counts;
  }, [competitionTestParts]);

  const startSerial = tabOrder
    .slice(0, tabOrder.indexOf(activeTab))
    .reduce((sum, type) => sum + questionCounts[type], 1);

  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid item xs={12} md={9}>
        <TestTabs
          activeTab={activeTab.toLowerCase()}
          onTabChange={(newTab) => setActiveTab(newTab.toUpperCase() as TestPartTypeEnum)}
        />
        {activeTab === TestPartTypeEnum.VOCABULARY || activeTab === TestPartTypeEnum.GRAMMAR ? (
          <VocabularyAndGrammarPart testParts={competitionTestParts} startSerial={startSerial} type={activeTab} />
        ) : activeTab === TestPartTypeEnum.READING ? (
          <ReadingPart testParts={competitionTestParts} startSerial={startSerial} />
        ) : activeTab === TestPartTypeEnum.LISTENING ? (
          <ListeningPart testParts={competitionTestParts} startSerial={startSerial} />
        ) : activeTab === TestPartTypeEnum.SPEAKING ? (
          <SpeakingPart testParts={competitionTestParts} startSerial={startSerial} />
        ) : activeTab === TestPartTypeEnum.WRITING ? (
          <WritingPart testParts={competitionTestParts} startSerial={startSerial} />
        ) : null}
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            p: 2,
            border: "2px solid",
            borderColor: isDarkMode ? color.gray700 : "#ccc",
            borderRadius: "10px",
            bgcolor: isDarkMode ? color.gray900 : "#f9f9f9",
            textAlign: "center",
            mb: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: isDarkMode ? color.gray200 : "black" }}>
            Time remaining: 
          </Typography>
        </Box>
        <TestQuestionGrid questionCounts={questionCounts} />
      </Grid>
    </Grid>
  );
};

export default CompetitionTest;
