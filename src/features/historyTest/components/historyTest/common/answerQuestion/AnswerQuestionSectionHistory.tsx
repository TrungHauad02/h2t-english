import { Stack, Box } from "@mui/material";
import { ListComponent } from "components/list";
import { Question } from "interfaces";
import WEQuestion from "./QuestionTest";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useEffect, useState } from "react";
import { submitTestAnswerService, submitCompetitionAnswerService } from "services";

interface AnswerQuestionSectionHistoryProps {
  questions: Question[];
  startSerial: number;
  submitTestId: number;
  partId: number;
  selectedQuestionId?: number | null;
  setQuestionRef?: (id: number, element: HTMLDivElement | null) => void;
  isCompetitionTest?: boolean;
}

export default function AnswerQuestionSectionHistory({
  questions,
  startSerial,
  submitTestId,
  partId,
  selectedQuestionId,
  setQuestionRef,
  isCompetitionTest = false
}: AnswerQuestionSectionHistoryProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoading(true);
        const questionIds = questions.map(q => q.id);
        const response = isCompetitionTest
          ? await submitCompetitionAnswerService.findBySubmitCompetitionIdAndQuestionIds(submitTestId, questionIds)
          : await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, questionIds);

        const answersMap: Record<number, number> = {};
        if (response && response.data) {
          response.data.forEach((answer: any) => {
            answersMap[answer.question_id] = answer.answer_id;
          });
        }

        setSelectedAnswers(answersMap);
      } catch (error) {
        console.error("Error loading history answers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [submitTestId, questions, isCompetitionTest]);

  const indexedQuestions = questions.map((item, idx) => ({
    question: item,
    index: startSerial + idx
  }));

  return (
    <Stack spacing={2} sx={{ p: { xs: 1, sm: 1.2 } }}>
      <ListComponent
        data={indexedQuestions}
        renderItem={(item) => (
          <Box
            ref={(el) => setQuestionRef?.(item.question.id, el as HTMLDivElement | null)}
            sx={{
              scrollMarginTop: "100px",
              transition: "all 0.3s ease",
              ...(selectedQuestionId === item.question.id && {
                transform: "scale(1.01)",
                boxShadow: `0 0 10px ${isDarkMode ? color.teal500 + "50" : color.teal400 + "50"}`,
                borderRadius: "1rem",
              })
            }}
          >
            <WEQuestion
              key={item.question.id}
              question={item.question}
              index={item.index}
              selectedAnswerId={selectedAnswers[item.question.id]}
              onAnswerChange={() => {}}
              isDisabled={true}
            />
          </Box>
        )}
      />
    </Stack>
  );
}
