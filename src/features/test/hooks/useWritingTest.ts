import { useState, useEffect, useRef, useCallback } from "react";
import { testWritingService, submitTestAnswerService, submitTestWritingService } from "services";
import { TestWriting } from "interfaces";

interface QuestionItem {
  id: number;
  serialNumber: number;
  isAnswered: boolean;
  topic?: string;
  minWords?: number;
  maxWords?: number;
}

const useWritingTest = (testWritingIds: number[], submitTestId: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [writingPrompts, setWritingPrompts] = useState<Record<number, TestWriting>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);
  const [timeUsed, setTimeUsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  
  // Writing states
  const [essays, setEssays] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [essayIds, setEssayIds] = useState<Record<number, number>>({});
  
  // Refs for scrolling to selected question
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);
        
        // Fetch writing items first
        const writingItemsResponse = await testWritingService.getByIds(testWritingIds);
        const writingItems = writingItemsResponse.data || [];
        
        // Store writing prompts in a map for easy reference
        const promptsMap: Record<number, TestWriting> = {};
        writingItems.forEach((item : TestWriting) => {
          promptsMap[item.id] = item;
        });
        setWritingPrompts(promptsMap);
        
        let currentSerial = 1;
        const tempAllQuestions: QuestionItem[] = [];
         const fetchedWritings: any[] = [];

        
        // Process each writing prompt
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
        
        // Load saved essays
        if (submitTestId && tempAllQuestions.length > 0) {
          const writingIds = tempAllQuestions.map(q => q.id);
          try {
            // Check for regular answers
            const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
              submitTestId,
              writingIds
            );
            
            if (answersRes?.data) {
              const answeredMap: Record<number, boolean> = {};
              answersRes.data.forEach((answer: any) => {
                answeredMap[answer.question_id] = true;
              });
              
              // Update the isAnswered flag
              tempAllQuestions.forEach(q => {
                if (answeredMap[q.id]) {
                  q.isAnswered = true;
                }
              });
            }
            
            // Load existing essay content
            const existingEssays = await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(
              submitTestId, 
              writingIds
            );
            
            if (existingEssays?.data) {
              const savedEssays: Record<number, string> = {};
              const savedEssayIds: Record<number, number> = {};
              
              existingEssays.data.forEach((essay: any) => {
                const writingIndex = fetchedWritings.findIndex(item => item.id === essay.testWriting_id);
                if (writingIndex !== -1) {
                  savedEssays[writingIndex] = essay.content || '';
                  savedEssayIds[writingIndex] = essay.id;
                  
                  // Mark as answered if content exists
                  if (essay.content && essay.content.trim() !== '') {
                    tempAllQuestions[writingIndex].isAnswered = true;
                  }
                }
              });
              
              setEssays(savedEssays);
              setEssayIds(savedEssayIds);
            }
          } catch (error) {
            console.error("Error fetching previous essays:", error);
          }
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

  // Update time counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Save essay with debounce
  const debouncedSaveEssay = useCallback(
    async (index: number, content: string) => {
      if (!allQuestions[index]) return;

      const writingId = allQuestions[index].id;
      
      setSaving(true);
      try {
        if (essayIds[index]) {
          await submitTestWritingService.patch(essayIds[index], {
            content: content
          });
        } else {
          const newEssay = await submitTestWritingService.create({
            id: Date.now(),
            submitTest_id: submitTestId,
            testWriting_id: writingId,
            content: content,
            comment: "not submitted",
            score: 0,
            status: true
          });
          
          setEssayIds(prev => ({
            ...prev,
            [index]: newEssay.id
          }));
        }
        
        // Mark question as answered if content exists
        if (content && content.trim() !== '') {
          handleUpdateAnsweredQuestions(writingId, true);
        } else {
          handleUpdateAnsweredQuestions(writingId, false);
        }
      } catch (error) {
        console.error("Error saving essay:", error);
      } finally {
        setSaving(false);
      }
    },
    [allQuestions, essayIds, submitTestId]
  );

  // Handle essay change
  const handleEssayChange = (content: string) => {
    setEssays({
      ...essays,
      [currentIndex]: content
    });
    
    debouncedSaveEssay(currentIndex, content);
  };

  // Word count helper
  const getWordCount = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word !== '').length;
  };

  const getCurrentEssay = (): string => {
    return essays[currentIndex] || '';
  };

  // Navigation functions
  const handleNext = () => {
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleUpdateAnsweredQuestions = (questionId: number, isAnswered: boolean) => {
    setAllQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, isAnswered } 
          : q
      )
    );
  };
  
  const setQuestionRef = (id: number, element: HTMLDivElement | null) => {
    questionRefs.current[id] = element;
  };
  
  const handleOpenConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };
  
  const handleSubmitTest = async () => {
    try {
      setIsSubmitting(true);
      setIsConfirmDialogOpen(false);
      setIsSubmitDialogOpen(true);
      
      // Calculate results - simplified
      const totalQuestions = allQuestions.length;
      const answeredCount = allQuestions.filter(q => q.isAnswered).length;
      const correctAnswers = Math.floor(answeredCount * 0.7); // Simplified scoring
      const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
      
      // Prepare result
      const result = {
        totalQuestions,
        correctAnswers,
        score,
        answeredQuestions: answeredCount
      };
      
      setSubmissionResult(result);
    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const closeSubmitDialog = () => {
    setIsSubmitDialogOpen(false);
  };
  
  // Get current prompt
  const getCurrentPrompt = () => {
    return allQuestions[currentIndex] || null;
  };
  
  return {
    currentIndex,
    questionsList,
    loading,
    error,
    allQuestions,
    timeUsed,
    isSubmitting,
    isSubmitDialogOpen,
    isConfirmDialogOpen,
    submissionResult,
    setCurrentIndex,
    // Question navigation
    handleNext,
    handlePrevious,
    handleUpdateAnsweredQuestions,
    setQuestionRef,
    questionRefs,
    
    // Dialog control
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleSubmitTest,
    closeSubmitDialog,
    
    // Writing functions
    essays,
    handleEssayChange,
    saving,
    getWordCount,
    getCurrentEssay,
    getCurrentPrompt
  };
};

export default useWritingTest;