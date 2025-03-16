import { Box } from "@mui/material";
import { TestPart, TestPartTypeEnum } from "interfaces";
import AnswerQuestionSection from "../../common/answerQuestion/AnswerQuestionSection";
import { testService } from "features/test/services/testServices";

interface ReadingPartProps {
  mixingTestParts: TestPart[];
  startSerial: number;
}

export default function ReadingPart({ mixingTestParts, startSerial }: ReadingPartProps) {
    const readingParts = mixingTestParts.filter(
      (part) => part.type === TestPartTypeEnum.READING
    );
  
    const readingTests = testService.getTestReadingsByIds(
      readingParts.flatMap((part) => part.questions as number[])
    );
  
    const questions = readingTests.flatMap((test) => 
      testService.getQuestionsByIds(test.questions)
    );
  
    return (
      <Box>
        <AnswerQuestionSection questions={questions} startSerial={startSerial} />
      </Box>
    );
  }