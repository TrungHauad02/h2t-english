import { Box } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { useParams } from "react-router-dom";
import { testService } from "../services/testServices";
import {
  Test,
  TestPart,
  TestReading,
  TestListening,
  TestSpeaking,
  TestWriting,
  Question,
  TestTypeEnum,
  TestPartTypeEnum,
} from "interfaces";
import {
  ReadingTest,
  SpeakingTest,
  WritingTest,
  ListeningTest,
  MixingTest,
} from "../components";

export default function TestPage() {
  const { type, id } = useParams();
  const testType = type?.toUpperCase().slice(0, -1) as keyof typeof TestTypeEnum;

  const testId = Number(id);
  if (isNaN(testId)) {
    return <Box sx={{ textAlign: "center", mt: 4 }}></Box>;
  }

  let test: Test | null = null;
  let testParts: TestPart[] = [];
  let questions: Question[] = [];
  test = testId && testType ? testService.getTestByIdAndType(testId, testType) : null;

  if (!test) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>Test not found.</Box>;
  }
  testParts = testService.getTestPartsByIds(test.parts);
  const testReadings: TestReading[] = [];
  const testListenings: TestListening[] = [];
  const testSpeakings: TestSpeaking[] = [];
  const testWritings: TestWriting[] = [];

  testParts.forEach((part) => {
    switch (part.type) {
      case TestPartTypeEnum.VOCABULARY:
      case TestPartTypeEnum.GRAMMAR:
        questions.push(...testService.getQuestionsByIds(part.questions));
        break;
      case TestPartTypeEnum.READING:
        testReadings.push(...testService.getTestReadingsByIds(part.questions));
        break;
      case TestPartTypeEnum.LISTENING:
        testListenings.push(...testService.getTestListeningsByIds(part.questions));
        break;
      case TestPartTypeEnum.SPEAKING:
        testSpeakings.push(...testService.getTestSpeakingsByIds(part.questions));
        break;
      case TestPartTypeEnum.WRITING:
        testWritings.push(...testService.getTestWritingsByIds(part.questions));
        break;
      default:
        break;
    }
  });

  const siteInfo: SiteInfo = {
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    title: test?.title || "Test",
  };

  const renderTest = () => {
    switch (test.type) {
      case TestTypeEnum.MIXING:
        return (
          <MixingTest
            mixingQuestions={questions} 
            mixingTestReadings={testReadings}
            mixingTestListenings={testListenings}
            mixingTestSpeakings={testSpeakings}
            mixingTestWritings={testWritings}
          />
        );
      case TestTypeEnum.READING:
        return <ReadingTest readingTestReadings={testReadings} />;
      case TestTypeEnum.LISTENING:
        return <ListeningTest listeningTestListenings={testListenings} />;
      case TestTypeEnum.SPEAKING:
        return <SpeakingTest speakingTestSpeakings={testSpeakings} />;
      case TestTypeEnum.WRITING:
        return <WritingTest writingTestWritings={testWritings} />;
      default:
        return <Box sx={{ textAlign: "center", mt: 4 }}>Invalid test type.</Box>;
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <MainPictureSection siteInfo={siteInfo} />
      {renderTest()}
    </Box>
  );
}
