import { Box } from "@mui/material";
import { TestPart } from "interfaces";
import AnswerQuestionSection from "../../common/answerQuestion/AnswerQuestionSection";
import { testService } from "features/test/services/testServices";

interface SpeakingPartProps {
  mixingTestParts: TestPart[];
  startSerial: number;
}

export default function SpeakingPart({ mixingTestParts, startSerial }: SpeakingPartProps) {
  const speakingParts = mixingTestParts.filter((part) => part.type === "SPEAKING");

  const speakingTests = testService.getTestSpeakingsByIds(
    speakingParts.flatMap((part) => part.questions as number[])
  );

  const questions = speakingTests.flatMap((test) =>
    testService.getQuestionsByIds(test.questions)
  ).map((q, idx) => ({ ...q, serial: startSerial + idx }));

  return (
    <Box>
      <AnswerQuestionSection questions={questions} startSerial={startSerial}/>
    </Box>
  );
}
