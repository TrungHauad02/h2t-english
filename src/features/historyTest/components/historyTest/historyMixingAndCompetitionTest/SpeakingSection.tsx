import { useEffect, useState } from "react";
import { testSpeakingService, questionService } from "services/test";
import { submitTestSpeakingService, submitCompetitionSpeakingService } from "services";
import { TestSpeaking } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import {
  Box,
  Paper,
  Container,
  LinearProgress,
  Typography,
  Chip
} from "@mui/material";
import {
  QuestionCard,
  RecordingControl,
  NavigationFooter,
  LoadingState,
  EmptyState,
  TestSpeakingHeader
} from "./historySpeakingSection";

interface SpeakingSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
  isCompetitionTest?: boolean;
}

export default function SpeakingSection({
  partId,
  testItemIds,
  submitTestId,
  selectedQuestionId,
  startSerial,
  isCompetitionTest = false,
}: SpeakingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [speakingQuestions, setSpeakingQuestions] = useState<any[]>([]);
  const [speakingTests, setSpeakingTests] = useState<Record<number, TestSpeaking>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [audioURLs, setAudioURLs] = useState<Record<number, string>>({});
  const [currentTestId, setCurrentTestId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSpeakingItems() {
      try {
        setLoading(true);
        const speakingItemsResponse = await testSpeakingService.getByIds(testItemIds);
        const items: TestSpeaking[] = speakingItemsResponse.data || [];

        const testMap: Record<number, TestSpeaking> = {};
        items.forEach(item => testMap[item.id] = item);
        setSpeakingTests(testMap);

        const allQuestionsFlat: any[] = [];

        await Promise.all(
          items.map(async (item) => {
            if (item.questions?.length) {
              const res = await questionService.getByIds(item.questions);
              const questionsWithMeta = res.data.map((q: any, i: number) => ({
                ...q,
                parentTestId: item.id,
                parentTitle: item.title || 'Speaking',
                serial: i + 1,
                totalInParent: res.data.length
              }));
              allQuestionsFlat.push(...questionsWithMeta);
            }
          })
        );

        setSpeakingQuestions(allQuestionsFlat);

        const response = isCompetitionTest
          ? await submitCompetitionSpeakingService.findBySubmitCompetitionIdAndQuestionIds(submitTestId, allQuestionsFlat.map(q => q.id))
          : await submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(submitTestId, allQuestionsFlat.map(q => q.id));

        const urlMap: Record<number, string> = {};
        if (response.data) {
          response.data.forEach((r: any) => {
            const idx = allQuestionsFlat.findIndex(q => q.id === r.question_id);
            if (idx !== -1) {
              urlMap[idx] = r.file;
            }
          });
        }

        setAudioURLs(urlMap);

        let initialIndex = 0;
        if (selectedQuestionId) {
          const selectedIndex = allQuestionsFlat.findIndex(q => q.id === selectedQuestionId);
          if (selectedIndex !== -1) initialIndex = selectedIndex;
        }

        setCurrentIndex(initialIndex);
        setCurrentTestId(allQuestionsFlat[initialIndex]?.parentTestId || null);
      } catch (error) {
        console.error("Error fetching history speaking items:", error);
      } finally {
        setLoading(false);
      }
    }

    if (testItemIds.length > 0) fetchSpeakingItems();
  }, [testItemIds, submitTestId, selectedQuestionId, isCompetitionTest]);

  if (loading) return <LoadingState />;
  if (speakingQuestions.length === 0) return <EmptyState />;

  const currentQuestion = speakingQuestions[currentIndex];
  const audioSource = audioURLs[currentIndex] || null;
  const currentTest = currentTestId ? speakingTests[currentTestId] : null;
  const questionCount = speakingQuestions.filter(q => q.parentTestId === currentQuestion.parentTestId).length;
  const questionIndex = speakingQuestions.filter(q => q.parentTestId === currentQuestion.parentTestId && speakingQuestions.indexOf(q) <= currentIndex).length;
  const progress = ((currentIndex + 1) / speakingQuestions.length) * 100;

  const handleNext = () => {
    if (currentIndex < speakingQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentTestId(speakingQuestions[currentIndex + 1].parentTestId);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentTestId(speakingQuestions[currentIndex - 1].parentTestId);
    }
  };

  return (
    <Box component={Paper} elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', bgcolor: isDarkMode ? color.gray800 : color.white }}>
      <LinearProgress variant="determinate" value={progress} sx={{ height: 6, bgcolor: isDarkMode ? color.gray700 : color.gray100 }} />

      {currentTest && (
        <TestSpeakingHeader
          test={currentTest}
          currentQuestionNumber={questionIndex}
          totalQuestions={questionCount}
        />
      )}

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Question {startSerial + currentIndex}
        </Typography>

        <QuestionCard
          content={currentQuestion?.content}
          isDarkMode={isDarkMode}
        />

        <RecordingControl
          isRecording={false}
          startRecording={() => {}}
          stopRecording={() => {}}
          recordingTime={0}
          formatTime={() => '00:00'}
          saving={false}
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
