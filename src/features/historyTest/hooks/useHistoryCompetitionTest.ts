import { useEffect, useState, useCallback, useMemo } from "react";
import {
  TestPart,
  TestPartTypeEnum,
  SubmitCompetitionAnswer,
  SubmitCompetitionSpeaking,
  SubmitCompetitionWriting,
  Answer,
  Question,
} from "interfaces";
import {
  competitionTestService,
  submitCompetitionService,
  testPartService,
  testListeningService,
  testReadingService,
  testSpeakingService,
  submitCompetitionAnswerService,
  submitCompetitionSpeakingService,
  submitCompetitionWritingService,
  testWritingService,
  questionService,
} from "services";
import { useParams } from "react-router-dom";

interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
  isCorrect?: boolean;
  score?: number;
}

interface PartScore {
  type: TestPartTypeEnum;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  weightedScore: number;
}

const useHistoryCompetitionTest = () => {
  const { id } = useParams();
  const submitCompetitionId = Number(id);
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);
  const [partScores, setPartScores] = useState<PartScore[]>([]);
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
  const [submitCompetition, setSubmitCompetition] = useState<any>(null);
  const [competition, setCompetition] = useState<any>(null);
  const [competitionParts, setCompetitionParts] = useState<TestPart[]>([]);
  const [loading, setLoading] = useState(true);

  const vocabularyPart = useMemo(() => competitionParts.find(p => p.type === TestPartTypeEnum.VOCABULARY), [competitionParts]);
  const grammarPart = useMemo(() => competitionParts.find(p => p.type === TestPartTypeEnum.GRAMMAR), [competitionParts]);
  const readingPart = useMemo(() => competitionParts.find(p => p.type === TestPartTypeEnum.READING), [competitionParts]);
  const listeningPart = useMemo(() => competitionParts.find(p => p.type === TestPartTypeEnum.LISTENING), [competitionParts]);
  const speakingPart = useMemo(() => competitionParts.find(p => p.type === TestPartTypeEnum.SPEAKING), [competitionParts]);
  const writingPart = useMemo(() => competitionParts.find(p => p.type === TestPartTypeEnum.WRITING), [competitionParts]);

  const handleQuestionSelect = useCallback((item: QuestionItem) => {
    setActiveTab(item.partType);
    setSelectedQuestionId(item.questionId);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const submitRes = await submitCompetitionService.findById(submitCompetitionId);
        const submit = submitRes.data;
        setSubmitCompetition(submit);

        const compRes = await competitionTestService.findById(submit.competition_id);
        const comp = compRes.data;
        setCompetition(comp);
        const partsRes = await testPartService.getByIds(comp.parts);
        setCompetitionParts(partsRes.data);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [submitCompetitionId]);

  useEffect(() => {
    const fetchData = async () => {
      let serial = 1;
      const items: QuestionItem[] = [];
      const tempStartSerials: Record<TestPartTypeEnum, number> = {
        [TestPartTypeEnum.VOCABULARY]: 0,
        [TestPartTypeEnum.GRAMMAR]: 0,
        [TestPartTypeEnum.READING]: 0,
        [TestPartTypeEnum.LISTENING]: 0,
        [TestPartTypeEnum.SPEAKING]: 0,
        [TestPartTypeEnum.WRITING]: 0,
      };
  
      const fetchAndAppend = async (part: TestPart | undefined, type: TestPartTypeEnum) => {
        if (!part) return;
  
        tempStartSerials[type] = serial;
  
        if ([TestPartTypeEnum.VOCABULARY, TestPartTypeEnum.GRAMMAR].includes(type)) {
          const res = await questionService.getByIdsAndStatus(part.questions || [], true);
          const answerRes = await submitCompetitionAnswerService.findBySubmitCompetitionIdAndQuestionIds(submitCompetitionId, part.questions || []);
          const answerMap: Record<number, number> = {};
          answerRes.data?.forEach((a: SubmitCompetitionAnswer) => answerMap[a.question_id] = a.answer_id);
  
          for (const q of res.data || []) {
            const chosenId = answerMap[q.id];
            const correctId = q.answers?.find((a: Answer) => a.correct)?.id;
            items.push({
              serialNumber: serial++,
              questionId: q.id,
              partType: type,
              isAnswered: !!chosenId,
              isCorrect: chosenId === correctId
            });
          }
        }
  
        if ([TestPartTypeEnum.READING, TestPartTypeEnum.LISTENING].includes(type)) {
          const service = type === TestPartTypeEnum.READING ? testReadingService : testListeningService;
          const wrapperRes = await service.getByIdsAndStatus(part.questions || [], true);
          const questionIds = wrapperRes.data.flatMap((wr: any) => wr.questions);
          const questionRes = await questionService.getByIdsAndStatus(questionIds, true);
          const answerRes = await submitCompetitionAnswerService.findBySubmitCompetitionIdAndQuestionIds(submitCompetitionId, questionIds);
          const answerMap: Record<number, number> = {};
          answerRes.data?.forEach((a: SubmitCompetitionAnswer) => answerMap[a.question_id] = a.answer_id);
  
          for (const q of questionRes.data || []) {
            const chosenId = answerMap[q.id];
            const correctId = q.answers?.find((a: Answer) => a.correct)?.id;
            items.push({
              serialNumber: serial++,
              questionId: q.id,
              partType: type,
              isAnswered: !!chosenId,
              isCorrect: chosenId === correctId
            });
          }
        }
  
        if (type === TestPartTypeEnum.SPEAKING && part?.questions?.length) {
          const wrappers = await testSpeakingService.getByIdsAndStatus(part.questions, true);
          const speakingQuestionIds = wrappers.data.flatMap((s: any) => s.questions || []);
        
          const questionRes = await questionService.getByIdsAndStatus(speakingQuestionIds, true);
          const res = await submitCompetitionSpeakingService.findBySubmitCompetitionIdAndQuestionIds(submitCompetitionId, speakingQuestionIds);
        
          const answeredMap: Record<number, boolean> = {};
          const scoreMap: Record<number, number> = {};
          res.data.forEach((r: SubmitCompetitionSpeaking) => {
            answeredMap[r.question_id] = true;
            scoreMap[r.question_id] = r.score || 0;
          });
        
          questionRes.data.forEach((q: Question) => {
            items.push({
              serialNumber: serial++,
              questionId: q.id,
              partType: type,
              isAnswered: !!answeredMap[q.id],
              score: scoreMap[q.id] || 0
            });
          });
        }
        
        if (type === TestPartTypeEnum.WRITING && part?.questions?.length) {
          const wrappers = await testWritingService.getByIdsAndStatus(part.questions, true);
          const res = await submitCompetitionWritingService.findBySubmitCompetitionIdAndTestWritingIds(submitCompetitionId, part.questions);
     
          const answerMap: Record<number, string> = {};
          const scoreMap: Record<number, number> = {};
          res.data.forEach((r: SubmitCompetitionWriting) => {
            answerMap[r.competitionWriting_id] = r.content || '';
            scoreMap[r.competitionWriting_id] = r.score || 0;
          });
        
          wrappers.data.forEach((w: any) => {
            items.push({
              serialNumber: serial++,
              questionId: w.id,
              partType: type,
              isAnswered: !!answerMap[w.id]?.trim(),
              score: scoreMap[w.id] || 0
            });
          });
        }
      };
  
      await fetchAndAppend(vocabularyPart, TestPartTypeEnum.VOCABULARY);
      await fetchAndAppend(grammarPart, TestPartTypeEnum.GRAMMAR);
      await fetchAndAppend(readingPart, TestPartTypeEnum.READING);
      await fetchAndAppend(listeningPart, TestPartTypeEnum.LISTENING);
      await fetchAndAppend(speakingPart, TestPartTypeEnum.SPEAKING);
      await fetchAndAppend(writingPart, TestPartTypeEnum.WRITING);
  
      setStartSerials(tempStartSerials);
      setAllQuestions(items);
    };
  
    if (submitCompetition && competitionParts.length > 0) {
      fetchData();
    }
  }, [submitCompetitionId, submitCompetition, competitionParts, vocabularyPart, grammarPart, readingPart, listeningPart, speakingPart, writingPart]);

  const sectionScores = useMemo(() => {
    const TOTAL_SCORE = 100;
    const PART_COUNT = 6;
    const PART_MAX_SCORE = TOTAL_SCORE / PART_COUNT;
  
    const scores = {
      [TestPartTypeEnum.VOCABULARY]: 0,
      [TestPartTypeEnum.GRAMMAR]: 0,
      [TestPartTypeEnum.READING]: 0,
      [TestPartTypeEnum.LISTENING]: 0,
      [TestPartTypeEnum.SPEAKING]: 0,
      [TestPartTypeEnum.WRITING]: 0,
    };
  
    // Group questions by part type
    const questionsByPart = allQuestions.reduce((acc, question) => {
      if (!acc[question.partType]) {
        acc[question.partType] = [];
      }
      acc[question.partType].push(question);
      return acc;
    }, {} as Record<TestPartTypeEnum, typeof allQuestions>);
  
    Object.entries(questionsByPart).forEach(([partType, questions]) => {
      const totalQuestions = questions.length;
      
      if (totalQuestions === 0) {
        scores[partType as TestPartTypeEnum] = 0;
        return;
      }
  
      if (partType === TestPartTypeEnum.SPEAKING) {
        const answeredQuestions = questions.filter(q => q.isAnswered).length;
        const questionCount = totalQuestions;
        const maxScorePerQuestion = PART_MAX_SCORE / questionCount;
        
        if (questions.some(q => q.score !== undefined)) {
          // Nếu có điểm đã được đánh giá, sử dụng điểm đó
          const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0);
          scores[partType as TestPartTypeEnum] = totalScore;
        } else {
          // Nếu chưa có điểm, dự đoán dựa trên số câu trả lời
          scores[partType as TestPartTypeEnum] = answeredQuestions * maxScorePerQuestion;
        }
      }
      else if (partType === TestPartTypeEnum.WRITING) {
        const answeredQuestions = questions.filter(q => q.isAnswered).length;
        const questionCount = totalQuestions;
        const maxScorePerQuestion = PART_MAX_SCORE / questionCount;
        
        if (questions.some(q => q.score !== undefined)) {
          // Nếu có điểm đã được đánh giá, sử dụng điểm đó
          const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0);
          scores[partType as TestPartTypeEnum] = totalScore;
        } else {
          // Nếu chưa có điểm, dự đoán dựa trên số câu trả lời
          scores[partType as TestPartTypeEnum] = answeredQuestions * maxScorePerQuestion;
        }
      } 
      else {
        const correctAnswers = questions.filter(q => q.isCorrect === true).length;
        const partScore = (correctAnswers / totalQuestions) * 100;
        scores[partType as TestPartTypeEnum] = (partScore / 100) * PART_MAX_SCORE;
      }
    });
  
    return scores;
  }, [allQuestions]);

  return {
    allQuestions,
    startSerials,
    activeTab,
    setActiveTab,
    selectedQuestionId,
    setSelectedQuestionId,
    handleQuestionSelect,
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
    submitCompetition,
    loading,
    competition,
    sectionScores
  };
};

export default useHistoryCompetitionTest;