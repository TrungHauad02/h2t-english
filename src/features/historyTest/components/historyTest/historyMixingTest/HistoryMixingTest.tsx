import React, { useState, useMemo } from "react";
import { Grid, useMediaQuery, useTheme, Stack } from "@mui/material";
import TestTabs from "./TestTabs";
import {
  SubmitTestAnswer,
  SubmitTestSpeaking,
  SubmitTestWriting,
  TestPart,
  TestPartTypeEnum,
  Question,
} from "interfaces";
import HistoryVocabularyAndGrammar from "./HistoryVocabularyAndGrammar";
import HistoryReading from "./HistoryReadingPart";
import HistoryListening from "./HistoryListeningPart";
import HistorySpeaking from "./HistorySpeakingPart";
import HistoryWriting from "./HistoryWritingPart";
import { testService } from "features/test/services/testServices";
import TestQuestionGrid from "./TestQuestionGrid";
import CommentTest from "../common/CommentTest";
import ScoreDisplay from "../common/ScoreDisplay";

interface HistoryMixingTestProps {
  mixingTestParts: TestPart[];
  submitAnswers: SubmitTestAnswer[];
  submitSpeakings: SubmitTestSpeaking[];
  submitWritings: SubmitTestWriting[];
}

const tabOrder: TestPartTypeEnum[] = [
  TestPartTypeEnum.VOCABULARY,
  TestPartTypeEnum.GRAMMAR,
  TestPartTypeEnum.READING,
  TestPartTypeEnum.LISTENING,
  TestPartTypeEnum.SPEAKING,
  TestPartTypeEnum.WRITING,
];

const HistoryMixingTest: React.FC<HistoryMixingTestProps> = ({
  mixingTestParts,
  submitAnswers,
  submitSpeakings,
  submitWritings,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

    mixingTestParts.forEach((part) => {
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
  }, [mixingTestParts]);

  const allQuestions = useMemo(() => {
    const questions: Question[] = [];
  
    mixingTestParts.forEach((part) => {
      if (
        part.type === TestPartTypeEnum.VOCABULARY ||
        part.type === TestPartTypeEnum.GRAMMAR
      ) {
        const fetched = testService.getQuestionsByIds(part.questions);
        questions.push(...fetched);
      } else if (part.type === TestPartTypeEnum.READING) {
        const fetched = testService.getTestReadingsByIds(part.questions);
        fetched.forEach((test) => {
          const qs = testService.getQuestionsByIds(test.questions);
          questions.push(...qs);
        });
      } else if (part.type === TestPartTypeEnum.LISTENING) {
        const fetched = testService.getTestListeningsByIds(part.questions);
        fetched.forEach((test) => {
          const qs = testService.getQuestionsByIds(test.questions);
          questions.push(...qs);
        });
      }
    });
  
    return questions;
  }, [mixingTestParts]);
  
  const startSerial = tabOrder
    .slice(0, tabOrder.indexOf(activeTab))
    .reduce((sum, type) => sum + questionCounts[type], 1);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} md={9} lg={8}>

      {isSmallScreen && (
        <ScoreDisplay score={42} total={50} />
      )}
        <TestTabs
          activeTab={activeTab.toLowerCase()}
          onTabChange={(newTab) => setActiveTab(newTab.toUpperCase() as TestPartTypeEnum)}
        />
           <CommentTest 
        text = {"Please review your answer carefully and consider improving your grammar, structure, or coherence where needed."}
        />

        {activeTab === TestPartTypeEnum.VOCABULARY || activeTab === TestPartTypeEnum.GRAMMAR ? (
          <HistoryVocabularyAndGrammar
            testParts={mixingTestParts}
            startSerial={startSerial}
            type={activeTab}
            submitAnswers={submitAnswers}
          />
        ) : activeTab === TestPartTypeEnum.READING ? (
          <HistoryReading
            testParts={mixingTestParts}
            startSerial={startSerial}
            submitAnswers={submitAnswers}
          />
        ) : activeTab === TestPartTypeEnum.LISTENING ? (
          <HistoryListening
            testParts={mixingTestParts}
            startSerial={startSerial}
            submitAnswers={submitAnswers}
          />
        ) : activeTab === TestPartTypeEnum.SPEAKING ? (
          <HistorySpeaking
            testParts={mixingTestParts}
            startSerial={startSerial}
            submitSpeakings={submitSpeakings}
          />
        ) : activeTab === TestPartTypeEnum.WRITING ? (
          <HistoryWriting
            testParts={mixingTestParts}
            startSerial={startSerial}
            submitWritings={submitWritings}
          />
        ) : null}
      </Grid>

      {!isSmallScreen && (
        <Grid item sm={4} md={3} lg={4}>
       <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: { xs: "40%" },
          alignItems: "flex-start", 
          gap: 2,         
          mx: "auto",         
        }}
        >
        <ScoreDisplay score={42} total={50} />

        <TestQuestionGrid
          questionCounts={questionCounts}
          questions={allQuestions}
          submitAnswers={submitAnswers}
        />
      </Stack>

        </Grid>
      )}
    </Grid>
  );
};

export default HistoryMixingTest;