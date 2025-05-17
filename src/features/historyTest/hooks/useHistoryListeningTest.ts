import { useEffect, useState, useRef, useCallback } from "react";
import {
  testListeningService,
  questionService,
  submitTestAnswerService
} from "services";
import { Question, TestPartTypeEnum } from "interfaces";

interface UseHistoryListeningTestProps {
  testListeningIds: number[];
  submitTestId: number;
}

export interface QuestionItemWithMeta extends Question {
  serial: number;
  selectedAnswerId?: number;
  isCorrect: boolean;
}

export interface ListeningItem {
  id: number;
  audio: string;
  transcript?: string;
  questions: QuestionItemWithMeta[];
  startSerial: number;
  endSerial: number;
}

export default function useHistoryListeningTest({
  testListeningIds,
  submitTestId
}: UseHistoryListeningTestProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [listeningItems, setListeningItems] = useState<ListeningItem[]>([]);
  const [allQuestions, setAllQuestions] = useState<QuestionItemWithMeta[]>([]);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!testListeningIds.length || !submitTestId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Fetch listening items
        const listeningsRes = await testListeningService.getByIdsAndStatus(
          testListeningIds, 
          true
        );
        const listenings = listeningsRes.data || [];

        if (!listenings.length) {
          setListeningItems([]);
          setAllQuestions([]);
          setLoading(false);
          return;
        }

        // 2. Get all question IDs from all listening items
        const allQuestionIds: number[] = [];
        listenings.forEach((listening: any) => {
          if (Array.isArray(listening.questions)) {
            allQuestionIds.push(...listening.questions);
          }
        });

        if (!allQuestionIds.length) {
          setListeningItems([]);
          setAllQuestions([]);
          setLoading(false);
          return;
        }

        // 3. Fetch questions and user answers in parallel
        const [questionsRes, answersRes] = await Promise.all([
          questionService.getByIdsAndStatus(allQuestionIds, true),
          submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
            submitTestId, 
            allQuestionIds
          )
        ]);

        const questionsData = questionsRes.data || [];
        const answersData = answersRes.data || [];

        // 4. Create lookup maps
        const questionsMap: Record<number, Question> = {};
        questionsData.forEach((q: Question) => {
          questionsMap[q.id] = q;
        });

        const answersMap: Record<number, number> = {};
        answersData.forEach((a: any) => {
          answersMap[a.question_id] = a.answer_id;
        });

        // 5. Process listenings with serial numbers
        let serial = 1;
        const processedListenings: ListeningItem[] = [];
        const processedQuestions: QuestionItemWithMeta[] = [];

        for (const listening of listenings) {
          if (!listening.questions || listening.questions.length === 0) {
            continue;
          }

          const listeningQuestions: QuestionItemWithMeta[] = [];
          const startSerial = serial;

          for (const questionId of listening.questions) {
            const questionData = questionsMap[questionId];
            if (!questionData) continue;

            const selectedAnswerId = answersMap[questionId];
            
            const correctAnswerId = questionData.answers?.find(
              (a: any) => a.correct === true
            )?.id;
            
            const isCorrect = selectedAnswerId === correctAnswerId;

            const processedQuestion: QuestionItemWithMeta = {
              ...questionData,
              serial,
              selectedAnswerId,
              isCorrect
            };

            listeningQuestions.push(processedQuestion);
            processedQuestions.push(processedQuestion);
            serial++;
          }

          if (listeningQuestions.length > 0) {
            processedListenings.push({
              id: listening.id,
              audio: listening.audio,
              transcript: listening.transcript,
              questions: listeningQuestions,
              startSerial,
              endSerial: serial - 1
            });
          }
        }

        setListeningItems(processedListenings);
        setAllQuestions(processedQuestions);
      } catch (err) {
        console.error("Error loading history listening test:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [testListeningIds, submitTestId]);

  // Method to set question refs for scrolling - use useCallback to prevent infinite loops
  const setQuestionRef = useCallback((id: number, el: HTMLDivElement | null) => {
    questionRefs.current[id] = el;
  }, []);

  return {
    loading,
    error,
    listeningItems,
    allQuestions,
    setQuestionRef
  };
}