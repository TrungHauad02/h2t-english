import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { 
  TestPart, 
  TestPartTypeEnum, 
  SubmitTestSpeaking, 
  SubmitTestWriting, 
  TestWriting,
  Question,
  Answer, 
  SubmitTestAnswer,
  TestListening,
  TestReading 
} from "interfaces";
import { 
  testReadingService, 
  testListeningService, 
  testSpeakingService,
  submitTestService,
  submitTestAnswerService,
  submitTestSpeakingService,
  submitTestWritingService,
  questionService,
  scoreSpeakingService,
  scoreWritingService,
  testWritingService,
  commentTestService,
  ChoiceQuestion,
  ReadingSection,
  ListeningSection,
  TestCommentRequestDTO,
} from "services";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {completeRouteNode} from "utils/updateProcess";
import { RouteNodeEnum } from "interfaces";
interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
}

// Define constants outside the hook
const TOTAL_SCORE = 100;
const PART_COUNT = 6;
const PART_MAX_SCORE = TOTAL_SCORE / PART_COUNT;

const tabOrder: TestPartTypeEnum[] = [
  TestPartTypeEnum.VOCABULARY,
  TestPartTypeEnum.GRAMMAR,
  TestPartTypeEnum.READING,
  TestPartTypeEnum.LISTENING,
  TestPartTypeEnum.SPEAKING,
  TestPartTypeEnum.WRITING,
];

// Initial state values
const initialStartSerials: Record<TestPartTypeEnum, number> = {
  [TestPartTypeEnum.VOCABULARY]: 0,
  [TestPartTypeEnum.GRAMMAR]: 0,
  [TestPartTypeEnum.READING]: 0,
  [TestPartTypeEnum.LISTENING]: 0,
  [TestPartTypeEnum.SPEAKING]: 0,
  [TestPartTypeEnum.WRITING]: 0,
};

// Initial rendered sections
const initialRenderedSections: Record<TestPartTypeEnum, React.ReactNode> = {
  [TestPartTypeEnum.VOCABULARY]: null,
  [TestPartTypeEnum.GRAMMAR]: null,
  [TestPartTypeEnum.READING]: null,
  [TestPartTypeEnum.LISTENING]: null,
  [TestPartTypeEnum.SPEAKING]: null,
  [TestPartTypeEnum.WRITING]: null,
};

const useMixingTest = (mixingTestParts: TestPart[], submitTestId: number,routeNodeId: number) => {

  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);
  const [startSerials, setStartSerials] = useState<Record<TestPartTypeEnum, number>>(initialStartSerials);
  const [activeTab, setActiveTab] = useState<TestPartTypeEnum>(TestPartTypeEnum.VOCABULARY);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    parts: {
      type: TestPartTypeEnum;
      correctAnswers: number;
      totalQuestions: number;
      score: number;
      weightedScore: number;
    }[];
    comment?: string;
    strengths?: string[];
    areasToImprove?: string[];
  } | null>(null);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState<boolean>(false);

  const answeredQuestionsRef = useRef<Record<number, boolean>>({});
  const renderedSectionsRef = useRef<Record<TestPartTypeEnum, React.ReactNode>>(initialRenderedSections);

  // Memoize parts to prevent unnecessary re-renders
  const parts = useMemo(() => {
    return {
      vocabulary: mixingTestParts.find(part => part.type === TestPartTypeEnum.VOCABULARY),
      grammar: mixingTestParts.find(part => part.type === TestPartTypeEnum.GRAMMAR),
      reading: mixingTestParts.find(part => part.type === TestPartTypeEnum.READING),
      listening: mixingTestParts.find(part => part.type === TestPartTypeEnum.LISTENING),
      speaking: mixingTestParts.find(part => part.type === TestPartTypeEnum.SPEAKING),
      writing: mixingTestParts.find(part => part.type === TestPartTypeEnum.WRITING),
    };
  }, [mixingTestParts]);

  // Extract question IDs from parts - shared function
  const extractQuestionIds = useCallback(async (part: TestPart | undefined, type: TestPartTypeEnum): Promise<number[]> => {
    if (!part?.questions?.length) return [];
    
    if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR) {
      return [...part.questions];
    } 
    
    if (type === TestPartTypeEnum.READING || type === TestPartTypeEnum.LISTENING) {
      const service = type === TestPartTypeEnum.READING ? testReadingService : testListeningService;
      const res = await service.getByIdsAndStatus(part.questions, true);
      
      return (res.data || []).reduce((acc: number[], item: any) => {
        if (item.questions?.length) {
          acc.push(...item.questions);
        }
        return acc;
      }, [] as number[]);
    }
    
    if (type === TestPartTypeEnum.SPEAKING) {
      const speakingRes = await testSpeakingService.getByIdsAndStatus(part.questions, true);
      return (speakingRes.data || []).reduce((ids: number[], item: any) => {
        if (Array.isArray(item.questions)) {
          ids.push(...item.questions);
        }
        return ids;
      }, []);
    }
    
    return part.questions || [];
  }, []);

  // Helper function to convert URL to File (used in submission)
  const convertUrlToFile = useCallback(async (url: string, fileName: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileType = blob.type || "audio/mp3";
    return new File([blob], fileName, { type: fileType });
  }, []);

  // Load initial answered questions - optimized to reduce code duplication
  const loadInitialAnsweredQuestions = useCallback(async () => {
    if (!submitTestId) return;
    
    try {
      // Collect all question IDs in one go
      const allQuestionIds: number[] = [];
      const typesToProcessDirectly = [TestPartTypeEnum.VOCABULARY, TestPartTypeEnum.GRAMMAR];
      const typesToProcessViaService = [TestPartTypeEnum.READING, TestPartTypeEnum.LISTENING, TestPartTypeEnum.SPEAKING];
      
      // Process direct question IDs
      for (const type of typesToProcessDirectly) {
        const part = type === TestPartTypeEnum.VOCABULARY ? parts.vocabulary : parts.grammar;
        if (part?.questions) {
          allQuestionIds.push(...part.questions);
        }
      }
      
      // Process question IDs that need service calls
      for (const type of typesToProcessViaService) {
        const part = type === TestPartTypeEnum.READING ? parts.reading : 
                    type === TestPartTypeEnum.LISTENING ? parts.listening : parts.speaking;
        
        if (part?.questions?.length) {
          const ids = await extractQuestionIds(part, type);
          allQuestionIds.push(...ids);
        }
      }
      
      // Fetch all multi-choice answers at once
      let tempAnswered: Record<number, boolean> = {};
      if (allQuestionIds.length > 0) {
        const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
          submitTestId, 
          allQuestionIds
        );
        
        if (answersRes?.data) {
          answersRes.data.forEach((answer: any) => {
            tempAnswered[answer.question_id] = true;
          });
        }
      }
      
      // Handle speaking answers
      if (parts.speaking?.questions?.length) {
        const speakingAnswersRes = await submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(
          submitTestId,
          parts.speaking.questions
        );
        
        if (speakingAnswersRes?.data) {
          speakingAnswersRes.data.forEach((answer: any) => {
            tempAnswered[answer.question_id] = true;
          });
        }
      }
      
      // Handle writing answers
      if (parts.writing?.questions?.length) {
        const writingAnswersRes = await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(
          submitTestId,
          parts.writing.questions
        );
        
        if (writingAnswersRes?.data) {
          writingAnswersRes.data.forEach((answer: any) => {
            if (answer.content && answer.content.trim() !== '') {
              tempAnswered[answer.testWriting_id] = true;
            }
          });
        }
      }
      
      setAnsweredQuestions(tempAnswered);
      answeredQuestionsRef.current = tempAnswered;
    } catch (error) {
      console.error("Error loading initial answered questions:", error);
    }
  }, [submitTestId, parts, extractQuestionIds]);

  // Process test parts - optimized to reduce duplication
  const processTestPart = useCallback(async (
    part: TestPart | undefined, 
    type: TestPartTypeEnum, 
    currentSerial: number,
    tempQuestions: QuestionItem[],
    tempStartSerials: Record<TestPartTypeEnum, number>
  ): Promise<number> => {
    if (!part || !part.questions?.length) return currentSerial;
    
    tempStartSerials[type] = currentSerial;
    const currentAnsweredQuestions = answeredQuestionsRef.current;
    
    if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR) {
      const res = await questionService.getByIdsAndStatus(part.questions, true);
      for (const question of res.data || []) {
        if (question.status) {
          tempQuestions.push({
            serialNumber: currentSerial++,
            questionId: question.id,
            partType: type,
            isAnswered: currentAnsweredQuestions[question.id] || false,
          });
        }
      }
      return currentSerial;
    }
    
    if (type === TestPartTypeEnum.WRITING) {
      const res = await testWritingService.getByIdsAndStatus(part.questions, true);
      for (const writingItem of res.data || []) {
        if (writingItem.status) {
          tempQuestions.push({
            serialNumber: currentSerial++,
            questionId: writingItem.id,
            partType: type,
            isAnswered: currentAnsweredQuestions[writingItem.id] || false,
          });
        }
      }
      return currentSerial;
    }
    
    // Handle reading, listening, speaking with common pattern
    const serviceMap = {
      [TestPartTypeEnum.READING]: testReadingService,
      [TestPartTypeEnum.LISTENING]: testListeningService,
      [TestPartTypeEnum.SPEAKING]: testSpeakingService,
    };
    
    if (serviceMap[type]) {
      const res = await serviceMap[type].getByIdsAndStatus(part.questions, true);
      for (const item of res.data || []) {
        if (item.questions?.length) {
          const questionRes = await questionService.getByIdsAndStatus(item.questions, true);
          for (const question of questionRes.data || []) {
            if (question.status) {
              tempQuestions.push({
                serialNumber: currentSerial++,
                questionId: question.id,
                partType: type,
                isAnswered: currentAnsweredQuestions[question.id] || false,
              });
            }
          }
        }
      }
    }
    
    return currentSerial;
  }, []);

  // Load all questions - optimized
  const loadQuestions = useCallback(async () => {
    let currentSerial = 1;
    const tempQuestions: QuestionItem[] = [];
    const tempStartSerials = {...initialStartSerials};
    
    // Process all parts in sequence
    for (const type of tabOrder) {
      let part;
      switch (type) {
        case TestPartTypeEnum.VOCABULARY: part = parts.vocabulary; break;
        case TestPartTypeEnum.GRAMMAR: part = parts.grammar; break;
        case TestPartTypeEnum.READING: part = parts.reading; break;
        case TestPartTypeEnum.LISTENING: part = parts.listening; break;
        case TestPartTypeEnum.SPEAKING: part = parts.speaking; break;
        case TestPartTypeEnum.WRITING: part = parts.writing; break;
      }
      
      currentSerial = await processTestPart(part, type, currentSerial, tempQuestions, tempStartSerials);
    }
    
    setStartSerials(tempStartSerials);
    setAllQuestions(tempQuestions);
    setIsInitialDataLoaded(true);
  }, [parts, processTestPart]);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      await loadInitialAnsweredQuestions();
      await loadQuestions();
    };
    
    initializeData();
  }, [loadInitialAnsweredQuestions, loadQuestions]);

  // Keep reference updated
  useEffect(() => {
    answeredQuestionsRef.current = answeredQuestions;
  }, [answeredQuestions]);

  // Update answered status
  useEffect(() => {
    if (!isInitialDataLoaded) return;
    
    const updateAnsweredStatus = () => {
      setAllQuestions(prevQuestions => 
        prevQuestions.map(q => ({
          ...q,
          isAnswered: answeredQuestions[q.questionId] || false
        }))
      );
    };

    const timeoutId = setTimeout(updateAnsweredStatus, 100);
    return () => clearTimeout(timeoutId);
  }, [answeredQuestions, isInitialDataLoaded]);

  const handleQuestionSelect = useCallback((questionItem: QuestionItem) => {
    setActiveTab(questionItem.partType);
    setSelectedQuestionId(questionItem.questionId);
  }, []);

  const handleUpdateAnsweredQuestions = useCallback((questionId: number, isAnswered: boolean) => {
    setAnsweredQuestions(prev => {
      if (prev[questionId] === isAnswered) {
        return prev;
      }
      return {
        ...prev,
        [questionId]: isAnswered
      };
    });
  }, []);

  // Process part for submission - extracted common logic
  const processPartForSubmission = useCallback(async (
    part: TestPart | undefined, 
    type: TestPartTypeEnum,
    result: any
  ): Promise<void> => {
    if (!part?.questions?.length) return;
    
    if ([TestPartTypeEnum.VOCABULARY, TestPartTypeEnum.GRAMMAR, TestPartTypeEnum.READING, TestPartTypeEnum.LISTENING].includes(type)) {
      const questionIds = await extractQuestionIds(part, type);
      if (!questionIds.length) return;
      
      const totalQuestions = questionIds.length;
      
      const [answersRes, questionRes] = await Promise.all([
        submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, questionIds),
        questionService.getByIdsAndStatus(questionIds, true)
      ]);
      
      if (!answersRes?.data?.length) {
        result.parts.push({
          type,
          correctAnswers: 0,
          totalQuestions,
          score: 0,
          weightedScore: 0
        });
        return;
      }
      
      const questions = questionRes.data || [];
      const questionMap = (questions as Question[]).reduce<Record<number, Question>>((map, q) => {
        map[q.id] = q;
        return map;
      }, {});
      
      const correctAnswers = (answersRes.data as SubmitTestAnswer[]).reduce((count, submitAnswer) => {
        const question = questionMap[submitAnswer.question_id];
        
        if (question?.answers && submitAnswer.answer_id) {
          const chosenAnswer = question.answers.find(a => a.id === submitAnswer.answer_id);
          
          if (chosenAnswer?.correct) {
            return count + 1;
          }
        }
        return count;
      }, 0);
      
      const partScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
      const weightedScore = (partScore / 100) * PART_MAX_SCORE;
      
      result.parts.push({
        type,
        correctAnswers,
        totalQuestions,
        score: partScore,
        weightedScore
      });
      
      result.totalQuestions += totalQuestions;
      result.correctAnswers += correctAnswers;
    }
    
    if (type === TestPartTypeEnum.SPEAKING) {
      await processSpeakingPart(part, result);
    }
    
    if (type === TestPartTypeEnum.WRITING) {
      await processWritingPart(part, result);
    }
  }, [extractQuestionIds, submitTestId]);

  // Process speaking part - encapsulated
  const processSpeakingPart = useCallback(async (part: TestPart | undefined, result: any): Promise<void> => {
    if (!part?.questions?.length) return;

    const speakingRes = await testSpeakingService.getByIdsAndStatus(part.questions, true);
    const speakingItems = speakingRes.data || [];

    const allQuestionIds: number[] = speakingItems.reduce((ids: number[], item: any) => {
      if (Array.isArray(item.questions)) {
        ids.push(...item.questions as number[]);
      }
      return ids;
    }, []);

    if (!allQuestionIds.length) return;

    const [speakingAnswersRes, questionRes] = await Promise.all([
      submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(submitTestId, allQuestionIds),
      questionService.getByIdsAndStatus(allQuestionIds, true)
    ]);
    
    const questionsSpeakingId = (questionRes.data || [])
      .filter((q: Question) => q.status === true)
      .map((q: Question) => q.id);
      
    if (!speakingAnswersRes?.data?.length) {
      result.parts.push({
        type: TestPartTypeEnum.SPEAKING,
        correctAnswers: 0,
        totalQuestions: questionsSpeakingId.length,
        score: 0,
        weightedScore: 0
      });
      return;
    }

    const questions = questionRes.data || [];
    const questionMap = (questions as Question[]).reduce<Record<number, Question>>((map, q) => {
      map[q.id] = q;
      return map;
    }, {});

    const questionCount = allQuestionIds.length;
    const maxScorePerQuestion = PART_MAX_SCORE / questionCount;

    const evaluationResults = await Promise.all(
      (speakingAnswersRes.data || []).map(async (answer: SubmitTestSpeaking) => {
        if (!answer.file) return { score: 0, updated: false };
        
        const question = questionMap[answer.question_id];
        const expectedText = question?.content || "";
        
        try {
          const file = await convertUrlToFile(answer.file, `recording_${answer.id}.mp3`);
          const scoreResult = await scoreSpeakingService.evaluateSpeechInTopic(file, expectedText);
          
          if (scoreResult.data) {
            const rawScore = parseFloat(scoreResult.data.score);
            const numericScore = (rawScore / 100) * maxScorePerQuestion;
            
            await submitTestSpeakingService.update(answer.id, {
              ...answer,
              score: numericScore, 
              transcript: scoreResult.data.transcript,
              comment: scoreResult.data.feedback,
            });
            
            return { score: numericScore, updated: true };
          }
        } catch (error) {
          console.error("Error evaluating speaking:", error);
        }
        
        return { score: 0, updated: false };
      })
    );
    
    const totalScore = evaluationResults.reduce<number>((sum, result) => sum + result.score, 0);
    const answeredQuestions = evaluationResults.filter(result => result.updated).length;
    
    result.parts.push({
      type: TestPartTypeEnum.SPEAKING,
      correctAnswers: answeredQuestions,
      totalQuestions: questionsSpeakingId.length,
      score: (totalScore / PART_MAX_SCORE) * 100, 
      weightedScore: totalScore
    });

    result.totalQuestions += questionsSpeakingId.length;
    
    const equivalentCorrectAnswers = (totalScore / PART_MAX_SCORE) * allQuestionIds.length;
    result.correctAnswers += equivalentCorrectAnswers;
  }, [submitTestId, convertUrlToFile]);

  // Process writing part - encapsulated
  const processWritingPart = useCallback(async (part: TestPart | undefined, result: any): Promise<void> => {
    if (!part?.questions?.length) return;

    const [testWritingRes, writingRes] = await Promise.all([
      testWritingService.getByIdsAndStatus(part.questions, true),
      submitTestWritingService.findBySubmitTestIdAndTestWritingIds(submitTestId, part.questions)
    ]);
    
    const testWritings = testWritingRes.data || [];
    
    if (!writingRes?.data?.length) {
      result.parts.push({
        type: TestPartTypeEnum.WRITING,
        correctAnswers: 0,
        totalQuestions: part.questions.length,
        score: 0,
        weightedScore: 0
      });
      return;
    }

    const testWritingMap: Record<number, TestWriting> = (testWritings as TestWriting[]).reduce(
      (map, tw) => {
        map[tw.id] = tw;
        return map;
      },
      {} as Record<number, TestWriting>
    );
    
    const questionCount = part.questions.length;
    const maxScorePerQuestion = PART_MAX_SCORE / questionCount;

    const evaluationResults = await Promise.all(
      (writingRes.data || []).map(async (answer: SubmitTestWriting) => {
        if (!answer.content?.trim()) return { score: 0, updated: false };
        
        const testWriting = testWritingMap[answer.testWriting_id];
        if (!testWriting?.topic) return { score: 0, updated: false };
        
        try {
          const scoreResult = await scoreWritingService.scoreWriting(answer.content, testWriting.topic);
          
          if (scoreResult.data) {
            const rawScore = parseFloat(scoreResult.data.score);
            const numericScore = (rawScore / 100) * maxScorePerQuestion;
            
            await submitTestWritingService.update(answer.id, {
              ...answer,
              score: numericScore,
              comment: scoreResult.data.feedback || "",
            });
            
            return { score: numericScore, updated: true };
          }
        } catch (error) {
          console.error("Error evaluating writing:", error);
        }
        
        return { score: 0, updated: false };
      })
    );
    
    const totalScore = evaluationResults.reduce<number>((sum, result) => sum + result.score, 0);
    const answeredQuestions = evaluationResults.filter(result => result.updated).length;
    
    result.parts.push({
      type: TestPartTypeEnum.WRITING,
      correctAnswers: answeredQuestions,
      totalQuestions: part.questions.length,
      score: (totalScore / PART_MAX_SCORE) * 100,
      weightedScore: totalScore
    });

    result.totalQuestions += part.questions.length;
    
    const equivalentCorrectAnswers = (totalScore / PART_MAX_SCORE) * part.questions.length;
    result.correctAnswers += equivalentCorrectAnswers;
  }, [submitTestId]);

  // Prepare test comment data - extract repetitive code
  const prepareTestCommentData = useCallback(async (): Promise<TestCommentRequestDTO> => {
    const requestData: TestCommentRequestDTO = {
      vocabulary: [],
      grammar: [],
      reading: [],
      listening: [],
      speaking: [],
      writing: []
    };

    // Helper for processing vocabulary and grammar
    const processMultipleChoicePart = async (
      part: TestPart | undefined, 
      type: 'vocabulary' | 'grammar'
    ) => {
      if (!part?.questions?.length) return;
      
      const questionIds = part.questions;
      const [questionRes, answersRes] = await Promise.all([
        questionService.getByIdsAndStatus(questionIds, true),
        submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, questionIds)
      ]);

      const questions = questionRes.data || [];
      const answers = answersRes.data || [];

      const answerMap: Record<number, SubmitTestAnswer> = (answers as SubmitTestAnswer[]).reduce((map, answer) => {
        map[answer.question_id] = answer;
        return map;
      }, {} as Record<number, SubmitTestAnswer>);

      requestData[type] = questions.map((question: Question) => {
        const answer = answerMap[question.id];
        const selectedAnswer = question.answers.find((a: Answer) => a.id === answer?.answer_id);
        return {
          question: question.content,
          choices: question.answers.map((a) => a.content),
          userAnswer: selectedAnswer?.content || ""
        };
      });
    };

    // Process all parts in parallel for better performance
    await Promise.all([
      processMultipleChoicePart(parts.vocabulary, 'vocabulary'),
      processMultipleChoicePart(parts.grammar, 'grammar'),
      
      // Reading
      (async () => {
        if (parts.reading?.questions?.length) {
          const readingRes = await testReadingService.getByIdsAndStatus(parts.reading.questions, true);
          const readings = readingRes.data || [];
    
          const readingSectionsPromises = readings.map(async (reading: TestReading) => {
            if (!reading.questions?.length) return null;
    
            const [questionRes, answersRes] = await Promise.all([
              questionService.getByIdsAndStatus(reading.questions, true),
              submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, reading.questions)
            ]);
    
            const questions = questionRes.data || [];
            const answers = answersRes.data || [];
    
            const answerMap: Record<number, SubmitTestAnswer> = (answers as SubmitTestAnswer[]).reduce((map, answer) => {
              map[answer.question_id] = answer;
              return map;
            }, {} as Record<number, SubmitTestAnswer>);
    
            const choiceQuestions: ChoiceQuestion[] = questions.map((question: Question) => {
              const answer = answerMap[question.id];
              const selectedAnswer = question.answers.find((a: Answer) => a.id === answer?.answer_id);
    
              return {
                question: question.content,
                choices: question.answers.map((a) => a.content),
                userAnswer: selectedAnswer?.content || ""
              };
            });
    
            return {
              passage: reading.file, 
              questions: choiceQuestions
            };
          });
    
          const sections = await Promise.all(readingSectionsPromises);
          requestData.reading = sections.filter((item): item is ReadingSection => item !== null);
        }
      })(),
    
      // Listening
      (async () => {
        if (parts.listening?.questions?.length) {
          const listeningRes = await testListeningService.getByIdsAndStatus(parts.listening.questions, true);
          const listenings = listeningRes.data || [];
    
          const listeningSectionsPromises = listenings.map(async (listening: TestListening) => {
            if (!listening.questions?.length) return null;
    
            const [questionRes, answersRes] = await Promise.all([
              questionService.getByIdsAndStatus(listening.questions, true),
              submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, listening.questions)
            ]);
    
            const questions = questionRes.data || [];
            const answers = answersRes.data || [];
    
            const answerMap: Record<number, SubmitTestAnswer> = (answers as SubmitTestAnswer[]).reduce((map, answer) => {
              map[answer.question_id] = answer;
              return map;
            }, {} as Record<number, SubmitTestAnswer>);
    
            const choiceQuestions: ChoiceQuestion[] = questions.map((question: Question) => {
              const answer = answerMap[question.id];
              const selectedAnswer = question.answers.find((a: Answer) => a.id === answer?.answer_id);
    
              return {
                question: question.content,
                choices: question.answers.map((a) => a.content),
                userAnswer: selectedAnswer?.content || ""
              };
            });
    
            return {
              transcript: listening.transcript,
              questions: choiceQuestions
            };
          });
    
          const sections = await Promise.all(listeningSectionsPromises);
          requestData.listening = sections.filter((item): item is ListeningSection => item !== null);
        }
      })(),
      
      // Speaking
      (async () => {
        if (parts.speaking?.questions?.length) {
          const speakingRes = await testSpeakingService.getByIdsAndStatus(parts.speaking.questions, true);
          const speakingItems = speakingRes.data || [];

          const allQuestionIds: number[] = (speakingItems as any[]).reduce((ids, item) => {
            if (Array.isArray(item.questions)) {
              ids.push(...item.questions as number[]);
            }
            return ids;
          }, []);
          
          if (allQuestionIds.length > 0) {
            const [questionRes, speakingAnswersRes] = await Promise.all([
              questionService.getByIdsAndStatus(allQuestionIds, true),
              submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(submitTestId, allQuestionIds)
            ]);
            
            const questions = questionRes.data || [];
            const answers = speakingAnswersRes.data || [];const answerMap: Record<number, any> = (answers as any[]).reduce((map, answer) => {
              map[answer.question_id] = answer;
              return map;
            }, {} as Record<number, any>);
            
            requestData.speaking = questions.map((question: any) => {
              const answer = answerMap[question.id];
              
              return {
                question: question.content || "",
                transcript: answer?.transcript || ""
              };
            });
          }
        }
      })(),
      
      // Writing
      (async () => {
        if (parts.writing?.questions?.length) {
          const [testWritingRes, writingRes] = await Promise.all([
            testWritingService.getByIdsAndStatus(parts.writing.questions, true),
            submitTestWritingService.findBySubmitTestIdAndTestWritingIds(submitTestId, parts.writing.questions)
          ]);
          
          const testWritings = testWritingRes.data || [];
          const answers = writingRes.data || [];
          
          const answersMap: Record<number, any> = (answers as any[]).reduce((map, answer) => {
            map[answer.testWriting_id] = answer;
            return map;
          }, {} as Record<number, any>);
          
          requestData.writing = testWritings.map((testWriting: any) => {
            const answer = answersMap[testWriting.id];
            
            return {
              topic: testWriting.topic || "",
              userAnswer: answer?.content || ""
            };
          });
        }
      })()
    ]);

    return requestData;
  }, [parts, submitTestId]);

  // Submit test - optimized with extracted helper functions
  const handleSubmitTest = useCallback(async () => {
    if (!submitTestId) return;
    
    try {
      setIsSubmitting(true);
      setIsSubmitDialogOpen(true);
      
      // Define result structure
      const result = {
        totalQuestions: 0,
        correctAnswers: 0,
        score: 0,
        parts: [] as {
          type: TestPartTypeEnum;
          correctAnswers: number;
          totalQuestions: number;
          score: number;
          weightedScore: number;
        }[]
      };

      // Process all parts in parallel
      await Promise.all([
        processPartForSubmission(parts.vocabulary, TestPartTypeEnum.VOCABULARY, result),
        processPartForSubmission(parts.grammar, TestPartTypeEnum.GRAMMAR, result),
        processPartForSubmission(parts.reading, TestPartTypeEnum.READING, result),
        processPartForSubmission(parts.listening, TestPartTypeEnum.LISTENING, result),
        processSpeakingPart(parts.speaking, result),
        processWritingPart(parts.writing, result)
      ]);
      
      // Calculate final score
      result.score = result.parts.reduce((sum, part) => sum + part.weightedScore, 0);
      
      // Prepare and submit comment data
      const commentRequestData = await prepareTestCommentData();
      const commentResponse = await commentTestService.commentTest(commentRequestData);

      // Update test status and score
      await submitTestService.patch(submitTestId, { 
        score: result.score,
        comment: commentResponse.data.feedback,
        status: true 
      });
      await completeRouteNode(routeNodeId, submitTestId,RouteNodeEnum.MIXING_TEST );

      // Set result with feedback
      setSubmissionResult({
        ...result,
        comment: commentResponse.data.feedback,
        strengths: commentResponse.data.strengths,
        areasToImprove: commentResponse.data.areasToImprove
      });
      
    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    submitTestId, 
    parts, 
    processPartForSubmission,
    processSpeakingPart,
    processWritingPart,
    prepareTestCommentData
  ]);

  const closeSubmitDialog = useCallback(() => {
    setIsSubmitDialogOpen(false);
  }, []);

  return {
    allQuestions,
    startSerials,
    activeTab,
    selectedQuestionId,
    answeredQuestions,
    isInitialDataLoaded,
    vocabularyPart: parts.vocabulary,
    grammarPart: parts.grammar,
    readingPart: parts.reading,
    listeningPart: parts.listening,
    speakingPart: parts.speaking,
    writingPart: parts.writing,
    isSubmitting,
    isSubmitDialogOpen,
    submissionResult,
    setActiveTab,
    setSelectedQuestionId,
    handleQuestionSelect,
    handleUpdateAnsweredQuestions,
    handleSubmitTest,
    closeSubmitDialog,
    renderedSectionsRef
  };
};

export default useMixingTest;