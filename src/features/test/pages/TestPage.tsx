import { Box } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { useParams } from "react-router-dom";
import { testService } from "../services/testServices";
import { TestTypeEnum, TestPartTypeEnum } from "interfaces";
import {
  ReadingTest,
  SpeakingTest,
  WritingTest,
  ListeningTest,
  MixingTest,
} from "../components";

export default function TestPage() {
  const { type, id } = useParams();
  const testType = type
    ?.toUpperCase()
    .slice(0, -1) as keyof typeof TestTypeEnum;
  const testId = Number(id);

  if (isNaN(testId)) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>Invalid Test ID</Box>;
  }

  const test = testService.getTestByIdAndType(testId, testType);
  if (!test) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>Test not found.</Box>;
  }

  const testParts = testService.getTestPartsByIds(test.parts);

  const testReadings = testService.getTestReadingsByIds(
    testParts
      .filter((p) => p.type === TestPartTypeEnum.READING)
      .map((p) => p.id)
  );

  const testListenings = testService.getTestListeningsByIds(
    testParts
      .filter((p) => p.type === TestPartTypeEnum.LISTENING)
      .map((p) => p.id)
  );

  const testSpeakings = testService.getTestSpeakingsByIds(
    testParts
      .filter((p) => p.type === TestPartTypeEnum.SPEAKING)
      .map((p) => p.id)
  );

  const testWritings = testService.getTestWritingsByIds(
    testParts
      .filter((p) => p.type === TestPartTypeEnum.WRITING)
      .map((p) => p.id)
  );

  const siteInfo: SiteInfo = {
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    title: test?.title || "Test",
  };

  const renderTest = () => {
    switch (test.type) {
      case TestTypeEnum.MIXING:
        return <Box></Box>;
      default:
        return (
          <Box sx={{ textAlign: "center", mt: 4 }}>Invalid test type.</Box>
        );
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <MainPictureSection siteInfo={siteInfo} />
      {renderTest()}
    </Box>
  );
}
