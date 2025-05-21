import { useState, useEffect, useRef, useCallback } from "react";
import { testWritingService, submitTestWritingService, scoreWritingService,submitTestService,commentTestService } from "services";
import { TestWriting, SubmitTestWriting } from "interfaces";
import {completeRouteNode} from "utils/updateProcess";
import { RouteNodeEnum } from "interfaces";
interface QuestionItem {
  id: number;
  serialNumber: number;
  isAnswered: boolean;
  topic?: string;
  minWords?: number;
  maxWords?: number;
}

const useWritingTest = (testWritingIds: number[], submitTestId: number,routeNodeId: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [essays, setEssays] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [essayIds, setEssayIds] = useState<Record<number, number>>({});
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);
        const writingItemsResponse = await testWritingService.getByIdsAndStatus(testWritingIds,true);
        const writingItems = writingItemsResponse.data || [];
        const promptsMap: Record<number, TestWriting> = {};
        writingItems.forEach((item: TestWriting) => promptsMap[item.id] = item);
        let currentSerial = 1;
        const tempAllQuestions: QuestionItem[] = [];
        const fetchedWritings: any[] = [];

        for (const writing of writingItems) {
          tempAllQuestions.push({
            id: writing.id,
            serialNumber: currentSerial,
            isAnswered: false,
            topic: writing.topic,
            minWords: writing.minWords || 200,
            maxWords: writing.maxWords || 500
          });

          fetchedWritings.push({
            id: writing.id,
            topic: writing.topic,
            minWords: writing.minWords || 200,
            maxWords: writing.maxWords || 500,
            startSerial: currentSerial,
            endSerial: currentSerial,
          });

          currentSerial++;
        }

        const writingIds = tempAllQuestions.map(q => q.id);
        const existingEssays = await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(submitTestId, writingIds);
        if (existingEssays?.data) {
          const savedEssays: Record<number, string> = {};
          const savedEssayIds: Record<number, number> = {};

          existingEssays.data.forEach((essay: any) => {
            const writingIndex = tempAllQuestions.findIndex(item => item.id === essay.testWriting_id);
            if (writingIndex !== -1) {
              savedEssays[writingIndex] = essay.content || '';
              savedEssayIds[writingIndex] = essay.id;
              if (essay.content && essay.content.trim() !== '') {
                tempAllQuestions[writingIndex].isAnswered = true;
              }
            }
          });

          setEssays(savedEssays);
          setEssayIds(savedEssayIds);
        }

        setQuestionsList(fetchedWritings);
        setAllQuestions(tempAllQuestions);
      } catch (error) {
        console.error("Error fetching writing test data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (testWritingIds && testWritingIds.length > 0) {
      fetchQuestions();
    } else {
      setLoading(false);
      setError(true);
    }
  }, [testWritingIds, submitTestId]);


  const debouncedSaveEssay = useCallback(async (index: number, content: string) => {
    if (!allQuestions[index]) return;
    const writingId = allQuestions[index].id;
    setSaving(true);
    try {
      if (essayIds[index]) {
        await submitTestWritingService.patch(essayIds[index], { content });
      } else {
        const newEssay = await submitTestWritingService.create({
          id: Date.now(),
          submitTest_id: submitTestId,
          testWriting_id: writingId,
          content,
          comment: "not submitted",
          score: 0,
          status: true
        });
        setEssayIds(prev => ({ ...prev, [index]: newEssay.id }));
      }
      handleUpdateAnsweredQuestions(writingId, !!content.trim());
    } catch (error) {
      console.error("Error saving essay:", error);
    } finally {
      setSaving(false);
    }
  }, [allQuestions, essayIds, submitTestId]);

  const handleEssayChange = (content: string) => {
    setEssays({ ...essays, [currentIndex]: content });
    debouncedSaveEssay(currentIndex, content);
  };

  const handleUpdateAnsweredQuestions = (questionId: number, isAnswered: boolean) => {
    setAllQuestions(prev => prev.map(q => q.id === questionId ? { ...q, isAnswered } : q));
  };

  const handleSubmitTest = useCallback(async () => {
    if (!submitTestId) return;
    
    try {
      setIsSubmitting(true);
      setIsConfirmDialogOpen(false);
      setIsSubmitDialogOpen(true);
      
      const totalQuestions = allQuestions.length;
      const testWritingRes = await testWritingService.getByIdsAndStatus(testWritingIds, true);
      const testWritings = testWritingRes.data || [];
      
      const writingRes = await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(
        submitTestId, 
        testWritingIds
      );
      
      if (!writingRes?.data?.length) {
        const result = {
          totalQuestions,
          correctAnswers: 0,
          score: 0
        };
        
        setSubmissionResult(result);
        
        if (submitTestId) {
          await submitTestService.patch(submitTestId, {
            score: 0,
            status: true
          });
        }
        
        return;
      }
      

      const writingCount = testWritings.length;
      
  
      const maxScorePerWriting = writingCount > 0 ? 100 / writingCount : 0;
      
      let totalScore = 0;
      let answeredQuestions = 0;
      
      const commentRequestData: any = {
        vocabulary: [],
        grammar: [],
        reading: [],
        listening: [],
        speaking: [],
        writing: []
      };
      

      for (const answer of writingRes.data as SubmitTestWriting[]) {
        if (answer.content && answer.content.trim()) {
          const testWriting = testWritings.find((tw: TestWriting) => tw.id === answer.testWriting_id);
          
          if (testWriting?.topic) {
   
            commentRequestData.writing.push({
              topic: testWriting.topic,
              userAnswer: answer.content
            });

            const scoreResult = await scoreWritingService.scoreWriting(answer.content, testWriting.topic);
            
            if (scoreResult.data) {

              const rawScore = parseFloat(scoreResult.data.score);
       
              const actualScore = (rawScore / 100) * maxScorePerWriting;
    
              await submitTestWritingService.update(answer.id, {
                ...answer,
                score: actualScore, 
                comment: scoreResult.data.feedback || ""
              });
              
              totalScore += actualScore;
              answeredQuestions++;
            }
          }
        }
      }
      

      const commentResponse = await commentTestService.commentTest(commentRequestData);
      

      const result = {
        totalQuestions,
        correctAnswers: answeredQuestions,
        score: totalScore,
        comment: commentResponse.data.feedback,
        strengths: commentResponse.data.strengths,
        areasToImprove: commentResponse.data.areasToImprove
      };
      

      if (submitTestId) {
        await submitTestService.patch(submitTestId, {
          score: totalScore,
          comment: commentResponse.data.feedback,
          status: true
        });
      }
      await completeRouteNode(routeNodeId, submitTestId,RouteNodeEnum.WRITING_TEST );
      setSubmissionResult(result);
      
    } catch (error) {
      console.error("Error submitting writing test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [submitTestId, testWritingIds, allQuestions]);

  return {
    currentIndex,
    questionsList,
    loading,
    error,
    allQuestions,
    isSubmitting,
    isSubmitDialogOpen,
    isConfirmDialogOpen,
    submissionResult,
    setCurrentIndex,
    handleNext: () => setCurrentIndex(prev => Math.min(prev + 1, questionsList.length - 1)),
    handlePrevious: () => setCurrentIndex(prev => Math.max(prev - 1, 0)),
    handleUpdateAnsweredQuestions,
    setQuestionRef: (id: number, element: HTMLDivElement | null) => questionRefs.current[id] = element,
    questionRefs,
    handleOpenConfirmDialog: () => setIsConfirmDialogOpen(true),
    handleCloseConfirmDialog: () => setIsConfirmDialogOpen(false),
    handleSubmitTest,
    closeSubmitDialog: () => setIsSubmitDialogOpen(false),
    essays,
    handleEssayChange,
    saving,
    getWordCount: (text: string) => text.trim().split(/\s+/).filter(Boolean).length,
    getCurrentEssay: () => essays[currentIndex] || '',
    getCurrentPrompt: () => allQuestions[currentIndex] || null
  };
};

export default useWritingTest;