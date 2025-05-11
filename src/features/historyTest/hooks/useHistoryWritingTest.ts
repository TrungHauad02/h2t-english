import { useEffect, useState, useRef } from "react";
import { testWritingService, submitTestAnswerService, submitTestWritingService } from "services";
import { TestPartTypeEnum } from "interfaces";

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

        const res = await testWritingService.getByIdsAndStatus(testWritingIds, true);
        const writings = res.data || [];

        const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
          submitTestId,
          writings.map((w: any) => w.id)
        );

        const answeredMap: Record<number, string> = {};
        (answersRes?.data || []).forEach((ans: any) => {
          answeredMap[ans.question_id] = ans.answer_id || "";
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
        const processed = writings.map((w: any) => ({
          serial: serial++,
          questionId: w.id,
          partType: TestPartTypeEnum.WRITING,
          isAnswered: !!essayMap[w.id]?.trim(),
          topic: w.topic,
          minWords: w.minWords || 200,
          maxWords: w.maxWords || 500,
          content: essayMap[w.id] || ""
        }));

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
