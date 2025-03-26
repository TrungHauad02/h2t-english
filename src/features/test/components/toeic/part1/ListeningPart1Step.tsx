import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper
} from '@mui/material';

const ListeningPart1Step = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        maxHeight:"60vh",
        marginTop:'1rem',
        border: '2px solid #1565c0',
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: 'white',
        px: 4,
        py: 3
      }}
    >
      <Box sx={{ bgcolor: '#1565c0', px: 2, py: 1, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="white">
          Part 1
        </Typography>
      </Box>
      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        PART 1
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Directions:</strong> For each question in this part, you will hear four statements about a picture in your test book.
        When you hear the statements, you must select the one statement that best describes what you see in the picture.
        Then find the number of the question on your answer sheet and mark your answer.
        The statements will not be printed in your test book and will be spoken only one time.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 4,
          flexWrap: 'wrap',
          my: 2
        }}
      >
        <Box sx={{ flex: 1, minWidth: 280 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/direction_part_1.png"
              alt="Direction Part 1"
              style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
            />
          </Box>
          <Typography sx={{ mt: 2 }}>
            Statement (C), “They’re sitting at a table,” is the best description of the picture,
            so you should select answer (C) and mark it on your answer sheet.
          </Typography>
        </Box>

        {/* Câu hỏi trắc nghiệm */}
        <Box
          sx={{
            border: '2px solid #03a9f4',
            borderRadius: 1,
            px: 3,
            py: 2,
            minWidth: 240,
            bgcolor: '#f0faff',
            flexShrink: 0
          }}
        >
          <Typography fontWeight="bold" sx={{ mb: 1 }}>
            Choose the correct answer.
          </Typography>
          <Typography sx={{ mb: 1 }}>1.</Typography>
          <RadioGroup name="question1">
            <FormControlLabel value="A" control={<Radio />} label="A" />
            <FormControlLabel value="B" control={<Radio />} label="B" />
            <FormControlLabel value="C" control={<Radio />} label="C" />
            <FormControlLabel value="D" control={<Radio />} label="D" />
          </RadioGroup>
        </Box>
      </Box>
    </Paper>
  );
};

export default ListeningPart1Step;
