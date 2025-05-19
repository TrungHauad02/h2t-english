import { useEffect, useState, useRef, useCallback } from "react";
import {
  testReadingService,
  questionService,
  submitTestAnswerService
} from "services";
import { Question, TestPartTypeEnum } from "interfaces";

interface UseHistoryReadingTestProps {
  testReadingIds: number[];
  submitTestId: number;
}

export interface QuestionItemWithMeta extends Question {
  serial: number;
  selectedAnswerId?: number;
  isCorrect: boolean;
}

export interface ReadingItem {
  id: number;
  file: string;
  questions: QuestionItemWithMeta[];
  startSerial: number;
  endSerial: number;
}

export default function useHistoryReadingTest({
  testReadingIds,
  submitTestId
}: UseHistoryReadingTestProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [readingItems, setReadingItems] = useState<ReadingItem[]>([]);
  const [allQuestions, setAllQuestions] = useState<QuestionItemWithMeta[]>([]);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!testReadingIds.length || !submitTestId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Fetch reading items
        const readingsRes = await testReadingService.getByIdsAndStatus(
          testReadingIds, 
          true
        );
        const readings = readingsRes.data || [];

        if (!readings.length) {
          setReadingItems([]);
          setAllQuestions([]);
          setLoading(false);
          return;
        }

        // 2. Get all question IDs from all readings
        const allQuestionIds: number[] = [];
        readings.forEach((reading: any) => {
          if (Array.isArray(reading.questions)) {
            allQuestionIds.push(...reading.questions);
          }
        });

        if (!allQuestionIds.length) {
          setReadingItems([]);
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

        // 5. Process readings with serial numbers
        let serial = 1;
        const processedReadings: ReadingItem[] = [];
        const processedQuestions: QuestionItemWithMeta[] = [];

        for (const reading of readings) {
          if (!reading.questions || reading.questions.length === 0) {
            continue;
          }

          const readingQuestions: QuestionItemWithMeta[] = [];
          const startSerial = serial;

          for (const questionId of reading.questions) {
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

            readingQuestions.push(processedQuestion);
            processedQuestions.push(processedQuestion);
            serial++;
          }

          if (readingQuestions.length > 0) {
            processedReadings.push({
              id: reading.id,
              file: reading.file,
              questions: readingQuestions,
              startSerial,
              endSerial: serial - 1
            });
          }
        }

        setReadingItems(processedReadings);
        setAllQuestions(processedQuestions);
      } catch (err) {
        console.error("Error loading history reading test:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [testReadingIds, submitTestId]);

  // Method to set question refs for scrolling - use useCallback to prevent infinite loops
  const setQuestionRef = useCallback((id: number, el: HTMLDivElement | null) => {
    questionRefs.current[id] = el;
  }, []);

  return {
    loading,
    error,
    readingItems,
    allQuestions,
    setQuestionRef
  };
}