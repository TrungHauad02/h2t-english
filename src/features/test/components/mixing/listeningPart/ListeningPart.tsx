import { Box, Stack } from "@mui/material";
import { TestPart } from "interfaces";
import AnswerQuestionSection from "../../common/answerQuestion/AnswerQuestionSection";
import { testService } from "features/test/services/testServices";

interface ListeningPartProps {
  mixingTestParts: TestPart[];
  startSerial: number;
}

export default function ListeningPart({ mixingTestParts, startSerial }: ListeningPartProps) {
  const listeningParts = mixingTestParts.filter((part) => part.type === "LISTENING");

  const listeningTests = testService.getTestListeningsByIds(
    listeningParts.flatMap((part) => part.questions as number[])
  );

  let currentSerial = startSerial;

  const questions = listeningTests.map((test) => {
    const questionList = testService.getQuestionsByIds(test.questions);
    const endSerial = currentSerial + questionList.length - 1;
    const serialRange = `${currentSerial} - ${endSerial}`;
    const serialStart = currentSerial;
    currentSerial = endSerial + 1;

    return { audio: test.audio, questions: questionList, serialRange, serialStart };
  });

  return (
    <Box>
      {questions.map(({ audio, questions, serialRange, serialStart }, index) => (
        <Box key={index}>
          <Stack sx={{ ml: { xs: 4, sm: 6 }, mr: { xs: 4, sm: 6 }, my: 1 }}>
            <Box sx={{ fontWeight: "bold", my: 1 }}>Questions {serialRange}</Box>
            <audio src={"/basic_listening.mp3"} controls style={{ width: "100%" }} />
          </Stack>
          <AnswerQuestionSection questions={questions} startSerial={serialStart} />
        </Box>
      ))}
    </Box>
  );
}
