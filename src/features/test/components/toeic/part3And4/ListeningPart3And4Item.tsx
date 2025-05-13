import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Chip,
  alpha,
  useMediaQuery,
  useTheme
} from '@mui/material';
import HearingIcon from '@mui/icons-material/Hearing';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { AnswerEnum, ToeicQuestion } from 'interfaces/TestInterfaces';

type Props = {
  questionNumberStart: number;
  questions: ToeicQuestion[];
  audio: string;
  selectedAnswers: Record<string, AnswerEnum>;
  onChange: (questionKey: string, value: AnswerEnum) => void;
  onAudioEnded: () => void;
};

export default function ListeningPart3And4Item({
  questionNumberStart,
  questions,
  audio,
  selectedAnswers,
  onChange,
  onAudioEnded
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        width: { xs: '90vw', md: '80vw' },
        maxHeight: { xs: '70vh', md: '60vh' },
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: `0 12px 32px ${alpha(isDarkMode ? color.black : color.gray900, 0.12)}`,
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: '2px solid',
        borderColor: isDarkMode ? color.emerald700 : color.emerald500,
        position: 'relative',
      }}
    >
      <audio src={audio} autoPlay onEnded={onAudioEnded} style={{ display: 'none' }} />
      
      <Box
        sx={{
          background: isDarkMode
            ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
            : `linear-gradient(135deg, ${color.emerald500} 0%, ${color.teal500} 100%)`,
          color: color.white,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: `0 4px 16px ${alpha(color.emerald600, 0.25)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HearingIcon sx={{ fontSize: 28 }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              textShadow: '0 3px 6px rgba(0,0,0,0.2)',
            }}
          >
            Choose the correct answer
          </Typography>
        </Box>
        <Chip
          label={`Questions ${questionNumberStart}–${questionNumberStart + questions.length - 1}`}
          sx={{
            bgcolor: alpha(color.white, 0.2),
            color: color.white,
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(color.white, 0.3)}`,
          }}
        />
      </Box>

      <Box
        sx={{
          p: 3,
          overflowY: 'auto',
          maxHeight: { xs: '60vh', md: '50vh' },
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: isDarkMode ? color.gray700 : color.gray100,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: isDarkMode ? color.emerald700 : color.emerald400,
            borderRadius: '4px',
            '&:hover': {
              bgcolor: isDarkMode ? color.emerald600 : color.emerald500,
            }
          }
        }}
      >
        {questions.map((question, index) => {
          const questionKey = `${question.id}`;
          const questionNumber = questionNumberStart + index;
          const selected = selectedAnswers[questionKey];
          const isAnswered = !!selected;

          return (
            <Box
              key={question.id}
              mb={3}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: isDarkMode ? color.gray900 : color.white,
                border: '2px solid',
                borderColor: isAnswered
                  ? isDarkMode ? color.teal600 : color.teal400
                  : isDarkMode ? color.gray700 : color.gray300,
                transition: 'all 0.3s ease',
                boxShadow: isAnswered
                  ? `0 4px 16px ${alpha(isDarkMode ? color.teal900 : color.teal200, 0.3)}`
                  : `0 2px 8px ${alpha(isDarkMode ? color.black : color.gray400, 0.1)}`,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2.5,
                  fontSize: '1.1rem',
                  color: isDarkMode ? color.emerald300 : color.emerald700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
                      : `linear-gradient(135deg, ${color.emerald200} 0%, ${color.teal200} 100%)`,
                    color: isDarkMode ? color.white : color.emerald900,
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    boxShadow: `0 2px 8px ${alpha(color.emerald600, 0.3)}`,
                  }}
                >
                  {questionNumber}
                </Box>
                {question.content}
              </Typography>

              <RadioGroup
                name={questionKey}
                value={selected || ''}
                onChange={(e) => onChange(questionKey, e.target.value as AnswerEnum)}
                sx={{ ml: 1 }}
              >
                {question.answers.map((answer, idx) => {
                  const optionLetter = (['A', 'B', 'C', 'D'][idx]) as AnswerEnum;
                  const isOptionSelected = selected === optionLetter;

                  return (
                    <FormControlLabel
                      key={answer.id}
                      value={optionLetter}
                      control={
                        <Radio
                          sx={{
                            color: isDarkMode ? color.gray600 : color.gray400,
                            '&.Mui-checked': {
                              color: isDarkMode ? color.teal400 : color.teal600,
                            },
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: isOptionSelected
                                ? isDarkMode ? color.teal700 : color.teal500
                                : isDarkMode ? color.gray700 : color.gray200,
                              color: isOptionSelected
                                ? color.white
                                : isDarkMode ? color.gray300 : color.gray700,
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              transition: 'all 0.2s ease',
                              boxShadow: isOptionSelected
                                ? `0 2px 8px ${alpha(color.teal600, 0.3)}`
                                : 'none',
                            }}
                          >
                            {optionLetter}
                          </Box>
                          <Typography
                            sx={{
                              color: isDarkMode ? color.gray200 : color.gray800,
                              fontWeight: isOptionSelected ? 600 : 400,
                              fontSize: '1rem',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {answer.content}
                          </Typography>
                        </Box>
                      }
                      sx={{
                        mb: 2,
                        ml: 0,
                        px: 2,
                        py: 1.5,
                        borderRadius: 2.5,
                        transition: 'all 0.2s ease',
                        background: isOptionSelected
                          ? isDarkMode
                            ? `linear-gradient(135deg, ${alpha(color.teal900, 0.3)} 0%, ${alpha(color.emerald900, 0.3)} 100%)`
                            : `linear-gradient(135deg, ${alpha(color.teal100, 0.8)} 0%, ${alpha(color.emerald100, 0.8)} 100%)`
                          : 'transparent',
                        '&:hover': {
                          bgcolor: isDarkMode
                            ? alpha(color.teal900, 0.15)
                            : alpha(color.teal100, 0.4),
                          transform: 'translateX(8px)',
                        },
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
}