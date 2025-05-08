import { useEffect, useState, useCallback, useMemo } from "react";
import {
  TestPart,
  TestPartTypeEnum,
  SubmitCompetitionAnswer,
  SubmitCompetitionSpeaking,
  SubmitCompetitionWriting,
  Answer
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
  questionService,
} from "services";
import { useParams } from "react-router-dom";

interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
  isCorrect?: boolean;
}

const useHistoryCompetitionTest = () => {
  const { id } = useParams();
  const submitCompetitionId = Number(id);
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
          const res = await questionService.getByIds(part.questions || []);
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
          const wrapperRes = await service.getByIds(part.questions || []);
          const questionIds = wrapperRes.data.flatMap((wr: any) => wr.questions);
          const questionRes = await questionService.getByIds(questionIds);
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
          const wrappers = await testSpeakingService.getByIds(part.questions);
          const speakingQuestionIds = wrappers.data.flatMap((s: any) => s.questions || []);
          const res = await submitCompetitionSpeakingService.findBySubmitCompetitionIdAndQuestionIds(submitCompetitionId, speakingQuestionIds);
          res.data.forEach((r: SubmitCompetitionSpeaking) => {
            items.push({
              serialNumber: serial++,
              questionId: r.question_id,
              partType: type,
              isAnswered: true
            });
          });
        }

        if (type === TestPartTypeEnum.WRITING && part?.questions?.length) {
          const res = await submitCompetitionWritingService.findBySubmitCompetitionIdAndTestWritingIds(submitCompetitionId, part.questions);
          res.data.forEach((r: SubmitCompetitionWriting) => {
            items.push({
              serialNumber: serial++,
              questionId: r.CompetitionWriting_id,
              partType: type,
              isAnswered: !!r.content?.trim()
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
  }, [submitCompetitionId, submitCompetition, competitionParts]);

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
    competition
  };
};

export default useHistoryCompetitionTest;
