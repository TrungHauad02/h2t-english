import { useState, useRef, useEffect } from "react";
import { testSpeakingService, questionService } from "services/test";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { TestSpeaking } from "interfaces";
import { submitTestSpeakingService, submitCompetitionSpeakingService } from "services";
import { 
  Box, 
  Paper,
  Container,
  LinearProgress,
  Typography,
  Chip,
} from "@mui/material";
import { 
  QuestionCard, 
  RecordingControl, 
  NavigationFooter, 
  LoadingState,
  EmptyState,
  TestSpeakingHeader
} from "./speakingSection/";

interface SpeakingSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
  setAnsweredQuestions: (questionId: number, isAnswered: boolean) => void;
  isCompetitionTest?: boolean;
}

export default function SpeakingSection({ 
  partId, 
  testItemIds, 
  submitTestId,
  selectedQuestionId,
  startSerial,
  setAnsweredQuestions,
  isCompetitionTest = false
}: SpeakingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [speakingQuestions, setSpeakingQuestions] = useState<any[]>([]);
  const [speakingTests, setSpeakingTests] = useState<Record<number, TestSpeaking>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURLs, setAudioURLs] = useState<Record<number, string>>({});
  const [savedRecordings, setSavedRecordings] = useState<Record<number, string>>({});
  const [submissionIds, setSubmissionIds] = useState<Record<number, number>>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [currentTestId, setCurrentTestId] = useState<number | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [recordingTime, setRecordingTime] = useState<number>(0);

  useEffect(() => {
    async function fetchSpeakingItems() {
      try {
        setLoading(true);
        
        const speakingItemsResponse = await testSpeakingService.getByIds(testItemIds);
        const items: TestSpeaking[] = speakingItemsResponse.data || [];
        
        const testMap: Record<number, TestSpeaking> = {};
        items.forEach(item => {
          testMap[item.id] = item;
        });
        setSpeakingTests(testMap);
        
        const questionsMap: Record<number, any[]> = {};
        const allQuestionsFlat: any[] = [];
        
        await Promise.all(
          items.map(async (item: TestSpeaking) => {
            if (item.questions && item.questions.length > 0) {
              const questionsResponse = await questionService.getByIds(item.questions);
              const questions = questionsResponse.data || [];
              
              const questionsWithParent = questions.map((q: any, qIndex: number) => ({
                ...q,
                parentTestId: item.id,
                parentTitle: item.title || 'Speaking Practice',
                serial: qIndex + 1,
                totalInParent: questions.length
              }));
              
              questionsMap[item.id] = questionsWithParent;
              allQuestionsFlat.push(...questionsWithParent);
            }
          })
        );
        
        setSpeakingQuestions(allQuestionsFlat);
        
        if (allQuestionsFlat.length > 0) {
          const questionIds = allQuestionsFlat.map(q => q.id);
          
          try {
            const response = isCompetitionTest
              ? await submitCompetitionSpeakingService.findBySubmitCompetitionIdAndQuestionIds(submitTestId, questionIds)
              : await submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(submitTestId, questionIds);
       
            const recordingsMap: Record<number, string> = {};
            const submissionIdsMap: Record<number, number> = {};
            const audioUrlsMap: Record<number, string> = {};
            
            if (response.data) {
              response.data.forEach((recording: any) => {
                const questionIndex = allQuestionsFlat.findIndex((q: any) => q.id === recording.question_id);
                if (questionIndex !== -1) {
                  if (recording.file) {
                    recordingsMap[questionIndex] = recording.file;
                    audioUrlsMap[questionIndex] = recording.file;
                    
                    setAnsweredQuestions(recording.question_id, true);
                  }
                  submissionIdsMap[questionIndex] = recording.id;
                }
              });
            }
            
            setSavedRecordings(recordingsMap);
            setSubmissionIds(submissionIdsMap);
            setAudioURLs(audioUrlsMap);
          } catch (error) {
            console.error("Error fetching existing recordings:", error);
          }
          
          let initialIndex = 0;
          if (selectedQuestionId) {
            const selectedIndex = allQuestionsFlat.findIndex((q: any) => q.id === selectedQuestionId);
            if (selectedIndex !== -1) {
              initialIndex = selectedIndex;
            }
          }
          
          setCurrentIndex(initialIndex);
          if (allQuestionsFlat[initialIndex]) {
            setCurrentTestId(allQuestionsFlat[initialIndex].parentTestId);
          }
        }
      } catch (error) {
        console.error("Error fetching speaking items:", error);
      } finally {
        setLoading(false);
      }
    }

    if (testItemIds && testItemIds.length > 0) {
      fetchSpeakingItems();
    }

    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [testItemIds, submitTestId, startSerial, selectedQuestionId, setAnsweredQuestions, isCompetitionTest]);

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
    if (!speakingQuestions[currentIndex]) return;
    
    const questionId = speakingQuestions[currentIndex].id;
    setSaving(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
    
      reader.onloadend = async () => {
        const base64data = reader.result as string;
    
        if (isCompetitionTest) {
          const existingRes = await submitCompetitionSpeakingService.findBySubmitCompetitionIdAndQuestionId(
            submitTestId,
            questionId
          );
      
          if (existingRes?.data?.length > 0) {
            const existing = existingRes.data[0];
        
            await submitCompetitionSpeakingService.update(existing.id, {
              ...existing,
              file: base64data
            });
        
            setSubmissionIds((prev) => ({
              ...prev,
              [currentIndex]: existing.id
            }));
          } else {
            const newSubmission = await submitCompetitionSpeakingService.create({
              id: Date.now(),
              submitCompetition_id: submitTestId,
              question_id: questionId,
              file: base64data,
              transcript: 'not submitted',
              score: 0,
              status: true,
            });
        
            setSubmissionIds((prev) => ({
              ...prev,
              [currentIndex]: newSubmission.id
            }));
          }
        } else {
          const existingRes = await submitTestSpeakingService.findBySubmitTestIdAndQuestionId(
            submitTestId,
            questionId
          );
      
          if (existingRes?.data?.length > 0) {
            const existing = existingRes.data[0];
        
            await submitTestSpeakingService.update(existing.id, {
              ...existing,
              file: base64data
            });
        
            setSubmissionIds((prev) => ({
              ...prev,
              [currentIndex]: existing.id
            }));
          } else {
            const newSubmission = await submitTestSpeakingService.create({
              id: Date.now(),
              submitTest_id: submitTestId,
              question_id: questionId,
              file: base64data,
              transcript: 'not submitted',
              score: 0,
              comment: 'not submitted',
              status: true,
            });
        
            setSubmissionIds((prev) => ({
              ...prev,
              [currentIndex]: newSubmission.id
            }));
          }
        }

        setSavedRecordings((prev) => ({
          ...prev,
          [currentIndex]: base64data
        }));
    
        setAnsweredQuestions(questionId, true);
        setSaving(false);
      };
    } catch (error) {
      console.error("Error saving recording:", error);
      setSaving(false);
    }    
  };

  const handleNext = () => {
    if (currentIndex < speakingQuestions.length - 1) {
      if (isRecording) {
        stopRecording();
      }
      setCurrentIndex(currentIndex + 1);
      setCurrentTestId(speakingQuestions[currentIndex + 1].parentTestId);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      if (isRecording) {
        stopRecording();
      }
      setCurrentIndex(currentIndex - 1);
      setCurrentTestId(speakingQuestions[currentIndex - 1].parentTestId);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const hasRecording = (index: number) => {
    return Boolean(savedRecordings[index] || audioURLs[index]);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (speakingQuestions.length === 0) {
    return <EmptyState />;
  }

  const currentQuestion = speakingQuestions[currentIndex];
  const audioSource = audioURLs[currentIndex] || savedRecordings[currentIndex] || null;
  const questionCount = speakingQuestions.filter(q => q.parentTestId === currentQuestion.parentTestId).length;
  const questionIndex = speakingQuestions.filter(q => 
    q.parentTestId === currentQuestion.parentTestId && 
    speakingQuestions.indexOf(q) <= currentIndex
  ).length;
  const progress = ((currentIndex + 1) / speakingQuestions.length) * 100;
  

  const currentTest = currentTestId ? speakingTests[currentTestId] : null;
  
  return (
    <Box
      component={Paper} 
      elevation={3} 
      sx={{
        bgcolor: isDarkMode ? color.gray800 : color.white,
        borderRadius: '16px',
        overflow: 'hidden',
        mx: 'auto',
        position: 'relative',
        border: isDarkMode ? `1px solid ${color.gray700}` : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{
          height: 6,
          bgcolor: isDarkMode ? color.gray700 : color.gray100,
          '& .MuiLinearProgress-bar': {
            bgcolor: color.teal500,
            transition: 'transform 0.4s ease',
          }
        }} 
      />
      
      {currentTest && (
        <TestSpeakingHeader 
          test={currentTest}
          currentQuestionNumber={questionIndex}
          totalQuestions={questionCount}
        />
      )}
      
      <Box
        sx={{
          py: 1.5,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
          backgroundColor: isDarkMode ? color.gray700 : color.gray100,
          borderBottom: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: isDarkMode ? color.gray300 : color.gray700,
            }}
          >
            Question {startSerial + currentIndex}
          </Typography>
          
          <Chip
            label={hasRecording(currentIndex) ? "Recorded" : "Not recorded"}
            size="small"
            sx={{
              bgcolor: hasRecording(currentIndex) 
                ? (isDarkMode ? color.green800 : color.green100)
                : (isDarkMode ? color.gray600 : color.gray200),
              color: hasRecording(currentIndex)
                ? (isDarkMode ? color.green200 : color.green800)
                : (isDarkMode ? color.gray300 : color.gray700),
              borderRadius: '12px',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </Box>
      </Box>
      
      <Container 
        maxWidth="md" 
        sx={{ 
          py: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <QuestionCard 
          content={currentQuestion?.content} 
          isDarkMode={isDarkMode} 
        />
        
        <RecordingControl
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          recordingTime={recordingTime}
          formatTime={formatTime}
          saving={saving}
          audioSource={audioSource}
          isDarkMode={isDarkMode}
        />
      </Container>

      <NavigationFooter
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        currentIndex={currentIndex}
        totalQuestions={speakingQuestions.length}
        isDarkMode={isDarkMode}
      />
    </Box>
  );
}