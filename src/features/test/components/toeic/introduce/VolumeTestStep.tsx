import React from 'react';
import { Box, Typography } from '@mui/material';

const VolumeTestStep = () => (
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
        Volume test
      </Typography>
    </Box>
    <Box sx={{ px: 3, py: 2 }}>
      <Typography fontSize={16}>
        This is Volume Test. If you don’t hear clearly, adjust the volume control on your computer, or contact the administrators for assistance.
      </Typography>
    </Box>
  </Box>
   </Box> 
  
);

export default VolumeTestStep;
