import React, { useState, useMemo } from "react";
import { Grid, useMediaQuery, useTheme,Box } from "@mui/material";
import TestTabs from "./TestTabs";
import { TestPart, TestPartTypeEnum } from "interfaces";

import ReadingPart from "./ReadingPart";
import ListeningPart from "./ListeningPart";
import SpeakingPart from "./SpeakingPart";
import WritingPart from "./WritingPart";
import { testService } from "features/test/services/testServices";

import IntroducePartTest from "./InroducePartTest";
import TimeRemaining from "./TimeRemaining";
import SubmitTestButton from "../common/SubmitTestButton";

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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
     {isSmallScreen && (
          <Box
          sx={{
            display: "flex",
            marginRight:"2%",
            px: 2,
            mt: 2,
          }}
        >
          <TimeRemaining />
        </Box>
      )}

     

      {!isSmallScreen && (
        <Grid item sm={4} md={3} lg={4}>
          <TimeRemaining  />
         
        </Grid>
      )}
    </Grid>
  );
};

export default CompetitionTest;
