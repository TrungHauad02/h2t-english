import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from '@mui/material';
import { AnswerEnum, ToeicQuestion } from 'interfaces/TestInterfaces';
import CollapseScriptBox from '../common/CollapseScriptBox';

type Props = {
  questionNumberStart: number;
  audio: string;
  transcript: string;
  questions: ToeicQuestion[];
  selectedAnswers: Record<number, AnswerEnum>;
};

const ListeningPart3And4Item: React.FC<Props> = ({
  questionNumberStart,
  audio,
  transcript,
  questions,
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
      <audio src={audio} autoPlay controls style={{ width: '100%' }} />

      <Box mt={2}>
        <CollapseScriptBox script={transcript} />
      </Box>

      <Box
        sx={{
          mt: 2,
          overflowY: 'auto',
          pr: 1,
          flex: 1,
        }}
      >
        {questions.map((q, idx) => {
          const correctAnswer = q.answers.find(a => a.correct)?.content as AnswerEnum;
          const userAnswer = selectedAnswers[q.id];
          return (
            <Box key={q.id} mb={3}>
              <Typography fontWeight="bold" mb={1}>
                {questionNumberStart + idx}. {q.content}
              </Typography>

              <RadioGroup name={`question-${q.id}`} value={userAnswer || ''}>
                {(['A', 'B', 'C', 'D'] as AnswerEnum[]).map((choice, i) => {
                  const ansText = q.answers[i]?.content;
                  const isCorrect = correctAnswer === choice;
                  const isWrong = userAnswer === choice && userAnswer !== correctAnswer;

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
                      label={`${choice}. ${ansText}`}
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
