import { useEffect, useState, useRef } from "react";
import {
  testListeningService,
  questionService,
  submitTestAnswerService
} from "services";

export default function useHistoryListeningTest({
  testListeningIds,
  submitTestId,
}: {
  testListeningIds: number[];
  submitTestId: number;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listeningItems, setListeningItems] = useState<any[]>([]);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await testListeningService.getByIdsAndStatus(testListeningIds,true);
        const listenings = res.data || [];

        const questionIds = listenings.flatMap((item: any) => item.questions || []);
        const questionsRes = await questionService.getByIdsAndStatus(questionIds,true);
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
        const result = listenings.map((item: any) => {
          const questions = (item.questions || []).map((qId: number) => {
            const q = allQ.find((q: any) => q.id === qId);
            return {
              ...q,
              serial: currentSerial++,
              selectedAnswerId: selectedMap[qId],
              isCorrect: q?.answers?.find((a: any) => a.id === selectedMap[qId])?.correct ?? false,
            };
          });

          return {
            id: item.id,
            audio: item.audio,
            questions,
            startSerial: questions[0]?.serial || 1,
            endSerial: questions[questions.length - 1]?.serial || 1,
          };
        });

        setListeningItems(result);
        setAllQuestions(result.flatMap((i: any) => i.questions));
      } catch (err) {
        console.error("Error loading history listening test:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (testListeningIds.length > 0 && submitTestId) {
      fetchData();
    }
  }, [testListeningIds, submitTestId]);

  return {
    loading,
    error,
    listeningItems,
    allQuestions,
    setQuestionRef: (id: number, el: HTMLDivElement | null) => {
      questionRefs.current[id] = el;
    },
  };
}
