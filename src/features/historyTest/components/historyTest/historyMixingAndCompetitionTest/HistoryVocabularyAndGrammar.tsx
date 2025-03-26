import { Box } from "@mui/material";
import { TestPart, TestPartTypeEnum, SubmitTestAnswer } from "interfaces";
import { testService } from "features/test/services/testServices";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";

interface HistoryVocabularyAndGrammarProps {
  testParts: TestPart[];
  startSerial: number;
  type: TestPartTypeEnum.VOCABULARY | TestPartTypeEnum.GRAMMAR;
  submitAnswers: SubmitTestAnswer[];
}

export default function HistoryVocabularyAndGrammar({
  testParts,
  startSerial,
  type,
  submitAnswers,
}: HistoryVocabularyAndGrammarProps) {
  const parts = testParts.filter((part) => part.type === type);

  const questions = parts
    .flatMap((part) =>
      testService.getQuestionsByIdsAndType(
        part.questions.map((q: any) => (typeof q === "number" ? q : q.id)),
        type
      )
    )
    .map((q, idx) => ({
      ...q,
      serial: startSerial + idx,
    }));

  return (
    <Box>
      <AnswerQuestionSection
        questions={questions}
        startSerial={startSerial}
        submitAnswers={submitAnswers}
      />
    </Box>
  );
}
