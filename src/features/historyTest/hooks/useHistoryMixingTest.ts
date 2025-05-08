import { useEffect, useState, useCallback, useMemo } from "react";
import { 
  TestPart,
  TestPartTypeEnum,
  SubmitTestAnswer,
  SubmitTestSpeaking,
  SubmitTestWriting,
  Answer
} from "interfaces";
import {
  testListeningService,
  testReadingService,
  testSpeakingService,
  submitTestAnswerService,
  submitTestSpeakingService,
  submitTestWritingService,
  questionService,
} from "services";

interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
  isCorrect?: boolean;
}

const useHistoryMixingTest = (parts: TestPart[], submitTestId: number) => {
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

  const vocabularyPart = useMemo(() => parts.find(p => p.type === TestPartTypeEnum.VOCABULARY), [parts]);
  const grammarPart = useMemo(() => parts.find(p => p.type === TestPartTypeEnum.GRAMMAR), [parts]);
  const readingPart = useMemo(() => parts.find(p => p.type === TestPartTypeEnum.READING), [parts]);
  const listeningPart = useMemo(() => parts.find(p => p.type === TestPartTypeEnum.LISTENING), [parts]);
  const speakingPart = useMemo(() => parts.find(p => p.type === TestPartTypeEnum.SPEAKING), [parts]);
  const writingPart = useMemo(() => parts.find(p => p.type === TestPartTypeEnum.WRITING), [parts]);

  const handleQuestionSelect = useCallback((item: QuestionItem) => {
    setActiveTab(item.partType);
    setSelectedQuestionId(item.questionId);
  }, []);

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
          const answerRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, part.questions || []);
          const answerMap: Record<number, number> = {};
          answerRes.data?.forEach((a: SubmitTestAnswer) => answerMap[a.question_id] = a.answer_id);

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
          const answerRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(submitTestId, questionIds);
          const answerMap: Record<number, number> = {};
          answerRes.data?.forEach((a: SubmitTestAnswer) => answerMap[a.question_id] = a.answer_id);

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
          const res = await submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(submitTestId, speakingQuestionIds);
          res.data.forEach((r: SubmitTestSpeaking) => {
            items.push({
              serialNumber: serial++,
              questionId: r.question_id,
              partType: type,
              isAnswered: true
            });
          });
        }

        if (type === TestPartTypeEnum.WRITING && part?.questions?.length) {
          const res = await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(submitTestId, part.questions);
          res.data.forEach((r: SubmitTestWriting) => {
            items.push({
              serialNumber: serial++,
              questionId: r.testWriting_id,
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

    fetchData();
  }, [submitTestId, parts]);

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
    writingPart
  };
};

export default useHistoryMixingTest;
