import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from '@mui/material';
import { AnswerEnum, ToeicPart5 } from 'interfaces/TestInterfaces';
import ExplanationCollapse from '../common/ExplanationCollapse';
import { useDarkMode } from 'hooks/useDarkMode';

type Props = {
  questionNumber: number;
  question: ToeicPart5;
  selectedAnswer?: AnswerEnum;
};

const Part5Item: React.FC<Props> = ({
  questionNumber,
  question,
  selectedAnswer,
}) => {
  const { isDarkMode } = useDarkMode();
  const correctAnswer = question.correctAnswer;

  return (
    <Box
      sx={{
        width: '100%',
        border: '2px solid #03a9f4',
        borderRadius: 2,
        bgcolor: isDarkMode ? '#1e1e1e' : 'white',
        boxShadow: 2,
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
      }}
    >
      <Box flex={1}>
        <Typography sx={{ mb: 2 }}>
          {questionNumber}. {question.content}
        </Typography>

        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            name={`question-${questionNumber}`}
            value={selectedAnswer || ''}
          >
            {(['A', 'B', 'C', 'D'] as AnswerEnum[]).map((opt, index) => {
              const answer = question[`answer${index + 1}` as keyof ToeicPart5] as string;
              const isCorrect = correctAnswer === opt;
              const isWrong = selectedAnswer === opt && selectedAnswer !== correctAnswer;

              let bgColor = 'transparent';
              let textColor = 'inherit';

              if (isCorrect) {
                bgColor = isDarkMode ? '#004d60' : '#e0f7fa';
                textColor = isDarkMode ? '#b2ebf2' : '#01579b';
              } else if (isWrong) {
                bgColor = isDarkMode ? '#3b1f1f' : '#ffebee';
                textColor = isDarkMode ? '#ef9a9a' : '#c62828';
              }

              return (
                <Box
                  key={opt}
                  sx={{
                    bgcolor: bgColor,
                    color: textColor,
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                    mb: 1,
                    width: '95%',
                  }}
                >
                  <FormControlLabel
                    value={opt}
                    control={<Radio disabled />}
                    label={`${opt}. ${answer}`}
                    sx={{
                      width: '100%',
                      m: 0,
                      color: textColor,
                    }}
                  />
                </Box>
              );
            })}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box flex={1}>
        <ExplanationCollapse explanation={question.explanation} />
      </Box>
    </Box>
  );
};

export default Part5Item;
