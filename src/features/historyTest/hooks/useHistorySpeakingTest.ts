import { useEffect, useState, useRef } from "react";
import { testSpeakingService, questionService, submitTestSpeakingService } from "services";
import { TestSpeaking } from "interfaces";

export default function useHistorySpeakingTest(testSpeakingIds: number[], submitTestId: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [speakingTests, setSpeakingTests] = useState<Record<number, TestSpeaking>>({});
  const [recordings, setRecordings] = useState<Record<number, string>>({});
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const speakingRes = await testSpeakingService.getByIdsAndStatus(testSpeakingIds,true);
        const testList: TestSpeaking[] = speakingRes.data || [];

        const testMap: Record<number, TestSpeaking> = {};
        const allQuestions: any[] = [];

        for (const test of testList) {
          testMap[test.id] = test;
          if (test.questions?.length) {
            const qRes = await questionService.getByIdsAndStatus(test.questions,true);
            const questionData = qRes.data || [];

            questionData.forEach((q: any, idx: number) => {
              allQuestions.push({
                ...q,
                parentTestId: test.id,
                serialNumber: allQuestions.length + 1,
                indexInParent: idx + 1,
                totalInParent: test.questions.length
              });
            });
          }
        }

        const recordingRes = await submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(
          submitTestId,
          allQuestions.map(q => q.id)
        );
        const recordingMap: Record<number, string> = {};
        (recordingRes.data || []).forEach((r: any) => {
          const index = allQuestions.findIndex(q => q.id === r.question_id);
          if (index !== -1) {
            recordingMap[index] = r.file;
          }
        });

        setSpeakingTests(testMap);
        setQuestions(allQuestions);
        setRecordings(recordingMap);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [testSpeakingIds, submitTestId]);

  return {
    loading,
    error,
    questions,
    recordings,
    speakingTests,
    questionRefs
  };
}
