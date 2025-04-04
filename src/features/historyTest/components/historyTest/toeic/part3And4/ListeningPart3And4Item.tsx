import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from '@mui/material';
import { AnswerEnum, ToeicPart3_4 } from 'interfaces/TestInterfaces';
import CollapseScriptBox from '../common/CollapseScriptBox';

type Props = {
  questionNumberStart: number;
  data: ToeicPart3_4;
  selectedAnswers: Record<string, AnswerEnum>;
};

const ListeningPart3And4Item: React.FC<Props> = ({
  questionNumberStart,
  data,
  selectedAnswers,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
    sx={{
      width: '80vw',
      height: '60vh',
      overflow: 'hidden',
      border: '2px solid #03a9f4',
      borderRadius: 2,
      bgcolor: isDark ? '#1e1e1e' : 'white',
      boxShadow: 3,
      p: 2,
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <audio src={data.audio} autoPlay controls style={{ width: '100%' }} />
  
    <Box mt={2}>
      <CollapseScriptBox script={data.transcript} />
    </Box>
  
    <Box
      sx={{
        mt: 2,
        overflowY: 'auto',
        pr: 1,
        flex: 1,
      }}
    >
      {[1, 2, 3].map((num) => {
        const questionKey = `${data.id}-${num}`;
        const content = data[`contentQuestion${num}` as keyof ToeicPart3_4];
        const correctAnswer = data[`correctAnswerQ${num}` as keyof ToeicPart3_4] as AnswerEnum;
        const answers = [
          data[`answer1Q${num}` as keyof ToeicPart3_4],
          data[`answer2Q${num}` as keyof ToeicPart3_4],
          data[`answer3Q${num}` as keyof ToeicPart3_4],
          data[`answer4Q${num}` as keyof ToeicPart3_4],
        ];
  
        return (
          <Box key={num} mb={3}>
            <Typography fontWeight="bold" mb={1}>
              {questionNumberStart + num - 1}. {String(content)}
            </Typography>
  
            <RadioGroup name={questionKey} value={selectedAnswers[questionKey] || ''}>
              {(['A', 'B', 'C', 'D'] as AnswerEnum[]).map((choice, idx) => {
                const isCorrect = correctAnswer === choice;
                const isWrong =
                  selectedAnswers[questionKey] === choice &&
                  selectedAnswers[questionKey] !== correctAnswer;
  
                let bgColor = 'transparent';
                let textColor = 'inherit';
  
                if (isCorrect) {
                  bgColor = isDark ? '#004d60' : '#e0f7fa';
                  textColor = isDark ? '#b2ebf2' : '#01579b';
                } else if (isWrong) {
                  bgColor = isDark ? '#3b1f1f' : '#ffebee';
                  textColor = isDark ? '#ef9a9a' : '#c62828';
                }
  
                return (
                  <FormControlLabel
                    key={choice}
                    value={choice}
                    control={<Radio disabled />}
                    label={`${choice}. ${answers[idx]}`}
                    sx={{
                      bgcolor: bgColor,
                      color: textColor,
                      borderRadius: 1,
                      px: 1,
                      my: 0.5,
                    }}
                  />
                );
              })}
            </RadioGroup>
          </Box>
        );
      })}
    </Box>
  </Box>
  
  );
};

export default ListeningPart3And4Item;
