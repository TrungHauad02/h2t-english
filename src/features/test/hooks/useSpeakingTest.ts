import { useState, useEffect, useRef,useCallback } from "react";
import { testSpeakingService, questionService, submitTestAnswerService, submitTestSpeakingService, scoreSpeakingService,submitTestService,commentTestService } from "services";
import { TestSpeaking, SubmitTestSpeaking, Question } from "interfaces";

interface QuestionItem {
  id: number;
  serialNumber: number;
  isAnswered: boolean;
  content?: string;
  parentTestId?: number;
  parentTitle?: string;
  totalQuestions?: number;
}

const useSpeakingTest = (testSpeakingIds: number[], submitTestId: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [speakingTests, setSpeakingTests] = useState<Record<number, TestSpeaking>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);
  const [timeUsed, setTimeUsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  
  // Recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURLs, setAudioURLs] = useState<Record<number, string>>({});
  const [savedRecordings, setSavedRecordings] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  
  // Refs
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);
        
        // Fetch speaking items first
        const speakingItemsResponse = await testSpeakingService.getByIdsAndStatus(testSpeakingIds,true);
        const speakingItems = speakingItemsResponse.data || [];
        
        // Store tests in a map for easy reference
        const testMap: Record<number, TestSpeaking> = {};
        speakingItems.forEach((item : TestSpeaking) => {
          testMap[item.id] = item;
        });
        setSpeakingTests(testMap);
        
        let currentSerial = 1;
        const tempAllQuestions: QuestionItem[] = [];
        const fetchedSpeakings = [];
        
        // For each speaking item, fetch its questions
        for (const speaking of speakingItems) {
          if (speaking.questions && speaking.questions.length > 0) {
            const questionsResponse = await questionService.getByIdsAndStatus(speaking.questions,true);
            const questions = questionsResponse.data || [];
            
            const startSerial = currentSerial;
            const questionCount = questions.length;
            
            // Add each question to the allQuestions array
            questions.forEach((question: any, qIndex: number) => {
              tempAllQuestions.push({
                id: question.id,
                serialNumber: currentSerial++,
                isAnswered: false,
                content: question.content,
                parentTestId: speaking.id,
                parentTitle: speaking.title || 'Speaking Practice',
                totalQuestions: questionCount
              });
            });
            
            fetchedSpeakings.push({
              id: speaking.id,
              title: speaking.title,
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
            // Check for regular answers
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
            
            // Check for speaking recordings
            const recordingsRes = await submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(
              submitTestId,
              questionIds
            );
            
            if (recordingsRes?.data) {
              const recordingsMap: Record<number, string> = {};
              const submissionIdsMap: Record<number, number> = {};
              
              recordingsRes.data.forEach((recording: any) => {
                const questionIndex = tempAllQuestions.findIndex(q => q.id === recording.question_id);
                if (questionIndex !== -1 && recording.file) {
                  recordingsMap[questionIndex] = recording.file;
                  submissionIdsMap[questionIndex] = recording.id;
                  
                  // Mark as answered
                  tempAllQuestions[questionIndex].isAnswered = true;
                }
              });
              
              setSavedRecordings(recordingsMap);
            }
          } catch (error) {
            console.error("Error fetching previous answers:", error);
          }
        }
        
        setQuestionsList(fetchedSpeakings);
        setAllQuestions(tempAllQuestions);
      } catch (error) {
        console.error("Error fetching speaking test data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (testSpeakingIds && testSpeakingIds.length > 0) {
      fetchQuestions();
    } else {
      setLoading(false);
      setError(true);
    }
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      }
    };
  }, [testSpeakingIds, submitTestId]);

  // Update time counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunks.current = [];
      setRecordingTime(0);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        
        setAudioURLs(prev => ({
          ...prev,
          [currentIndex]: url
        }));
        saveRecording(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const saveRecording = async (audioBlob: Blob) => {
    if (!allQuestions[currentIndex]) return;
    
    const questionId = allQuestions[currentIndex].id;
    setSaving(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
    
      reader.onloadend = async () => {
        const base64data = reader.result as string;
      
        try {
          const existingRes = await submitTestSpeakingService.findBySubmitTestIdAndQuestionId(
            submitTestId,
            questionId
          );
          console.log(existingRes.data);
          if (existingRes?.data?.length > 0) {
            const existing = existingRes.data[0];
        
            await submitTestSpeakingService.update(existing.id, {
              ...existing,
              file: base64data
            });
   
            
          } else {
            await submitTestSpeakingService.create({
              id: Date.now(),
              submitTest_id: submitTestId,
              question_id: questionId,
              file: base64data,
              transcript: 'not submitted',
              score: 0,
              comment: 'not submitted',
              status: true,
            });
      
          }
      
          setSavedRecordings((prev) => ({
            ...prev,
            [currentIndex]: base64data
          }));
      
          handleUpdateAnsweredQuestions(questionId, true);
        } catch (error) {
          console.error("Error saving recording to server:", error);
        }
        
        setSaving(false);
      };
    } catch (error) {
      console.error("Error processing recording:", error);
      setSaving(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const hasRecording = (index: number): boolean => {
    return Boolean(savedRecordings[index] || audioURLs[index]);
  };

  // Navigation functions
  const handleNext = () => {
    if (currentIndex < allQuestions.length - 1) {
      if (isRecording) {
        stopRecording();
      }
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      if (isRecording) {
        stopRecording();
      }
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
  
  const convertUrlToFile = async (url: string, fileName: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
  
    const fileType = blob.type || "audio/mp3"; 
    const file = new File([blob], fileName, { type: fileType });
  
    return file;
  };
  
  const handleSubmitTest = useCallback(async () => {
    if (!submitTestId) return;
    
    try {
      setIsSubmitting(true);
      setIsConfirmDialogOpen(false);
      setIsSubmitDialogOpen(true);
      
      const totalQuestions = allQuestions.length;
      const speakingRes = await testSpeakingService.getByIdsAndStatus(testSpeakingIds,true);
      const speakingItems = speakingRes.data || [];
      
      const allQuestionIds: number[] = [];
      for (const item of speakingItems) {
        if (item.questions) allQuestionIds.push(...item.questions);
      }
      
      const speakingAnswersRes = await submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(
        submitTestId,
        allQuestionIds
      );
      
      if (!speakingAnswersRes?.data?.length) {
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
      
      const questionRes = await questionService.getByIdsAndStatus(allQuestionIds,true);
      const questions = questionRes.data || [];
      
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
      
      for (const answer of speakingAnswersRes.data as SubmitTestSpeaking[]) {
        if (answer.file) {
          const matchedQuestion = questions.find(
            (q: Question) => q.id === answer.question_id
          );
          const expectedText = matchedQuestion?.content || "";
          
          try {
            const file = await convertUrlToFile(answer.file, `recording_${answer.id}.mp3`);
            const scoreResult = await scoreSpeakingService.evaluateSpeechInTopic(file, expectedText);
            
            if (scoreResult.data) {
              const numericScore = parseFloat(scoreResult.data.score);
              
              await submitTestSpeakingService.update(answer.id, {
                ...answer,
                score: numericScore,
                transcript: scoreResult.data.transcript,
                comment: scoreResult.data.feedback
              });
              
              totalScore += numericScore;
              answeredQuestions++;
         
              commentRequestData.speaking.push({
                question: expectedText,
                transcript: scoreResult.data.transcript || ""
              });
            }
          } catch (error) {
            console.error("Error evaluating speaking:", error);
          }
        }
      }
 
      const avgScore = answeredQuestions > 0 ? totalScore / answeredQuestions : 0;
      
    
      const commentResponse = await commentTestService.commentTest(commentRequestData);
      
      const result = {
        totalQuestions,
        correctAnswers: answeredQuestions,
        score: avgScore,
        comment: commentResponse.data.feedback,
        strengths: commentResponse.data.strengths,
        areasToImprove: commentResponse.data.areasToImprove
      };
      

      if (submitTestId) {
        await submitTestService.patch(submitTestId, { 
          score: avgScore,
          comment: commentResponse.data.feedback,
          status: true 
        });
      }
      
      setSubmissionResult(result);
      
    } catch (error) {
      console.error("Error submitting speaking test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [submitTestId, testSpeakingIds, allQuestions]);
  
  const closeSubmitDialog = () => {
    setIsSubmitDialogOpen(false);
  };
  
  // Get current question
  const getCurrentQuestion = () => {
    return allQuestions[currentIndex] || null;
  };
  
  // Get current test
  const getCurrentTest = () => {
    const question = getCurrentQuestion();
    if (!question || !question.parentTestId) return null;
    
    return speakingTests[question.parentTestId] || null;
  };

  // Function to find the index of a question by its ID
  const findQuestionIndexById = (questionId: number): number => {
    return allQuestions.findIndex(q => q.id === questionId);
  };
  
  return {
    currentIndex,
    questionsList,
    speakingTests,
    loading,
    setCurrentIndex,
    error,
    allQuestions,
    timeUsed,
    isSubmitting,
    isSubmitDialogOpen,
    isConfirmDialogOpen,
    submissionResult,
    
    // Question navigation
    handleNext,
    handlePrevious,
    handleUpdateAnsweredQuestions,
    setQuestionRef,
    questionRefs,
    findQuestionIndexById, // Add the new function
    
    // Dialog control
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleSubmitTest,
    closeSubmitDialog,
    
    // Recording functions
    isRecording,
    startRecording,
    stopRecording,
    recordingTime,
    formatTime,   
    saving,
    audioURLs,
    savedRecordings,
    hasRecording,
    
    // Current data
    getCurrentQuestion,
    getCurrentTest
  };
};

export default useSpeakingTest;