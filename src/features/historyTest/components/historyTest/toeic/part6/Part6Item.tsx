import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { ToeicPart6, AnswerEnum } from 'interfaces/TestInterfaces';
import WEDocumentViewer from 'components/display/document/WEDocumentViewer';
import ExplanationCollapse from '../common/ExplanationCollapse';
import { useDarkMode } from 'hooks/useDarkMode';

type Props = {
  questionNumberStart: number;
  question: ToeicPart6;
  selectedAnswers: Record<string, AnswerEnum>;
};

const Part6Item: React.FC<Props> = ({
  questionNumberStart,
  question,
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
          Questions {questionNumberStart}–{questionNumberStart + 3}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
        <Box flex={1}>
          <WEDocumentViewer fileUrl={question.file} lineHeight="2" sx={{ my: 2 }} />
        </Box>

        <Box flex={1} sx={{ overflowY: 'auto', maxHeight: '60vh' }}>
          {[1, 2, 3, 4].map((num) => {
            const questionKey = `${question.id}-${num}`;
            const content = question[`contentQuestion${num}` as keyof ToeicPart6] as string;
            const explanation = question[`explanationQuestion${num}` as keyof ToeicPart6] as string;
            const correctAnswer = question[`correctAnswer${num}` as keyof ToeicPart6] as AnswerEnum;

            const answers = [
              question[`answer1Q${num}` as keyof ToeicPart6],
              question[`answer2Q${num}` as keyof ToeicPart6],
              question[`answer3Q${num}` as keyof ToeicPart6],
              question[`answer4Q${num}` as keyof ToeicPart6],
            ];

            return (
              <Box key={num} mb={3}>
                <Typography fontWeight="bold" mb={1}>
                  {questionNumberStart + num - 1}. {content}
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

                <ExplanationCollapse explanation={explanation} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Part6Item;
