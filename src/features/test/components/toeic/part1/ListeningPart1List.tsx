import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ToeicPart1, AnswerEnum } from "interfaces/TestInterfaces";
import ListeningPart1QuestionItem from "./ListeningPart1QuestionItem";
import { submitToeicPart1Service, toeicPart1Service } from "services";

type Props = {
  questionsPart1: number[];
  startIndex: number;
  onFinish: () => void;
  submitToeicId: number;
  initialIndex?: number;
  volume?: number;
  manualControl?: boolean;
  onIndexChange?: (index: number) => void;
};

const ListeningPart1List: React.FC<Props> = ({
  questionsPart1,
  startIndex,
  onFinish,
  submitToeicId,
  initialIndex = 0,
  volume = 0.5,
  manualControl = false,
  onIndexChange,
}) => {
  const [questions, setQuestions] = useState<ToeicPart1[]>([]);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    if (initialIndex > 0) {
      setShouldAutoPlay(true);
      setHasStartedPlaying(true);
    }
  }, [initialIndex, manualControl]);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      setLoading(true);
      try {
        const questionData = await toeicPart1Service.getByIdsAndStatus(
          questionsPart1,
          true
        );
        setQuestions(questionData.data);

        if (submitToeicId && questionsPart1.length > 0) {
          const existingAnswers =
            await submitToeicPart1Service.findBySubmitToeicIdAndToeicPart1Ids(
              submitToeicId,
              questionsPart1
            );

          const answersMap: Record<number, AnswerEnum> = {};
          if (existingAnswers && existingAnswers.data) {
            existingAnswers.data.forEach((answer: any) => {
              answersMap[answer.toeicPart1Id] = answer.answer;
            });
          }

          setUserAnswers(answersMap);
        }
      } catch (error) {
        console.error("Error fetching questions and answers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAndAnswers();
  }, [questionsPart1, submitToeicId]);

  const handleAnswerChange = async (questionId: number, answer: AnswerEnum) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    try {
      const existingAnswers =
        await submitToeicPart1Service.findBySubmitToeicIdAndToeicPart1Id(
          submitToeicId,
          questionId
        );

      if (
        existingAnswers &&
        existingAnswers.data &&
        existingAnswers.data.length > 0
      ) {
        const existingAnswer = existingAnswers.data[0];
        await submitToeicPart1Service.update(existingAnswer.id, {
          ...existingAnswer,
          answer: answer,
        });
      } else {
        await submitToeicPart1Service.create({
          id: Date.now(),
          submitToeicId: submitToeicId,
          toeicPart1Id: questionId,
          answer: answer,
          status: true,
        });
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };

  const handleAudioEnded = () => {
    // Always auto-advance to next question when audio ends, regardless of manual control
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShouldAutoPlay(true);
    } else {
      onFinish();
    }
  };

  const handleAudioStarted = () => {
    if (!hasStartedPlaying) {
      setHasStartedPlaying(true);
      setShouldAutoPlay(true);
    }
  };

  // Update parent component when index changes
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  if (loading || questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <ListeningPart1QuestionItem
      questionNumber={startIndex + currentIndex}
      imageSrc={currentQuestion?.image}
      audioSrc={currentQuestion?.audio}
      selectedAnswer={userAnswers[currentQuestion?.id]}
      onChange={(val) => handleAnswerChange(currentQuestion?.id, val)}
      onAudioEnded={handleAudioEnded}
      onAudioStarted={handleAudioStarted}
      autoPlay={shouldAutoPlay}
      volume={volume}
    />
  );
};

export default ListeningPart1List;