import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toeicService, submitToeicService } from 'services/test';
import { Toeic, SubmitToeic } from 'interfaces';

export default function useToeicHistory() {
  const { id } = useParams();
  const submitToeicId = Number(id);
  
  const [toeic, setToeic] = useState<Toeic | null>(null);
  const [submitToeic, setSubmitToeic] = useState<SubmitToeic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(submitToeicId)) {
        setError('Invalid submission ID');
        setLoading(false);
        return;
      }

      try {
        // Fetch submitToeic first
        const submitToeicResponse = await submitToeicService.findById(submitToeicId);
        
        if (!submitToeicResponse || !submitToeicResponse.data) {
          setError('Submission not found');
          setLoading(false);
          return;
        }
        
        const submitToeicData = submitToeicResponse.data;
        setSubmitToeic(submitToeicData);
        
        // Then fetch the original Toeic test
        const toeicResponse = await toeicService.findById(submitToeicData.toeic_id);
        
        if (!toeicResponse || !toeicResponse.data) {
          setError('Toeic test not found');
          setLoading(false);
          return;
        }
        
        setToeic(toeicResponse.data);
        
      } catch (err) {
        setError('Failed to load TOEIC history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [submitToeicId]);

  return {
    toeic,
    submitToeic,
    loading,
    error
  };
}