import { useState, useEffect, useRef, useCallback } from "react";
import { testReadingService, questionService, submitTestAnswerService } from "services";

interface QuestionItem {
  id: number;
  serialNumber: number;
  isAnswered: boolean;
}

const useReadingTest = (testReadingIds: number[], submitTestId: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);
  const [timeUsed, setTimeUsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  
  // Refs for scrolling to selected question
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);
        
        // Fetch reading items first
        const readingItemsResponse = await testReadingService.getByIds(testReadingIds);
        const readingItems = readingItemsResponse.data || [];
        
        let currentSerial = 1;
        const tempAllQuestions: QuestionItem[] = [];
        const fetchedReadings = [];
        
        // For each reading item, fetch its questions
        for (const reading of readingItems) {
          if (reading.questions && reading.questions.length > 0) {
            const questionsResponse = await questionService.getByIds(reading.questions);
            const questions = questionsResponse.data || [];
            
            const startSerial = currentSerial;
            
            // Add each question to the allQuestions array
            questions.forEach((question: any) => {
              tempAllQuestions.push({
                id: question.id,
                serialNumber: currentSerial++,
                isAnswered: false
              });
            });
            
            fetchedReadings.push({
              id: reading.id,
              file: reading.file,
              questions,
              startSerial,
              endSerial: currentSerial - 1,
            });
          }
        }
        
        // Check if any questions were already answered
        if (submitTestId && tempAllQuestions.length > 0) {
          const questionIds = tempAllQuestions.map(q => q.id);
          try {
            const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
              submitTestId,
              questionIds
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
          } catch (error) {
            console.error("Error fetching previous answers:", error);
          }
        }
        
        setQuestionsList(fetchedReadings);
        setAllQuestions(tempAllQuestions);
      } catch (error) {
        console.error("Error fetching reading test data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (testReadingIds && testReadingIds.length > 0) {
      fetchQuestions();
    } else {
      setLoading(false);
      setError(true);
    }
  }, [testReadingIds, submitTestId]);

  // Update time counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleUpdateAnsweredQuestions = useCallback((questionId: number, isAnswered: boolean) => {
    setAllQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, isAnswered } 
          : q
      )
    );
  }, []);
  
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
      
      // Thực hiện tính điểm chi tiết
      const totalQuestions = allQuestions.length;
      let correctAnswers = 0;
      
      if (submitTestId && totalQuestions > 0) {
        // Lấy tất cả ID câu hỏi
        const questionIds = allQuestions.map(q => q.id);
        
        // Lấy câu trả lời đã gửi
        const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
          submitTestId,
          questionIds
        );
        
        if (answersRes?.data?.length) {

          const questionRes = await questionService.getByIds(questionIds);
          const questions = questionRes.data || [];

          const questionMap: Record<number, any> = {};
          for (const q of questions) {
            questionMap[q.id] = q;
          }

          for (const answer of answersRes.data) {
            const questionId = answer.question_id;
            const answerId = answer.answer_id;
            
            const question = questionMap[questionId];
            
            if (question && answerId && question.answers) {
              const chosenAnswer = question.answers.find((a: any) => a.id === answerId);
              
              if (chosenAnswer && chosenAnswer.correct) {
                correctAnswers++;
              }
            }
          }
        }
      }
      

      const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
      
      const result = {
        totalQuestions,
        correctAnswers,
        score,
        answeredQuestions: allQuestions.filter(q => q.isAnswered).length
      };
      
      setSubmissionResult(result);
    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const closeSubmitDialog = useCallback(() => {
    setIsSubmitDialogOpen(false);
  }, []);
  
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
    handleNext,
    handlePrevious,
    handleUpdateAnsweredQuestions,
    setQuestionRef,
    questionRefs,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleSubmitTest,
    closeSubmitDialog
  };
};

export default useReadingTest;