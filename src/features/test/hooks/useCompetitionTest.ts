import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { TestPart, TestPartTypeEnum, Question, TestWriting, SubmitCompetition } from "interfaces";
import { useParams } from "react-router-dom";
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
import { tr } from "date-fns/locale";

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
  const userId = 1; 
  const [competition, setCompetition] = useState<any | null>(null);
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


  useEffect(() => {
    const initializeCompetition = async () => {
      if (competitionId && !isNaN(competitionId)) {
        setLoading(true);

        try {

          const competitionResponse = await competitionTestService.findById(competitionId);
          const competitionData = competitionResponse.data;

          if (!competitionData) {
            setError("Competition not found.");
            return;
          }

          setCompetition(competitionData);


          if (competitionData.parts?.length > 0) {
            const partsResponse = await testPartService.getByIds(competitionData.parts);
            const parts: TestPart[] = partsResponse.data;
            setCompetitionParts(parts);
          }


          try {
            const submitCompetitionData = await submitCompetitionService.findByIdAndUserIdAndStatusFalse(
              competitionId, 
              userId
            );
            setSubmitCompetition(submitCompetitionData.data);
          } catch {
   
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
                const created = await submitCompetitionService.create(newSubmitCompetition);
                setSubmitCompetition(created.data);
              } catch (createErr) {
              }
            }
          }
        } catch {
          setError("Failed to load competition data.");
        } finally {
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


  const convertUrlToFile = async (url: string, fileName: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
  
    const fileType = blob.type || "audio/mp3"; 
    const file = new File([blob], fileName, { type: fileType });
  
    return file;
  };


  const handleSubmitTest = useCallback(async () => {
    if (!submitCompetition?.id) return;
    
    try {
      setIsSubmitting(true);
      setIsSubmitDialogOpen(true);
      
      const result = {
        totalQuestions: 0,
        correctAnswers: 0,
        score: 0,
        parts: [] as {
          type: TestPartTypeEnum;
          correctAnswers: number;
          totalQuestions: number;
          score: number;
        }[]
      };
      
      const processSimpleParts = async (part: TestPart | undefined, type: TestPartTypeEnum) => {
        if (!part?.questions?.length) return;
        
        let totalQuestions = 0;
        let correctAnswers = 0;
        
        let questionIds: number[] = [];
        
        if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR) {
          questionIds = [...part.questions];
        } else if (type === TestPartTypeEnum.READING || type === TestPartTypeEnum.LISTENING) {
          const res = type === TestPartTypeEnum.READING
            ? await testReadingService.getByIdsAndStatus(part.questions,true)
            : await testListeningService.getByIdsAndStatus(part.questions,true)
            
          for (const item of res.data || []) {
            if (item.questions) questionIds.push(...item.questions);
          }
        }
        
        if (questionIds.length === 0) return;
        totalQuestions = questionIds.length;
        
        const answersRes = await submitCompetitionAnswerService.findBySubmitCompetitionIdAndQuestionIds(
          submitCompetition.id,
          questionIds
        );
        
        if (!answersRes?.data?.length) {
          result.parts.push({
            type,
            correctAnswers: 0,
            totalQuestions,
            score: 0
          });
          return;
        }
        
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
        
        const partScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
        
        result.parts.push({
          type,
          correctAnswers,
          totalQuestions,
          score: partScore
        });
        
        result.totalQuestions += totalQuestions;
        result.correctAnswers += correctAnswers;
      };
      
      const processSpeakingPart = async (part: TestPart | undefined) => {
        if (!part?.questions?.length) return;
        
        const speakingRes = await testSpeakingService.getByIdsAndStatus(part.questions,true)
        const speakingItems = speakingRes.data || [];
        
        const allQuestionIds: number[] = [];
        for (const item of speakingItems) {
          if (item.questions) allQuestionIds.push(...item.questions);
        }
        
        if (allQuestionIds.length === 0) return;
        
        const speakingAnswersRes = await submitCompetitionSpeakingService.findBySubmitCompetitionIdAndQuestionIds(
          submitCompetition.id,
          allQuestionIds
        );
        
        if (!speakingAnswersRes?.data?.length) {
          result.parts.push({
            type: TestPartTypeEnum.SPEAKING,
            correctAnswers: 0,
            totalQuestions: allQuestionIds.length,
            score: 0
          });
          return;
        }
        
        const questionRes = await questionService.getByIdsAndStatus(allQuestionIds,true);
        const questions = questionRes.data || [];
        
        let totalScore = 0;
        let answeredQuestions = 0;
        
        for (const answer of speakingAnswersRes.data) {
          if (answer.file) {
            const matchedQuestion = questions.find(
              (q: Question) => q.id === answer.question_id
            );
            const expectedText = matchedQuestion?.content || "";
            
            try {
              const file = await convertUrlToFile(answer.file, `recording_${answer.id}.mp3`);
              
              const scoreResult = await scoreSpeakingService.evaluateSpeechInTopic(
                file,
                expectedText
              );
              
              if (scoreResult.data) {
                const numericScore = parseFloat(scoreResult.data.score);
                
                await submitCompetitionSpeakingService.update(
                  answer.id,
                  {
                    ...answer,
                    score: numericScore,
                    transcript: scoreResult.data.transcript,
                  }
                );
                
                totalScore += numericScore;
                answeredQuestions++;
              }
            } catch (error) {
              console.error("Error evaluating speaking:", error);
            }
          }
        }
        
        const avgScore = answeredQuestions > 0 ? totalScore / answeredQuestions : 0;
        
        result.parts.push({
          type: TestPartTypeEnum.SPEAKING,
          correctAnswers: answeredQuestions,
          totalQuestions: allQuestionIds.length,
          score: avgScore
        });
        
        result.totalQuestions += allQuestionIds.length;
        result.correctAnswers += (avgScore / 100) * allQuestionIds.length;
      };
      
      const processWritingPart = async (part: TestPart | undefined) => {
        if (!part?.questions?.length) return;
        
        const testWritingRes = await testWritingService.getByIdsAndStatus(part.questions,true)
        const testWritings = testWritingRes.data || [];
        
        const writingRes = await submitCompetitionWritingService.findBySubmitCompetitionIdAndTestWritingIds(
          submitCompetition.id,
          part.questions
        );
        
        if (!writingRes?.data?.length) {
          result.parts.push({
            type: TestPartTypeEnum.WRITING,
            correctAnswers: 0,
            totalQuestions: part.questions.length,
            score: 0,
          });
          return;
        }
        
        let totalScore = 0;
        let answeredQuestions = 0;
        
        for (const answer of writingRes.data) {
          if (answer.content && answer.content.trim() !== "") {
            try {
              const testWriting = testWritings.find(
                (tw: TestWriting) => tw.id === answer.CompetitionWriting_id
              );
              
              if (testWriting && testWriting.topic) {
                const scoreResult = await scoreWritingService.scoreWriting(
                  answer.content,
                  testWriting.topic
                );
                
                if (scoreResult.data) {
                  const numericScore = parseFloat(scoreResult.data.score);
                  
                  await submitCompetitionWritingService.update(answer.id, {
                    ...answer,
                    score: numericScore,
                  });
                  
                  totalScore += numericScore;
                  answeredQuestions++;
                }
              }
            } catch (error) {
              console.error("Error evaluating writing:", error);
            }
          }
        }
        
        const avgScore = answeredQuestions > 0 ? totalScore / answeredQuestions : 0;
        
        result.parts.push({
          type: TestPartTypeEnum.WRITING,
          correctAnswers: answeredQuestions,
          totalQuestions: part.questions.length,
          score: avgScore,
        });
        
        result.totalQuestions += part.questions.length;
        result.correctAnswers += (avgScore / 100) * part.questions.length;
      };
      
      await processSimpleParts(vocabularyPart, TestPartTypeEnum.VOCABULARY);
      await processSimpleParts(grammarPart, TestPartTypeEnum.GRAMMAR);
      await processSimpleParts(readingPart, TestPartTypeEnum.READING);
      await processSimpleParts(listeningPart, TestPartTypeEnum.LISTENING);
      await processSpeakingPart(speakingPart);
      await processWritingPart(writingPart);
      
      if (result.totalQuestions > 0) {
        result.score = (result.correctAnswers / result.totalQuestions) * 100;
      }
      
      if (submitCompetition?.id) {
        await submitCompetitionService.patch(submitCompetition.id, {
          ...submitCompetition,
          score: result.score,
          status: true
        });
      }
      
      setSubmissionResult(result);
      
    } catch (error) {
      console.error("Error submitting competition test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    submitCompetition, 
    vocabularyPart, 
    grammarPart, 
    readingPart, 
    listeningPart, 
    speakingPart, 
    writingPart
  ]);
  

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
    renderedSectionsRef
  };
}