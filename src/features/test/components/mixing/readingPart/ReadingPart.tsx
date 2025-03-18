import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { TestPart, TestPartTypeEnum } from "interfaces";
import AnswerQuestionSection from "../../common/answerQuestion/AnswerQuestionSection";
import { testService } from "features/test/services/testServices";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";

interface ReadingPartProps {
  mixingTestParts: TestPart[];
  startSerial: number;
}

export default function ReadingPart({ mixingTestParts, startSerial }: ReadingPartProps) {
  const [readingTests, setReadingTests] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReadingTests() {
      const readingParts = mixingTestParts.filter(
        (part) => part.type === TestPartTypeEnum.READING
      );

      const fetchedReadingTests = await testService.getTestReadingsByIds(readingParts.map(part => part.id));

      const fetchedData = await Promise.all(
        fetchedReadingTests.map(async (test) => ({
          file: test.file,
          questions: await testService.getQuestionsByIds(test.questions),
        }))
      );

      setReadingTests(fetchedData);
    }

    fetchReadingTests();
  }, [mixingTestParts]);

  let currentSerial = startSerial;

  return (
    <Box>
      {readingTests.map(({ file, questions }, index) => {
        const questionCount = questions.length;
        const endSerial = currentSerial + questionCount - 1;
        const serialRange = `${currentSerial} - ${endSerial}`;
        const startSerialForSection = currentSerial; 
        currentSerial = endSerial + 1;

        return (
          <Box key={index}>
            <Stack sx={{ ml: { xs: 4, sm: 6 }, mr: { xs: 4, sm: 6 }, my: 1 }}>
              <Box sx={{ fontWeight: "bold", my: 1 }}>Questions {serialRange}</Box>
              <WEDocumentViewer fileUrl={file} lineHeight="2" sx={{ my: 2 }} />
            </Stack>

            <AnswerQuestionSection questions={questions} startSerial={startSerialForSection} />
          </Box>
        );
      })}
    </Box>
  );
}

      