import { Stack, Box } from "@mui/material";
import { ListComponent } from "components/list";
import { Question, SubmitTestAnswer } from "interfaces";
import WEQuestion from "./QuestionTest";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useEffect, useState } from "react";
import { submitTestAnswerService } from "services";

interface AnswerQuestionSectionProps {
  questions: Question[];
  startSerial: number;
  submitTestId: number;
  partId: number;
  selectedQuestionId?: number | null;
  setQuestionRef?: (id: number, element: HTMLDivElement | null) => void;
  setAnsweredQuestions: (questionId: number, isAnswered: boolean) => void;
}

export default function AnswerQuestionSection({
  questions,
  startSerial,
  submitTestId,
  partId,
  selectedQuestionId,
  setQuestionRef,
  setAnsweredQuestions
}: AnswerQuestionSectionProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchExistingAnswers = async () => {
      if (!submitTestId || questions.length === 0) return;
      
      setLoading(true);
      try {
        const questionIds = questions.map(q => q.id);
        const response = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, questionIds);
        
        const answersMap: Record<string, number> = {};
        
        if (response && response.data) {
          response.data.forEach((answer: SubmitTestAnswer) => {
            answersMap[answer.question_id] = answer.answer_id;
            // Update parent component's state for each answered question
            setAnsweredQuestions(answer.question_id, true);
          });
        }
        
        setSelectedAnswers(answersMap);
      } catch (error) {
        console.error("Error fetching existing answers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExistingAnswers();
  }, [submitTestId, questions, setAnsweredQuestions]);
  
  const handleAnswerChange = async (questionId: string, answerId: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
    
    // Update parent component's state
    setAnsweredQuestions(Number(questionId), true);
    
    try {
      const existingAnswers = await submitTestAnswerService.findBySubmitTestIdAndQuestionId(submitTestId, Number(questionId));
      
      if (existingAnswers && existingAnswers.data && existingAnswers.data.length > 0) {
        const existingAnswer = existingAnswers.data[0];
        await submitTestAnswerService.update(existingAnswer.id, {
          ...existingAnswer,
          answer_id: answerId
        });
      } else {
        await submitTestAnswerService.create({
          id: Date.now(),
          submitTest_id: submitTestId,
          question_id: Number(questionId),
          answer_id: answerId,
          status: true,
        });
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };

  const indexedQuestions = questions.map((item, idx) => ({
    question: item,
    index: startSerial + idx
  }));

  return (
    <Stack
      justifyContent="center"
      spacing={2}
      sx={{
        borderBottom: `1px solid ${isDarkMode ? color.gray400 : color.gray600}`,
        fontSize: {xs: "0.6rem", sm: "0.7rem", md: "1rem" },
        p: { xs: 1, sm: 1.2 },
      }}
    >
      <ListComponent
        data={indexedQuestions}
        renderItem={(item) => (
          <Box
            ref={(el: HTMLDivElement | null) => setQuestionRef && setQuestionRef(item.question.id, el)}
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
              onAnswerChange={(answerId) => handleAnswerChange(item.question.id.toString(), answerId)}
              isDisabled={loading}
            />
          </Box>
        )}
      />
    </Stack>
  );
}