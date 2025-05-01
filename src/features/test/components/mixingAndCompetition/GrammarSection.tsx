import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import { questionService } from "services/test";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface GrammarSectionProps {
  partId: number;
  questionIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
  setAnsweredQuestions: (questionId: number, isAnswered: boolean) => void;
}

export default function GrammarSection({
  partId,
  questionIds,
  submitTestId,
  selectedQuestionId,
  startSerial,
  setAnsweredQuestions
}: GrammarSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Refs để scroll đến câu hỏi được chọn
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const fetchedQuestions = await questionService.getByIds(questionIds);
        setQuestions(fetchedQuestions.data || []);
      } catch (error) {
        console.error("Error fetching grammar questions:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (questionIds && questionIds.length > 0) {
      fetchQuestions();
    }
  }, [questionIds]);

  // Lưu reference đến từng câu hỏi
  const setQuestionRef = (id: number, element: HTMLDivElement | null) => {
    questionRefs.current[id] = element;
  };

  // Cuộn đến câu hỏi được chọn khi selectedQuestionId thay đổi
  useEffect(() => {
    if (selectedQuestionId && questionRefs.current[selectedQuestionId]) {
      questionRefs.current[selectedQuestionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedQuestionId, loading]);

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
        </Box>
      ) : (
        <AnswerQuestionSection
          questions={questions}
          startSerial={startSerial}
          submitTestId={submitTestId}
          partId={partId}
          selectedQuestionId={selectedQuestionId}
          setQuestionRef={setQuestionRef}
          setAnsweredQuestions={setAnsweredQuestions}
        />
      )}
    </Box>
  );
}