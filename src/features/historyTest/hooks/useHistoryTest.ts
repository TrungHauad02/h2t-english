import { useState, useEffect } from "react";
import { testService, testPartService, submitTestService } from "services/test";
import { useParams } from "react-router-dom";
import { Test, TestPart, SubmitTest, TestPartTypeEnum } from "interfaces";

export default function useHistoryTest() {
  const { id } = useParams();
  const submitId = Number(id);

  const [test, setTest] = useState<Test | null>(null);
  const [testParts, setTestParts] = useState<TestPart[]>([]);
  const [submitTest, setSubmitTest] = useState<SubmitTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [readingPart, setReadingPart] = useState<TestPart | null>(null);
  const [listeningPart, setListeningPart] = useState<TestPart | null>(null);
  const [speakingPart, setSpeakingPart] = useState<TestPart | null>(null);
  const [writingPart, setWritingPart] = useState<TestPart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const submitTestResponse = await submitTestService.findById(submitId);
        const submit = submitTestResponse.data;
        setSubmitTest(submit);

        if (!submit?.test_id) throw new Error("submitTest missing test_id");

        const testResponse = await testService.findById(submit.test_id);
        const testData = testResponse.data;
        setTest(testData);

        if (testData.parts?.length > 0) {
          const partsResponse = await testPartService.getByIds(testData.parts);
          const parts: TestPart[] = partsResponse.data;
          setTestParts(parts);

          setReadingPart(parts.find((p: TestPart) => p.type === TestPartTypeEnum.READING) || null);
          setListeningPart(parts.find((p: TestPart) => p.type === TestPartTypeEnum.LISTENING) || null);
          setSpeakingPart(parts.find((p: TestPart) => p.type === TestPartTypeEnum.SPEAKING) || null);
          setWritingPart(parts.find((p: TestPart) => p.type === TestPartTypeEnum.WRITING) || null);
        }
      } catch (err) {
        setError("Failed to load history test");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(submitId)) {
      fetchData();
    } else {
      setError("Invalid submitTest ID");
      setLoading(false);
    }
  }, [submitId]);

  return {
    test,
    testParts,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
    submitTest,
    loading,
    error
  };
}
