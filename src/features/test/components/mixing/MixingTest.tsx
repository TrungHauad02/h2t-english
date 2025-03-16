import React, { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { TestPart, TestPartTypeEnum } from "interfaces";
import { testService } from "features/test/services/testServices";

interface MixingTestProps {
  mixingTestParts: TestPart[];
}

const tabOrder: TestPartTypeEnum[] = [
  TestPartTypeEnum.VOCABULARY,
  TestPartTypeEnum.GRAMMAR,
  TestPartTypeEnum.READING,
  TestPartTypeEnum.LISTENING,
  TestPartTypeEnum.SPEAKING,
  TestPartTypeEnum.WRITING,
];

const MixingTest: React.FC<MixingTestProps> = ({ mixingTestParts }) => {
  const [activeTab, setActiveTab] = useState<TestPartTypeEnum>(
    TestPartTypeEnum.VOCABULARY
  );

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
        const fetchedTests = testService.getTestReadingsByIds(
          part.questions as number[]
        );
        counts[part.type] += fetchedTests.reduce(
          (total, test) => total + test.questions.length,
          0
        );
      } else if (part.type === TestPartTypeEnum.LISTENING) {
        const fetchedTests = testService.getTestListeningsByIds(
          part.questions as number[]
        );
        counts[part.type] += fetchedTests.reduce(
          (total, test) => total + test.questions.length,
          0
        );
      } else if (part.type === TestPartTypeEnum.SPEAKING) {
        const fetchedTests = testService.getTestSpeakingsByIds(
          part.questions as number[]
        );
        counts[part.type] += fetchedTests.reduce(
          (total, test) => total + test.questions.length,
          0
        );
      } else {
        counts[part.type] += part.questions.length;
      }
    });
    return counts;
  }, [mixingTestParts]);

  const startSerial = tabOrder
    .slice(0, tabOrder.indexOf(activeTab))
    .reduce((sum, type) => sum + questionCounts[type], 1);

  return <Box sx={{ p: 3 }}></Box>;
};

export default MixingTest;
