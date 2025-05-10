import { useState, useEffect, useRef, useCallback } from "react";
import { testListeningService, questionService, submitTestAnswerService,commentTestService,submitTestService } from "services";

interface QuestionItem {
  id: number;
  serialNumber: number;
  isAnswered: boolean;
}

const useListeningTest = (testListeningIds: number[], submitTestId: number) => {
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
        
        // Fetch listening items first
        const listeningItemsResponse = await testListeningService.getByIdsAndStatus(testListeningIds,true);
        const listeningItems = listeningItemsResponse.data || [];
        
        let currentSerial = 1;
        const tempAllQuestions: QuestionItem[] = [];
        const fetchedListenings = [];
        
        // For each listening item, fetch its questions
        for (const listening of listeningItems) {
          if (listening.questions && listening.questions.length > 0) {
            const questionsResponse = await questionService.getByIdsAndStatus(listening.questions,true);
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
            
            fetchedListenings.push({
              id: listening.id,
              audio: listening.audio,
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
        
        setQuestionsList(fetchedListenings);
        setAllQuestions(tempAllQuestions);
      } catch (error) {
        console.error("Error fetching listening test data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (testListeningIds && testListeningIds.length > 0) {
      fetchQuestions();
    } else {
      setLoading(false);
      setError(true);
    }
  }, [testListeningIds, submitTestId]);

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
  
  const handleSubmitTest = useCallback(async () => {
    if (!submitTestId) return;
    
    try {
      setIsSubmitting(true);
      setIsConfirmDialogOpen(false);
      setIsSubmitDialogOpen(true);
      
      const totalQuestions = allQuestions.length;
      let correctAnswers = 0;
      
      if (submitTestId && totalQuestions > 0) {
        const questionIds = allQuestions.map(q => q.id);
        
        const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
          submitTestId,
          questionIds
        );
        
        if (answersRes?.data?.length) {
          const questionRes = await questionService.getByIdsAndStatus(questionIds,true);
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
      
      const commentRequestData: any = {
        vocabulary: [],
        grammar: [],
        reading: [],
        listening: [],
        speaking: [],
        writing: []
      };
      
      if (testListeningIds) {
        const listeningRes = await testListeningService.getByIdsAndStatus(testListeningIds,true);
        const listenings = listeningRes.data || [];
        
        const listeningSectionsPromises = listenings.map(async (listening: any) => {
          if (!listening.questions?.length) return null;
          
          const [questionRes, answersRes] = await Promise.all([
            questionService.getByIdsAndStatus(listening.questions,true),
            submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, listening.questions)
          ]);
          
          const questions = questionRes.data || [];
          const answers = answersRes.data || [];
          
          const answerMap: Record<number, any> = {};
          for (const answer of answers) {
            answerMap[answer.question_id] = answer;
          }
          
          const choiceQuestions = questions.map((question: any) => {
            const answer = answerMap[question.id];
            const selectedAnswer = question.answers.find((a: any) => a.id === answer?.answer_id);
            
            return {
              question: question.content,
              choices: question.answers.map((a: any) => a.content),
              userAnswer: selectedAnswer?.content || ""
            };
          });
          
          return {
            transcript: listening.transcript,
            questions: choiceQuestions
          };
        });
        
        const sections = await Promise.all(listeningSectionsPromises);
        commentRequestData.listening = sections.filter((item) => item !== null);
      }
      
      // Lấy comment
      const commentResponse = await commentTestService.commentTest(commentRequestData);
      
      const result = {
        totalQuestions,
        correctAnswers,
        score,
        answeredQuestions: allQuestions.filter(q => q.isAnswered).length,
        comment: commentResponse.data.feedback,
        strengths: commentResponse.data.strengths,
        areasToImprove: commentResponse.data.areasToImprove
      };
      
      if (submitTestId) {
        await submitTestService.patch(submitTestId, { 
          score: score,
          comment: commentResponse.data.feedback,
          status: true 
        });
      }
      
      setSubmissionResult(result);
      
    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [submitTestId,testListeningIds, allQuestions]);
  
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

export default useListeningTest;