import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { TestPart, TestPartTypeEnum } from "interfaces";
import AnswerQuestionSection from "../../common/answerQuestion/AnswerQuestionSection";
import { testService } from "features/test/services/testServices";

interface ListeningPartProps {
  mixingTestParts: TestPart[];
  startSerial: number;
}

export default function ListeningPart({ mixingTestParts, startSerial }: ListeningPartProps) {
  const [listeningTests, setListeningTests] = useState<any[]>([]);

  useEffect(() => {
    async function fetchListeningTests() {
      const listeningParts = mixingTestParts.filter(
        (part) => part.type === TestPartTypeEnum.LISTENING
      );

      const fetchedListeningTests = await testService.getTestListeningsByIds(
        listeningParts.map((part) => part.id)
      );

      const fetchedData = await Promise.all(
        fetchedListeningTests.map(async (test) => ({
          audio: test.audio,
          transcript: test.transcript,
          questions: await testService.getQuestionsByIds(test.questions),
        }))
      );

      setListeningTests(fetchedData);
    }

    fetchListeningTests();
  }, [mixingTestParts]);

  let currentSerial = startSerial;

  return (
    <Box>
      {listeningTests.map(({ audio, transcript, questions }, index) => {
        const questionCount = questions.length;
        const endSerial = currentSerial + questionCount - 1;
        const serialRange = `${currentSerial} - ${endSerial}`;
        const startSerialForSection = currentSerial;
        currentSerial = endSerial + 1;

        return (
          <Box key={index}>
            <Stack sx={{ ml: { xs: 4, sm: 6 }, mr: { xs: 4, sm: 6 }, my: 1 }}>
              <Box sx={{ fontWeight: "bold", my: 1 }}>Questions {serialRange}</Box>

              <audio controls style={{ width: "100%", marginTop: "8px" }}>
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>

              <Box sx={{ fontStyle: "italic", my: 2 }}>{transcript}</Box>
            </Stack>

            <AnswerQuestionSection questions={questions} startSerial={startSerialForSection} />
          </Box>
        );
      })}
    </Box>
  );
}
