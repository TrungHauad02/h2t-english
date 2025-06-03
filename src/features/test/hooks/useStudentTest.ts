import { useState, useEffect, useRef } from "react";
import { testService, testPartService, submitTestService } from "services/test";
import { Test, TestPart, TestTypeEnum, SubmitTest, TestPartTypeEnum } from "interfaces";
import { useParams } from "react-router-dom";
import useAuth from "hooks/useAuth";

export default function useStudentTest() {
  const { id, type } = useParams();
  const testId = Number(id);
  const testType = type?.toUpperCase() as keyof typeof TestTypeEnum;
  
  const userId = Number(useAuth().userId);


  const [test, setTest] = useState<Test | null>(null);
 
  const [testParts, setTestParts] = useState<TestPart[]>([]);
  const [submitTest, setSubmitTest] = useState<SubmitTest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [vocabularyPart, setVocabularyPart] = useState<TestPart | null>(null);
  const [grammarPart, setGrammarPart] = useState<TestPart | null>(null);
  const [readingPart, setReadingPart] = useState<TestPart | null>(null);
  const [listeningPart, setListeningPart] = useState<TestPart | null>(null);
  const [speakingPart, setSpeakingPart] = useState<TestPart | null>(null);
  const [writingPart, setWritingPart] = useState<TestPart | null>(null);


  const hasCreatedSubmitTestRef = useRef(false);

  useEffect(() => {
    const initializeTest = async () => {
      if (testId && !isNaN(testId)) {
        setLoading(true);

        try {
          const testResponse = await testService.findById(testId);
          const testData = testResponse.data;

          if (!testData) {
            setError("Test not found.");
            return;
          }

          setTest(testData);

          if (testData.parts?.length > 0) {
            const partsResponse = await testPartService.getByIds(testData.parts);
            const parts: TestPart[] = partsResponse.data;
            setTestParts(parts);

            setVocabularyPart(parts.find(p => p.type === TestPartTypeEnum.VOCABULARY) || null);
            setGrammarPart(parts.find(p => p.type === TestPartTypeEnum.GRAMMAR) || null);
            setReadingPart(parts.find(p => p.type === TestPartTypeEnum.READING) || null);
            setListeningPart(parts.find(p => p.type === TestPartTypeEnum.LISTENING) || null);
            setSpeakingPart(parts.find(p => p.type === TestPartTypeEnum.SPEAKING) || null);
            setWritingPart(parts.find(p => p.type === TestPartTypeEnum.WRITING) || null);
          }

          try {
            const submitTestData = await submitTestService.findByIdAndUserIdAndStatusFalse(testId, userId);
            setSubmitTest(submitTestData.data);
          } catch {
            if (!hasCreatedSubmitTestRef.current) {
              hasCreatedSubmitTestRef.current = true;
         

              const newSubmitTest: SubmitTest = {
                id: 0,
                user_id: userId,
                test_id: testId,
                score: 0,
                comment: '',
                status: false,
              };

              try {
                const created = await submitTestService.create(newSubmitTest);
                setSubmitTest(created.data);
              } catch (createErr) {
                console.error("Lỗi khi tạo submit test:", createErr);
              }
            }
          }
        } catch {
          setError("Failed to load test data.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Invalid test ID");
        setLoading(false);
      }
    };

    initializeTest();
  }, [testId, testType, userId]);

  const updateSubmitTest = async (data: Partial<SubmitTest>) => {
    if (submitTest && submitTest.id) {
      const updated = await submitTestService.update(submitTest.id, { ...submitTest, ...data });
      setSubmitTest(updated.data);
      return updated;
    }
  };

  const finalizeTest = async (finalScore: number, comment: string = '') => {
    if (submitTest && submitTest.id) {
      const updated = await submitTestService.patch(submitTest.id, {
        ...submitTest,
        score: finalScore,
        comment,
        status: true,
      });
      setSubmitTest(updated.data);
      return updated;
    }
  };

  return {
    test,
    testParts,
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
    submitTest,
    loading,
    error,
    updateSubmitTest,
    finalizeTest
  };
}
