import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { AnswerEnum } from 'interfaces';
import QuestionOption from './QuestionOption';

interface AnswerOptionsGridProps {
  options: string[];
  correctAnswer: AnswerEnum;
  columns?: 1 | 2;
  sx?: object;
}

export default function AnswerOptionsGrid({ 
  options,
  correctAnswer,
  columns = 2,
  sx = {}
}: AnswerOptionsGridProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  if (!options || options.length === 0) return null;

  const answerEnums = [AnswerEnum.A, AnswerEnum.B, AnswerEnum.C, AnswerEnum.D];
  const columnWidth = columns === 1 ? 12 : 6;

  // Xử lý options để loại bỏ "(A)", "(B)",... nếu chúng có ở đầu chuỗi
  const processedOptions = options.map(option => {
    // Kiểm tra xem option có bắt đầu bằng (A), (B), (C) hoặc (D) không
    const match = option.match(/^\([A-D]\)\s*(.*)/);
    return match ? match[1] : option; // Trả về phần sau "(X) " nếu có, nếu không thì giữ nguyên
  });

  return (
    <Box sx={{ mb: 3, ...sx }}>
      <Typography 
        variant="subtitle1"
        sx={{
          color: isDarkMode ? color.gray300 : color.gray700,
          fontWeight: 'bold',
          mb: 2
        }}
      >
        Answer Options:
      </Typography>
      
      <Grid container spacing={2}>
        {processedOptions.map((option, index) => {
          if (index > 3) return null;
          
          return (
            <Grid item xs={12} md={columnWidth} key={index}>
              <QuestionOption
                letter={answerEnums[index]}
                content={option}
                isCorrect={correctAnswer === answerEnums[index]}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}