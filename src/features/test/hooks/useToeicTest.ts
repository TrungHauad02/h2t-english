import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toeicService, submitToeicService } from 'services/test';
import { Toeic, SubmitToeic } from 'interfaces';
import useAuth from 'hooks/useAuth';

export default function useToeicPage() {
  const { id } = useParams();
  const toeicId = Number(id);
  const userId = Number(useAuth().userId);

  const [toeic, setToeic] = useState<Toeic | null>(null);
  const [submitToeic, setSubmitToeic] = useState<SubmitToeic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        console.log(toeicResponse.data);
        

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
    updateSubmitToeic,
    finalizeToeic
  };
}