import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from '@mui/material';
import { AnswerEnum, ToeicQuestion } from 'interfaces/TestInterfaces';
import ExplanationCollapse from '../common/ExplanationCollapse';
import { useDarkMode } from 'hooks/useDarkMode';

type Props = {
  questionNumber: number;
  question: ToeicQuestion;
  selectedAnswer?: AnswerEnum;
};

const Part5Item: React.FC<Props> = ({
  questionNumber,
  question,
  selectedAnswer,
}) => {
  const { isDarkMode } = useDarkMode();
  const correctAnswer = question.answers.find((a) => a.correct)?.content as AnswerEnum;

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
            {question.answers.map((ans, index) => {
              const isCorrect = ans.content === correctAnswer;
              const isWrong = selectedAnswer === ans.content && !ans.correct;

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
                  key={ans.id}
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
                    value={ans.content}
                    control={<Radio disabled />}
                    label={`(${String.fromCharCode(65 + index)}). ${ans.content}`}
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
