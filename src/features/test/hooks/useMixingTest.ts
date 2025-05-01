import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { TestPart, TestPartTypeEnum } from "interfaces";
import { 
  testReadingService, 
  testListeningService, 
  testSpeakingService,
  submitTestAnswerService,
  submitTestSpeakingService,
  submitTestWritingService,
  questionService
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
  
  // Sử dụng useRef để tránh re-render không cần thiết
  const answeredQuestionsRef = useRef<Record<number, boolean>>({});
  // Lưu trữ các component đã render để tránh render lại
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

  // Hàm lấy danh sách câu hỏi đã trả lời sớm khi component mount
  const loadInitialAnsweredQuestions = useCallback(async () => {
    if (!submitTestId) return;
    
    try {
      // Lấy danh sách tất cả câu hỏi từ tất cả phần thi
      const allQuestionIds: number[] = [];
      
      // Lấy câu hỏi từ phần vocabulary và grammar (câu hỏi trực tiếp)
      if (vocabularyPart?.questions) allQuestionIds.push(...vocabularyPart.questions);
      if (grammarPart?.questions) allQuestionIds.push(...grammarPart.questions);
      
      // Lấy câu hỏi từ các phần khác (cần truy vấn API)
      if (readingPart?.questions?.length) {
        const readingRes = await testReadingService.getByIds(readingPart.questions);
        for (const item of readingRes.data || []) {
          if (item.questions) allQuestionIds.push(...item.questions);
        }
      }
      
      if (listeningPart?.questions?.length) {
        const listeningRes = await testListeningService.getByIds(listeningPart.questions);
        for (const item of listeningRes.data || []) {
          if (item.questions) allQuestionIds.push(...item.questions);
        }
      }
      
      if (speakingPart?.questions?.length) {
        const speakingRes = await testSpeakingService.getByIds(speakingPart.questions);
        for (const item of speakingRes.data || []) {
          if (item.questions) allQuestionIds.push(...item.questions);
        }
      }
      
      // Lấy danh sách câu trả lời đã lưu
      // Truy vấn câu trả lời cho các loại câu hỏi thông thường (vocabulary, grammar, reading, listening)
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
        const res = await testReadingService.getByIds(part.questions);
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
        const res = await testListeningService.getByIds(part.questions);
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
        const res = await testSpeakingService.getByIds(part.questions);
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
      // Chỉ cập nhật khi giá trị thực sự thay đổi
      if (prev[questionId] === isAnswered) {
        return prev;
      }
      return {
        ...prev,
        [questionId]: isAnswered
      };
    });
  }, []);

  // Hàm xử lý submit test và tính điểm
  const handleSubmitTest = useCallback(async () => {
    if (!submitTestId) return;
    
    try {
      setIsSubmitting(true);
      setIsSubmitDialogOpen(true);
      
      // Kết quả tính điểm
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
      
      // Xử lý các phần thi vocabulary, grammar, reading, listening
      const processSimpleParts = async (part: TestPart | undefined, type: TestPartTypeEnum) => {
        if (!part?.questions?.length) return;
        
        let totalQuestions = 0;
        let correctAnswers = 0;
        
        // Lấy danh sách câu hỏi
        let questionIds: number[] = [];
        
        if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR) {
          questionIds = [...part.questions];
        } else if (type === TestPartTypeEnum.READING || type === TestPartTypeEnum.LISTENING) {
          const res = type === TestPartTypeEnum.READING
            ? await testReadingService.getByIds(part.questions)
            : await testListeningService.getByIds(part.questions);
            
          for (const item of res.data || []) {
            if (item.questions) questionIds.push(...item.questions);
          }
        }
        
        if (questionIds.length === 0) return;
        totalQuestions = questionIds.length;
        
        // Lấy danh sách câu trả lời
        const answersRes = await submitTestAnswerService.findBySubmitTestIdAndQuestionIds(
          submitTestId,
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
        
        // Lấy thông tin câu hỏi để kiểm tra đáp án
        const questionRes = await questionService.getByIds(questionIds);
        const questions = questionRes.data || [];
        
        // Tạo map câu hỏi để dễ truy cập
        const questionMap: Record<number, any> = {};
        for (const q of questions) {
          questionMap[q.id] = q;
        }
        
        // Kiểm tra câu trả lời đúng/sai
        for (const answer of answersRes.data) {
          const questionId = answer.question_id;
          const answerId = answer.answer_id;
          
          // Lấy câu hỏi và các đáp án của nó
          const question = questionMap[questionId];
          
          if (question && answerId && question.answers) {
            // Tìm đáp án người dùng đã chọn
            const chosenAnswer = question.answers.find((a: any) => a.id === answerId);
            
            // Kiểm tra nếu đó là đáp án đúng
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
      
      // Xử lý từng phần thi
      await processSimpleParts(vocabularyPart, TestPartTypeEnum.VOCABULARY);
      await processSimpleParts(grammarPart, TestPartTypeEnum.GRAMMAR);
      await processSimpleParts(readingPart, TestPartTypeEnum.READING);
      await processSimpleParts(listeningPart, TestPartTypeEnum.LISTENING);
      
      // Tính điểm tổng
      if (result.totalQuestions > 0) {
        result.score = (result.correctAnswers / result.totalQuestions) * 100;
      }
      
      // Speaking và Writing cần API riêng để tính điểm, tạm thời bỏ qua
      
      setSubmissionResult(result);
    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [submitTestId, vocabularyPart, grammarPart, readingPart, listeningPart]);
  
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