import { useEffect, useState, useRef } from "react";
import { testWritingService, submitTestAnswerService, submitTestWritingService } from "services";

export default function useHistoryWritingTest({
  testWritingIds,
  submitTestId,
}: {
  testWritingIds: number[];
  submitTestId: number;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [writingItems, setWritingItems] = useState<any[]>([]);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await testWritingService.getByIds(testWritingIds);
        const writings = res.data || [];

        const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
          submitTestId,
          writings.map((w: any) => w.id)
        );

        const answeredMap: Record<number, boolean> = {};
        (answersRes?.data || []).forEach((ans: any) => {
          answeredMap[ans.question_id] = true;
        });

        const essaysRes = await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(
          submitTestId,
          writings.map((w: any) => w.id)
        );

        const essayMap: Record<number, string> = {};
        (essaysRes?.data || []).forEach((e: any) => {
          essayMap[e.testWriting_id] = e.content || "";
        });

        let serial = 1;
        const processed = writings.map((item: any) => {
          const question = {
            id: item.id,
            topic: item.topic,
            minWords: item.minWords || 200,
            maxWords: item.maxWords || 500,
            content: essayMap[item.id] || "",
            isAnswered: !!answeredMap[item.id],
            serial: serial++
          };
          return question;
        });

        setWritingItems(processed);
        setAllQuestions(processed);
      } catch (err) {
        console.error("Error loading history writing test:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (testWritingIds.length > 0 && submitTestId) {
      fetchData();
    }
  }, [testWritingIds, submitTestId]);

  return {
    loading,
    error,
    writingItems,
    allQuestions,
    setQuestionRef: (id: number, el: HTMLDivElement | null) => {
      questionRefs.current[id] = el;
    },
  };
}
