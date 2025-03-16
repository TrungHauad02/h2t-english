import { Box } from "@mui/material";
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

  const questions = listeningTests.flatMap((test) =>
    testService.getQuestionsByIds(test.questions)
  ).map((q, idx) => ({ ...q, serial: startSerial + idx }));

  return (
    <Box>
      <AnswerQuestionSection questions={questions} startSerial={startSerial}/>
    </Box>
  );
}
