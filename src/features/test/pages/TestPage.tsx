import { Box } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { useParams } from "react-router-dom";
import { testService } from "../services/testServices";
import {
  TestReading,
  TestListening,
  TestSpeaking,
  TestWriting,
  TestMixingQuestion,
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

  let data: 
    | TestReading[]
    | TestListening[]
    | TestSpeaking[]
    | TestWriting[]
    | { 
        testMixingQuestions: TestMixingQuestion | null;
        testReadings: TestReading | null;
        testListenings: TestListening | null;
        testSpeakings: TestSpeaking | null;
        testWritings: TestWriting | null;
      }
    | null = null;

  // Fetch data based on type

    data = testService.getDataTestByTypeAndId(type ?? "", id ?? "") as
      | TestReading[]
      | TestListening[]
      | TestSpeaking[]
      | TestWriting[]
      | null;


  const siteInfo: SiteInfo = {
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    title: type ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() : "",
  };
  const renderTest = () => {
    if (!data) {
      return <Box sx={{ textAlign: "center", mt: 4 }}>Test not found.</Box>;
    }

    switch (type?.toLowerCase()) {
      case "mixing": {
        const { 
          testMixingQuestions,
          testReadings,
          testListenings,
          testSpeakings,
          testWritings,
        } = data as unknown as {
          testMixingQuestions: TestMixingQuestion | null;
          testReadings: TestReading | null;
          testListenings: TestListening | null;
          testSpeakings: TestSpeaking | null;
          testWritings: TestWriting | null;
        };

        return (
          <MixingTest
            testMixingQuestions={testMixingQuestions ? [testMixingQuestions] : []}
            testReadings={testReadings ? [testReadings] : []}
            testListenings={testListenings ? [testListenings] : []}
            testSpeakings={testSpeakings ? [testSpeakings] : []}
            testWritings={testWritings ? [testWritings] : []}
          />
        );
      }
      case "readings":
        return <ReadingTest testReadings={data as TestReading[]} />;
      case "listenings":
        return <ListeningTest testListenings={data as TestListening[]} />;
      case "speakings":
        return <SpeakingTest testSpeakings={data as TestSpeaking[]} />;
      case "writings":
        return <WritingTest testWritings={data as TestWriting[]} />;
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
