import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { TestPart, TestPartTypeEnum, SubmitTestSpeaking, SubmitTestWriting, TestWriting,Question,Answer, SubmitTestAnswer,TestListening,TestReading } from "interfaces";
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

interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
}

const tabOrder: TestPartTypeEnum[] = [
  TestPartTypeEnum.VOCABULARY,
  TestPartTypeEnum.GRAMMAR,
  TestPartTypeEnum.READING,
  TestPartTypeEnum.LISTENING,
  TestPartTypeEnum.SPEAKING,
  TestPartTypeEnum.WRITING,
];

const useMixingTest = (mixingTestParts: TestPart[], submitTestId: number) => {
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);
  const [startSerials, setStartSerials] = useState<Record<TestPartTypeEnum, number>>({
    [TestPartTypeEnum.VOCABULARY]: 0,
    [TestPartTypeEnum.GRAMMAR]: 0,
    [TestPartTypeEnum.READING]: 0,
    [TestPartTypeEnum.LISTENING]: 0,
    [TestPartTypeEnum.SPEAKING]: 0,
    [TestPartTypeEnum.WRITING]: 0,
  });

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
    }[];
  } | null>(null);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState<boolean>(false);
  

  const answeredQuestionsRef = useRef<Record<number, boolean>>({});

  const renderedSectionsRef = useRef<Record<TestPartTypeEnum, React.ReactNode>>({
    [TestPartTypeEnum.VOCABULARY]: null,
    [TestPartTypeEnum.GRAMMAR]: null,
    [TestPartTypeEnum.READING]: null,
    [TestPartTypeEnum.LISTENING]: null,
    [TestPartTypeEnum.SPEAKING]: null,
    [TestPartTypeEnum.WRITING]: null,
  });

  const vocabularyPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.VOCABULARY), 
    [mixingTestParts]
  );
  
  const grammarPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.GRAMMAR), 
    [mixingTestParts]
  );
  
  const readingPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.READING), 
    [mixingTestParts]
  );
  
  const listeningPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.LISTENING), 
    [mixingTestParts]
  );
  
  const speakingPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.SPEAKING), 
    [mixingTestParts]
  );
  
  const writingPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.WRITING), 
    [mixingTestParts]
  );


  const loadInitialAnsweredQuestions = useCallback(async () => {
    if (!submitTestId) return;
    
    try {
 
      const allQuestionIds: number[] = [];
 
      if (vocabularyPart?.questions) allQuestionIds.push(...vocabularyPart.questions);
      if (grammarPart?.questions) allQuestionIds.push(...grammarPart.questions);
      
  
      if (readingPart?.questions?.length) {
        const readingRes = await testReadingService.getByIdsAndStatus(readingPart.questions,true);
        for (const item of readingRes.data || []) {
          if (item.questions) allQuestionIds.push(...item.questions);
        }
      }
      
      if (listeningPart?.questions?.length) {
        const listeningRes = await testListeningService.getByIdsAndStatus(listeningPart.questions,true);
        for (const item of listeningRes.data || []) {
          if (item.questions) allQuestionIds.push(...item.questions);
        }
      }
      
      if (speakingPart?.questions?.length) {
        const speakingRes = await testSpeakingService.getByIdsAndStatus(speakingPart.questions,true);
        for (const item of speakingRes.data || []) {
          if (item.questions) allQuestionIds.push(...item.questions);
        }
      }
      
      if (allQuestionIds.length > 0) {
        const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
          submitTestId, 
          allQuestionIds
        );
        
        const tempAnswered: Record<number, boolean> = {};
        if (answersRes?.data) {
          answersRes.data.forEach((answer: any) => {
            tempAnswered[answer.question_id] = true;
          });
        }
        
        setAnsweredQuestions(tempAnswered);
        answeredQuestionsRef.current = tempAnswered;
      }
      
      if (speakingPart?.questions?.length) {
        const speakingAnswersRes = await submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(
          submitTestId,
          speakingPart.questions
        );
        
        if (speakingAnswersRes?.data) {
          const tempAnswered = { ...answeredQuestionsRef.current };
          speakingAnswersRes.data.forEach((answer: any) => {
            tempAnswered[answer.question_id] = true;
          });
 
          setAnsweredQuestions(tempAnswered);
          answeredQuestionsRef.current = tempAnswered;
        }
      }
      
      if (writingPart?.questions?.length) {
        const writingAnswersRes = await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(
          submitTestId,
          writingPart.questions
        );
        
        if (writingAnswersRes?.data) {
          const tempAnswered = { ...answeredQuestionsRef.current };
          writingAnswersRes.data.forEach((answer: any) => {
            if (answer.content && answer.content.trim() !== '') {
              tempAnswered[answer.testWriting_id] = true;
            }
          });
          
          setAnsweredQuestions(tempAnswered);
          answeredQuestionsRef.current = tempAnswered;
        }
      }
    } catch (error) {
      console.error("Error loading initial answered questions:", error);
    }
  }, [submitTestId, vocabularyPart, grammarPart, readingPart, listeningPart, speakingPart, writingPart]);

  const loadQuestions = useCallback(async () => {
    let currentSerial = 1;
    const tempQuestions: QuestionItem[] = [];
    const tempStartSerials: Record<TestPartTypeEnum, number> = {
      VOCABULARY: 0,
      GRAMMAR: 0,
      READING: 0,
      LISTENING: 0,
      SPEAKING: 0,
      WRITING: 0,
    };

    const currentAnsweredQuestions = answeredQuestionsRef.current;

    for (const type of tabOrder) {
      let part;
      switch (type) {
        case TestPartTypeEnum.VOCABULARY: part = vocabularyPart; break;
        case TestPartTypeEnum.GRAMMAR: part = grammarPart; break;
        case TestPartTypeEnum.READING: part = readingPart; break;
        case TestPartTypeEnum.LISTENING: part = listeningPart; break;
        case TestPartTypeEnum.SPEAKING: part = speakingPart; break;
        case TestPartTypeEnum.WRITING: part = writingPart; break;
      }

      if (!part || !part.questions?.length) continue;

      tempStartSerials[type] = currentSerial;

      if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR || type === TestPartTypeEnum.WRITING) {
        for (const qId of part.questions) {
          tempQuestions.push({
            serialNumber: currentSerial++,
            questionId: qId,
            partType: type,
            isAnswered: currentAnsweredQuestions[qId] || false,
          });
        }
      }

      if (type === TestPartTypeEnum.READING) {
        const res = await testReadingService.getByIdsAndStatus(part.questions,true);
        for (const item of res.data || []) {
          for (const qId of item.questions || []) {
            tempQuestions.push({
              serialNumber: currentSerial++,
              questionId: qId,
              partType: type,
              isAnswered: currentAnsweredQuestions[qId] || false,
            });
          }
        }
      }

      if (type === TestPartTypeEnum.LISTENING) {
        const res = await testListeningService.getByIdsAndStatus(part.questions,true);
        for (const item of res.data || []) {
          for (const qId of item.questions || []) {
            tempQuestions.push({
              serialNumber: currentSerial++,
              questionId: qId,
              partType: type,
              isAnswered: currentAnsweredQuestions[qId] || false,
            });
          }
        }
      }

      if (type === TestPartTypeEnum.SPEAKING) {
        const res = await testSpeakingService.getByIdsAndStatus(part.questions,true);
     
        
        for (const item of res.data || []) {
          for (const qId of item.questions || []) {
            tempQuestions.push({
              serialNumber: currentSerial++,
              questionId: qId,
              partType: type,
              isAnswered: currentAnsweredQuestions[qId] || false,
            });
          }
        }
      }
    }
    setStartSerials(tempStartSerials);
    setAllQuestions(tempQuestions);
    setIsInitialDataLoaded(true);
  }, [
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart
  ]);

  useEffect(() => {
    const initializeData = async () => {
      await loadInitialAnsweredQuestions();
      await loadQuestions();
    };
    
    initializeData();
  }, [loadInitialAnsweredQuestions, loadQuestions]);

  useEffect(() => {
    answeredQuestionsRef.current = answeredQuestions;
  }, [answeredQuestions]);

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

  const handleQuestionSelect = (questionItem: QuestionItem) => {
    setActiveTab(questionItem.partType);
    setSelectedQuestionId(questionItem.questionId);
  };

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
  const handleSubmitTest = useCallback(async () => {
    if (!submitTestId) return;
    
    try {
      setIsSubmitting(true);
      setIsSubmitDialogOpen(true);
      
      interface PartResult {
        type: TestPartTypeEnum;
        correctAnswers: number;
        totalQuestions: number;
        score: number; 
        weightedScore: number; 
      }
      
      interface TestResult {
        totalQuestions: number;
        correctAnswers: number;
        score: number; 
        parts: PartResult[];
        comment?: string;
        strengths?: string[];
        areasToImprove?: string[];
      }
      
      const TOTAL_SCORE = 100;
      const PART_COUNT = 6;
      const PART_MAX_SCORE = TOTAL_SCORE / PART_COUNT; 
      
      const result: TestResult = {
        totalQuestions: 0,
        correctAnswers: 0,
        score: 0,
        parts: []
      };
  
      // Helper function to convert URL to File
      const convertUrlToFile = async (url: string, fileName: string): Promise<File> => {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileType = blob.type || "audio/mp3"; 
        return new File([blob], fileName, { type: fileType });
      };
  

      const getQuestionIds = async (part: TestPart | undefined, type: TestPartTypeEnum): Promise<number[]> => {
        if (!part?.questions?.length) return [];
        
        if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR) {
          return [...part.questions];
        } 
        
        if (type === TestPartTypeEnum.READING || type === TestPartTypeEnum.LISTENING) {
          const service = type === TestPartTypeEnum.READING ? testReadingService : testListeningService;
          const res = await service.getByIdsAndStatus(part.questions,true);
          
          const data = (res.data || []) as any[];
          return data.reduce((acc: number[], item: any) => {
            if (item.questions?.length) {
              acc.push(...item.questions);
            }
            return acc;
          }, [] as number[]);
        }
        
        return [];
      };
  
      // Helper function to process multiple-choice parts
      const processSimpleParts = async (part: TestPart | undefined, type: TestPartTypeEnum): Promise<void> => {
        const questionIds = await getQuestionIds(part, type);
        if (!questionIds.length) return;
        
        const totalQuestions = questionIds.length;
        
        const [answersRes, questionRes] = await Promise.all([
          submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, questionIds),
          questionService.getByIdsAndStatus(questionIds,true)
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
          console.log(question);
          
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
      };
      
      // Process Speaking part
      const processSpeakingPart = async (part: TestPart | undefined): Promise<void> => {
        if (!part?.questions?.length) return;
  
        const speakingRes = await testSpeakingService.getByIdsAndStatus(part.questions,true);
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
          questionService.getByIdsAndStatus(allQuestionIds,true)
        ]);
  
        if (!speakingAnswersRes?.data?.length) {
          result.parts.push({
            type: TestPartTypeEnum.SPEAKING,
            correctAnswers: 0,
            totalQuestions: allQuestionIds.length,
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
        
  
        interface EvaluationResult {
          score: number;
          updated: boolean;
        }
  
  
        const evaluationResults = await Promise.all(
          (speakingAnswersRes.data || []).map(async (answer: SubmitTestSpeaking): Promise<EvaluationResult> => {
            if (!answer.file) return { score: 0, updated: false };
            
            const question = questionMap[answer.question_id];
            const expectedText = question?.content || "";
            
            try {
              const file = await convertUrlToFile(answer.file, `recording_${answer.id}.mp3`);
              const scoreResult = await scoreSpeakingService.evaluateSpeechInTopic(file, expectedText);
              
              if (scoreResult.data) {
                const numericScore = parseFloat(scoreResult.data.score);
                
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
        
   
        const avgScore = answeredQuestions > 0 ? totalScore / answeredQuestions : 0;
        

        const weightedScore = (avgScore / 100) * PART_MAX_SCORE;
  
        result.parts.push({
          type: TestPartTypeEnum.SPEAKING,
          correctAnswers: answeredQuestions,
          totalQuestions: allQuestionIds.length,
          score: avgScore,
          weightedScore
        });
  
 
        result.totalQuestions += allQuestionIds.length;
        
   
        const equivalentCorrectAnswers = (avgScore / 100) * allQuestionIds.length;
        result.correctAnswers += equivalentCorrectAnswers;
      };
  
      // Process Writing part
      const processWritingPart = async (part: TestPart | undefined): Promise<void> => {
        if (!part?.questions?.length) return;
  
        const [testWritingRes, writingRes] = await Promise.all([
          testWritingService.getByIdsAndStatus(part.questions,true),
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
        
  
        interface EvaluationResult {
          score: number;
          updated: boolean;
        }
  
        // Process answers in parallel with Promise.all
        const evaluationResults = await Promise.all(
          (writingRes.data || []).map(async (answer: SubmitTestWriting): Promise<EvaluationResult> => {
            if (!answer.content?.trim()) return { score: 0, updated: false };
            
            const testWriting = testWritingMap[answer.testWriting_id];
            if (!testWriting?.topic) return { score: 0, updated: false };
            
            try {
              const scoreResult = await scoreWritingService.scoreWriting(answer.content, testWriting.topic);
              
              if (scoreResult.data) {
                const numericScore = parseFloat(scoreResult.data.score);
                
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
   
        const avgScore = answeredQuestions > 0 ? totalScore / answeredQuestions : 0;
        
        const weightedScore = (avgScore / 100) * PART_MAX_SCORE;
  
        result.parts.push({
          type: TestPartTypeEnum.WRITING,
          correctAnswers: answeredQuestions,
          totalQuestions: part.questions.length,
          score: avgScore,
          weightedScore
        });
  
        result.totalQuestions += part.questions.length;
        
        const equivalentCorrectAnswers = (avgScore / 100) * part.questions.length;
        result.correctAnswers += equivalentCorrectAnswers;
      };
  
      const prepareTestCommentData = async (): Promise<TestCommentRequestDTO> => {
      
        const requestData: TestCommentRequestDTO = {
          vocabulary: [],
          grammar: [],
          reading: [],
          listening: [],
          speaking: [],
          writing: []
        };
  
        // Xử lý vocabulary và grammar
        await Promise.all([
          // Vocabulary
          (async () => {
            if (vocabularyPart?.questions?.length) {
              const questionIds = vocabularyPart.questions;
              const [questionRes, answersRes] = await Promise.all([
                questionService.getByIdsAndStatus(questionIds,true),
                submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, questionIds)
              ]);
        
              const questions = questionRes.data || [];
              const answers = answersRes.data || [];
        
              const answerMap: Record<number, SubmitTestAnswer> = (answers as SubmitTestAnswer[]).reduce((map, answer) => {
                map[answer.question_id] = answer;
                return map;
              }, {} as Record<number, SubmitTestAnswer>);
        
              requestData.vocabulary = questions.map((question: Question) => {
                const answer = answerMap[question.id];
                const selectedAnswer = question.answers.find((a: Answer) => a.id === answer?.answer_id);
                return {
                  question: question.content,
                  choices: question.answers.map((a) => a.content),
                  userAnswer: selectedAnswer?.content || ""
                };
              });
            }
          })(),
        
          // Grammar
          (async () => {
            if (grammarPart?.questions?.length) {
              const questionIds = grammarPart.questions;
              const [questionRes, answersRes] = await Promise.all([
                questionService.getByIdsAndStatus(questionIds,true),
                submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, questionIds)
              ]);
        
              const questions = questionRes.data || [];
              const answers = answersRes.data || [];
        
              const answerMap: Record<number, SubmitTestAnswer> = (answers as SubmitTestAnswer[]).reduce((map, answer) => {
                map[answer.question_id] = answer;
                return map;
              }, {} as Record<number, SubmitTestAnswer>);
        
              requestData.grammar = questions.map((question: Question) => {
                const answer = answerMap[question.id];
                const selectedAnswer = question.answers.find((a: Answer) => a.id === answer?.answer_id);
                return {
                  question: question.content,
                  choices: question.answers.map((a) => a.content),
                  userAnswer: selectedAnswer?.content || ""
                };
              });
            }
          })()
        ]);
  
        await Promise.all([
  
          (async () => {
            if (readingPart?.questions?.length) {
              const readingRes = await testReadingService.getByIdsAndStatus(readingPart.questions,true);
              const readings = readingRes.data || [];
        
              const readingSectionsPromises = readings.map(async (reading: TestReading) => {
                if (!reading.questions?.length) return null;
        
                const [questionRes, answersRes] = await Promise.all([
                  questionService.getByIdsAndStatus(reading.questions,true),
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
            if (listeningPart?.questions?.length) {
              const listeningRes = await testListeningService.getByIdsAndStatus(listeningPart.questions,true);
              const listenings = listeningRes.data || [];
        
              const listeningSectionsPromises = listenings.map(async (listening: TestListening) => {
                if (!listening.questions?.length) return null;
        
                const [questionRes, answersRes] = await Promise.all([
                  questionService.getByIdsAndStatus(listening.questions,true),
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
          })()
        ]);
        
        // Xử lý speaking và writing
        await Promise.all([
          // Speaking
          (async () => {
            if (speakingPart?.questions?.length) {
              const speakingRes = await testSpeakingService.getByIdsAndStatus(speakingPart.questions,true);
              const speakingItems = speakingRes.data || [];
  
              const allQuestionIds: number[] = (speakingItems as any[]).reduce((ids, item) => {
                if (Array.isArray(item.questions)) {
                  ids.push(...item.questions as number[]);
                }
                return ids;
              }, []);
              
              
              if (allQuestionIds.length > 0) {
                const [questionRes, speakingAnswersRes] = await Promise.all([
                  questionService.getByIdsAndStatus(allQuestionIds,true),
                  submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(submitTestId, allQuestionIds)
                ]);
                
                const questions = questionRes.data || [];
                const answers = speakingAnswersRes.data || [];
                
                const answerMap: Record<number, any> = (answers as any[]).reduce((map, answer) => {
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
            if (writingPart?.questions?.length) {
              const [testWritingRes, writingRes] = await Promise.all([
                testWritingService.getByIdsAndStatus(writingPart.questions,true),
                submitTestWritingService.findBySubmitTestIdAndTestWritingIds(submitTestId, writingPart.questions)
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
      };

      await Promise.all([
        processSimpleParts(vocabularyPart, TestPartTypeEnum.VOCABULARY),
        processSimpleParts(grammarPart, TestPartTypeEnum.GRAMMAR),
        processSimpleParts(readingPart, TestPartTypeEnum.READING),
        processSimpleParts(listeningPart, TestPartTypeEnum.LISTENING),
        processSpeakingPart(speakingPart),
        processWritingPart(writingPart)
      ]);
      

      result.score = result.parts.reduce((sum, part) => sum + part.weightedScore, 0);
      
      const commentRequestData = await prepareTestCommentData();
      const commentResponse = await commentTestService.commentTest(commentRequestData);

      await submitTestService.patch(submitTestId, { score: result.score });
      await submitTestService.patch(submitTestId, { comment: commentResponse.data.feedback });
      await submitTestService.patch(submitTestId, { status: true });
 
      setSubmissionResult({
        ...result,
        comment: commentResponse.data.feedback,
        strengths: commentResponse.data.strengths,
        areasToImprove: commentResponse.data.areasToImprove
      } as TestResult);
      
    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [submitTestId, vocabularyPart, grammarPart, readingPart, listeningPart, speakingPart, writingPart]);
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
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
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