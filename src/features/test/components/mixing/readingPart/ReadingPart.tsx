import { Box ,Stack} from "@mui/material";
import { useMemo } from "react";
import { TestPart, TestPartTypeEnum } from "interfaces";
import AnswerQuestionSection from "../../common/answerQuestion/AnswerQuestionSection";
import { testService } from "features/test/services/testServices";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";

interface ReadingPartProps {
  mixingTestParts: TestPart[];
  startSerial: number;
}

export default function ReadingPart({ mixingTestParts, startSerial }: ReadingPartProps) {
  const { readingTests, questions } = useMemo(() => {
    const readingParts = mixingTestParts.filter(
      (part) => part.type === TestPartTypeEnum.READING
    );

    const readingTests = testService.getTestReadingsByIds(
      readingParts.flatMap((part) => part.questions as number[])
    );

    const questions = readingTests.map((test) => ({
      file: test.file,
      questions: testService.getQuestionsByIds(test.questions),
    }));

    return { readingTests, questions };
  }, [mixingTestParts]);

  let currentSerial = startSerial;

  return (
    <Box>
      {questions.map(({ file, questions }, index) => {
        const questionCount = questions.length;
        const endSerial = currentSerial + questionCount - 1;
        const serialRange = `${currentSerial} - ${endSerial}`;
        currentSerial = endSerial + 1;

        return (
          <Box key={index}>
          <Stack sx={{ ml: { xs: 4, sm: 6 }, mr: { xs: 4, sm: 6 }, my: 1,}}>
          <Box sx={{ fontWeight: "bold", my: 1 }}>Questions {serialRange}</Box>
          <WEDocumentViewer fileUrl={"/document.docx"} lineHeight="2" sx={{ my: 2 }} />
          </Stack>
        
            
            <AnswerQuestionSection questions={questions} startSerial={currentSerial} />
          </Box>
        );
      })}
    </Box>
  );
}
