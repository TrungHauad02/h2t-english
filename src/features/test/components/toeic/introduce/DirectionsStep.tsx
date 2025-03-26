import React from 'react';
import { Box, Typography } from '@mui/material';

const DirectionsStep = () => (

    <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', }}>
        <Box
    sx={{
      maxWidth: 800,
      border: '2px solid #1565c0',
      borderRadius: 1,
      overflow: 'hidden',
      bgcolor: 'white',
      boxShadow: 2
    }}
  >
    <Box sx={{ bgcolor: '#1565c0', px: 3, py: 2 }}>
      <Typography variant="h6" fontWeight="bold" color="white">
        DIRECTIONS
      </Typography>
    </Box>
    <Box sx={{ px: 3, py: 2 }}>
      <Typography fontSize={16}>
        In the Listening test, you will be asked to demonstrate how well you understand spoken English. The entire Listening test will last approximately 45 minutes.
        There are four parts, and directions are given for each part. You must mark your answers on the separate answer sheet. Do not write your answers in your test book.
      </Typography>
    </Box>
  </Box>
    </Box>
  
);

export default DirectionsStep;
