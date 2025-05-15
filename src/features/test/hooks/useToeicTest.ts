import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { 
  toeicService, 
  submitToeicService,
  submitToeicPart1Service,
  submitToeicPart2Service,
  submitToeicAnswerService,
  toeicPart1Service,
  toeicPart2Service,
  toeicQuestionService,
  toeicPart3_4Service,
  toeicPart6Service,
  toeicPart7Service
} from 'services/test';
import { Toeic, SubmitToeic } from 'interfaces';
import useAuth from 'hooks/useAuth';

interface ToeicScore {
  listeningScore: number;
  readingScore: number;
  totalScore: number;
}

interface SubmitResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answeredQuestions: number;
  listeningScore: number;
  readingScore: number;
  listeningCorrect: number;
  readingCorrect: number;
}

export default function useToeicPage() {
  const { id } = useParams();
  const toeicId = Number(id);
  const userId = Number(useAuth().userId);

  const [toeic, setToeic] = useState<Toeic | null>(null);
  const [submitToeic, setSubmitToeic] = useState<SubmitToeic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [isCalculatingAnswers, setIsCalculatingAnswers] = useState<boolean>(false);

  const hasCreatedSubmitToeicRef = useRef(false);

  useEffect(() => {
    const fetchToeicAndSubmit = async () => {
      if (isNaN(toeicId)) {
        setError('Invalid TOEIC ID');
        setLoading(false);
        return;
      }

      try {
        // Fetch Toeic test
        const toeicResponse = await toeicService.findById(toeicId);
        
        if (!toeicResponse) {
          setError('Toeic not found');
          setLoading(false);
          return;
        }
        setToeic(toeicResponse.data);

        // Check for existing unfinished submit Toeic
        try {
          const existingSubmitToeic = await submitToeicService.findByToeicIdAndUserIdAndStatusFalse(toeicId, userId);
          setSubmitToeic(existingSubmitToeic.data);
        } catch {
          // If no existing submit Toeic, create a new one
          if (!hasCreatedSubmitToeicRef.current) {
            hasCreatedSubmitToeicRef.current = true;

            const newSubmitToeic: SubmitToeic = {
              id: 0,
              user_id: userId,
              toeic_id: toeicId,
              score: 0,
              comment: 'not submitted',
              status: false
            };

            try {
              const created = await submitToeicService.create(newSubmitToeic);
              setSubmitToeic(created.data);
            } catch (createErr) {
              console.error("Lỗi khi tạo submit toeic:", createErr);
              setError('Failed to create Toeic submission');
            }
          }
        }
      } catch (err) {
        setError('Failed to load TOEIC test');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchToeicAndSubmit();
  }, [toeicId, userId]);
  const calculateTotalAnswered = async (): Promise<number> => {
    if (!submitToeic?.id || !toeic) return 0;
  
    setIsCalculatingAnswers(true);
    try {
      let answered = 0;
  
      // Part 1
      if (toeic.questionsPart1?.length) {
        const part1Answers = await submitToeicPart1Service.findBySubmitToeicIdAndToeicPart1Ids(
          submitToeic.id,
          toeic.questionsPart1
        );
        answered += part1Answers?.data?.length || 0;
      }
  
      // Part 2
      if (toeic.questionsPart2?.length) {
        const part2Answers = await submitToeicPart2Service.findBySubmitToeicIdAndToeicPart2Ids(
          submitToeic.id,
          toeic.questionsPart2
        );
        answered += part2Answers?.data?.length || 0;
      }
  
      // Part 3
      if (toeic.questionsPart3?.length) {
        const toeicPart3Res = await toeicPart3_4Service.getByIdsAndStatus(toeic.questionsPart3, true);
        const toeicPart3Data = Array.isArray(toeicPart3Res?.data) ? toeicPart3Res.data : [];
        
        const part3QuestionIds: number[] = [];
        for (const part3 of toeicPart3Data) {
          if (part3.questions?.length) {
            part3QuestionIds.push(...part3.questions);
          }
        }
        
        if (part3QuestionIds.length) {
          const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeic.id,
            part3QuestionIds
          );
          answered += answers?.data?.length || 0;
        }
      }
  
      // Part 4
      if (toeic.questionsPart4?.length) {
        const toeicPart4Res = await toeicPart3_4Service.getByIdsAndStatus(toeic.questionsPart4, true);
        const toeicPart4Data = Array.isArray(toeicPart4Res?.data) ? toeicPart4Res.data : [];
        
        const part4QuestionIds: number[] = [];
        for (const part4 of toeicPart4Data) {
          if (part4.questions?.length) {
            part4QuestionIds.push(...part4.questions);
          }
        }
        
        if (part4QuestionIds.length) {
          const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeic.id,
            part4QuestionIds
          );
          answered += answers?.data?.length || 0;
        }
      }
  
      // Part 5 (trực tiếp như Part 1-2)
      if (toeic.questionsPart5?.length) {
        const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
          submitToeic.id,
          toeic.questionsPart5
        );
        answered += answers?.data?.length || 0;
      }
  
      // Part 6
      if (toeic.questionsPart6?.length) {
        const toeicPart6Res = await toeicPart6Service.getByIdsAndStatus(toeic.questionsPart6, true);
        const toeicPart6Data = Array.isArray(toeicPart6Res?.data) ? toeicPart6Res.data : [];
        
        const part6QuestionIds: number[] = [];
        for (const part6 of toeicPart6Data) {
          if (part6.questions?.length) {
            part6QuestionIds.push(...part6.questions);
          }
        }
        
        if (part6QuestionIds.length) {
          const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeic.id,
            part6QuestionIds
          );
          answered += answers?.data?.length || 0;
        }
      }
  
      // Part 7
      if (toeic.questionsPart7?.length) {
        const toeicPart7Res = await toeicPart7Service.getByIdsAndStatus(toeic.questionsPart7, true);
        const toeicPart7Data = Array.isArray(toeicPart7Res?.data) ? toeicPart7Res.data : [];
        
        const part7QuestionIds: number[] = [];
        for (const part7 of toeicPart7Data) {
          if (part7.questions?.length) {
            part7QuestionIds.push(...part7.questions);
          }
        }
        
        if (part7QuestionIds.length) {
          const answers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeic.id,
            part7QuestionIds
          );
          answered += answers?.data?.length || 0;
        }
      }
  
      setTotalAnswered(answered);
      return answered;
    } catch (error) {
      console.error("Error calculating answered questions:", error);
      return 0;
    } finally {
      setIsCalculatingAnswers(false);
    }
  };

  const calculateToeicScore = (listeningCorrect: number, readingCorrect: number): ToeicScore => {
    const listeningTable: Record<number, number> = {
      0: 5, 1: 5, 2: 5, 3: 10, 4: 15, 5: 20, 6: 25, 7: 30, 8: 35, 9: 40,
      10: 45, 11: 50, 12: 55, 13: 60, 14: 65, 15: 70, 16: 75, 17: 80, 18: 85, 19: 90,
      20: 95, 21: 100, 22: 105, 23: 110, 24: 115, 25: 120, 26: 125, 27: 130, 28: 135, 29: 140,
      30: 145, 31: 150, 32: 155, 33: 160, 34: 165, 35: 170, 36: 175, 37: 180, 38: 185, 39: 190,
      40: 195, 41: 200, 42: 205, 43: 210, 44: 215, 45: 220, 46: 225, 47: 230, 48: 235, 49: 240,
      50: 245, 51: 250, 52: 255, 53: 260, 54: 265, 55: 270, 56: 275, 57: 280, 58: 285, 59: 290,
      60: 295, 61: 300, 62: 305, 63: 310, 64: 315, 65: 320, 66: 325, 67: 330, 68: 335, 69: 340,
      70: 345, 71: 350, 72: 355, 73: 360, 74: 365, 75: 370, 76: 375, 77: 380, 78: 385, 79: 390,
      80: 395, 81: 400, 82: 405, 83: 410, 84: 415, 85: 420, 86: 425, 87: 430, 88: 435, 89: 440,
      90: 445, 91: 450, 92: 455, 93: 460, 94: 465, 95: 470, 96: 475, 97: 480, 98: 485, 99: 490,
      100: 495
    };

    // Bảng chuyển đổi điểm Reading
    const readingTable: Record<number, number> = {
      0: 5, 1: 5, 2: 5, 3: 10, 4: 15, 5: 20, 6: 25, 7: 30, 8: 35, 9: 40,
      10: 45, 11: 50, 12: 55, 13: 60, 14: 65, 15: 70, 16: 75, 17: 80, 18: 85, 19: 90,
      20: 95, 21: 100, 22: 105, 23: 110, 24: 115, 25: 120, 26: 125, 27: 130, 28: 135, 29: 140,
      30: 145, 31: 150, 32: 155, 33: 160, 34: 165, 35: 170, 36: 175, 37: 180, 38: 185, 39: 190,
      40: 195, 41: 200, 42: 205, 43: 210, 44: 215, 45: 220, 46: 225, 47: 230, 48: 235, 49: 240,
      50: 245, 51: 250, 52: 255, 53: 260, 54: 265, 55: 270, 56: 275, 57: 280, 58: 285, 59: 290,
      60: 295, 61: 300, 62: 305, 63: 310, 64: 315, 65: 320, 66: 325, 67: 330, 68: 335, 69: 340,
      70: 345, 71: 350, 72: 355, 73: 360, 74: 365, 75: 370, 76: 375, 77: 380, 78: 385, 79: 390,
      80: 395, 81: 400, 82: 405, 83: 410, 84: 415, 85: 420, 86: 425, 87: 430, 88: 435, 89: 440,
      90: 445, 91: 450, 92: 455, 93: 460, 94: 465, 95: 470, 96: 475, 97: 480, 98: 485, 99: 490,
      100: 495
    };

    const listeningScore = listeningTable[listeningCorrect] || 5;
    const readingScore = readingTable[readingCorrect] || 5;
    const totalScore = listeningScore + readingScore;

    return {
      listeningScore,
      readingScore,
      totalScore
    };
  };
  const submitToeicTest = async (): Promise<SubmitResult | null> => {
    if (!submitToeic?.id || !toeic) return null;
  
    try {
      let listeningCorrect = 0;
      let readingCorrect = 0;
  
      // Part 1
      if (toeic.questionsPart1?.length) {
        const [part1AnswersRes, part1QuestionsRes] = await Promise.all([
          submitToeicPart1Service.findBySubmitToeicIdAndToeicPart1Ids(
            submitToeic.id, 
            toeic.questionsPart1
          ),
          toeicPart1Service.getByIdsAndStatus(toeic.questionsPart1, true)
        ]);
  
        const part1Answers = Array.isArray(part1AnswersRes?.data) ? part1AnswersRes.data : [];
        const part1Questions = Array.isArray(part1QuestionsRes?.data) ? part1QuestionsRes.data : [];
  
        const part1Map: Record<number, any> = {};
        for (const q of part1Questions) {
          part1Map[q.id] = q;
        }
  
        for (const answer of part1Answers) {
          const question = part1Map[answer.toeicPart1Id];
          if (question && answer.answer === question.correctAnswer) {
            listeningCorrect++;
          }
        }
      }
  
      // Part 2
      if (toeic.questionsPart2?.length) {
        const [part2AnswersRes, part2QuestionsRes] = await Promise.all([
          submitToeicPart2Service.findBySubmitToeicIdAndToeicPart2Ids(
            submitToeic.id, 
            toeic.questionsPart2
          ),
          toeicPart2Service.getByIdsAndStatus(toeic.questionsPart2, true)
        ]);
  
        const part2Answers = Array.isArray(part2AnswersRes?.data) ? part2AnswersRes.data : [];
        const part2Questions = Array.isArray(part2QuestionsRes?.data) ? part2QuestionsRes.data : [];
  
        const part2Map: Record<number, any> = {};
        for (const q of part2Questions) {
          part2Map[q.id] = q;
        }
  
        for (const answer of part2Answers) {
          const question = part2Map[answer.toeicPart2Id];
          if (question && answer.answer === question.correctAnswer) {
            listeningCorrect++;
          }
        }
      }

      // Part 3-4 (cần lấy ToeicPart3_4 trước để có questions)
      const part3Ids = toeic.questionsPart3 || [];
      const part4Ids = toeic.questionsPart4 || [];
      
      if (part3Ids.length) {
        const toeicPart3Res = await toeicPart3_4Service.getByIdsAndStatus(part3Ids, true);
        const toeicPart3Data = Array.isArray(toeicPart3Res?.data) ? toeicPart3Res.data : [];
        
        // Lấy tất cả question ids từ part 3
        const part3QuestionIds: number[] = [];
        for (const part3 of toeicPart3Data) {
          if (part3.questions?.length) {
            part3QuestionIds.push(...part3.questions);
          }
        }
        
        if (part3QuestionIds.length) {
          const [answersRes, questionsRes] = await Promise.all([
            submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
              submitToeic.id, 
              part3QuestionIds
            ),
            toeicQuestionService.getByIdsAndStatus(part3QuestionIds, true)
          ]);
    
          const answers = Array.isArray(answersRes?.data) ? answersRes.data : [];
          const questions = Array.isArray(questionsRes?.data) ? questionsRes.data : [];
    
          const questionMap: Record<number, any> = {};
          for (const q of questions) {
            questionMap[q.id] = q;
          }
    
          for (const answer of answers) {
            const question = questionMap[answer.toeicQuestionId];
            if (question && answer.toeicAnswerId) {
              const selectedAnswer = question.answers.find((a: any) => a.id === answer.toeicAnswerId);
              if (selectedAnswer?.correct) {
                listeningCorrect++;
              }
            }
          }
        }
      }

      if (part4Ids.length) {
        const toeicPart4Res = await toeicPart3_4Service.getByIdsAndStatus(part4Ids, true);
        const toeicPart4Data = Array.isArray(toeicPart4Res?.data) ? toeicPart4Res.data : [];
        
        // Lấy tất cả question ids từ part 4
        const part4QuestionIds: number[] = [];
        for (const part4 of toeicPart4Data) {
          if (part4.questions?.length) {
            part4QuestionIds.push(...part4.questions);
          }
        }
        
        if (part4QuestionIds.length) {
          const [answersRes, questionsRes] = await Promise.all([
            submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
              submitToeic.id, 
              part4QuestionIds
            ),
            toeicQuestionService.getByIdsAndStatus(part4QuestionIds, true)
          ]);
    
          const answers = Array.isArray(answersRes?.data) ? answersRes.data : [];
          const questions = Array.isArray(questionsRes?.data) ? questionsRes.data : [];
    
          const questionMap: Record<number, any> = {};
          for (const q of questions) {
            questionMap[q.id] = q;
          }
    
          for (const answer of answers) {
            const question = questionMap[answer.toeicQuestionId];
            if (question && answer.toeicAnswerId) {
              const selectedAnswer = question.answers.find((a: any) => a.id === answer.toeicAnswerId);
              if (selectedAnswer?.correct) {
                listeningCorrect++;
              }
            }
          }
        }
      }
  
      // Part 5 (đơn giản như part 1-2)
      if (toeic.questionsPart5?.length) {
        const [answersRes, questionsRes] = await Promise.all([
          submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeic.id, 
            toeic.questionsPart5
          ),
          toeicQuestionService.getByIdsAndStatus(toeic.questionsPart5, true)
        ]);
  
        const answers = Array.isArray(answersRes?.data) ? answersRes.data : [];
        const questions = Array.isArray(questionsRes?.data) ? questionsRes.data : [];
  
        const questionMap: Record<number, any> = {};
        for (const q of questions) {
          questionMap[q.id] = q;
        }
  
        for (const answer of answers) {
          const question = questionMap[answer.toeicQuestionId];
          if (question && answer.toeicAnswerId) {
            const selectedAnswer = question.answers.find((a: any) => a.id === answer.toeicAnswerId);
            if (selectedAnswer?.correct) {
              readingCorrect++;
            }
          }
        }
      }

      // Part 6 (giống part 3-4)
      if (toeic.questionsPart6?.length) {
        const toeicPart6Res = await toeicPart6Service.getByIdsAndStatus(toeic.questionsPart6, true);
        const toeicPart6Data = Array.isArray(toeicPart6Res?.data) ? toeicPart6Res.data : [];
        
        // Lấy tất cả question ids từ part 6
        const part6QuestionIds: number[] = [];
        for (const part6 of toeicPart6Data) {
          if (part6.questions?.length) {
            part6QuestionIds.push(...part6.questions);
          }
        }
        
        if (part6QuestionIds.length) {
          const [answersRes, questionsRes] = await Promise.all([
            submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
              submitToeic.id, 
              part6QuestionIds
            ),
            toeicQuestionService.getByIdsAndStatus(part6QuestionIds, true)
          ]);
    
          const answers = Array.isArray(answersRes?.data) ? answersRes.data : [];
          const questions = Array.isArray(questionsRes?.data) ? questionsRes.data : [];
    
          const questionMap: Record<number, any> = {};
          for (const q of questions) {
            questionMap[q.id] = q;
          }
    
          for (const answer of answers) {
            const question = questionMap[answer.toeicQuestionId];
            if (question && answer.toeicAnswerId) {
              const selectedAnswer = question.answers.find((a: any) => a.id === answer.toeicAnswerId);
              if (selectedAnswer?.correct) {
                readingCorrect++;
              }
            }
          }
        }
      }

      if (toeic.questionsPart7?.length) {
        const toeicPart7Res = await toeicPart7Service.getByIdsAndStatus(toeic.questionsPart7, true);
        const toeicPart7Data = Array.isArray(toeicPart7Res?.data) ? toeicPart7Res.data : [];
        
        const part7QuestionIds: number[] = [];
        for (const part7 of toeicPart7Data) {
          if (part7.questions?.length) {
            part7QuestionIds.push(...part7.questions);
          }
        }
        
        if (part7QuestionIds.length) {
          const [answersRes, questionsRes] = await Promise.all([
            submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
              submitToeic.id, 
              part7QuestionIds
            ),
            toeicQuestionService.getByIdsAndStatus(part7QuestionIds, true)
          ]);
    
          const answers = Array.isArray(answersRes?.data) ? answersRes.data : [];
          const questions = Array.isArray(questionsRes?.data) ? questionsRes.data : [];
    
          const questionMap: Record<number, any> = {};
          for (const q of questions) {
            questionMap[q.id] = q;
          }
    
          for (const answer of answers) {
            const question = questionMap[answer.toeicQuestionId];
            if (question && answer.toeicAnswerId) {
              const selectedAnswer = question.answers.find((a: any) => a.id === answer.toeicAnswerId);
              if (selectedAnswer?.correct) {
                readingCorrect++;
              }
            }
          }
        }
      }
      
      const toeicScore = calculateToeicScore(listeningCorrect, readingCorrect);
  
      const result: SubmitResult = {
        totalQuestions: 200,
        correctAnswers: listeningCorrect + readingCorrect,
        score: toeicScore.totalScore,
        answeredQuestions: totalAnswered,
        listeningScore: toeicScore.listeningScore,
        readingScore: toeicScore.readingScore,
        listeningCorrect,
        readingCorrect
      };

  
      await submitToeicService.patch(submitToeic.id, {
        score: toeicScore.totalScore,
        status: true
      });
  
 
      setSubmitToeic({
        ...submitToeic,
        score: toeicScore.totalScore,
        status: true
      });
  
      return result;
    } catch (error) {
      console.error("Error submitting TOEIC test:", error);
      throw error;
    }
  };

  const updateSubmitToeic = async (data: Partial<SubmitToeic>) => {
    if (submitToeic && submitToeic.id) {
      const updated = await submitToeicService.update(submitToeic.id, { ...submitToeic, ...data });
      setSubmitToeic(updated.data);
      return updated;
    }
  };

  const finalizeToeic = async (finalScore: number, comment: string = '') => {
    if (submitToeic && submitToeic.id) {
      const updated = await submitToeicService.patch(submitToeic.id, {
        ...submitToeic,
        score: finalScore,
        comment,
        status: true,
      });
      setSubmitToeic(updated.data);
      return updated;
    }
  };

  return {
    toeic,
    submitToeic,
    loading,
    error,
    totalAnswered,
    isCalculatingAnswers,
    calculateTotalAnswered,
    submitToeicTest,
    updateSubmitToeic,
    finalizeToeic
  };
}