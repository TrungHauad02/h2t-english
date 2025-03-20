import { Box } from "@mui/material";
import { TestPart, TestPartTypeEnum } from "interfaces";
import AnswerQuestionSection from "../../common/answerQuestion/AnswerQuestionSection";
import { testService } from "features/test/services/testServices";

interface VocabularyAndGrammarPartProps {
  testParts: TestPart[];
  startSerial: number;
  type: TestPartTypeEnum.VOCABULARY | TestPartTypeEnum.GRAMMAR;
}

export default function VocabularyAndGrammarPart({ testParts, startSerial, type }: VocabularyAndGrammarPartProps) {
  const parts = testParts.filter(
    (part) => part.type === type
  );

  const questions = parts.flatMap((part) => 
    testService.getQuestionsByIdsAndType(
      part.questions.map((q: any) => (typeof q === 'number' ? q : q.id)),
      type
    )
  ).map((q, idx) => ({ ...q, serial: startSerial + idx }));

  return (
    <Box>
      <AnswerQuestionSection questions={questions} startSerial={startSerial}/>
    </Box>
  );
}
