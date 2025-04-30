import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import { questionService } from "services/test";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface VocabularySectionProps {
  partId: number;
  questionIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
}

export default function VocabularySection({
  partId,
  questionIds,
  submitTestId,
  selectedQuestionId,
  startSerial
}: VocabularySectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const fetchedQuestions = await questionService.getByIds(questionIds);
        setQuestions(fetchedQuestions.data || []);
      } catch (error) {
        console.error("Error fetching vocabulary questions:", error);
      } finally {
        setLoading(false);
      }
    }

    if (questionIds && questionIds.length > 0) {
      fetchQuestions();
    }
  }, [questionIds]);

  const setQuestionRef = (id: number, element: HTMLDivElement | null) => {
    questionRefs.current[id] = element;
  };

  useEffect(() => {
    if (selectedQuestionId && questionRefs.current[selectedQuestionId]) {
      questionRefs.current[selectedQuestionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedQuestionId, loading]);

  return (
    <Box

    >
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
        />
      )}
    </Box>
  );
}