import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { testService } from '../services/testServices';
import { ToeicTest } from '../components'; 
import { Toeic  } from 'interfaces/TestInterfaces';


const ToeicPage = () => {
  const { id } = useParams();
  const toeicId = Number(id);
  const [toeic, setToeic] = useState<Toeic | null>(null);

  useEffect(() => {
    if (!isNaN(toeicId)) {
      const data = testService.getToeicById(toeicId);
      setToeic(data);
    }
  }, [toeicId]);

  if (isNaN(toeicId)) {
    return <Typography sx={{ mt: 4, textAlign: 'center' }}>Invalid TOEIC ID</Typography>;
  }

  if (!toeic) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100vw' }}>
      <ToeicTest toeic={toeic} />
    </Box>
  );
};

export default ToeicPage;
