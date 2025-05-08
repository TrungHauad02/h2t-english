import { useEffect, useState, useRef } from "react";
import {
  testReadingService,
  questionService,
  submitTestAnswerService
} from "services";

export default function useHistoryReadingTest({
  testReadingIds,
  submitTestId
}: {
  testReadingIds: number[];
  submitTestId: number;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [readingItems, setReadingItems] = useState<any[]>([]);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await testReadingService.getByIds(testReadingIds);
        const readings = res.data || [];

        const questionIds = readings.flatMap((item: any) => item.questions || []);
        const questionsRes = await questionService.getByIds(questionIds);
        const allQ = questionsRes.data || [];

        const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
          submitTestId,
          questionIds
        );

        const selectedMap: Record<number, number> = {};
        (answersRes?.data || []).forEach((ans: any) => {
          selectedMap[ans.question_id] = ans.answer_id;
        });

        let currentSerial = 1;
        const result = readings.map((item: any) => {
          const questions = (item.questions || []).map((qId: number) => {
            const q = allQ.find((q: any) => q.id === qId);
            const fullQuestion = {
              ...q,
              serial: currentSerial++,
              selectedAnswerId: selectedMap[qId],
              isCorrect: q?.answers?.find((a: any) => a.id === selectedMap[qId])?.correct ?? false,
            };
            return fullQuestion;
          });

          return {
            id: item.id,
            file: item.file,
            questions,
            startSerial: questions[0]?.serial || 1,
            endSerial: questions[questions.length - 1]?.serial || 1,
          };
        });

        setReadingItems(result);
        setAllQuestions(result.flatMap((i: any) => i.questions));
      } catch (err) {
        console.error("Error loading history reading test:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (testReadingIds.length > 0 && submitTestId) {
      fetchData();
    }
  }, [testReadingIds, submitTestId]);

  return {
    loading,
    error,
    readingItems,
    allQuestions,
    setQuestionRef: (id: number, el: HTMLDivElement | null) => {
      questionRefs.current[id] = el;
    },
  };
}
