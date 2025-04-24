import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { AnswerEnum, ToeicQuestion } from 'interfaces/TestInterfaces';
import WEDocumentViewer from 'components/display/document/WEDocumentViewer';
import ExplanationCollapse from '../common/ExplanationCollapse';
import { useDarkMode } from 'hooks/useDarkMode';

type Props = {
  questionNumberStart: number;
  file: string;
  questions: ToeicQuestion[];
  selectedAnswers: Record<number, AnswerEnum>;
};

const Part6Item: React.FC<Props> = ({
  questionNumberStart,
  file,
  questions,
  selectedAnswers,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        width: '90vw',
        border: '2px solid #03a9f4',
        borderRadius: 2,
        bgcolor: isDarkMode ? '#1e1e1e' : 'white',
        p: 3,
        mx: 'auto',
      }}
    >
      <Box sx={{ bgcolor: '#03a9f4', color: 'white', px: 2, py: 1 }}>
        <Typography fontWeight="bold">
          Questions {questionNumberStart}–{questionNumberStart + questions.length - 1}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
        <Box flex={1}>
          <WEDocumentViewer fileUrl={file} lineHeight="2" sx={{ my: 2 }} />
        </Box>

        <Box flex={1} sx={{ overflowY: 'auto', maxHeight: '60vh' }}>
          {questions.map((q, idx) => {
            const correctAnswer = q.answers.find(a => a.correct)?.content as AnswerEnum;
            const selected = selectedAnswers[q.id];

            return (
              <Box key={q.id} mb={3}>
                <Typography fontWeight="bold" mb={1}>
                  {questionNumberStart + idx}. {q.content}
                </Typography>

                <RadioGroup name={`question-${q.id}`} value={selected || ''}>
                  {(['A', 'B', 'C', 'D'] as AnswerEnum[]).map((choice, index) => {
                    const ansText = q.answers[index]?.content;
                    const isCorrect = correctAnswer === choice;
                    const isWrong = selected === choice && selected !== correctAnswer;

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

                <ExplanationCollapse explanation={q.explanation} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Part6Item;
