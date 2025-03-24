import { Box } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { useParams } from "react-router-dom";
import { testService } from "features/test/services/testServices";
import { historyTestService } from "../services/historyTestService";
import {
  TestTypeEnum,
  TestPartTypeEnum,
  SubmitTestAnswer,
  SubmitTestSpeaking,
  SubmitTestWriting,
} from "interfaces";
import {
  HistoryListeningTest,
  HistoryReadingTest,
  HistorySpeakingTest,
  HistoryWritingTest,
  HistoryMixingTest,
} from "../components/historyTest";

export default function HistoryTestPage() {
  const { type, id } = useParams();
  const testType = type?.toUpperCase() as keyof typeof TestTypeEnum;
  const testId = Number(id);

  if (isNaN(testId)) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>Invalid Test ID</Box>;
  }

  const test = testService.getTestByIdAndType(testId, testType);
  if (!test) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>Test not found.</Box>;
  }

  const testParts = testService.getTestPartsByIds(test.parts);
  const submitAnswers: SubmitTestAnswer[] = historyTestService.getSubmitAnswersByTestId(testId);
  const submitSpeakings: SubmitTestSpeaking[] = historyTestService.getSubmitSpeakingByTestId(testId);
  const submitWritings: SubmitTestWriting[] = historyTestService.getSubmitWritingByTestId(testId);

  const testReadings = testService.getTestReadingsByIds(
    testParts.filter((p) => p.type === TestPartTypeEnum.READING).map((p) => p.id)
  );

  const testListenings = testService.getTestListeningsByIds(
    testParts.filter((p) => p.type === TestPartTypeEnum.LISTENING).map((p) => p.id)
  );

  const testSpeakings = testService.getTestSpeakingsByIds(
    testParts.filter((p) => p.type === TestPartTypeEnum.SPEAKING).flatMap((p) => p.questions as number[])
  );

  const testWritings = testService.getTestWritingsByIds(
    testParts.filter((p) => p.type === TestPartTypeEnum.WRITING).flatMap((p) => p.questions as number[])
  );

  const siteInfo: SiteInfo = {
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    title: test?.title || "Test",
  };

  const renderTest = () => {
    switch (test.type) {
      case TestTypeEnum.MIXING:
        return (
          <HistoryMixingTest
            mixingTestParts={testParts}
            submitAnswers={submitAnswers}
            submitSpeakings={submitSpeakings}
            submitWritings={submitWritings}
          />
        );
      case TestTypeEnum.READING:
        return (
          <HistoryReadingTest
            testReadings={testReadings}
            submitAnswers={submitAnswers}
          />
        );
      case TestTypeEnum.LISTENING:
        return (
          <HistoryListeningTest
            testListenings={testListenings}
            submitAnswers={submitAnswers}
          />
        );
      case TestTypeEnum.SPEAKING:
        return (
          <HistorySpeakingTest
            testSpeakings={testSpeakings}
            submitSpeakings={submitSpeakings}
          />
        );
      case TestTypeEnum.WRITING:
        return (
          <HistoryWritingTest
            testWritings={testWritings}
            submitWritings={submitWritings}
          />
        );
      default:
        return <Box sx={{ textAlign: "center", mt: 4 }}>Invalid test type.</Box>;
    }
  };

  return (
    <Box sx={{ mt: 8, width: "100%", marginBottom: "1rem" }}>
      <MainPictureSection siteInfo={siteInfo} />
      <Box sx={{ marginTop: "2rem" }}>{renderTest()}</Box>
    </Box>
  );
}
