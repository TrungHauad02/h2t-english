import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { TestPart, TestPartTypeEnum, Question, TestWriting, SubmitCompetition,SubmitCompetitionAnswer,SubmitCompetitionSpeaking,SubmitCompetitionWriting, CompetitionTest } from "interfaces";
import { useParams } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { 
  competitionTestService,
  testPartService,
  submitCompetitionService,
  testReadingService, 
  testListeningService, 
  testSpeakingService,
  submitCompetitionAnswerService,
  submitCompetitionSpeakingService,
  submitCompetitionWritingService,
  questionService,
  scoreSpeakingService,
  scoreWritingService,
  testWritingService
} from "services";

interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
}

// Ordre des onglets
const tabOrder: TestPartTypeEnum[] = [
  TestPartTypeEnum.VOCABULARY,
  TestPartTypeEnum.GRAMMAR,
  TestPartTypeEnum.READING,
  TestPartTypeEnum.LISTENING,
  TestPartTypeEnum.SPEAKING,
  TestPartTypeEnum.WRITING,
];

export default function useCompetitionTest() {
  const { id } = useParams();
  const competitionId = Number(id);
  const userId = Number(useAuth().userId);
  const [competition, setCompetition] = useState<CompetitionTest | null>(null);
  const [competitionParts, setCompetitionParts] = useState<TestPart[]>([]);
  const [submitCompetition, setSubmitCompetition] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  const hasCreatedSubmitCompetitionRef = useRef(false);

  const renderedSectionsRef = useRef<Record<TestPartTypeEnum, React.ReactNode>>({
    [TestPartTypeEnum.VOCABULARY]: null,
    [TestPartTypeEnum.GRAMMAR]: null,
    [TestPartTypeEnum.READING]: null,
    [TestPartTypeEnum.LISTENING]: null,
    [TestPartTypeEnum.SPEAKING]: null,
    [TestPartTypeEnum.WRITING]: null,
  });

  const vocabularyPart = useMemo(() => 
    competitionParts.find(part => part.type === TestPartTypeEnum.VOCABULARY), 
    [competitionParts]
  );
  
  const grammarPart = useMemo(() => 
    competitionParts.find(part => part.type === TestPartTypeEnum.GRAMMAR), 
    [competitionParts]
  );
  
  const readingPart = useMemo(() => 
    competitionParts.find(part => part.type === TestPartTypeEnum.READING), 
    [competitionParts]
  );
  
  const listeningPart = useMemo(() => 
    competitionParts.find(part => part.type === TestPartTypeEnum.LISTENING), 
    [competitionParts]
  );
  
  const speakingPart = useMemo(() => 
    competitionParts.find(part => part.type === TestPartTypeEnum.SPEAKING), 
    [competitionParts]
  );
  
  const writingPart = useMemo(() => 
    competitionParts.find(part => part.type === TestPartTypeEnum.WRITING), 
    [competitionParts]
  );

  // Helper function to check if competition has ended
  const hasCompetitionEnded = useCallback(() => {
    if (!competition) return false;
    const now = new Date();
    const endTime = new Date(competition.endTime);
    return now > endTime;
  }, [competition]);

  // Helper function to check if user has completed test
  const hasCompletedTest = useCallback(() => {
    return submitCompetition?.status === true;
  }, [submitCompetition]);

  useEffect(() => {
    const initializeCompetition = async () => {
      if (competitionId && !isNaN(competitionId)) {
        setLoading(true);
        
        try {
          const competitionResponse = await competitionTestService.findById(competitionId);
          const competitionData = competitionResponse.data;

          if (!competitionData) {
            setError("Competition not found.");
            setLoading(false);
            return;
          }

          setCompetition(competitionData);

          if (competitionData.parts?.length > 0) {
            const partsResponse = await testPartService.getByIds(competitionData.parts);
            const parts: TestPart[] = partsResponse.data;
            setCompetitionParts(parts);
          }

          // Check if competition has ended - if so, don't search for submissions or create new ones
          const now = new Date();
          const endTime = new Date(competitionData.endTime);
          if (now > endTime) {
            console.log("Competition has ended, not searching for submissions or creating new ones");
            setLoading(false);
            return;
          }

          // Check for existing submissions only if competition is still active
          try {
            const submitCompetitionTrue = await submitCompetitionService.findByIdAndUserIdAndStatus(
              competitionId, 
              userId,
              true
            );
            console.log("Found submit competition with status true:", submitCompetitionTrue.data);
            setSubmitCompetition(submitCompetitionTrue.data);
            setLoading(false);
            return; 
          } catch (errorTrue) {
            console.log("No submission with status true found");
          }

          try {
            const submitCompetitionFalse = await submitCompetitionService.findByIdAndUserIdAndStatus(
              competitionId, 
              userId,
              false
            );
            console.log("Found submit competition with status false:", submitCompetitionFalse.data);
            setSubmitCompetition(submitCompetitionFalse.data);
            setLoading(false);
            return;
          } catch (errorFalse) {
            console.log("No submission with status false found");
          }

          // Only create new submission if competition is still active and user hasn't submitted
          if (!hasCreatedSubmitCompetitionRef.current) {
            hasCreatedSubmitCompetitionRef.current = true;
      
            const newSubmitCompetition: SubmitCompetition = {
              id: 0,
              user_id: userId,
              competition_id: competitionId,
              score: 0,
              status: false,
            };

            try {
              console.log("Creating new submit competition");
              const created = await submitCompetitionService.create(newSubmitCompetition);
              setSubmitCompetition(created.data);
            } catch (createErr) {
              console.error("Failed to create submit competition:", createErr);
            }
          }
          
          setLoading(false);
        } catch (error) {
          console.error("Error in initializeCompetition:", error);
          setError("Failed to load competition data.");
          setLoading(false);
        }
      } else {
        setError("Invalid competition ID");
        setLoading(false);
      }
    };

    initializeCompetition();
  }, [competitionId, userId]);

  const loadInitialAnsweredQuestions = useCallback(async () => {
    if (!submitCompetition?.id) return;
    
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
        const answersRes = await submitCompetitionAnswerService.findBySubmitCompetitionIdAndQuestionIds(
          submitCompetition.id, 
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
        const speakingAnswersRes = await submitCompetitionSpeakingService.findBySubmitCompetitionIdAndQuestionIds(
          submitCompetition.id,
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
        const writingAnswersRes = await submitCompetitionWritingService.findBySubmitCompetitionIdAndTestWritingIds(
          submitCompetition.id,
          writingPart.questions
        );
        
        if (writingAnswersRes?.data) {
          const tempAnswered = { ...answeredQuestionsRef.current };
          writingAnswersRes.data.forEach((answer: any) => {
            if (answer.content && answer.content.trim() !== '') {
              tempAnswered[answer.CompetitionWriting_id] = true;
            }
          });
          
          setAnsweredQuestions(tempAnswered);
          answeredQuestionsRef.current = tempAnswered;
        }
      }
    } catch (error) {
      console.error("Error loading initial answered questions:", error);
    }
  }, [
    submitCompetition?.id, 
    vocabularyPart, 
    grammarPart, 
    readingPart, 
    listeningPart, 
    speakingPart, 
    writingPart
  ]);

  const loadQuestions = useCallback(async () => {
    if (!submitCompetition?.id) return;
  
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
      }
  
      if (type === TestPartTypeEnum.READING) {
        const res = await testReadingService.getByIdsAndStatus(part.questions, true);
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
  
      if (type === TestPartTypeEnum.LISTENING) {
        const res = await testListeningService.getByIdsAndStatus(part.questions, true);
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
  
      if (type === TestPartTypeEnum.SPEAKING) {
        const res = await testSpeakingService.getByIdsAndStatus(part.questions, true);
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
    }
  
    setStartSerials(tempStartSerials);
    setAllQuestions(tempQuestions);
    setIsInitialDataLoaded(true);
  }, [
    submitCompetition?.id,
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart
  ]);

  useEffect(() => {
    const initializeData = async () => {
      if (submitCompetition?.id) {
        await loadInitialAnsweredQuestions();
        await loadQuestions();
      }
    };
    
    initializeData();
  }, [submitCompetition?.id, loadInitialAnsweredQuestions, loadQuestions]);

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
    if (!submitCompetition?.id) return;
    
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
      
      interface CompetitionResult {
        totalQuestions: number;
        correctAnswers: number;
        score: number;
        parts: PartResult[];
      }
      
      const TOTAL_SCORE = 100;
      const PART_COUNT = 6;
      const PART_MAX_SCORE = TOTAL_SCORE / PART_COUNT;
      
      const result: CompetitionResult = {
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
  
      // Helper function to get question IDs for different part types
      const getQuestionIds = async (part: TestPart | undefined, type: TestPartTypeEnum): Promise<number[]> => {
        if (!part?.questions?.length) return [];
        
        if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR) {
          return [...part.questions];
        }
        
        if (type === TestPartTypeEnum.READING || type === TestPartTypeEnum.LISTENING) {
          const service = type === TestPartTypeEnum.READING ? testReadingService : testListeningService;
          const res = await service.getByIdsAndStatus(part.questions, true);
          
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
          submitCompetitionAnswerService.findBySubmitCompetitionIdAndQuestionIds(submitCompetition.id, questionIds),
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
        
        const correctAnswers = (answersRes.data as SubmitCompetitionAnswer[]).reduce((count, submitAnswer) => {
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
      };
      
      // Process Speaking part
      const processSpeakingPart = async (part: TestPart | undefined): Promise<void> => {
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
          submitCompetitionSpeakingService.findBySubmitCompetitionIdAndQuestionIds(submitCompetition.id, allQuestionIds),
          questionService.getByIdsAndStatus(allQuestionIds, true)
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
        
        const questionCount = allQuestionIds.length;
        const maxScorePerQuestion = PART_MAX_SCORE / questionCount;
  
        const evaluationResults = await Promise.all(
          (speakingAnswersRes.data || []).map(async (answer: SubmitCompetitionSpeaking): Promise<EvaluationResult> => {
            if (!answer.file) return { score: 0, updated: false };
            
            const question = questionMap[answer.question_id];
            const expectedText = question?.content || "";
            
            try {
              const file = await convertUrlToFile(answer.file, `recording_${answer.id}.mp3`);
              const scoreResult = await scoreSpeakingService.evaluateSpeechInTopic(file, expectedText);
              
              if (scoreResult.data) {
                const rawScore = parseFloat(scoreResult.data.score);
                const numericScore = (rawScore / 100) * maxScorePerQuestion;
                
                await submitCompetitionSpeakingService.update(answer.id, {
                  ...answer,
                  score: numericScore,
                  transcript: scoreResult.data.transcript,
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
        
        const avgScore = totalScore;
        const weightedScore = totalScore;
  
        result.parts.push({
          type: TestPartTypeEnum.SPEAKING,
          correctAnswers: answeredQuestions,
          totalQuestions: allQuestionIds.length,
          score: (avgScore / PART_MAX_SCORE) * 100,
          weightedScore: weightedScore
        });
  
        result.totalQuestions += allQuestionIds.length;
        
        const equivalentCorrectAnswers = (avgScore / PART_MAX_SCORE) * allQuestionIds.length;
        result.correctAnswers += equivalentCorrectAnswers;
      };
  
      // Process Writing part
      const processWritingPart = async (part: TestPart | undefined): Promise<void> => {
        if (!part?.questions?.length) return;
  
        const [testWritingRes, writingRes] = await Promise.all([
          testWritingService.getByIdsAndStatus(part.questions, true),
          submitCompetitionWritingService.findBySubmitCompetitionIdAndTestWritingIds(submitCompetition.id, part.questions)
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
  
        interface EvaluationResult {
          score: number;
          updated: boolean;
        }
  
        const evaluationResults = await Promise.all(
          (writingRes.data || []).map(async (answer: SubmitCompetitionWriting): Promise<EvaluationResult> => {
            if (!answer.content?.trim()) return { score: 0, updated: false };
            
            const testWriting = testWritingMap[answer.competitionWriting_id];
            if (!testWriting?.topic) return { score: 0, updated: false };
            
            try {
              const scoreResult = await scoreWritingService.scoreWriting(answer.content, testWriting.topic);
              
              if (scoreResult.data) {
                const rawScore = parseFloat(scoreResult.data.score);
                const numericScore = (rawScore / 100) * maxScorePerQuestion;
                
                await submitCompetitionWritingService.patch(answer.id, {
                  score: numericScore,
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
        
        const avgScore = totalScore;
        const weightedScore = totalScore;
  
        result.parts.push({
          type: TestPartTypeEnum.WRITING,
          correctAnswers: answeredQuestions,
          totalQuestions: part.questions.length,
          score: (avgScore / PART_MAX_SCORE) * 100,
          weightedScore: weightedScore
        });
  
        result.totalQuestions += part.questions.length;
        
        const equivalentCorrectAnswers = (avgScore / PART_MAX_SCORE) * part.questions.length;
        result.correctAnswers += equivalentCorrectAnswers;
      };
  
      // Process all parts in parallel
      await Promise.all([
        processSimpleParts(vocabularyPart, TestPartTypeEnum.VOCABULARY),
        processSimpleParts(grammarPart, TestPartTypeEnum.GRAMMAR),
        processSimpleParts(readingPart, TestPartTypeEnum.READING),
        processSimpleParts(listeningPart, TestPartTypeEnum.LISTENING),
        processSpeakingPart(speakingPart),
        processWritingPart(writingPart)
      ]);
      
      // Calculate final weighted score
      result.score = result.parts.reduce((sum, part) => sum + part.weightedScore, 0);
      
      // Update competition score and status
      await submitCompetitionService.patch(submitCompetition.id, { 
        score: result.score,
        status: true
      });
  
      setSubmissionResult(result);
      
    } catch (error) {
      console.error("Error submitting competition test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [submitCompetition?.id, vocabularyPart, grammarPart, readingPart, listeningPart, speakingPart, writingPart]);
  
  const closeSubmitDialog = useCallback(() => {
    setIsSubmitDialogOpen(false);
  }, []);

  return {
    competition,
    competitionParts,
    submitCompetition,
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
    loading,
    error,
    setActiveTab,
    setSelectedQuestionId,
    handleQuestionSelect,
    handleUpdateAnsweredQuestions,
    handleSubmitTest,
    closeSubmitDialog,
    renderedSectionsRef,
    userId,
    hasCompetitionEnded,
    hasCompletedTest
  };
}