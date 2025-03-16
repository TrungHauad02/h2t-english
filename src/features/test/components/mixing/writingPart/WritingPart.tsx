import { Box } from "@mui/material";
import { TestPart, TestPartTypeEnum } from "interfaces";
import AnswerQuestionSection from "../../common/answerQuestion/AnswerQuestionSection";
import { testService } from "features/test/services/testServices";

interface WritingPartProps {
  mixingTestParts: TestPart[];
  startSerial: number;
}

export default function WritingPart({ mixingTestParts, startSerial }: WritingPartProps) {
  const writingParts = mixingTestParts.filter(
    (part) => part.type === TestPartTypeEnum.WRITING
  );

  

  return (
    <Box>
   
    </Box>
  );
}
